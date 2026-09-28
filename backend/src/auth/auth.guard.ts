import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from '../firebase/firebase.service';

export interface AuthenticatedRequest extends Request {
  user: {
    uid: string;
    email?: string;
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authentication token.');
    }

    const token = authorization.substring('Bearer '.length).trim();

    if (!token) {
      throw new UnauthorizedException('Missing authentication token.');
    }

    try {
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(token);

      request.user = {
        uid: decodedToken.uid,
        email: decodedToken.email,
      };

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired authentication token.');
    }
  }
}