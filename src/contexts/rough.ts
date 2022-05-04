import React, { useContext, useState, useEffect, createContext, ReactNode, useCallback } from 'react';
import supabase, { SUPABASE_HELPERS } from '@/lib/client/supabase';
import { useRouter } from 'next/router';
import { AuthSession, User as SupabaseUser } from '@supabase/supabase-js';
import ApiV1, { User } from '@/lib/client/api-v1';
import { UserInfo } from '@/utils/types';
import supabaseClient from '@/lib/client/supabase';

interface AuthContextType {
  isAuthLoading: boolean;
  user: UserInfo | null;
  signIn: () => void;
  signOut: () => Promise<void>;
  signUp: typeof supabaseClient.auth.signUp;
}

const signUp = supabase.auth.signUp;

const getWhalesyncUserByToken = async (token: string): Promise<User | null> => {
  try {
    const user = await ApiV1.getSignedInUser({ token });
    console.log('WS account DOES exists for current supabase user.');
    return user;
  } catch (error) {
    console.log('WS account DOES NOT exists for current supabase user.');
    return null;
  }
};

async function maybeSignUpUser(supabaseInfo: {
  session: AuthSession;
  supabaseUser: SupabaseUser;
}): Promise<{ result: 'success'; user: UserInfo } | { result: 'failure' }> {
  try {
    let wsUser = await getWhalesyncUserByToken(supabaseInfo.session.access_token);
    if (wsUser === null) {
      try {
        wsUser = await SUPABASE_HELPERS.signUp(
          supabaseInfo.session.access_token,
          supabaseInfo.supabaseUser?.user_metadata?.full_name || '',
          supabaseInfo.supabaseUser?.email || ''
        );
        if (wsUser === null) {
          return { result: 'failure' };
        }
      } catch (error) {
        console.error(error);
        return { result: 'failure' };
      }
    }

    const user: UserInfo = {
      displayName: supabaseInfo.supabaseUser?.user_metadata?.full_name || '',
      email: supabaseInfo.supabaseUser?.email || '',
      uid: supabaseInfo.supabaseUser?.id || '',
      whalesyncUser: wsUser
    };

    return { result: 'success', user };
  } catch (error) {
    console.error(error);
    return { result: 'failure' };
  }
}

const AuthContext = createContext<AuthContextType>({
  isAuthLoading: true,
  user: null,
  signIn: SUPABASE_HELPERS.signIn,
  signOut: () => Promise.resolve(),
  signUp
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [user, setUser] = useState<UserInfo | null>(null);
  const [isAuthLoading, setAuthLoading] = useState(true);

  const postSupaAuth = useCallback(() => {
    const session = supabase.auth.session();
    if (!session || !session.user) {
      setAuthLoading(false);
      setUser(null);
      return;
    }
    maybeSignUpUser({ session, supabaseUser: session.user }).then((result) => {
      if (result.result === 'success') {
        setUser(result.user);
        setAuthLoading(false);
        console.log('Signed in with subscription status: ', result.user.whalesyncUser.subscriptionStatus);
      } else {
        router.push('/');
      }
    });
  }, [router]);

  useEffect(() => {
    postSupaAuth();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      postSupaAuth();
    });

    return () => {
      listener?.unsubscribe();
    };
  }, [postSupaAuth]);

  useEffect(() => {
    console.log({ user, isAuthLoading });
  }, [user, isAuthLoading]);

  const signOut = async () => {
    setAuthLoading(true);
    router.push('/');
    await SUPABASE_HELPERS.signOut();
  };

  const value = {
    isAuthLoading,
    signUp,
    signIn: SUPABASE_HELPERS.signIn,
    signOut,
    user
  };

  return <AuthContext.Provider value={value}>{!isAuthLoading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const session = supabase.auth.session();

      if (!session) {
        localStorage.setItem('redirect', window.location.pathname);
        router.push('/');
        return null;
      }
      const { access_token } = session;
      return <WrappedComponent {...props} token={access_token} />;
    }

    return null;
  };
};

export default withAuth;
