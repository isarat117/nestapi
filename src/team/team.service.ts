import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(createTeamDto: CreateTeamDto, userId: number) {
    const { name, leaderId, memberIds } = createTeamDto;
  
    if (leaderId !== userId) {
      console.log(`User ID: ${userId}, Leader ID: ${leaderId}`);
      throw new ForbiddenException('You can only create a team as yourself.');
    }
  
    // Check if all members exist
    const existingUsers = await this.prisma.user.findMany({
      where: {
        id: { in: memberIds },
      },
    });
  
    const existingUserIds = existingUsers.map(user => user.id);
    const missingUserIds = memberIds.filter(id => !existingUserIds.includes(id));
  
    if (missingUserIds.length > 0) {
      console.log(`Missing user IDs: ${missingUserIds}`);
      throw new NotFoundException(`Users with IDs ${missingUserIds.join(', ')} not found.`);
    }
  
    // Create team
    const team = await this.prisma.team.create({
      data: {
        name,
        leaderId,
        members: {
          create: memberIds.map(id => ({
            userId: id,
          })),
        },
      },
      include: { members: true },
    });
  
    return team;
  }
  
  async inviteUser(inviteUserDto: InviteUserDto, userId: number) {
    const { teamId, userId: invitedUserId } = inviteUserDto;

    // Check if team exists
    const team = await this.prisma.team.findUnique({ where: { id: teamId } });
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenException('You can only invite users to teams you lead.');
    }

    // Create invitation
    const invitation = await this.prisma.teamInvitation.create({
      data: {
        teamId,
        userId: invitedUserId,
      },
    });

    return invitation;
  }

  async respondToInvitation(updateInvitationDto: UpdateInvitationDto, userId: number) {
    const { invitationId, status } = updateInvitationDto;

    // Check invitation
    const invitation = await this.prisma.teamInvitation.findUnique({ where: { id: invitationId } });
    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.userId !== userId) {
      throw new ForbiddenException('You can only respond to your own invitations.');
    }

    // Update invitation status
    const updatedInvitation = await this.prisma.teamInvitation.update({
      where: { id: invitationId },
      data: {
        status,
        respondedAt: new Date(),
      },
    });

    if (status === 'ACCEPTED') {
      await this.prisma.teamMember.create({
        data: {
          teamId: invitation.teamId,
          userId: invitation.userId,
        },
      });
    }

    return updatedInvitation;
  }
}
