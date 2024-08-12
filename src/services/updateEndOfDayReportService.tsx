import axiosInstance from '@/config/axiosInstance';

export interface EndOfDayReportUpdates {
  mood?: { endOfDay: number };
  dailyGoals?: { description: string; completed: boolean }[];
  actualActivity?: { duration: number; category: string }[];
}

export const updateEndOfDayReportService = async (reportId: string, updates: EndOfDayReportUpdates): Promise<any> => {
  try {
    const response = await axiosInstance.patch(`/daily-reports/end-of-day-report/${reportId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating end-of-day report:', error);
    throw error;
  }
};
