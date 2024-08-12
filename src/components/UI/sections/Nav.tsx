import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Avatar from '@mui/material/Avatar';
import Planeticon from '@/assets/Planeticon.png';
import coin from '@/assets/coin.png';
import stargroup from '@/assets/stargroup.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import Mobilelogo from '@/assets/Mobilelogo.png';

import { useLocation } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';

import { paths } from '@/routes/paths';

const transparentAppBarStyle: React.CSSProperties = {
  backgroundColor: '#000000',

  paddingBottom: '12px',
};

const getCurrentPageName = (path: string): string => {
  switch (path) {
    case paths.UserDashboard:
      return 'User Dashboard';
    case paths.UserQuest:
      return 'User Quest';
    case paths.DailyReports:
      return 'Daily Reports';
    case paths.WeeklyReports:
      return 'Weekly Reports';
    case paths.EndOfDayReports:
      return 'End of Day Reports';
    case paths.LeaderBoard:
      return 'Leaderboard';
    case paths.login:
      return 'Login';
    case paths.register:
      return 'Register';
    case paths.forgotpassword:
      return 'Forgot Password';
    case paths.verification:
      return 'Verification';
    case paths.MenteesOverview:
      return 'Mentees Overview';
    case paths.UserProfile:
      return 'User Profile';
    case paths.AdminInvite:
      return 'Admin Invite';
    case paths.AdminBacklog:
      return 'Admin Backlog';
    case paths.LearningRoadmap:
      return 'Learning Roadmap';
      case paths.AdminPosition:
        return 'Admin Position';
    case paths.MenteesQuests:
      return 'MenteesQuests';
    default:
      return 'Unknown Page';
  }
};

export default function ButtonAppBar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageName = getCurrentPageName(currentPath);
  const [, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static" sx={transparentAppBarStyle}>
        <Toolbar>
          {isSmallScreen ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 4, width: '100%', bgcolor: '#000000' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', }}>
                {pageName}
              </Typography>
              <AppBar position="static" sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                      <Avatar alt="Mobile Logo" src={Mobilelogo} sx={{ width: 32, height: 32, mr: 1 }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                      <IconButton
                        size="large"
                        aria-label="open drawer"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                        sx={{ ml: 'auto' }}
                      >
                        <MenuIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </Box>
          ) : (
            <Box sx={{ pb: '10px', mt: '10px', ml: 'auto', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', ml: 22, pt: 6 }}>
                  {pageName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    backgroundColor: '#1D1D1D',
                    borderRadius: '15px',
                    minWidth: '212px',
                    height: '75px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginRight: '10px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    gap: '18px',
                    alignItems: 'center',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                  }}
                >
                  <Box
                    sx={{
                      width: '88px',
                      height: '52px',
                      backgroundColor: '#242424',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '185px',
                    }}
                  >
                    <span style={{ color: '#0049C6' }}>4</span>
                    <Avatar alt="User" src={stargroup} sx={{ ml: '10px', width: 24, height: 24.43 }} />
                  </Box>
                  <Box
                    sx={{
                      width: '88px',
                      height: '52px',
                      backgroundColor: '#242424',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '185px',
                    }}
                  >
                    <span style={{ color: "#FFBF5E" }}>5000</span>
                    <Avatar alt="User" src={coin} sx={{ ml: '10px', width: 24, height: 24.43 }} />
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{
                    backgroundColor: '#1D1D1D',
                    borderRadius: '15px',
                    minWidth: '212px',
                    height: '75px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                  }}
                >
                  <Avatar alt="User" src={Planeticon} sx={{ width: 47, height: 47, mr: '11px' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography sx={{ fontWeight: 'bold' }} variant="body1">Level Status</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mr: 4 }}>Nebula</Typography>
                  </Box>
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                  <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <FileCopyIcon />
                    Duplicate
                  </MenuItem>
                  <Divider sx={{ my: 0.5 }} />
                  <MenuItem onClick={handleClose} disableRipple>
                    <ArchiveIcon />
                    Archive
                  </MenuItem>
                  <MenuItem onClick={handleClose} disableRipple>
                    <MoreHorizIcon />
                    More
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
