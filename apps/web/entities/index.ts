export interface CardTaskProps {
    id: string;
    progressName: string;
    progressNum: number;
    time: string;
    title: string
}
export interface TaskState {
    progressName: string;
    progressNum: number;
    title: string;
}

export interface TaskSliceState {
    tasks: Record<string, TaskState>;
    selectedTaskId: string | null
}
export interface FileState {
  id: string
  name: string
  size: number
  status: "idle" | "uploading" | "success" | "failed"
  progress: number
}

export interface TaskFilesState {
  items: FileState[]
}

export interface User{
  id: string;
  name: string;
  avatar: string
}

export interface MessagesState {
  activeTab: string;
  activeChatId: string | null;
}

export interface ChatWindowProps {
    userId: string;
}

export interface Mentors{
  id: string,
  name: string,
  position: string,
  totalTask: string,
  rating: string,
  reviews: string,
  desreption?: string,
  avatar: string | null
}

export interface CircularProgressProps {
  value?: number 
  size?: number 
}

export interface ExtendedProgressProps extends CircularProgressProps {
  showText?: boolean;
}

export interface SettingsState {
  language: string;
  timezone: string;
  timeFormat: string;
}