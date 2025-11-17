import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  it('should return status payload', () => {
    expect(appController.getStatus()).toEqual({
      status: 'ok',
      message: 'InternGuide API is running',
    })
  })

  it('should return preview payload', () => {
    const preview = appController.getPreview()

    expect(preview.headline).toBe('InternGuide backend connected')
    expect(preview.blurb).toContain('frontend')
    expect(() => new Date(preview.timestamp)).not.toThrow()
  })
})
