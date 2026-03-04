import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic, Video, Settings, Layout, Layers,
  Play, Pause, Download, Save, Plus,
  ChevronRight, Search, Clock, Trash2,
  CheckCircle2, AlertCircle, Sparkles,
  Type, Palette, Sliders, Share2, Crown
} from 'lucide-react';
import { useStore, type Project } from './store/useStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Analytics } from '@vercel/analytics/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'premium' }) => {
  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700',
    ghost: 'bg-transparent hover:bg-zinc-800 text-zinc-400',
    danger: 'bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/20',
    premium: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-indigo-500/20'
  };

  return (
    <button
      className={cn(
        'px-4 py-2 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4', className)} {...props}>
    {children}
  </div>
);

// --- Pages ---

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoggingIn(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoggingIn(false);
      onStart();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-md p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>

              <div className="flex items-center gap-2 mb-8 justify-center">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">easyPodcast</span>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">Welcome back</h2>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    placeholder="••••••••"
                  />
                </div>
                <Button type="submit" className="w-full h-12 mt-4" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <p className="text-center text-sm text-zinc-500 mt-6">
                Don't have an account? <button className="text-emerald-500 hover:underline">Sign up</button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEO Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">easyPodcast</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowLogin(true)} className="text-sm font-medium text-zinc-400 hover:text-white">Login</button>
            <Button onClick={() => setShowLogin(true)}>Get Started Free</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-500/20">
                The Future of Podcast Editing
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                Record. Enhance. Publish. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Automatically.</span>
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Professional-grade podcast recording and AI-powered editing in your browser.
                Get automatic subtitles, audio cleanup, and studio quality in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button onClick={() => setShowLogin(true)} className="h-14 px-8 text-lg w-full sm:w-auto">Start Recording Now</Button>
                <Button variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto">
                  <Play className="w-5 h-5 fill-current" /> Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 px-6 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it Works</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">Three simple steps to professional podcast content.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 -translate-y-1/2 -z-10" />

              {[
                {
                  step: "01",
                  title: "Record",
                  desc: "Start a studio-quality recording session directly in your browser. Invite guests with a single link.",
                  icon: <Mic className="w-6 h-6" />
                },
                {
                  step: "02",
                  title: "AI Enhance",
                  desc: "Our AI automatically generates subtitles, removes background noise, and balances audio levels.",
                  icon: <Sparkles className="w-6 h-6" />
                },
                {
                  step: "03",
                  title: "Export",
                  desc: "Customize your subtitle styles and export your video with burned-in captions ready for social media.",
                  icon: <Download className="w-6 h-6" />
                }
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:border-emerald-500/50 transition-all relative">
                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-4 border-black">
                      {s.step}
                    </span>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 bg-zinc-900/30 border-t border-zinc-800/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">Start for free and upgrade as you grow. Currently in Beta.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Starter",
                  price: "$0",
                  desc: "Perfect for new podcasters",
                  features: ["2 Projects / month", "Basic AI Subtitles", "720p Export", "Community Support"],
                  button: "Get Started",
                  premium: false
                },
                {
                  name: "Pro",
                  price: "$29",
                  desc: "For serious creators",
                  features: ["Unlimited Projects", "Advanced AI Cleanup", "4K Export", "Priority Support", "Custom Branding"],
                  button: "Try Pro Free",
                  premium: true
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  desc: "For large teams",
                  features: ["SSO & Security", "Dedicated Manager", "API Access", "Custom AI Training"],
                  button: "Contact Sales",
                  premium: false
                }
              ].map((p, i) => (
                <Card key={i} className={cn(
                  "p-8 flex flex-col relative overflow-hidden",
                  p.premium ? "border-emerald-500/50 bg-emerald-500/5" : "bg-zinc-900/50"
                )}>
                  {p.premium && (
                    <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-2">{p.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-4xl font-bold">{p.price}</span>
                      {p.price !== "Custom" && <span className="text-zinc-500">/mo</span>}
                    </div>
                    <p className="text-sm text-zinc-400">{p.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={p.premium ? 'primary' : 'secondary'}
                    className="w-full"
                    onClick={() => setShowLogin(true)}
                  >
                    {p.button}
                  </Button>
                </Card>
              ))}
            </div>

            <div className="mt-16 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-center">
              <p className="text-emerald-500 font-medium flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Beta Special: All Pro features are currently free for early adopters!
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">easyPodcast</span>
          </div>
          <p className="text-zinc-500 text-sm">© 2026 easyPodcast. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Dashboard = ({ onHome }: { onHome: () => void }) => {
  const { projects, currentProject, setCurrentProject, addProject, setProjects, removeProject } = useStore();
  const [view, setView] = useState<'list' | 'editor' | 'recorder' | 'templates' | 'settings'>('list');

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Failed to fetch projects:", err));
  }, [setProjects]);

  const createNewProject = async () => {
    const id = Math.random().toString(36).substr(2, 9);
    const password = Math.floor(100000 + Math.random() * 900000).toString();
    const newProject = {
      id,
      name: `Untitled Project ${projects.length + 1}`,
      status: 'draft',
      created_at: new Date().toISOString(),
      password
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        addProject(newProject);
        setCurrentProject(newProject);
        setView('recorder');
      }
    } catch (err) {
      console.error("Failed to create project:", err);
    }
  };

  const loadDemoTemplate = () => {
    const id = "demo-" + Math.random().toString(36).substr(2, 5);
    const demoProject = {
      id,
      name: "Demo: AI Future Podcast",
      status: 'completed',
      created_at: new Date().toISOString(),
      password: "123456",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      subtitles: [
        { id: '1', startTime: 0, endTime: 5, text: "Welcome to the easyPodcast demo." },
        { id: '2', startTime: 5, endTime: 10, text: "This is a sample template to test all features." },
        { id: '3', startTime: 10, endTime: 15, text: "You can edit these subtitles right now!" },
      ]
    };
    addProject(demoProject);
    setCurrentProject(demoProject);
    setView('editor');
  };

  const deleteProject = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Deleting project:", id);

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        console.log("Project deleted successfully");
        removeProject(id);
      } else {
        console.error("Failed to delete project on server");
      }
    } catch (err) {
      console.error("Error in deleteProject:", err);
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 flex flex-col bg-zinc-950">
        <div className="p-6">
          <button
            onClick={onHome}
            className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">easyPodcast</span>
          </button>

          <Button onClick={createNewProject} className="w-full mb-2">
            <Plus className="w-4 h-4" /> New Project
          </Button>
          <Button variant="secondary" onClick={loadDemoTemplate} className="w-full mb-8 text-xs">
            <Sparkles className="w-3 h-3" /> Load Demo Template
          </Button>

          <nav className="space-y-1">
            <button
              onClick={() => setView('list')}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                view === 'list' ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              <Layout className="w-4 h-4" /> Projects
            </button>
            <button
              onClick={() => setView('templates')}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                view === 'templates' ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              <Layers className="w-4 h-4" /> Templates
            </button>
            <button
              onClick={() => setView('settings')}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                view === 'settings' ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
          </nav>
        </div>

        <div className="mt-auto p-4 border-t border-zinc-800">
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">AI Powered</span>
            </div>
            <p className="text-xs text-zinc-400">All features are currently unlocked for the beta.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {view === 'list' && (
          <div className="p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">My Projects</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.length === 0 ? (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-zinc-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                  <p className="text-zinc-500 mb-6">Create your first podcast project to get started.</p>
                  <div className="flex gap-4">
                    <Button onClick={createNewProject}>Create Project</Button>
                    <Button variant="secondary" onClick={loadDemoTemplate}>Load Demo</Button>
                  </div>
                </div>
              ) : (
                projects.map((p) => (
                  <Card key={p.id} className="group cursor-pointer hover:border-zinc-700 transition-all" onClick={() => { setCurrentProject(p); setView('editor'); }}>
                    <div className="aspect-video bg-zinc-800 rounded-xl mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <Button variant="secondary" className="w-full py-2">Open Editor</Button>
                      </div>
                      {p.status === 'processing' && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
                          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2" />
                          <span className="text-xs font-medium">Processing AI...</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold mb-1 group-hover:text-emerald-400 transition-colors">{p.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2m ago</span>
                          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> {p.status}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => deleteProject(e, p.id)}
                        className="p-2 text-zinc-500 hover:text-red-500 transition-colors relative z-20"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {view === 'templates' && (
          <div className="p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-8">Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Default Podcast", desc: "Standard centered subtitles" },
                { name: "Social Media Reel", desc: "Vertical video optimized, bold text" },
                { name: "Interview Mode", desc: "Two speakers, dynamic camera cuts" }
              ].map((t, i) => (
                <Card key={i} className="group cursor-pointer hover:border-emerald-500/50 transition-all text-center p-8">
                  <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-500/20 transition-colors">
                    <Layers className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="font-bold mb-2">{t.name}</h3>
                  <p className="text-sm text-zinc-400 mb-6">{t.desc}</p>
                  <Button variant="secondary" className="w-full group-hover:bg-emerald-600 group-hover:text-white" onClick={loadDemoTemplate}>Use Template</Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === 'settings' && (
          <div className="p-8 overflow-y-auto w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-8">Settings</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-bold flex items-center gap-2 mb-4"><Mic className="w-4 h-4 text-emerald-500" /> Recording Defaults</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Default Microphone</label>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white">
                      <option>System Default Microphone</option>
                      <option>External USB Mic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Default Camera</label>
                    <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white">
                      <option>FaceTime HD Camera</option>
                      <option>Virtual Camera</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold flex items-center gap-2 mb-4"><Palette className="w-4 h-4 text-emerald-500" /> Brand Kit</h3>
                <p className="text-sm text-zinc-400 mb-4">Set your default branding for new projects.</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 border-2 border-white/20" />
                  <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-white/20" />
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-400 cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-red-500/20 bg-red-500/5">
                <h3 className="font-bold text-red-500 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-400/80 mb-4">Permanently delete your account and all projects.</p>
                <Button variant="danger" className="w-full sm:w-auto">Delete Account</Button>
              </Card>
            </div>
          </div>
        )}

        {view === 'recorder' && <Recorder onBack={() => setView('list')} onFinish={() => setView('editor')} onHome={onHome} />}
        {view === 'editor' && <Editor onBack={() => setView('list')} onHome={onHome} />}
      </main>
    </div>
  );
};

const Recorder = ({ onBack, onFinish, onHome }: { onBack: () => void, onFinish: () => void, onHome: () => void }) => {
  const { currentProject, updateProject } = useStore();
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  useEffect(() => {
    async function setup() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    }
    setup();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      if (currentProject) {
        updateProject(currentProject.id, { videoUrl: url });
      }
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinish = async () => {
    if (!currentProject) return;
    if (isRecording) stopRecording();

    // Simulate AI processing start
    try {
      await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'processing' })
      });
      updateProject(currentProject.id, { status: 'processing' });
      onFinish();
    } catch (err) {
      console.error("Failed to update project status:", err);
      onFinish();
    }
  };

  const copyInviteLink = async () => {
    const link = `${window.location.origin}/join/${currentProject?.id || 'session'}?pwd=${currentProject?.password || ''}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
        setToastMessage(`✓ Link copied! Password: ${currentProject?.password || 'None'}`);
      } else {
        // Fallback for non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = link;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setToastMessage(`✓ Link copied! Password: ${currentProject?.password || 'None'}`);
      }
    } catch (err) {
      console.error("Failed to copy link:", err);
      // Even if clipboard fails, show them the link in the toast so they have some feedback
      setToastMessage(`Failed to copy. Link is: ${link}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-950 p-6 relative">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-emerald-500/20 whitespace-nowrap"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onBack} className="text-zinc-400 hover:text-white">Cancel</Button>
          <Button variant="ghost" onClick={onHome} className="p-2 text-zinc-400 hover:text-white" title="Go to Home Page">
            <Mic className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold",
            isRecording ? "bg-red-500/10 border-red-500/50 text-red-500 animate-pulse" : "bg-zinc-900 border-zinc-800 text-zinc-400"
          )}>
            <div className={cn("w-2 h-2 rounded-full", isRecording ? "bg-red-500" : "bg-zinc-600")} />
            {formatTime(time)}
          </div>
          <Button variant="secondary"><Settings className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative border border-zinc-800 shadow-2xl">
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Host (You)
          </div>
        </div>
        <button
          onClick={copyInviteLink}
          className="aspect-video bg-zinc-900 rounded-3xl overflow-hidden relative border border-zinc-800 flex items-center justify-center group hover:bg-zinc-900/80 transition-all"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-zinc-700 transition-colors">
              <Plus className="w-8 h-8 text-zinc-500" />
            </div>
            <p className="text-zinc-400 font-medium">Invite Guest</p>
            <p className="text-xs text-zinc-600 mt-1">Click to copy invite link</p>
          </div>
        </button>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <button className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
            <Mic className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
            <Video className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => isRecording ? stopRecording() : startRecording()}
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-90 shadow-xl",
            isRecording ? "bg-white text-black hover:bg-zinc-200" : "bg-red-600 text-white hover:bg-red-500"
          )}
        >
          {isRecording ? <div className="w-6 h-6 bg-black rounded-sm" /> : <div className="w-8 h-8 bg-white rounded-full" />}
        </button>

        <Button
          variant="primary"
          className="h-12 px-8"
          disabled={time === 0}
          onClick={handleFinish}
        >
          Finish Recording
        </Button>
      </div>
    </div>
  );
};

