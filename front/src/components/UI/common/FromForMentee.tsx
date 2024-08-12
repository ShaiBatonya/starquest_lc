import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, TextField, TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system';
import { getAllUsers, User } from '@/services/GetAllUsersService';

const StyledContainer = styled(Box)(({ }) => ({
  width: '376px',
  height: '794px',
  backgroundColor: '#2E2E2E',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '20px',
}));

const FiltersContainer = styled(Box)({
  backgroundColor: '#242424',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
});

const SearchContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
});

const MenteeList: React.FC = () => {
  const [mentees, setMentees] = useState<User[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getAllUsers();
        setMentees(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }
    fetchData();
  }, []);

  const filteredMentees = mentees.filter(mentee =>
    `${mentee.firstName} ${mentee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledContainer>
      <FiltersContainer>
        <Select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value as string)}
          displayEmpty
          sx={{
            backgroundColor: 'var(--Modal-color, #1D1D1D)',
            color: '#fff',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#444',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#888',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#888',
            },
            '.MuiSvgIcon-root': {
              color: '#fff',
            },
            width: '48%',
          }}
        >
          <MenuItem value=""><em>All Position</em></MenuItem>
          <MenuItem value="Full stack developer">Full stack developer</MenuItem>
          <MenuItem value="Frontend developer">Frontend developer</MenuItem>
          <MenuItem value="Backend developer">Backend developer</MenuItem>
          <MenuItem value="Data Scientist">Data Scientist</MenuItem>
          <MenuItem value="Product Manager">Product Manager</MenuItem>
          <MenuItem value="Automation engineer">Automation engineer</MenuItem>
          <MenuItem value="Data Analyst">Data Analyst</MenuItem>
          <MenuItem value="Solutions Engineer">Solutions Engineer</MenuItem>
          <MenuItem value="Machine Learning Engineer">Machine Learning Engineer</MenuItem>
          <MenuItem value="Finance Manager">Finance Manager</MenuItem>
          <MenuItem value="Digital Marketing Manager">Digital Marketing Manager</MenuItem>
          <MenuItem value="NLP Researcher">NLP Researcher</MenuItem>
          <MenuItem value="R&D Engineer">R&D Engineer</MenuItem>
        </Select>
        <Select
  value={selectedPlanet}
  onChange={(e) => setSelectedPlanet(e.target.value as string)}
  displayEmpty
  sx={{
    backgroundColor: 'var(--Modal-color, #1D1D1D)',
    color: '#fff',
    '.MuiOutlinedInput-notchedOutline': {
      borderColor: '#444',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#888',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#888',
    },
    '.MuiSvgIcon-root': {
      color: '#fff',
    },
    width: '48%',
  }}
>
  <MenuItem value=""><em>All Planet</em></MenuItem>
  <MenuItem value="Nebulae">Nebulae</MenuItem>
  <MenuItem value="Solaris minor">Solaris minor</MenuItem>
  <MenuItem value="Solaris major">Solaris major</MenuItem>
  <MenuItem value="White dwarf">White dwarf</MenuItem>
  <MenuItem value="Supernova">Supernova</MenuItem>
  <MenuItem value="Space station">Space station</MenuItem>
</Select>

      </FiltersContainer>
      <SearchContainer>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            backgroundColor: '#333',
            borderRadius: '4px',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#444',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#888',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#888',
            },
            input: {
              color: '#fff',
            },
            label: {
              color: '#fff',
            },
            width: '80%',
          }}
        />
      </SearchContainer>
      <Box sx={{ display: 'flex', }}>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
      <Typography sx={{ color: '#4285F4', fontWeight: 'bold',fontSize: '40px'}}>
          •
        </Typography>
      </Box>
       <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
       <Typography sx={{ color: '#ffffff', fontWeight: 'bold' }}>
          List of mentees:
        </Typography>
       </Box>
      
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: '#2E2E2E', color: '#ffffff', height: 'calc(100vh - 260px)', width: '100%', overflowX: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableBody>
            {filteredMentees.length > 0 ? (
              filteredMentees.map((mentee) => (
                <TableRow key={mentee._id}>
                  <TableCell component="th" scope="row" sx={{ color: '#ffffff', borderBottom: '1px solid #6D6D6D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {`${mentee.firstName} ${mentee.lastName}`}
                  </TableCell>
                  <TableCell align="right" sx={{ color: '#ffffff', borderBottom: '1px solid #6D6D6D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {mentee.email}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} sx={{ color: '#ffffff', textAlign: 'center' }}>
                  No mentees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
};

export default MenteeList;
