
import { Box, Card, CardContent, CardHeader, IconButton, Typography, Avatar, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WorkIcon from '@mui/icons-material/Work';

const positions = [
  { title: 'Product manager', color: 'Blue', bgColor: '#1E90FF' },
  { title: 'Fullstack developer', color: 'Blue light', bgColor: '#00BFFF' },
  { title: 'Backend developer', color: 'Yellow', bgColor: '#FFD700' },
  { title: 'Data analyst', color: 'Purple', bgColor: '#9370DB' },
  { title: 'Data scientist', color: 'Red', bgColor: '#FF4500' },
  { title: 'Frontend developer', color: 'Orange', bgColor: '#FFA07A' },
  { title: 'Solutions Engineer', color: 'Light blue', bgColor: '#87CEEB' },
  { title: 'Automation Engineer', color: 'Green', bgColor: '#32CD32' },
  { title: 'Finance Manager', color: 'Gray', bgColor: '#A9A9A9' },
  { title: 'Machine learning Engineer', color: 'Pink', bgColor: '#FFB6C1' }
];

const PositionsPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, backgroundColor: '#000000', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <button style={{ 
            backgroundColor: '#1E90FF', 
            color: '#FFFFFF', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}>+ Create Position</button>
        </Box>
        <Grid container spacing={2}>
          {positions.map((position, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={index}>
              <Card sx={{ backgroundColor: '#2E2E2E', color: '#FFFFFF', borderRadius: '8px', border: '1px solid #2E2E2E', width: '185px', height: '188px' }}>
                <CardHeader
                  avatar={
                    <Box sx={{ width: '48px', height: '48px', bgcolor: position.bgColor, borderRadius: '8px 0px 0px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: position.bgColor }}>
                        <WorkIcon sx={{ color: '#FFFFFF' }} />
                      </Avatar>
                    </Box>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon sx={{ color: '#FFFFFF' }} />
                    </IconButton>
                  }
                  sx={{ backgroundColor: '#1D1D1D' }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {position.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                    Color: {position.color}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PositionsPage;
