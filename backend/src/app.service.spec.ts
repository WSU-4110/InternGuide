import { AppService } from './app.service'

describe('AppService', () => {
  let service: AppService

  beforeEach(() => {
    service = new AppService()
  })

  it('should return correct status object', () => {
    const result = service.getStatus()
    expect(result).toHaveProperty('status', 'ok')
    expect(result).toHaveProperty('message', 'InternGuide API is running')
  })

  it('should only contain status and message keys', () => {
    const result = service.getStatus()
    expect(Object.keys(result)).toEqual(['status', 'message'])
  })

  it('should return correct headline in home preview', () => {
    const result = service.getHomePreview()
    expect(result.headline).toBe('InternGuide backend connected')
  })

  it('should return a valid ISO timestamp', () => {
    const { timestamp } = service.getHomePreview()
    expect(() => new Date(timestamp).toISOString()).not.toThrow()
  })

  it('should generate timestamp close to current time', () => {
    const before = new Date().getTime()
    const { timestamp } = service.getHomePreview()
    const after = new Date().getTime()

    const ts = new Date(timestamp).getTime()
    expect(ts).toBeGreaterThanOrEqual(before - 50)
    expect(ts).toBeLessThanOrEqual(after + 50)
  })

  it('should contain headline, blurb, and timestamp keys', () => {
    const result = service.getHomePreview()
    expect(Object.keys(result).sort()).toEqual(
      ['headline', 'blurb', 'timestamp'].sort()
    )
  })
})
