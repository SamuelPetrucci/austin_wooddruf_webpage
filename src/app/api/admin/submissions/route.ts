import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create service role client for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('austin_woodruff_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ data, error: null });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { data: null, error: error instanceof Error ? error.message : 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, status } = await request.json();

    const { error } = await supabaseAdmin
      .from('austin_woodruff_submissions')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update submission' },
      { status: 500 }
    );
  }
}
