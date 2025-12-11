// LocalStorage service for project data

export interface TestCase {
  id: string;
  title: string;
  filename: string;
  content: string;
  createdAt: string;
  commitHash: string;
  status: 'COMMITTED' | 'PLANNED';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  projectType: 'new' | 'existing';
  repoUrl: string;
  branch: string;
  gitUsername: string;
  gitEmail: string;
  gitToken: string;
  testFolder: string;
  baseUrl: string;
  testLanguage: string;
  defaultBrowser: string;
  timeout: string;
  retries: string;
  screenshots: string;
  headless: string;
  videoRecording: string;
  createdAt: string;
  updatedAt: string;
  testCases: TestCase[];
}

const STORAGE_KEY = 'pv_projects';

export function getProjects(): Project[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getProject(id: string): Project | undefined {
  const projects = getProjects();
  return projects.find(p => p.id === id);
}

export function saveProject(project: Project): void {
  const projects = getProjects();
  const existingIndex = projects.findIndex(p => p.id === project.id);
  
  if (existingIndex >= 0) {
    projects[existingIndex] = { ...project, updatedAt: new Date().toISOString() };
  } else {
    projects.push(project);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function addTestCaseToProject(projectId: string, testCase: TestCase): void {
  const projects = getProjects();
  const project = projects.find(p => p.id === projectId);
  
  if (project) {
    project.testCases.push(testCase);
    project.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function generateCommitHash(): string {
  return Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}
