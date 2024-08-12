import axiosInstance from "@/config/axiosInstance";

export interface WeeklyReport {
  moodRating: number;
  moodExplanation: string;
  significantEvent: string;
  newInterestingLearning: string;
  maintainWeeklyRoutine: {
    status: boolean;
    details: string;
  };
  achievedGoals: {
    goals: string[];
    shared: boolean;
  };
  freeTime: {
    status: boolean;
    details: string;
  };
  productProgress: string;
  courseChapter: string;
  learningGoalAchievement: {
    status: boolean;
    details: string;
  };
  mentorInteraction: {
    status: boolean;
    details: string;
  };
  supportInteraction: {
    status: boolean;
    details: string;
  };
  additionalSupport: string;
  openQuestions: string;
  createdAt: string;
}

export const getAllWeeklyReportsService = async (): Promise<WeeklyReport[]> => {
  try {
    const response = await axiosInstance.get('/weekly-reports/all');
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