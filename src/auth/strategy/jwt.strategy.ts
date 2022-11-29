import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from '../auth.entity';
import { jwtConstants } from '../constants/constants';
import { JwtService } from '../service/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  private validate(payload: any): Promise<Auth | never> {
    return this.jwtService.validateUser(payload);
  }
}
