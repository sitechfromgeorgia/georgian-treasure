'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isLoading: true,
    error: null,
  });

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    // Check existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user is in admins table
        const { data: adminData } = await supabase
          .from('admins')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        setState({
          user: session.user,
          session,
          isAdmin: !!adminData,
          isLoading: false,
          error: null,
        });
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const { data: adminData } = await supabase
          .from('admins')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        setState({
          user: session.user,
          session,
          isAdmin: !!adminData,
          isLoading: false,
          error: null,
        });
      } else if (event === 'SIGNED_OUT') {
        setState({
          user: null,
          session: null,
          isAdmin: false,
          isLoading: false,
          error: null,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      return false;
    }

    if (data.user) {
      const { data: adminData } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (!adminData) {
        await supabase.auth.signOut();
        setState(prev => ({ ...prev, isLoading: false, error: 'Access denied. Not an admin user.' }));
        return false;
      }

      setState({
        user: data.user,
        session: data.session,
        isAdmin: true,
        isLoading: false,
        error: null,
      });
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      session: null,
      isAdmin: false,
      isLoading: false,
      error: null,
    });
  }, []);

  return { ...state, login, logout };
}
