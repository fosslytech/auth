import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// ---------------------------------------------------------------------------
// Delete user
// ---------------------------------------------------------------------------

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const supabaseServerClient = createServerSupabaseClient({ req, res });

  // Fetch logged in user
  const { data: data1, error: error1 } = await supabaseServerClient.auth.getUser();

  // Handle error1
  if (error1 || !data1) return res.status(400).json({ success: false, message: 'No user found' });

  // Delete all user documents
  const { error: error2 } = await supabaseServerClient
    .from('documents')
    .delete()
    .match({ user_id: data1.user.id });

  // Handle error2
  if (error2) return res.status(400).json({ success: false, message: error2.message });

  return res.status(200).json({ success: true, message: 'Your data was successfully removed' });
};
