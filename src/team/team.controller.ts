import { Body, Controller, Post, Patch, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { JwtAuthGuard } from '../auth/auth-guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('team')
@ApiBearerAuth()  // Bu kısım JWT yetkilendirmesini gösterir.
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  async createTeam(@Body() createTeamDto: CreateTeamDto, @Request() req) {
    console.log("fgdh", req.user.id)
    return this.teamService.createTeam(createTeamDto, req.user.id);
  }

  @Post('invite')
  @UseGuards(JwtAuthGuard)
  async inviteUser(@Body() inviteUserDto: InviteUserDto, @Request() req) {
    return this.teamService.inviteUser(inviteUserDto, req.user.id);
  }

  @Patch('invitation')
  @UseGuards(JwtAuthGuard)
  async respondToInvitation(@Body() updateInvitationDto: UpdateInvitationDto, @Request() req) {
    return this.teamService.respondToInvitation(updateInvitationDto, req.user.id);
  }
}
