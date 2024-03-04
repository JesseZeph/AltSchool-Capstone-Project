import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['api-key'];

    if (!apiKey) {
      return res
        .status(401)
        .json({ status: false, message: 'API key missing' });
    }

    const isValidApiKey = await this.authService.isValidApiKey(
      apiKey.toString(),
    );

    if (!isValidApiKey) {
      return res
        .status(403)
        .json({ status: false, message: 'Invalid API key' });
    }

    next();
  }
}
