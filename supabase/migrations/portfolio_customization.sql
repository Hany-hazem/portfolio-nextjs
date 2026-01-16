-- Portfolio Customization Table
CREATE TABLE IF NOT EXISTS portfolio_customization (
  id BIGINT PRIMARY KEY DEFAULT 1,
  hero_title TEXT DEFAULT 'Hani Hazem Elbegermy',
  hero_subtitle TEXT DEFAULT 'Computer Science Student & Tech Enthusiast',
  about_text TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  github_username TEXT DEFAULT 'Hany-hazem',
  skills JSONB DEFAULT '[]'::jsonb,
  projects JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  social_links JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE portfolio_customization ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON portfolio_customization
  FOR SELECT USING (true);

-- Admin update/insert access (requires service role)
CREATE POLICY "Admin update access" ON portfolio_customization
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "Admin insert access" ON portfolio_customization
  FOR INSERT WITH CHECK (auth.role() = 'service_role');
