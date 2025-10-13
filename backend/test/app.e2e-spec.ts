import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      status: 'ok',
      message: 'InternGuide API is running',
    })
  })

  it('/preview (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/api/preview')

    expect(response.status).toBe(200)
    expect(response.body.headline).toBe('InternGuide backend connected')
    expect(response.body.blurb).toContain('frontend')
    expect(response.body.timestamp).toBeDefined()
  })
})
