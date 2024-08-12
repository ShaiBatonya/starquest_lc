import * as React from 'react';
import { Grid, Box, Card, CardContent, TextField, MenuItem, Typography, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateTask } from '@/redux/tasksSlice'; // Assuming setTasks is not used here
import Lottie from "lottie-react";
import AnimatedData1 from '@/assets/Animation - 1718471778382.json';
import AnimatedData2 from '@/assets/Animation - 1718474429951.json';
import styles from '@/theme/ScrollbarStyles.module.css';
import { useState } from 'react';

// Define Task interface
interface Task {
  id: string;
  content: string;
  color: string;
  time: number;
  column: string;
}

// Time options for TextField select
const timeOptions = [
  { value: 15, label: '15 mins' },
  { value: 30, label: '30 mins' },
  { value: 45, label: '45 mins' },
  { value: 60, label: '60 mins' },
  { value: 90, label: '90 mins' },
  { value: 120, label: '120 mins' },
];

// Styling for column box
const columnStyle = {
  width: '220px',
  height: '509px',
  gap: '10px',
  borderRadius: '12px',
  border: '1px solid #0143FF',
  padding: '10px',
  backgroundColor: 'rgba(30, 30, 30, 0.9)', // Semi-transparent background
  overflowY: 'auto', // Enable vertical scrolling
  margin: '0 10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow to columns
  backdropFilter: 'blur(10px)', // Add blur effect for a frosted glass look
  scrollbarWidth: 'thin',
  scrollbarColor: '#0143FF #1E1E1E',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#0143FF',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#1E1E1E',
  },
};

// Props for BoxColumn component
interface BoxColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (e: React.DragEvent<HTMLDivElement>, columnTitle: string) => void;
}

// BoxColumn component
const BoxColumn: React.FC<BoxColumnProps> = ({ title, tasks, onDrop }) => {
  const dispatch = useDispatch();

  const handleTimeChange = (taskId: string, time: number) => {
    const updatedTask = { ...tasks.find((task) => task.id === taskId), time } as Task;
    dispatch(updateTask(updatedTask));
  };

  return (
    <Box
      component="section"
      sx={columnStyle}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e as React.DragEvent<HTMLDivElement>, title)}
    >
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        color="white"
        sx={{
          fontWeight: 'bold',
         
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '10px',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: '50%',
            margin: '10px auto 0',
            height: '2px',
            backgroundColor: '#0143FF',
          },
        }}
      >
        {title}
      </Typography>
      <Box sx={{ width: '100%' }}>
        {tasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <Card
              draggable
              onDragStart={(e) => e.dataTransfer.setData('task', JSON.stringify(task))}
              sx={{
                backgroundColor: task.color,
                borderRadius: '12px',
                margin: '10px 0',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                cursor: 'grab',
                '&:hover': {
                  boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.32)',
                },
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  width: '100%',
                }}
              >
                <Typography variant="body2" color="white" component="div" sx={{ flex: 1 }}>
                  <strong>{task.content}</strong>
                </Typography>
                <TextField
                  select
                  value={task.time}
                  onChange={(e) => handleTimeChange(task.id, Number(e.target.value))}
                  variant="outlined"
                  size="small"
                  sx={{
                    width: '80px',
                    marginLeft: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '& input': {
                        color: 'white',
                      },
                    },
                    '& .MuiSelect-select': {
                      color: 'white',
                    },
                  }}
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </CardContent>
            </Card>
            {index < tasks.length - 1 && <Divider sx={{ borderColor: '#0143FF' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

const AnimationComponent = ({ show, animationData }: { show: boolean, animationData: any }) => {
  return show ? (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Lottie animationData={animationData} />
    </Box>
  ) : null;
};

// UserQuest component
const UserQuest: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<any>(AnimatedData1);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnTitle: string) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData('task'));
    const updatedTask = { ...droppedTask, column: columnTitle } as Task;
    dispatch(updateTask(updatedTask));

    // Update showAnimation state based on the column title
    if (columnTitle === 'Done') {
      setShowAnimation(true);
      setCurrentAnimation(AnimatedData1);
      setTimeout(() => {
        setCurrentAnimation(AnimatedData2);
        setTimeout(() => setShowAnimation(false), 2000); // Hide animation after 2 seconds
      }, 1000); // Show second animation after 2 seconds
    }
  };

  const columns = ['BackLog', 'To-Do', 'In Progress', 'In Review', 'Done'];

  return (
    <>
      <AnimationComponent show={showAnimation} animationData={currentAnimation} />
      <Grid
        className={`${styles.scrollableContainer} ${styles.customScrollbar}`}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx={{
          pt: '120px',
          pb: '120px',
          backgroundColor: '#000000', 
          height: 'auto',
          overflow: 'hidden',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box
            sx={{
    
              width: '87%',
              height: 'auto',
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              color: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', 
              overflow: 'hidden',
              padding: '50px',
              backdropFilter: 'blur(10px)', 
            }}
          >
            <Box
              sx={{
                pt: '30px',
                display: 'flex',
                justifyItems: 'space-between',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              {columns.map((column) => (
                <BoxColumn
                  key={column}
                  title={column}
                  tasks={tasks.filter((task) => task.column === column)}
                  onDrop={handleDrop}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default UserQuest;
