
import { Box, Card, CardContent, CardHeader, IconButton, MenuItem, Select, Typography, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import backlog from '@/assets/backlog.png';

const colors = [
  '#1E90FF', '#20B2AA', '#FF4500', '#FFD700', '#32CD32',
  '#FFA07A', '#9370DB', '#3CB371', '#87CEEB', '#FFB6C1'
];

const BacklogPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, backgroundColor: 'rgba(1, 1, 1, 1)', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', maxWidth: 1200 }}>
        <Typography variant="h4" sx={{ color: '#FFFFFF', mb: 2 }}>Backlog</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Select
            defaultValue=""
            displayEmpty
            sx={{ color: '#FFFFFF', borderColor: '#2E2E2E', width: 200 }}
          >
            <MenuItem value="">
              <em>All Position</em>
            </MenuItem>
            <MenuItem value="Position1">Position1</MenuItem>
            <MenuItem value="Position2">Position2</MenuItem>
          </Select>
          <Select
            defaultValue=""
            displayEmpty
            sx={{ color: '#FFFFFF', borderColor: '#2E2E2E', width: 200 }}
          >
            <MenuItem value="">
              <em>All Planets</em>
            </MenuItem>
            <MenuItem value="Planet1">Planet1</MenuItem>
            <MenuItem value="Planet2">Planet2</MenuItem>
          </Select>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} sx={{ backgroundColor: '#2E2E2E', color: '#FFFFFF', borderRadius: '8px 0px 0px 0px', border: '1px solid #2E2E2E', width: '185px', height: '188px' }}>
              <CardHeader
                avatar={
                  <Box sx={{ width: '48px', height: '48.12px', bgcolor: colors[index % colors.length], borderRadius: '8px 0px 0px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar
                      src={backlog}
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: 0,
                      }}
                    />
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
                  Title
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                  Category
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BacklogPage;
