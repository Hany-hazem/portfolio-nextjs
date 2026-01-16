import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminPassword = 'portfolio2026'; // In production, use env variable

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}

const supabase = createClient(supabaseUrl, supabaseKey || '');
const supabaseAdmin = serviceRoleKey 
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;

// Convert snake_case DB columns to camelCase
function dbToClient(data: any) {
  if (!data) return null;
  return {
    id: data.id,
    heroTitle: data.hero_title,
    heroSubtitle: data.hero_subtitle,
    aboutText: data.about_text,
    contactEmail: data.contact_email,
    contactPhone: data.contact_phone,
    githubUsername: data.github_username,
    skills: data.skills || [],
    projects: data.projects || [],
    education: data.education || [],
    experience: data.experience || [],
    socialLinks: data.social_links || {}
  };
}

// Convert camelCase to snake_case for DB
function clientToDb(data: any) {
  return {
    id: 1,
    hero_title: data.heroTitle,
    hero_subtitle: data.heroSubtitle,
    about_text: data.aboutText,
    contact_email: data.contactEmail,
    contact_phone: data.contactPhone,
    github_username: data.githubUsername,
    skills: data.skills || [],
    projects: data.projects || [],
    education: data.education || [],
    experience: data.experience || [],
    social_links: data.socialLinks || {},
    updated_at: new Date().toISOString()
  };
}

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

    // Convert to camelCase and return with defaults
    const customization = dbToClient(data) || {
      id: 1,
      heroTitle: 'Hani Hazem Elbegermy',
      heroSubtitle: 'Computer Science Student & Tech Enthusiast',
      aboutText: 'Passionate about backend development, AI, and system administration',
      contactEmail: 'contact@example.com',
      githubUsername: 'Hany-hazem',
      skills: [],
      projects: [],
      education: [],
      experience: [],
      socialLinks: {}
    };

    return NextResponse.json(customization);
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
    if (!token || token !== adminPassword) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid admin token' },
        { status: 401 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Admin client not configured' },
        { status: 500 }
      );
    }

    const clientData = await request.json();
    
    // Convert camelCase to snake_case for database
    const dbData = clientToDb(clientData);

    // Upsert the customization data
    const { data: result, error } = await supabaseAdmin
      .from('portfolio_customization')
      .upsert(dbData, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to save customization' },
        { status: 500 }
      );
    }

    // Convert back to camelCase for response
    return NextResponse.json(dbToClient(result));
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
