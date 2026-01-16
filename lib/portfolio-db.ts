// Portfolio customization data interface
export interface PortfolioCustomization {
  id?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: string;
  contactEmail?: string;
  contactPhone?: string;
  githubUsername?: string;
  skills?: Array<{ name: string; level: number; category: string }>;
  projects?: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    period: string;
    status: string;
  }>;
  education?: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  experience?: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    website?: string;
    email?: string;
  };
}

// Fetch portfolio customization from Supabase
export async function getPortfolioCustomization(): Promise<PortfolioCustomization | null> {
  try {
    const response = await fetch('/api/portfolio/customization');
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch customization:', error);
    return null;
  }
}

// Save portfolio customization to Supabase
export async function savePortfolioCustomization(
  data: PortfolioCustomization,
  adminToken: string
): Promise<PortfolioCustomization | null> {
  try {
    const response = await fetch('/api/portfolio/customization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Token': adminToken
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save customization');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to save customization:', error);
    throw error;
  }
}
