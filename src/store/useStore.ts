import { create } from 'zustand';

export interface Subtitle {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  videoUrl?: string;
  subtitles?: Subtitle[];
  password?: string;
}

interface AppState {
  projects: Project[];
  currentProject: Project | null;
  isRecording: boolean;
  recordingTime: number;
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: Project | null) => void;
  setIsRecording: (is: boolean) => void;
  setRecordingTime: (time: number) => void;
  addProject: (project: Project) => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  addSubtitle: (projectId: string, subtitle: Subtitle) => void;
  updateSubtitle: (projectId: string, subtitleId: string, text: string) => void;
}

export const useStore = create<AppState>((set) => ({
  projects: [],
  currentProject: null,
  isRecording: false,
  recordingTime: 0,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (currentProject) => set({ currentProject }),
  setIsRecording: (isRecording) => set({ isRecording }),
  setRecordingTime: (recordingTime) => set({ recordingTime }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
  removeProject: (id) => set((state) => ({ projects: state.projects.filter(p => p.id !== id) })),
  updateProject: (id, updates) => set((state) => ({
    projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p),
    currentProject: state.currentProject?.id === id ? { ...state.currentProject, ...updates } : state.currentProject
  })),
  addSubtitle: (projectId, subtitle) => set((state) => {
    if (state.currentProject?.id === projectId) {
      const newSubtitles = [...(state.currentProject.subtitles || []), subtitle];
      const updatedProject = { ...state.currentProject, subtitles: newSubtitles };
      return {
        currentProject: updatedProject,
        projects: state.projects.map(p => p.id === projectId ? updatedProject : p)
      };
    }
    return state;
  }),
  updateSubtitle: (projectId, subtitleId, text) => set((state) => {
    if (state.currentProject?.id === projectId) {
      const newSubtitles = (state.currentProject.subtitles || []).map(s => 
        s.id === subtitleId ? { ...s, text } : s
      );
      const updatedProject = { ...state.currentProject, subtitles: newSubtitles };
      return {
        currentProject: updatedProject,
        projects: state.projects.map(p => p.id === projectId ? updatedProject : p)
      };
    }
    return state;
  }),
}));
