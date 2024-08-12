import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import roadmap from '@/assets/roadmap.jpeg';

import lock from '@/assets/lock.png'; 

const RoadmapCard = styled(Box)(({ theme }) => ({
  width: '266px',
  height: '236px',
  gap: '0px',
  borderRadius: '23px ',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  position: 'relative',
}));

const ImageBox = styled(Box)(({ theme }) => ({
  width: '226px',
  height: '94px',
  gap: '0px',
  borderRadius: '12px',
  backgroundImage: `url(${roadmap})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const LockIcon = styled('img')(({ theme }) => ({
  width: '36px',
  height: '36px',
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),
}));



const LearningRoadmap = () => {
  const roadmapItems = [
    { title: 'Technical sessions', progress: '3/5', completion: '60% Complete', locked: false },
    { title: 'Home assignment', progress: '', completion: '15% Complete', locked: true },
    { title: '200 quality connections', progress: '200/200', completion: '100% Complete', locked: false },
    { title: 'Posts on LinkedIn', progress: '4/5', completion: '80% Complete', locked: false },
    { title: 'Project progress', progress: '', completion: '50% Complete', locked: true },
    { title: 'Advanced LinkedIn profile', progress: '', completion: '75% Complete', locked: false },
    { title: 'Finishing Industry learning level', progress: '', completion: '80% Complete', locked: false },
    { title: 'All starts pitch practice', progress: '', completion: '70% Complete', locked: true },
    { title: 'All starts pitch recording', progress: '', completion: '80% Complete', locked: false },
  ];

  return (
    <Box sx={{ padding: 6, display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(1, 1, 1, 1)', minHeight: '100vh', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', textAlign: 'center', marginBottom: 4 }}>
        CTA for advancing to the next level
      </Typography>
   
      <Box sx={{ maxWidth: '80%', margin: '0 auto' }}>
        <Grid container spacing={3} justifyContent="center">
          {roadmapItems.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <RoadmapCard>
                <ImageBox />
                <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
                {item.progress && (
                  <Typography variant="h5" align="center" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {item.progress}
                  </Typography>
                )}
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                  {item.completion}
                </Typography>
                {item.locked && <LockIcon src={lock} alt="Lock icon" />}
              </RoadmapCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default LearningRoadmap;
