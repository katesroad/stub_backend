import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { method, body, path, params, query } = req;
    console.log(`${method}: ${path}`);
    if (['GET', 'OPTIONS', 'DELETE'].includes(method)) {
      if (Object.keys(params).length) console.log(params);
      if (Object.keys(query).length) console.log(query);
    } else {
      if (Object.keys(body)) {
        console.log(body  );
      }
    }
    next();
  }
}
