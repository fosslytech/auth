import { showNotification } from '@mantine/notifications';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { AuthResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useGlobalCtx from 'src/store/global/use-global-ctx';
import useFetch from '../use-fetch';

export interface AuthDTO {
  email: string;
  password: string;
}

const handleErrorNotification = (msg: string) => {
  showNotification({
    title: 'Authentication error!',
    message: msg,
    color: 'red',
  });
};

const handleSuccessNotification = (title: string, msg: string) => {
  showNotification({
    title: title,
    message: msg,
    color: 'green',
  });
};

export const useApiAuth = () => {
  const { redirectTo } = useGlobalCtx();

  const { fetchData } = useFetch();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

  // ----------------------------------------------------------------------------
  // SignUp - Email & Password
  // ----------------------------------------------------------------------------

  const auth_signUp = async (dto: AuthDTO) => {
    const { email, password } = dto;
    setLoading(true);

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    setLoading(false);

    if (error) return handleErrorNotification(error.message);

    router.push('/auth/confirm');
  };

  // ----------------------------------------------------------------------------
  // SignOut
  // ----------------------------------------------------------------------------

  const auth_signOut = async () => {
    setLoading(true);

    await supabaseClient.auth.signOut();

    setLoading(false);
  };

  // ----------------------------------------------------------------------------
  // Reset Password
  // ----------------------------------------------------------------------------

  const auth_forgotPassword = async (email: string) => {
    setLoading(true);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_HOST + '/auth/reset',
    });

    setLoading(false);

    if (error) return handleErrorNotification(error.message);

    handleSuccessNotification(
      'Email sent successfully!',
      'Click on the link we sent you to reset your password'
    );
  };

  const auth_resetPassword = async (password: string) => {
    return await supabaseClient.auth.updateUser({ password: password });
  };

  // ----------------------------------------------------------------------------
  // SignIn - Email & Password
  // ----------------------------------------------------------------------------

  const auth_signInWithPassword = async (dto: AuthDTO) => {
    const { email, password } = dto;
    setLoading(true);

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) return handleErrorNotification(error.message);

    window.location.replace(redirectTo);
  };

  // ----------------------------------------------------------------------------
  // SignIn - Magic link
  // ----------------------------------------------------------------------------

  // const auth_signInWithOtp = async (email: string) => {
  //   setLoading(true);

  //   const { error } = await supabaseClient.auth.signInWithOtp({
  //     email,
  //     options: {
  //       emailRedirectTo: process.env.NEXT_PUBLIC_HOST,
  //     },
  //   });

  //   // closeAllModals();
  //   setLoading(false);

  //   if (error) return handleErrorNotification(error.message);

  // handleSuccessNotification(
  //   'Email sent successfully!',
  //   'Click on the link we sent you to reset your password'
  // );
  // };

  // ----------------------------------------------------------------------------
  // SignIn - Provider | GitHub
  // ----------------------------------------------------------------------------

  const auth_signInWithGitHub = async () => {
    supabaseClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo,
      },
    });
  };

  // ----------------------------------------------------------------------------
  // SignIn - Provider | GitLab
  // ----------------------------------------------------------------------------

  const auth_signInWithGitLab = async () => {
    supabaseClient.auth.signInWithOAuth({
      provider: 'gitlab',
      options: {
        redirectTo,
      },
    });
  };

  // ----------------------------------------------------------------------------
  // Delete Account
  // ----------------------------------------------------------------------------

  const auth_deleteAccount = async () => {
    setLoading(true);

    const res = await fetchData('/api/deleteUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.success) return handleErrorNotification(res.message);

    handleSuccessNotification('Account deleted!', res.message);

    setLoading(false);

    router.push('/user/deleted');
  };

  // ----------------------------------------------------------------------------
  // Delete All Documents
  // ----------------------------------------------------------------------------

  const auth_deleteAllDocuments = async () => {
    setLoading(true);

    const res = await fetchData('/api/deleteDocs', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.success) return handleErrorNotification(res.message);

    handleSuccessNotification('Data deleted!', res.message);

    setLoading(false);
  };

  return {
    isLoading,
    auth_signUp,
    auth_signOut,
    auth_signInWithPassword,
    // auth_signInWithOtp,
    auth_signInWithGitHub,
    auth_signInWithGitLab,
    auth_resetPassword,
    auth_forgotPassword,
    auth_deleteAccount,
    auth_deleteAllDocuments,
  };
};
