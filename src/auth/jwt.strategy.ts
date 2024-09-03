import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ismailarat', 
    });
  }

  async validate(payload: JwtPayload) {
    
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    console.log(" dasf",user)
    if (!user) {
      throw new UnauthorizedException(); // Eksik import eklenmiş oldu
    }
    return user; // JWT'yi doğruladıktan sonra kullanıcıyı döndürür
  }
}
