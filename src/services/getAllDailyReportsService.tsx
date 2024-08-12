import axiosInstance from "@/config/axiosInstance";

export interface DailyReport {
  mood: { startOfDay: number; endOfDay: number };
  morningRoutine: { routine: string; completed: boolean };
  _id: string;
  userId: string;
  wakeupTime: string;
  dailyGoals: { description: string; completed: boolean }[];
  expectedActivity: { duration: number; category: string }[];
  date: string;
  actualActivity: { duration: number; category: string }[];
  createdAt: string;
  updatedAt: string;
}

export const getAllDailyReportsService = async (): Promise<DailyReport[]> => {
  try {
    const response = await axiosInstance.get('/daily-reports/all');
    console.log('Response data:', response.data); // Log the response data

    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error('Unexpected response data format:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching daily reports:', error);
    throw error;
  }
};
export const getLastDailyReportService = async (): Promise<DailyReport | null> => {
  try {
    const reports = await getAllDailyReportsService();
    
    if (reports.length === 0) {
      console.log('No daily reports found');
      return null;
    }

    // Assuming that the reports are sorted by date, you can return the last one
    const lastReport = reports.reduce((latest, current) => {
      return new Date(latest.createdAt) > new Date(current.createdAt) ? latest : current;
    });

    return lastReport;
  } catch (error) {
    console.error('Error fetching the last daily report:', error);
    throw error;
  }
};