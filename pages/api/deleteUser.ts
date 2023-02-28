import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// ---------------------------------------------------------------------------
// Delete user
// ---------------------------------------------------------------------------

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerAdmin = createServerSupabaseClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_SERVICE_ROLE,
    }
  );

  // Fetch logged in user
  const { data: data1, error: error1 } = await supabaseServerAdmin.auth.getUser();

  // Handle error1
  if (error1 || !data1) return res.status(400).json({ error: true, message: 'No user found', data: null });

  // ---------------------------------------------------------------------------
  // Delete all user documents
  // ---------------------------------------------------------------------------

  const { error: error2 } = await supabaseServerAdmin
    .from('documents')
    .delete()
    .match({ user_id: data1.user.id });

  // Handle error2
  if (error2) return res.status(400).json({ error: true, message: error2.message, data: null });

  // ---------------------------------------------------------------------------
  // Delete all user keys
  // ---------------------------------------------------------------------------

  const { error: error3 } = await supabaseServerAdmin.from('keys').delete().match({ user_id: data1.user.id });

  // Handle error3
  if (error3) return res.status(400).json({ error: true, message: error3.message, data: null });

  // Delete user account
  const { error: error4 } = await supabaseServerAdmin.auth.admin.deleteUser(data1.user.id);

  // Handle error4
  if (error4) return res.status(400).json({ error: true, message: error4.message, data: null });

  return res.status(200).json({ error: false, message: 'Your data was successfully removed', data: null });
};
