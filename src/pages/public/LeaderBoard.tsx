import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Avatar, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import first from '@/assets/first.png';
import second from '@/assets/second.png';
import third from '@/assets/third.png';
import selfi1 from '@/assets/selfi1.png';
import selfi2 from '@/assets/selfi2.png';
import selfi3 from '@/assets/selfi3.png';
import selfi5 from '@/assets/selfi5.png';
import coin from '@/assets/coin.png';
import tableBackground from '@/assets/tablelederbord.jpeg';
import Typography from '@mui/material/Typography';
const rows = [
  { name: 'Ella Griner', position: 'Product Manager', badges: 14, progress: 93, stars: 2000, avatar: selfi1 },
  { name: 'Liron Vinik', position: 'Backend developer', badges: 10, progress: 67, stars: 1500, avatar: selfi2 },
  { name: 'Ayelet Norkin', position: 'Frontend developer', badges: 8, progress: 53, stars: 1300, avatar: selfi3 },
  { name: 'Kitty Boyd', position: 'Data Scientist', badges: 6, progress: 40, stars: 1200, avatar: selfi5 },
  { name: 'Alona Shaul', position: 'Full stack developer', badges: 5, progress: 33, stars: 1100, avatar: selfi5 },
  { name: 'Daniel Dayan', position: 'Automation engineer', badges: 7, progress: 47, stars: 1000, avatar: selfi5 },
];

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
  width: '80%',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#525C67',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
}));

const StyledTableContainer = styled(TableContainer)(() => ({
  backgroundImage: `url(${tableBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '12px',
  boxShadow: ' 4px 20px rgba(0, 0, 0, 0.5)',
  overflow: 'hidden',
  padding: '20px',
  maxWidth: '1400px',
  margin: '40px auto',
}));

const StyledTableCell = styled(TableCell)(() => ({
  backgroundColor: 'rgba(36, 49, 52, 0.5)',
  borderRadius: '10px',
  padding: '16px',
  color: '#FFFFFF',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
  '&:not(:last-child)': {
    borderRight: `1px solid rgba(255, 255, 255, 0.1)`,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': { transform: 'scale(1.02)', transition: '0.3s' },
  marginBottom: '15px',
  '& td': {
    borderBottom: 0,
  },
}));

const RankImage: React.FC<{ index: number }> = ({ index }) => {
  const images = [first, second, third];
  return index < 3 ? (
    <img src={images[index]} alt={`Rank ${index + 1}`} style={{ width: '40px' }} />
  ) : (
    <Typography variant="h6" sx={{ color: '#FFD700' }}>{index + 1}</Typography>
  );
};

const PlayerCell: React.FC<{ row: typeof rows[0] }> = ({ row }) => (
  <StyledTableCell>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar src={row.avatar} alt={row.name} sx={{ width: 56, height: 56, border: '2px solid #FFD700' }} />
      <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold' }}>{row.name}</Typography>
    </Box>
  </StyledTableCell>
);

const LeaderboardTable: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000', }}>
      <Paper sx={{ borderRadius: '12px', overflow: 'hidden', padding: '20px', boxShadow: ' 4px 20px rgba(0, 0, 0, 0.5)', maxWidth: '1400px', width: '100%', background: 'transparent' }}>
        <StyledTableContainer>
          <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 15px' }} aria-label="leaderboard table">
            <TableHead>
              <TableRow>
                {['Ranking', 'Player', 'Position', 'Badges', 'Progress', 'Stars'].map((title, index) => (
                  <StyledTableCell key={index}>{title}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <RankImage index={index} />
                  </StyledTableCell>
                  <PlayerCell row={row} />
                  <StyledTableCell><Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold' }}>{row.position}</Typography></StyledTableCell>
                  <StyledTableCell><Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold' }}>{row.badges}</Typography></StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <BorderLinearProgress variant="determinate" value={row.progress} />
                      <Typography variant="body2" sx={{ color: '#FFFFFF', ml: 2, fontSize: '18px', fontWeight: 'bold' }}>{`${row.progress}/15`}</Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold' }}>{row.stars}</Typography>
                      <img src={coin} alt="Stars" style={{ width: 24, height: 24 }} />
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </Paper>
    </Box>
  );
};

export default LeaderboardTable;
