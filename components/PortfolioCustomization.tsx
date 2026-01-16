'use client';

import { useState, useEffect } from 'react';
import {
  Save,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { PortfolioCustomization, getPortfolioCustomization, savePortfolioCustomization } from '@/lib/portfolio-db';

interface AdminDashboardProps {
  onClose?: () => void;
  adminToken?: string;
}

export default function AdminDashboard({ onClose, adminToken }: AdminDashboardProps) {
  const [customization, setCustomization] = useState<PortfolioCustomization>({
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
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    hero: true,
    about: true,
    skills: false,
    projects: false,
    education: false,
    experience: false,
    social: false
  });

  useEffect(() => {
    loadCustomization();
  }, []);

  const loadCustomization = async () => {
    try {
      setLoading(true);
      const data = await getPortfolioCustomization();
      if (data) {
        setCustomization(data);
      }
    } catch (err) {
      setError('Failed to load customization');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const token = adminToken || sessionStorage.getItem('admin_token') || '';
      await savePortfolioCustomization(customization, token);
      setSuccess('Portfolio updated successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateSkill = (index: number, field: string, value: string | number) => {
    const newSkills = [...(customization.skills || [])];
    newSkills[index] = {
      ...newSkills[index],
      [field]: value
    };
    setCustomization({ ...customization, skills: newSkills });
  };

  const addSkill = () => {
    setCustomization({
      ...customization,
      skills: [...(customization.skills || []), { name: '', level: 50, category: 'Programming' }]
    });
  };

  const removeSkill = (index: number) => {
    setCustomization({
      ...customization,
      skills: customization.skills?.filter((_, i) => i !== index)
    });
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...(customization.projects || [])];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value
    };
    setCustomization({ ...customization, projects: newProjects });
  };

  const addProject = () => {
    setCustomization({
      ...customization,
      projects: [...(customization.projects || []), {
        id: `project-${Date.now()}`,
        title: 'New Project',
        description: '',
        technologies: [],
        period: '',
        status: 'Active'
      }]
    });
  };

  const removeProject = (index: number) => {
    setCustomization({
      ...customization,
      projects: customization.projects?.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Portfolio Customization</h1>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-600 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-900/30 border border-green-600 rounded-lg text-green-300">
          {success}
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('hero')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-bold">Hero Section</h2>
          {expandedSections.hero ? <ChevronUp /> : <ChevronDown />}
        </button>
        {expandedSections.hero && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={customization.heroTitle || ''}
                onChange={(e) => setCustomization({ ...customization, heroTitle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
              <input
                type="text"
                value={customization.heroSubtitle || ''}
                onChange={(e) => setCustomization({ ...customization, heroSubtitle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('about')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-bold">About Section</h2>
          {expandedSections.about ? <ChevronUp /> : <ChevronDown />}
        </button>
        {expandedSections.about && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">About Text</label>
              <textarea
                value={customization.aboutText || ''}
                onChange={(e) => setCustomization({ ...customization, aboutText: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('social')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-bold">Contact & Social</h2>
          {expandedSections.social ? <ChevronUp /> : <ChevronDown />}
        </button>
        {expandedSections.social && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={customization.contactEmail || ''}
                onChange={(e) => setCustomization({ ...customization, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                value={customization.contactPhone || ''}
                onChange={(e) => setCustomization({ ...customization, contactPhone: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GitHub Username</label>
              <input
                type="text"
                value={customization.githubUsername || ''}
                onChange={(e) => setCustomization({ ...customization, githubUsername: e.target.value })}
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={customization.socialLinks?.linkedin || ''}
                  onChange={(e) => setCustomization({
                    ...customization,
                    socialLinks: { ...(customization.socialLinks || {}), linkedin: e.target.value },
                  })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                <input
                  type="url"
                  value={customization.socialLinks?.twitter || ''}
                  onChange={(e) => setCustomization({
                    ...customization,
                    socialLinks: { ...(customization.socialLinks || {}), twitter: e.target.value },
                  })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                <input
                  type="url"
                  value={customization.socialLinks?.facebook || ''}
                  onChange={(e) => setCustomization({
                    ...customization,
                    socialLinks: { ...(customization.socialLinks || {}), facebook: e.target.value },
                  })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                <input
                  type="url"
                  value={customization.socialLinks?.instagram || ''}
                  onChange={(e) => setCustomization({
                    ...customization,
                    socialLinks: { ...(customization.socialLinks || {}), instagram: e.target.value },
                  })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">YouTube</label>
                <input
                  type="url"
                  value={customization.socialLinks?.youtube || ''}
                  onChange={(e) => setCustomization({
                    ...customization,
                    socialLinks: { ...(customization.socialLinks || {}), youtube: e.target.value },
                  })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                <input
                  type="url"
                  value={customization.socialLinks?.website || ''}
                  onChange={(e) => setCustomization({
                    ...customization,
                    socialLinks: { ...(customization.socialLinks || {}), website: e.target.value },
                  })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded text-white focus:border-blue-600 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-bold">Skills ({customization.skills?.length || 0})</h2>
          {expandedSections.skills ? <ChevronUp /> : <ChevronDown />}
        </button>
        {expandedSections.skills && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            {customization.skills?.map((skill, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded space-y-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Skill name"
                      value={skill.name}
                      onChange={(e) => updateSkill(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none focus:border-blue-600"
                    />
                    <input
                      type="text"
                      placeholder="Category"
                      value={skill.category}
                      onChange={(e) => updateSkill(index, 'category', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none focus:border-blue-600"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm text-gray-400 w-10">{skill.level}%</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSkill(index)}
                    className="ml-2 p-2 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addSkill}
              className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-600 rounded hover:border-blue-600 hover:text-blue-400 transition-colors text-gray-400"
            >
              <Plus className="w-4 h-4" />
              Add Skill
            </button>
          </div>
        )}
      </div>

      {/* Projects Section */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('projects')}
          className="w-full flex items-center justify-between p-4 hover:bg-gray-700 transition-colors"
        >
          <h2 className="text-xl font-bold">Projects ({customization.projects?.length || 0})</h2>
          {expandedSections.projects ? <ChevronUp /> : <ChevronDown />}
        </button>
        {expandedSections.projects && (
          <div className="border-t border-gray-700 p-4 space-y-4">
            {customization.projects?.map((project, index) => (
              <div key={project.id} className="bg-gray-900 p-4 rounded space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg">{project.title}</h4>
                  <button
                    onClick={() => removeProject(index)}
                    className="p-2 text-red-400 hover:bg-red-600/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Project title"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none focus:border-blue-600"
                />
                <textarea
                  placeholder="Project description"
                  value={project.description}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none focus:border-blue-600"
                />
                <input
                  type="text"
                  placeholder="Technologies (comma-separated)"
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none focus:border-blue-600"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Period (e.g., Jan 2025 - Present)"
                    value={project.period}
                    onChange={(e) => updateProject(index, 'period', e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none focus:border-blue-600"
                  />
                  <input
                    type="text"
                    placeholder="Status"
                    value={project.status}
                    onChange={(e) => updateProject(index, 'status', e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addProject}
              className="w-full flex items-center justify-center gap-2 py-2 border-2 border-dashed border-gray-600 rounded hover:border-blue-600 hover:text-blue-400 transition-colors text-gray-400"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
