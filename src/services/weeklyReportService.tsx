import axiosInstance from "@/config/axiosInstance";

interface WeeklyRoutine {
  status: boolean;
  details: string;
}

interface AchievedGoals {
  goals: string[];
  shared: boolean;
  status?: boolean;  
  details?: string;  
}

interface FreeTime {
  status: boolean;
  details: string;
}

interface LearningGoalAchievement {
  status: boolean;
  details: string;
}

interface MentorInteraction {
  status: boolean;
  details: string;
}

interface SupportInteraction {
  status: boolean;
  details: string;
}

export interface WeeklyReport {
  moodRating: number;
  moodExplanation: string;
  significantEvent: string;
  newInterestingLearning: string;
  maintainWeeklyRoutine: WeeklyRoutine;
  achievedGoals: AchievedGoals;
  freeTime: FreeTime;
  productProgress: string;
  courseChapter: string;
  learningGoalAchievement: LearningGoalAchievement;
  mentorInteraction: MentorInteraction;
  supportInteraction: SupportInteraction;
  additionalSupport: string;
  openQuestions: string;
}

export const createWeeklyReportService = async (reportData: WeeklyReport): Promise<WeeklyReport> => {
  try {
    const response = await axiosInstance.post('/weekly-reports/', reportData);
    return response.data;
  } catch (error) {
    console.error('Error creating weekly report:', error);
    throw error;
  }
};
