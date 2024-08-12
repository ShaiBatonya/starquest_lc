import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Goal {
  description: string;
  completed: boolean;
  duration?: number;
}

interface Activity {
  duration: number;
  category: string;
}

interface Report {
  mood: {
    endOfDay: number;
  };
  dailyGoals: Goal[];
  actualActivity: Activity[];
}

interface ReportState {
  dailyReportId: string | null;
  reportSubmitted: boolean;
  lastReportSubmission: Report | null;
}

const initialState: ReportState = {
  dailyReportId: null,
  reportSubmitted: false,
  lastReportSubmission: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setDailyReportId(state, action: PayloadAction<string | null>) {
      state.dailyReportId = action.payload;
    },
    clearDailyReportId(state) {
      state.dailyReportId = null;
    },
    setReportSubmitted(state, action: PayloadAction<boolean>) {
      state.reportSubmitted = action.payload;
    },
    setLastReportSubmission(state, action: PayloadAction<Report | null>) {
  
      state.lastReportSubmission = action.payload;
    },
  },
});

export const { setDailyReportId, clearDailyReportId, setReportSubmitted, setLastReportSubmission } = reportSlice.actions;
export default reportSlice.reducer;
