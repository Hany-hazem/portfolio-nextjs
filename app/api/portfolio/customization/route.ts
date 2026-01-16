import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminToken = process.env.ADMIN_API_SECRET;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

const supabase = createClient(supabaseUrl, supabaseKey || '');
const supabaseAdmin = serviceRoleKey 
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

export async function GET(request: NextRequest) {
  try {
    const client = supabaseAdmin || supabase;
    
    const { data, error } = await client
      .from('portfolio_customization')
      .select('*')
      .eq('id', 1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch customization' },
        { status: 500 }
      );
    }

    // Return default customization if not found
    return NextResponse.json(data || {
      id: 1,
      heroTitle: 'Hani Hazem Elbegermy',
      heroSubtitle: 'Computer Science Student & Tech Enthusiast',
      aboutText: 'Passionate about backend development, AI, and system administration',
      contactEmail: 'contact@example.com',
      githubUsername: 'Hany-hazem'
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.headers.get('x-admin-token');
    if (!token || token !== adminToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      );
    }

    const data = await request.json();

    // Upsert the customization data
    const { data: result, error } = await supabaseAdmin
      .from('portfolio_customization')
      .upsert(
        {
          id: 1,
          ...data,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to save customization' },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