const Editor = ({ onBack, onHome }: { onBack: () => void, onHome: () => void }) => {
  const { currentProject, updateSubtitle, addSubtitle, updateProject } = useStore();
  const [activeTab, setActiveTab] = useState<'subtitles' | 'style' | 'audio' | 'settings'>('subtitles');
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Export State
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Share Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Style State
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(20);
  const [textColor, setTextColor] = useState('#ffffff');
  const [showBackground, setShowBackground] = useState(true);

  // Audio State
  const [volume, setVolume] = useState(1);
  const [noiseReduction, setNoiseReduction] = useState(50);
  const [aiCleanupEnabled, setAiCleanupEnabled] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  // Use currentProject subtitles or fallback to mock if empty
  const subtitles = currentProject?.subtitles || [
    { id: '1', startTime: 0, endTime: 5, text: "Welcome to the easyPodcast podcast." },
    { id: '2', startTime: 5, endTime: 10, text: "Today we're talking about the future of AI." },
    { id: '3', startTime: 10, endTime: 15, text: "Let's dive into how creators are using these tools." },
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(videoRef.current.currentTime);
        } else {
          setCurrentTime(prev => {
            if (prev >= 15) {
              setIsPlaying(false);
              return 0;
            }
            return prev + 0.1;
          });
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const stepFrame = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + seconds);
      setCurrentTime(videoRef.current.currentTime);
    } else {
      setCurrentTime(prev => Math.max(0, prev + seconds));
    }
  };

  const handleUpdateSubtitle = async (id: string, text: string) => {
    if (!currentProject) return;
    updateSubtitle(currentProject.id, id, text);
    const updatedSubtitles = (currentProject.subtitles || []).map(s => s.id === id ? { ...s, text } : s);
    try {
      await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtitles: updatedSubtitles })
      });
    } catch (err) {
      console.error("Failed to persist subtitle update:", err);
    }
  };

  const handleUpdateProject = async (updates: Partial<Project>) => {
    if (!currentProject) return;
    updateProject(currentProject.id, updates);
    try {
      await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
    } catch (err) {
      console.error("Failed to persist project update:", err);
    }
  };

  const handleExportSRT = () => {
    // Generate standard SRT format
    const srtContent = subtitles.map((s, idx) => {
      const formatTime = (seconds: number) => {
        const date = new Date(seconds * 1000);
        const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mm = String(date.getUTCMinutes()).padStart(2, '0');
        const ss = String(date.getUTCSeconds()).padStart(2, '0');
        const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
        return `${hh}:${mm}:${ss},${ms}`;
      };
      return `${idx + 1}\n${formatTime(s.startTime)} --> ${formatTime(s.endTime)}\n${s.text}\n`;
    }).join('\n');

    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject?.name || 'podcast'}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportVideo = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(0);

    // Mock an export process
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            setToastMessage("✓ Video export completed! (Mock functionality)");
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleShare = async () => {
    const link = `${window.location.origin}/join/${currentProject?.id || 'session'}?pwd=${currentProject?.password || ''}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = link;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setToastMessage(`✓ Link copied! Password: ${currentProject?.password || 'None'}`);
    } catch (err) {
      setToastMessage(`Failed to copy. Link is: ${link}`);
    }
  };

  const activeSubtitle = subtitles.find(s => currentTime >= s.startTime && currentTime <= s.endTime);

  const addNewSubtitle = async () => {
    if (!currentProject) return;
    const lastSub = subtitles[subtitles.length - 1];
    const startTime = lastSub ? lastSub.endTime : 0;
    const newSub = {
      id: Math.random().toString(36).substr(2, 9),
      startTime,
      endTime: startTime + 5,
      text: "New subtitle text..."
    };
    addSubtitle(currentProject.id, newSub);

    const updatedSubtitles = [...(currentProject.subtitles || []), newSub];
    try {
      await fetch(`/api/projects/${currentProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtitles: updatedSubtitles })
      });
    } catch (err) {
      console.error("Failed to persist new subtitle:", err);
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    const ms = Math.floor((s % 1) * 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-zinc-950">
      {/* Left Panel: Navigation/Assets */}
      <div className="w-16 border-r border-zinc-800 flex flex-col items-center py-6 gap-6 bg-zinc-950">
        <button
          onClick={() => setActiveTab('subtitles')}
          className={cn("p-3 rounded-xl transition-colors", activeTab === 'subtitles' ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-500 hover:text-white")}
        >
          <Type className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={cn("p-3 rounded-xl transition-colors", activeTab === 'style' ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-500 hover:text-white")}
        >
          <Palette className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveTab('audio')}
          className={cn("p-3 rounded-xl transition-colors", activeTab === 'audio' ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-500 hover:text-white")}
        >
          <Sliders className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={cn("p-3 rounded-xl transition-colors", activeTab === 'settings' ? "bg-emerald-500/10 text-emerald-500" : "text-zinc-500 hover:text-white")}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onBack} className="p-2 text-zinc-400 hover:text-white" title="Back to Projects">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </Button>
            <Button variant="ghost" onClick={onHome} className="p-2 text-zinc-400 hover:text-white" title="Go to Home Page">
              <Mic className="w-4 h-4" />
            </Button>
            <div className="h-4 w-[1px] bg-zinc-800 mx-2" />
            <h1 className="font-bold">{currentProject?.name}</h1>
            <span className="px-2 py-0.5 bg-zinc-800 rounded text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Draft</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="h-9 px-4 text-sm" onClick={handleShare}><Share2 className="w-4 h-4" /> Share</Button>
            <Button variant="primary" className="h-9 px-4 text-sm relative overflow-hidden" onClick={handleExportVideo} disabled={isExporting}>
              {isExporting && (
                <div
                  className="absolute left-0 top-0 bottom-0 bg-emerald-600/50 transition-all duration-100 ease-linear"
                  style={{ width: `${exportProgress}%` }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {isExporting ? <span className="animate-spin"><Download className="w-4 h-4" /></span> : <Download className="w-4 h-4" />}
                {isExporting ? `Exporting ${exportProgress}%` : "Export"}
              </span>
            </Button>
          </div>
        </div>

        {/* Video Preview */}
        <div className="flex-1 bg-black flex flex-col p-8 relative overflow-hidden">
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-8 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-emerald-500/20 whitespace-nowrap"
              >
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex-1 flex items-center justify-center relative">
            <div className="aspect-video w-full max-w-4xl bg-zinc-900 rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center border border-zinc-800">
              {currentProject?.videoUrl ? (
                <video
                  ref={videoRef}
                  src={currentProject.videoUrl}
                  className="w-full h-full object-contain"
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                />
              ) : (
                <button
                  onClick={togglePlay}
                  className="w-20 h-20 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center transition-all group"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
              )}

              {/* Subtitle Overlay */}
              <AnimatePresence>
                {activeSubtitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-12 left-0 right-0 text-center px-12 pointer-events-none"
                  >
                    <p
                      className={cn(
                        "inline-block px-4 py-2 rounded-lg font-medium border shadow-2xl transition-all",
                        showBackground ? "bg-black/80 backdrop-blur-md border-white/10" : "bg-transparent border-transparent text-shadow-lg"
                      )}
                      style={{
                        fontFamily: fontFamily,
                        fontSize: `${fontSize}px`,
                        color: textColor,
                      }}
                    >
                      {activeSubtitle.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="h-64 border-t border-zinc-800 bg-zinc-950 flex flex-col">
          <div className="h-10 border-b border-zinc-800 flex items-center px-4 justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-zinc-400 hover:text-white"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <div className="flex items-center gap-1 border-l border-zinc-800 pl-4">
                <button
                  onClick={() => stepFrame(-0.1)}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                  title="Back 0.1s"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => stepFrame(0.1)}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                  title="Forward 0.1s"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs font-mono text-zinc-500 ml-2">{formatTime(currentTime)} / 00:15.0</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-zinc-500 hover:text-white"><Search className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex-1 overflow-x-auto p-4 scrollbar-hide">
            <div className="h-full min-w-[2000px] relative">
              {/* Timeline Grid */}
              <div className="absolute inset-0 flex gap-20 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="h-full w-px bg-zinc-800/50" />
                ))}
              </div>

              {/* Subtitle Track */}
              <div className="h-12 flex gap-1 mb-4">
                {subtitles.map((s) => (
                  <div
                    key={s.id}
                    className={cn(
                      "h-full border rounded px-3 flex items-center text-[10px] font-medium truncate cursor-pointer transition-colors",
                      currentTime >= s.startTime && currentTime <= s.endTime
                        ? "bg-emerald-500/40 border-emerald-500 text-white"
                        : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30"
                    )}
                    style={{ width: `${(s.endTime - s.startTime) * 40}px`, marginLeft: s.startTime === 0 ? 0 : 'auto' }}
                  >
                    {s.text}
                  </div>
                ))}
              </div>

              {/* Audio Waveform Placeholder */}
              <div className="h-24 bg-zinc-900/50 rounded-xl border border-zinc-800 flex items-center px-4 gap-0.5 overflow-hidden">
                {Array.from({ length: 200 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-500/40 rounded-full"
                    style={{ height: `${Math.random() * 80 + 10}%` }}
                  />
                ))}
              </div>

              {/* Playhead */}
              <div className="absolute top-0 bottom-0 w-px bg-white z-10 shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ left: `${currentTime * 40}px` }}>
                <div className="w-3 h-3 bg-white rounded-full -ml-1.5 -mt-1.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Controls */}
      <div className="w-80 border-l border-zinc-800 bg-zinc-950 flex flex-col p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'subtitles' && (
            <motion.div
              key="subtitles"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Type className="w-5 h-5 text-emerald-500" /> Subtitles
              </h3>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2 scrollbar-hide">
                {subtitles.map((s) => (
                  <div key={s.id} className="group">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-zinc-500">{s.startTime}s - {s.endTime}s</span>
                      <button className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-500 transition-all"><Trash2 className="w-3 h-3" /></button>
                    </div>
                    <textarea
                      value={s.text}
                      onChange={(e) => handleUpdateSubtitle(s.id, e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[80px] resize-none"
                    />
                  </div>
                ))}
                <Button variant="secondary" onClick={addNewSubtitle} className="w-full py-2 text-xs border-dashed border-zinc-700">
                  <Plus className="w-3 h-3" /> Add Subtitle
                </Button>
              </div>

              <Button variant="secondary" className="mt-6 w-full" onClick={handleExportSRT}><Download className="w-4 h-4" /> Export SRT</Button>
            </motion.div>
          )}

          {activeTab === 'style' && (
            <motion.div
              key="style"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Palette className="w-5 h-5 text-emerald-500" /> Style
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Font Family</label>
                  <select
                    value={fontFamily}
                    onChange={e => setFontFamily(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="JetBrains Mono">JetBrains Mono</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Font Size</label>
                    <span className="text-xs text-zinc-400">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="64"
                    value={fontSize}
                    onChange={e => setFontSize(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Text Color</label>
                  <div className="flex gap-2">
                    {['#ffffff', '#000000', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                      <button
                        key={c}
                        onClick={() => setTextColor(c)}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-transform",
                          textColor === c ? "border-emerald-500 scale-110" : "border-white/10 hover:scale-105 hover:border-white/30"
                        )}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Background</label>
                  <button
                    onClick={() => setShowBackground(!showBackground)}
                    className="w-full flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-colors"
                  >
                    <span className="text-sm">Show Background</span>
                    <div className={cn("w-10 h-5 rounded-full relative transition-colors", showBackground ? "bg-emerald-500" : "bg-zinc-700")}>
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", showBackground ? "right-1" : "left-1")} />
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'audio' && (
            <motion.div
              key="audio"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-500" /> Audio
              </h3>

              <div className="space-y-6">
                <div className={cn("p-4 border rounded-2xl transition-colors", aiCleanupEnabled ? "bg-emerald-500/10 border-emerald-500/30" : "bg-zinc-900/50 border-zinc-800")}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className={cn("w-4 h-4", aiCleanupEnabled ? "text-emerald-500" : "text-zinc-500")} />
                      <span className={cn("text-sm font-bold", aiCleanupEnabled ? "text-emerald-500" : "text-zinc-400")}>AI Audio Cleanup</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">Automatically remove background noise and normalize levels.</p>
                  <Button
                    variant={aiCleanupEnabled ? "secondary" : "primary"}
                    className="w-full py-2 text-xs"
                    onClick={() => setAiCleanupEnabled(!aiCleanupEnabled)}
                  >
                    {aiCleanupEnabled ? "Disable Enhancement" : "Enhance Audio"}
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Volume</label>
                    <span className="text-xs text-zinc-400">{Math.round(volume * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Noise Reduction</label>
                    <span className="text-xs text-zinc-400">{noiseReduction}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={noiseReduction}
                    onChange={e => setNoiseReduction(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-500" /> Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Project Name</label>
                  <input
                    type="text"
                    value={currentProject?.name}
                    onChange={(e) => handleUpdateProject({ name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Guest Password</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentProject?.password}
                      readOnly
                      className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-500"
                    />
                    <Button variant="secondary" onClick={() => handleUpdateProject({ password: Math.floor(100000 + Math.random() * 900000).toString() })}>
                      Regen
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">Export Resolution</label>
                  <select className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm">
                    <option>1080p (Full HD)</option>
                    <option>720p (HD)</option>
                    <option>4K (Ultra HD)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <>
        <LandingPage onStart={() => setStarted(true)} />
        <Analytics />
      </>
    );
  }

  return (
    <>
      <Dashboard onHome={() => setStarted(false)} />
      <Analytics />
    </>
  );
}
