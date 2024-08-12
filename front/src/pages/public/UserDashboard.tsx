import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import { getMonthlyDashboardStatistics } from "@/services/DashbordMonthlyUserService";
import { DashbordWeeklyUserService } from "@/services/DashbordWeeklyUserService";
import { useDrawingArea } from '@mui/x-charts/hooks';
import { BarChart } from '@mui/x-charts/BarChart';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 40,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#A80100',
  },
}));


const UserDashboard: React.FC = () => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };
  interface WeeklyData {
    averageMood: number;
    averageStudyHoursPerWeek: number;
    averageWakeupHour: number;
    goalsAchievedDays: number;
    morningRoutineSuccessRate: number;
    totalDays: number;
  }interface MonthlyData {
    totalStudyHours: number;
    totalExerciseHours: number;
    averageSleepHours: number;
    productivityScore: number;
    totalDays: number;
  }
  const [weeklyData, setWeeklyData] = useState<WeeklyData | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null);
  const [view, setView] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weeklyResponse = await DashbordWeeklyUserService();
        const monthlyResponse = await getMonthlyDashboardStatistics();
        console.log('Weekly response:', weeklyResponse);
        console.log('Monthly response:', monthlyResponse);
        
        if (weeklyResponse.success && weeklyResponse.data.data.dashboardStats) {
          setWeeklyData(weeklyResponse.data.data.dashboardStats[0]);
        }
        if (monthlyResponse.success && monthlyResponse.data.data.dashboardStats) {
          setMonthlyData(monthlyResponse.data.data.dashboardStats[0]);
        }
      } catch (error: any) {
        console.error("Error fetching dashboard data:", error.message);
      }
    };

    fetchData();
  }, []);



  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: 'Jan',
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: 'Fev',
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: 'Mar',
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: 'Apr',
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: 'May',
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      seoul: 144,
      month: 'June',
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      seoul: 319,
      month: 'July',
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      seoul: 249,
      month: 'Aug',
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      seoul: 131,
      month: 'Sept',
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      seoul: 55,
      month: 'Oct',
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      seoul: 48,
      month: 'Nov',
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      seoul: 25,
      month: 'Dec',
    },
  ];


  const chartSetting = {
    yAxis: [
      {
        label: 'rainfall (mm)',
      },
    ],
    series: [{ dataKey: 'seoul', }],
    height: 300,
    sx: {
      [`& .recharts-cartesian-axis-tick-value`]: {
        fill: '#ffffff',
      },
      [`& .recharts-label`]: {
        fill: '#ffffff',


      },
      [`& .recharts-cartesian-axis-line`]: {
        stroke: '#ffffff',
      },
      [`& .recharts-cartesian-axis-tick-line`]: {
        stroke: '#ffffff',
      },
    },
  };
  const data = [
    { value: 5, label: 'Better me' },
    { value: 10, label: 'Learning' },
    { value: 15, label: 'Technical sessions' },
    { value: 50, label: ' Project' },
  ];

  const size = {
    width: 500,
    height: 200,

  };

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

  function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }
  return (
    <>
    <Box sx={{ pt: 6, display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#000000', color: '#ffffff', overflow: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {view === 'weekly' ? 'Weekly Overview' : 'Monthly Overview'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          sx={{
            width: '123px',
            height: '57px',
            padding: '16px 32px',
            gap: '10px',
            borderRadius: '12px',
            backgroundColor: '#800080',
            color: '#FFFFFF',
          }}
          variant="contained"
          onClick={() => setView('weekly')}
        >
          Weekly
        </Button>
        <Button
          sx={{
            width: '123px',
            height: '57px',
            padding: '16px 32px',
            gap: '10px',
            borderRadius: '12px',
            backgroundColor: '#0042FF',
            color: '#FFFFFF',
          }}
          variant="contained"
          onClick={() => setView('monthly')}
        >
          Monthly
        </Button>
      </Box>
    </Box>

    <Grid container spacing={2} sx={{ p: 12, backgroundColor: '#000000' }}>
      <Grid item xs={12} md={8}>
        <Box
          sx={{
            width: '80%',
            height: '428px',
            backgroundColor: '#212121',
            color: '#ffffff',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '100%' }}>
            <BarChart
              dataset={dataset}
              xAxis={[
                { scaleType: 'band', dataKey: 'month' },
              ]}
              {...chartSetting}
            />
          </div>
        </Box>
      </Grid>

      <Grid item xs={12} md={4}>
        <Box
          sx={{
            width: '100%',
            height: '428px',
            backgroundColor: '#212121',
            color: '#ffffff',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" sx={{ marginTop: '20px', color: '#ffffff' }}>
            {view === 'weekly' ? 'Weekly Time Spent' : 'Monthly Time Spent'}
          </Typography>
          <PieChart sx={{ width: '100%', height: '100%', stroke: '#ffffff' }} series={[{ data, innerRadius: 80 }]} {...size}>
            <PieCenterLabel>Center label</PieCenterLabel>
          </PieChart>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{ backgroundColor: 'black', width: '100%', marginTop: '20px' }}>
          {view === 'weekly' && weeklyData && (
            <>
              {['Better me', 'Learning', 'Technical sessions', 'Project', 'Product refinement', 'Networking'].map((panel, index) => (
                <Accordion
                  key={index}
                  sx={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: '12px',
                    justifyContent: 'space-between',
                    backgroundColor: '#FFFFFF26',
                    marginBottom: '20px',
                  }}
                  expanded={expandedAccordion === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Box sx={{ color: '#FFFFFF', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%',p: 2, }}>
                      <Typography sx={{ fontSize: '38px', fontWeight: 700, color: '#FFFFFF' }}>
                        {panel}
                      </Typography>
                      <BorderLinearProgress sx={{ width: '176px', borderRadius: '12px', height: '25px' }} variant="determinate" value={80} />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      color: '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      paddingTop: '16px',
                      paddingBottom: '16px',
                    }}
                  >
                    {[
                      { label: 'Average Mood', value: weeklyData.averageMood },
                      { label: 'Average Study Hours Per Week', value: weeklyData.averageStudyHoursPerWeek },
                      { label: 'Average Wakeup Hour', value: weeklyData.averageWakeupHour },
                      { label: 'Goals Achieved Days', value: weeklyData.goalsAchievedDays },
                      { label: 'Morning Routine Success Rate', value: weeklyData.morningRoutineSuccessRate },
                      { label: 'Total Days', value: weeklyData.totalDays },
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingBottom: '12px',
                          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                      >
                        <Typography sx={{ fontWeight: 800 }}>{item.label}: </Typography>
                        <Box sx={{ display: 'flex', gap: '12px', flexDirection: 'row', mr: '210px' }}>
                          <BorderLinearProgress sx={{ width: '400px', borderRadius: '12px', height: '25px', color: '#002BB5' }} variant="determinate" value={80} />
                          {item.value}
                        </Box>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}

          {view === 'monthly' && monthlyData && (
            <>
              {[
                { label: 'Total Study Hours', value: monthlyData.totalStudyHours },
                { label: 'Total Exercise Hours', value: monthlyData.totalExerciseHours },
                { label: 'Average Sleep Hours', value: monthlyData.averageSleepHours },
                { label: 'Productivity Score', value: monthlyData.productivityScore },
              ].map((item, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}-content`} id={`panel${index + 1}-header`}>
                    <Typography>{item.label}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{item.value}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  </>
  );
};

export default UserDashboard;
