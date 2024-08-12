export * from './LanguageButtonProps';
export * from './FormValues';
export * from './NavItems';
export * from './AuthProvider';
export * from './AuthResponses';

export interface ErrorResponse {
  error: string;
}

export interface AuthContextUserProps {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<{ success: boolean; message: string }>;
  register: (values: any) => Promise<{ success: boolean; message: string }>;
  forgot: (user_email: string) => Promise<{ success: boolean; message: string }>;
  verifyEmailCode: (code: string, email: string) => Promise<{ success: boolean; message: string }>;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  position?: string; 
  planet?: string; 
  status?: string; 
  avatar?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  customerToken: string;
  user?: User;
}

export interface DailyReportData {
  wakeupTime: string;
  mood: {
    startOfDay: number;
    endOfDay: number;
  };
  morningRoutine: {
    routine: string;
    completed: boolean;
  };
  dailyGoals: {
    description: string;
    completed: boolean;
  }[];
  expectedActivity: {
    duration: number;
    category: string;
  }[];
  actualActivity: {
    duration: number;
    category: string;
  }[];
}

export interface FormValues {
  wakeupTime: string;
  mood: {
    startOfDay: number;
    endOfDay: number;
  };
  morningRoutine: {
    routine: string;
    completed: boolean;
  };
  dailyGoals: {
    description: string;
    completed: boolean;
  }[];
  expectedActivity: {
    duration: number;
    category: string;
  }[];
  actualActivity: {
    duration: number;
    category: string;
  }[];
}
