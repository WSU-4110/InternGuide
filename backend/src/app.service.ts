import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'ok',
      message: 'InternGuide API is running',
    }
  }

  getHomePreview() {
    return {
      headline: 'InternGuide backend connected',
      blurb: 'Frontend is now talking to Nest via /api/preview.',
      timestamp: new Date().toISOString(),
    }
  }
}
