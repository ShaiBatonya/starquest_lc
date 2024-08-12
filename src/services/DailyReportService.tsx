import axiosInstance from '@/config/axiosInstance';
import { setDailyReportId } from '@/redux/reportSlice';
import store from '@/redux/store';

interface Mood {
  startOfDay: number;
}

interface MorningRoutine {
  routine: string;
}

interface DailyGoal {
  description: string;
}

interface ExpectedActivity {
  duration: number;
  category: string;
}

export interface DailyReport {
  wakeupTime: string;
  mood: Mood;
  morningRoutine: MorningRoutine;
  dailyGoals: DailyGoal[];
  expectedActivity: ExpectedActivity[];
}

export const createDailyReportService = async (reportData: DailyReport): Promise<DailyReport> => {
  try {
    const response = await axiosInstance.post('/daily-reports/', reportData);
    const reportId = response.data._id; 
    store.dispatch(setDailyReportId(reportId)); 
    return response.data;
  } catch (error) {
    console.error('Error creating daily report:', error);
    throw error;
  }
};
