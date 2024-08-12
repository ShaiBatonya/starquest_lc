// tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  content: string;
  color: string;
  time: number;
  column: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [
    { id: 'task1', content: 'Free Flow', color: '#ED0201', time: 30, column: 'BackLog' },
    { id: 'task2', content: 'Mizam', color: '#06065C', time: 45, column: 'BackLog' },
    { id: 'task3', content: 'Product Refinement', color: '#9747FF', time: 60, column: 'BackLog' },
    { id: 'task4', content: 'Workout', color: '#3F8CFF', time: 120, column: 'BackLog' },
    { id: 'task5', content: 'Free Time', color: '#A80100', time: 15, column: 'BackLog' },
    { id: 'task6', content: 'Learning Session', color: '#002BB5', time: 90, column: 'BackLog' },
    { id: 'task7', content: 'Technical Session', color: '#3F8CFF', time: 30, column: 'BackLog' },
    { id: 'task8', content: 'LinkedIn Session', color: '#9747FF', time: 120, column: 'BackLog' },
    { id: 'task9', content: 'Improvement Session', color: '#ED0201', time: 60, column: 'BackLog' },
    { id: 'task10', content: 'Filling Out a Report', color: '#3F8CFF', time: 15, column: 'BackLog' },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
