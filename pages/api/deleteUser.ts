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
  if (error1) return res.status(400).json({ success: false, message: 'No user found' });

  // Delete user account
  const { data: data2, error: error2 } = await supabaseServerAdmin.auth.admin.deleteUser(data1.user.id);

  // Handle error2
  if (error2) return res.status(400).json({ success: false, message: error2.message });

  return res.status(200).json({ success: true, message: 'Your data was successfully removed' });
};
