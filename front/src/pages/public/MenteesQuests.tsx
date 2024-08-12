
import { Box, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import MenteeList from '@/components/UI/common/FromForMentee';
import styles from '@/theme/ScrollbarStyles.module.css';
import Menu from '@/assets/Menu.png';
import qoest from '@/assets/qoest.png';
import massage from '@/assets/massage.png';

const KanbanContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  width: '100%',
  overflowX: 'auto',
}));

const KanbanColumn = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: '#333',
  borderRadius: '8px',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  minHeight: '70vh',
  border: '2px dashed #3b82f6',
}));

const TaskCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#444',
  borderRadius: '8px',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#fff',
  marginBottom: theme.spacing(1),
}));

export default function MenteesQuests(): JSX.Element {
  return (
    <Grid
      className={`${styles.scrollableContainer} ${styles.customScrollbar}`}
      style={{ overflow: 'auto' }}
      container
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="center"
      gap={1}
      alignItems="center"
      sx={{
        pt: '20px',
        pb: '88px',
        backgroundColor: '#000000',
        height: 'auto',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ width: '376px', height: '794px', marginRight: '20px' }}>
        <MenteeList />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', sm: '80%', lg: '60%' },
          height: '794px',
          backgroundColor: '#2E2E2E',
          color: '#ffffff',
          borderRadius: '8px',
          overflow: 'auto',
          '@media (max-width: 1220px)': {
            backgroundColor: '#424648',
          },
        }}
      >
<Box
  sx={{
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    height: '64px',
  }}
>
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#1D1D1D',
      color: '#ffffff',
      '&:hover': { backgroundColor: '#333333' },
      width: '250px',
      height: '52px',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '8px',
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <img src={Menu} alt="Menu" style={{ width: '20px', height: '20px' }} />
    Dashboard
  </Button>
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#1D1D1D',
      color: '#ffffff',
      '&:hover': { backgroundColor: '#333333' },
      width: '167px',
      height: '52px',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '8px',
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <img src={qoest} alt="Reports" style={{ width: '20px', height: '20px' }} />
    Reports
  </Button>
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#ff3d00',
      color: '#ffffff',
      '&:hover': { backgroundColor: '#ff5722' },
      width: '159px',
      height: '52px',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '8px',
      marginRight: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
  >
    <img src={massage} alt="Quest" style={{ width: '20px', height: '20px' }} />
    Quest
  </Button>
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#2264E5',
      color: '#ffffff',
      width: '94px',
      height: '32px',
      textTransform: 'none',
      fontWeight: 'bold',
      borderRadius: '6px',
      padding: '6px 12px',
      boxShadow: '0px 2px 5px 0px #2264E51F, 0px 0px 0px 1px #2264E5, 0px 1px 1px 0px #00000024, 0px 1px 0px 0px #4B85FA inset',
    }}
  >
    + Create
  </Button>
</Box>
       
        <KanbanContainer>
          <KanbanColumn>
            <Typography variant="body1" gutterBottom sx={{ color: '#fff' }}>BackLog</Typography>
            <TaskCard>General tasks</TaskCard>
            <TaskCard>Personal tasks</TaskCard>
          </KanbanColumn>
          <KanbanColumn>
            <Typography variant="body1" gutterBottom sx={{ color: '#fff' }}>To-Do</Typography>
            <TaskCard>Figma course</TaskCard>
          </KanbanColumn>
          <KanbanColumn>
            <Typography variant="body1" gutterBottom sx={{ color: '#fff' }}>In Progress</Typography>
            <TaskCard>Figma course</TaskCard>
          </KanbanColumn>
          <KanbanColumn>
            <Typography variant="body1" gutterBottom sx={{ color: '#fff' }}>In Review</Typography>
            <TaskCard>Figma course</TaskCard>
          </KanbanColumn>
          <KanbanColumn>
            <Typography variant="body1" gutterBottom sx={{ color: '#fff' }}>Done</Typography>
          </KanbanColumn>
        </KanbanContainer>
      </Box>
    </Grid>
  );
}
