/** @jest-environment jsdom */

import React, { useEffect } from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'

jest.mock('../lib/supabaseClient', () => {
  const auth = {
    getSession: jest.fn(),
    signInWithPassword: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  }
  const supabase = { auth }
  return {
    __esModule: true,
    supabase,
    default: supabase,
  }
})

import { supabase } from '../lib/supabaseClient'
import { AuthProvider, useAuth } from './AuthContext'

type MockSupabase = {
  auth: {
    getSession: jest.Mock
    signInWithPassword: jest.Mock
    signUp: jest.Mock
    signOut: jest.Mock
    onAuthStateChange: jest.Mock
  }
}

const mockSupabase = supabase as unknown as MockSupabase

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Object.values(mockSupabase.auth).forEach((fn) => fn.mockReset())
  })

  it('throws when useAuth is called outside of AuthProvider', () => {
    const TestComponent = () => {
      useAuth()
      return <div>ok</div>
    }

    expect(() => render(<TestComponent />)).toThrow('useAuth must be used within AuthProvider')
  })

  it('loads the initial session via supabase.auth.getSession', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({
      data: { session: { user: { id: 'user-123' } } },
    })
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    })

    const DisplayUser = () => {
      const { user } = useAuth()
      return <div>{user ? user.id : 'no-user'}</div>
    }

    render(
      <AuthProvider>
        <DisplayUser />
      </AuthProvider>,
    )

    expect(screen.getByText('no-user')).toBeTruthy()
    await waitFor(() => expect(screen.getByText('user-123')).toBeTruthy())
    expect(mockSupabase.auth.getSession).toHaveBeenCalledTimes(1)
    expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledTimes(1)
  })

  it('delegates signIn, signUp, and signOut to Supabase auth methods', async () => {
    mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } })
    mockSupabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    })

    const onReady = jest.fn()

    const CaptureAuth: React.FC<{ notify: (ctx: ReturnType<typeof useAuth>) => void }> = ({
      notify,
    }) => {
      const auth = useAuth()
      useEffect(() => {
        notify(auth)
      }, [auth, notify])
      return null
    }

    render(
      <AuthProvider>
        <CaptureAuth notify={onReady} />
      </AuthProvider>,
    )

    await waitFor(() => expect(onReady).toHaveBeenCalled())
    const auth = onReady.mock.calls[0][0]

    const signInResult = { data: { session: 'signed-in' } }
    mockSupabase.auth.signInWithPassword.mockResolvedValue(signInResult)
    await act(async () => {
      const result = await auth.signIn('a@test.com', 'secret')
      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'a@test.com',
        password: 'secret',
      })
      expect(result).toBe(signInResult)
    })

    const signUpResult = { data: { user: 'new-user' } }
    mockSupabase.auth.signUp.mockResolvedValue(signUpResult)
    await act(async () => {
      const result = await auth.signUp('b@test.com', 'pass123')
      expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
        email: 'b@test.com',
        password: 'pass123',
      })
      expect(result).toBe(signUpResult)
    })

    const signOutResult = { data: { success: true } }
    mockSupabase.auth.signOut.mockResolvedValue(signOutResult)
    await act(async () => {
      const result = await auth.signOut()
      expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1)
      expect(result).toBe(signOutResult)
    })
  })
})
