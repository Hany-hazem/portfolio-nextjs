'use client';

import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  User,
  Code,
  Database,
  Server,
  Bot,
  Download,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { fetchGitHubUser, fetchGitHubRepos, getUserSettings, type GitHubUser, type GitHubRepo } from '@/lib/github';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  period: string;
  status: string;
  icon: React.ReactNode;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // GitHub data state
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [githubUsername, setGithubUsername] = useState('Hany-hazem');

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch GitHub data on mount
  useEffect(() => {
    async function loadGitHubData() {
      try {
        setLoading(true);
        setError(null);
        
        // Check for user settings first
        const settings = await getUserSettings();
        const username = settings?.github_username || process.env.NEXT_PUBLIC_GITHUB_USER || 'Hany-hazem';
        setGithubUsername(username);
        
        // Fetch user profile and repos in parallel
        const [user, repos] = await Promise.all([
          fetchGitHubUser(username),
          fetchGitHubRepos(username, { sort: 'updated', per_page: 6 })
        ]);
        
        setGithubUser(user);
        setGithubRepos(repos.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load GitHub data');
      } finally {
        setLoading(false);
      }
    }
    
    loadGitHubData();
  }, []);

  const skills: Skill[] = [
    { name: 'Python', level: 90, category: 'Programming' },
    { name: 'Java', level: 75, category: 'Programming' },
    { name: 'C#', level: 70, category: 'Programming' },
    { name: 'Linux Administration', level: 85, category: 'Systems' },
    { name: 'Windows', level: 80, category: 'Systems' },
    { name: 'Supabase', level: 65, category: 'Database' },
    { name: 'Web Development', level: 75, category: 'Web' },
    { name: 'SaaS Architecture', level: 70, category: 'Web' },
    { name: 'System Automation', level: 85, category: 'Automation' },
    { name: 'Custom Scripting', level: 90, category: 'Automation' },
    { name: 'LM Studio', level: 60, category: 'AI/ML' },
    { name: 'Flask', level: 80, category: 'Frameworks' },
    { name: 'Node.js', level: 75, category: 'Frameworks' }
  ];

  const projects: Project[] = [
    {
      id: 'saas-task-management',
      title: 'SaaS Task Management Application',
      description: 'Currently developing a comprehensive Software as a Service application for task management within a translation company. Features user assignment, task tracking, workflow management, and integrated AI-powered translation capabilities. Includes fine-tuning AI models to translate English books to Arabic with high quality, providing automated translation services within the platform.',
      technologies: ['Python', 'Flask', 'Node.js', 'Supabase', 'AI Fine-tuning', 'Translation AI', 'SaaS Architecture'],
      period: 'Jul 2025 - Present',
      status: 'In Development',
      icon: <Database className="w-6 h-6" />
    },
    {
      id: 'ai-translation-model',
      title: 'AI Translation Model Fine-tuning',
      description: 'Fine-tuning AI models specifically for high-quality English to Arabic book translation. This specialized model focuses on maintaining literary context, cultural nuances, and technical accuracy. The model will be integrated into the SaaS task management platform to provide automated translation services for the translation company.',
      technologies: ['AI Fine-tuning', 'Machine Learning', 'Translation AI', 'Python', 'Natural Language Processing'],
      period: 'Jul 2025 - Present',
      status: 'In Development',
      icon: <Bot className="w-6 h-6" />
    },
    {
      id: 'ai-assistant',
      title: 'AI Personal Assistant Agent',
      description: 'Developing a personal AI assistant with PC access capabilities. Focuses on task automation and intelligent assistance using Python for control and LM Studio for local language model integration.',
      technologies: ['Python', 'LM Studio', 'AI/ML', 'System Integration'],
      period: 'Jul 2025 - Present',
      status: 'In Development',
      icon: <Bot className="w-6 h-6" />
    },
    {
      id: 'home-server',
      title: 'Home Server Setup',
      description: 'Set up and maintained a home server using a repurposed PC, ensuring continuous operation with Linux server management. Demonstrates system administration and server maintenance skills.',
      technologies: ['Linux', 'Server Management', 'System Administration'],
      period: 'Jan 2025 - Present',
      status: 'Active',
      icon: <Server className="w-6 h-6" />
    },
    {
      id: 'youtube-downloader',
      title: 'YouTube Downloader Script',
      description: 'Developed a custom Python script for automated YouTube video downloads, demonstrating proficiency in scripting and task automation with efficient video processing capabilities.',
      technologies: ['Python', 'Automation', 'Scripting'],
      period: 'Aug 2024 - Sep 2024',
      status: 'Completed',
      icon: <Download className="w-6 h-6" />
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const skillCategories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Hani Hazem
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === item.toLowerCase()
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
              {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - continues... */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-teal-900/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-blue-400 mb-4" />
                <p className="text-gray-400">Loading profile...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <p className="text-red-400 mb-2">Failed to load GitHub profile</p>
                <p className="text-gray-500 text-sm">{error}</p>
              </div>
            ) : (
              <>
                {githubUser?.avatar_url && (
                  <div className="mb-6">
                    <img 
                      src={githubUser.avatar_url} 
                      alt={githubUser.name || githubUser.login}
                      className="w-32 h-32 rounded-full mx-auto border-4 border-blue-600 shadow-lg"
                    />
                  </div>
                )}
                <h2 className="text-6xl font-extrabold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                    {githubUser?.name || 'Hani Hazem Elbegermy'}
                  </span>
                </h2>
                <p className="text-2xl text-gray-300 mb-8">
                  {githubUser?.bio || 'Computer Science Student & Tech Enthusiast'}
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-8 text-gray-400">
                  {githubUser?.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{githubUser.location}</span>
                    </div>
                  )}
                  {githubUser?.public_repos !== undefined && (
                    <div className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      <span>{githubUser.public_repos} repositories</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  {githubUser?.html_url && (
                    <a
                      href={githubUser.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                      GitHub Profile
                    </a>
                  )}
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-6 py-3 border border-blue-600 rounded-lg font-semibold hover:bg-blue-600/10 transition-all duration-300"
                  >
                    Get In Touch
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Rest of sections would continue here - About, Skills, Projects, Contact */}
      {/* For brevity, I'll create a simplified version */}
      
      <section id="about" className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <p className="text-lg text-gray-300 text-center">
            Computer Science student passionate about backend development, AI, and system administration.
            Currently exploring SaaS architecture and building practical skills through hands-on projects.
          </p>
        </div>
      </section>

      <section id="skills" className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map(skill => (
              <div key={skill.name} className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-600/20 rounded-lg">{project.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{project.period}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-gray-300 mb-8">
            Interested in collaborating or have a question? Feel free to reach out!
          </p>
          <div className="flex justify-center gap-6">
            {githubUser?.email && (
              <a href={`mailto:${githubUser.email}`} className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                <Mail className="w-6 h-6" />
                Email
              </a>
            )}
            {githubUser?.html_url && (
              <a href={githubUser.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                <Github className="w-6 h-6" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
