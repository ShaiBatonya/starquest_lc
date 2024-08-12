import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, TextField } from '@mui/material';
import { getAllUsersService, inviteUserService } from '@/services/userService';
import { styled } from '@mui/material/styles';
import { User } from '@/typings/IndexTypes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

const StyledTableCell = styled(TableCell)(() => ({
  color: '#FFFFFF',
  fontWeight: 'bold',
  borderBottom: 'none',
  fontSize: '16px',
  backgroundColor: '#2E2E2E',
}));

const FirstRowTableCell = styled(TableCell)(() => ({
  color: '#FFFFFF',
  fontWeight: 'bold',
  borderBottom: 'none',
  fontSize: '16px',
  backgroundColor: '#6272A4',  
  height: '40px',
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:hover': {
    backgroundColor: '#2E2E2E',
  },
}));

const ActionIconButton = styled(IconButton)(() => ({
  color: 'transparent',
  p: 0,
  ml: 1,
}));

const ActionAvatar = styled(Avatar)(() => ({
  width: 32,
  height: 32,
}));

const UserTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsersService();
        setUsers(response);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.email));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLInputElement>, email: string) => {
    if (event.target.checked) {
      setSelectedUsers((prevSelected) => [...prevSelected, email]);
    } else {
      setSelectedUsers((prevSelected) => prevSelected.filter((userEmail) => userEmail !== email));
    }
  };

  const handleInviteUsers = async () => {
    try {
      await Promise.all(selectedUsers.map((email) => inviteUserService(email)));
      alert('Invitations sent successfully');
    } catch (error) {
      console.error('Failed to send invitations:', error);
    }
  };

  const filteredUsers = users.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#000', minHeight: '100vh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%', maxWidth: 1200 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: '4px', px: 1 }}>
          <IconButton sx={{ color: '#000' }}>
            <FilterListIcon />
          </IconButton>
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              sx: { color: '#000' },
              style: { border: 'none' }
            }}
            sx={{
              backgroundColor: '#FFFFFF',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        </Box>
        <Button variant="contained" sx={{ backgroundColor: '#1E88E5', color: '#FFFFFF', width: '120px', height: '40px', padding: '10px 16px', borderRadius: '8px' }} onClick={handleInviteUsers}>
          + Invite
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: '#000', width: '100%', maxWidth: 1200 }}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <FirstRowTableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  sx={{ color: '#BB86FC', '&.Mui-checked': { color: '#BB86FC' } }}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                  checked={users.length > 0 && selectedUsers.length === users.length}
                  onChange={handleSelectAll}
                />
              </FirstRowTableCell>
              <FirstRowTableCell>EMAIL</FirstRowTableCell>
              <FirstRowTableCell>ACCOUNT TYPE</FirstRowTableCell>
              <FirstRowTableCell>POSITION</FirstRowTableCell>
              <FirstRowTableCell>PLANET</FirstRowTableCell>
              <FirstRowTableCell>STATUS</FirstRowTableCell>
              <FirstRowTableCell>ACTION</FirstRowTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <StyledTableRow key={user.email}>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    sx={{ color: '#BB86FC', '&.Mui-checked': { color: '#BB86FC' } }}
                    checked={selectedUsers.includes(user.email)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectUser(e, user.email)}
                  />
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>{user.role}</StyledTableCell>
                <StyledTableCell>{user.position || ''}</StyledTableCell>
                <StyledTableCell>{user.planet || ''}</StyledTableCell>
                <StyledTableCell>{user.status || ''}</StyledTableCell>
                <StyledTableCell>
                  <ActionIconButton>
                    <ActionAvatar sx={{ bgcolor: '#2D9CDB' }}>
                      <EditIcon fontSize="small" />
                    </ActionAvatar>
                  </ActionIconButton>
                  <ActionIconButton>
                    <ActionAvatar sx={{ bgcolor: '#EB5757' }}>
                      <DeleteIcon fontSize="small" />
                    </ActionAvatar>
                  </ActionIconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
