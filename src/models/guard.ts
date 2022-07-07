import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      const token = request.headers['authorization'];

      if (!token)
        return false;

      const { id } = this.jwtService.verify(token)
      response.locals.userId = id;

      return true
    } catch (error) {
      return false
    }
  }
}