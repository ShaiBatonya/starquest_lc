import React, { useState } from 'react';
import {
  Container, Select, MenuItem, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, IconButton, Box
} from '@mui/material';
import { styled } from '@mui/system';
import SettingsIcon from '@mui/icons-material/Settings';

// Styling for the root container
const Root = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: 'rgba(1, 1, 1, 1)',
  minHeight: '100vh',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: theme.spacing(2),
  boxSizing: 'border-box',
}));

// Styling for the content container
const ContentContainer = styled(Container)(({ theme }) => ({
  maxWidth: '90vw', // Make it responsive to viewport width
  width: '100%',
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box',
}));

// Styling for the filters container
const Filters = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '10px',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

// Styling for the search container
const SearchContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
});

// Styling for the table container
const TableContainerStyled = styled(TableContainer)(() => ({
  backgroundColor: '#242424',
  borderRadius: '8px',
  overflowY: 'hidden',
  width: '100%',
  maxHeight: 'calc(100vh - 200px)', // Adjusted max height for a larger table
  boxSizing: 'border-box',
}));

// Styling for the table cells
const TableCellStyled = styled(TableCell)(() => ({
  color: '#fff',
  borderColor: '#fff', // Lighter border color for better visibility
  borderBottom: '1px solid #fff',
  borderRight: '1px solid #fff',
  padding: '24px', // Increased padding for wider and higher cells
  backgroundColor: '#333',
  textAlign: 'center',
  fontSize: '1.25rem', // Increased font size for better visibility
}));

// Styling for the table rows
const TableRowStyled = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#2a2a2a',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#1a1a1a',
  },
}));

// Styling for the status buttons
const StatusButton = styled(Button)<{ status: string }>(({ status }) => ({
  borderRadius: '15px',
  padding: '10px 20px', // Increased padding for better visibility
  color: '#fff',
  margin: '2px',
  fontSize: '1rem', // Increased font size for better visibility
  backgroundColor: {
    'In Progress': '#007bff',
    'Backlog': '#ff5722',
    'To do': '#dc3545',
    'Done': '#28a745',
    'In review': '#6f42c1',
  }[status],
}));

// Styling for the configure button
const ConfigureButton = styled(IconButton)(() => ({
  color: '#000',
  backgroundColor: '#fff',
  border: '1px solid #fff',
  borderRadius: '8px',
  padding: '10px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
}));

// Define the Mentee type
type Mentee = {
  name: string;
  tasks: { [key: string]: string };
};

// Example data for the mentees
const mentees: Mentee[] = [
  { name: 'Ella Michalevich', tasks: { 'Task A': 'In Progress', 'Task B': 'Backlog', 'Task C': 'In Progress', 'Task D': 'To do', 'Task E': 'To do' } },
  { name: 'Shai Batonya', tasks: { 'Task A': 'In review', 'Task B': 'To do', 'Task C': 'Done', 'Task D': 'Backlog', 'Task E': 'Done' } },
  { name: 'Liron Vink', tasks: {} },
  { name: 'Ayelet Norkin', tasks: {} },
];

const MenteesOverview: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string>('');
  const [selectedPosition, setSelectedPosition] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter mentees based on search term
  const filteredMentees = mentees.filter((mentee) =>
    mentee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Root>
      <ContentContainer>
        <Filters>
          <Select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value as string)}
            displayEmpty
            sx={{
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
              width: '200px', // Width for the select input
            }}
          >
            <MenuItem value=""><em>Select Position</em></MenuItem>
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
              width: '200px', // Width for the select input
            }}
          >
            <MenuItem value=""><em>Select Planet</em></MenuItem>
            <MenuItem value="Nebulae">Nebulae</MenuItem>
            <MenuItem value="Solaris minor">Solaris minor</MenuItem>
            <MenuItem value="Solaris major">Solaris major</MenuItem>
            <MenuItem value="White dwarf">White dwarf</MenuItem>
            <MenuItem value="Supernova">Supernova</MenuItem>
            <MenuItem value="Space station">Space station</MenuItem>
          </Select>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
            displayEmpty
            sx={{
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
              width: '200px', // Width for the select input
            }}
          >
            <MenuItem value=""><em>Select Category</em></MenuItem>
            {/* Add your categories here */}
          </Select>
          <ConfigureButton>
            <SettingsIcon />
            <Typography>Configure</Typography>
          </ConfigureButton>
        </Filters>
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
              width: '80%', // Width for the search input
            }}
          />
        </SearchContainer>
        <TableContainerStyled>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCellStyled>Name</TableCellStyled>
                <TableCellStyled align="center">Task A</TableCellStyled>
                <TableCellStyled align="center">Task B</TableCellStyled>
                <TableCellStyled align="center">Task C</TableCellStyled>
                <TableCellStyled align="center">Task D</TableCellStyled>
                <TableCellStyled align="center">Task E</TableCellStyled>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMentees.map((mentee) => (
                <TableRowStyled key={mentee.name}>
                  <TableCellStyled>{mentee.name}</TableCellStyled>
                  {['Task A', 'Task B', 'Task C', 'Task D', 'Task E'].map((task) => (
                    <TableCellStyled align="center" key={task}>
                      {mentee.tasks[task] && (
                        <StatusButton status={mentee.tasks[task]}>
                          {mentee.tasks[task]}
                        </StatusButton>
                      )}
                    </TableCellStyled>
                  ))}
                </TableRowStyled>
              ))}
            </TableBody>
          </Table>
        </TableContainerStyled>
      </ContentContainer>
    </Root>
  );
};

export default MenteesOverview;
