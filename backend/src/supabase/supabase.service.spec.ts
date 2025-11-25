import { createClient } from '@supabase/supabase-js'
import { SupabaseService } from './supabase.service'

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(),
}))

describe('SupabaseService', () => {
  const originalEnv = { ...process.env }
  const mockedCreateClient = createClient as jest.MockedFunction<typeof createClient>

  beforeEach(() => {
    process.env = { ...originalEnv }
    jest.clearAllMocks()
  })

  afterEach(() => {
    process.env = { ...originalEnv }
    jest.restoreAllMocks()
  })

  it('creates a client on module init when SUPABASE_URL and SUPABASE_KEY exist', () => {
    const fakeClient = { id: 'client' } as any
    mockedCreateClient.mockReturnValue(fakeClient)
    process.env.SUPABASE_URL = 'https://example.supabase.co'
    process.env.SUPABASE_KEY = 'anon-key'

    const service = new SupabaseService()
    service.onModuleInit()

    expect(mockedCreateClient).toHaveBeenCalledWith('https://example.supabase.co', 'anon-key')
    expect(service.getClient()).toBe(fakeClient)
  })

  it('throws when required env vars are missing', () => {
    delete process.env.SUPABASE_URL
    delete process.env.SUPABASE_KEY
    delete process.env.SUPABASE_SERVICE_ROLE_KEY

    const service = new SupabaseService()

    expect(() => service.onModuleInit()).toThrow(
      'Missing SUPABASE_URL or SUPABASE_KEY / SUPABASE_SERVICE_ROLE_KEY in environment',
    )
  })

  it('logs a warning when falling back to SUPABASE_SERVICE_ROLE_KEY without SUPABASE_KEY', () => {
    const fakeClient = { id: 'service-role-client' } as any
    mockedCreateClient.mockReturnValue(fakeClient)
    process.env.SUPABASE_URL = 'https://example.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role-key'
    delete process.env.SUPABASE_KEY
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    const service = new SupabaseService()
    service.onModuleInit()

    expect(mockedCreateClient).toHaveBeenCalledWith('https://example.supabase.co', 'service-role-key')
    expect(warnSpy).toHaveBeenCalledWith(
      'Using SUPABASE_SERVICE_ROLE_KEY as SUPABASE key — ensure this secret is kept server-side only',
    )
    expect(service.getClient()).toBe(fakeClient)
  })
})
