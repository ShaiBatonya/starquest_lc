import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TuneIcon from '@mui/icons-material/Tune';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AuthContextUser } from '@/context/AuthContextUser';
import { toast } from 'react-toastify';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Menu from '@/assets/Menu.png';
import qoest from '@/assets/qoest.png';
import massage from '@/assets/massage.png';
import ledaerbord from '@/assets/ledaerbord.png';
import campos from '@/assets/campos.png';
import Group from '@/assets/Group.png';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useMediaQuery from '@mui/material/useMediaQuery';
import sidepng from '@/assets/sidepng.png';
import Logo from '@/assets/Logo.png';
import Avatarpng from '@/assets/Avatarpng.png'; // Ensure this path is correct
import { paths } from '@/routes/paths';
import styles from '@/theme/ScrollbarStyles.module.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#1D1D1D',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#1D1D1D',
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  position: 'relative',
}));

const BottomNavigationCustom = styled(BottomNavigation)(({ }) => ({
  backgroundColor: '#1D1D1D',
  height: '88px',
  padding: '16px 0px 0px 0px',
  borderRadius: '20px 0px 0px 0px',
  '& .MuiBottomNavigationAction-root': {
    color: '#FFFFFF',
    '&.Mui-selected': {
      color: '#DD3624',
    },
    '&:hover': {
      backgroundColor: '#0143FF80',
    },
  },
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
    },
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const LogoImage = styled('img')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100px',
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    color: '#fff',
    padding: theme.spacing(2),
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MiniDrawer() {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContextUser);
  const user = useSelector((state: RootState) => state.auth.user);
  const [value, setValue] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const location = useLocation(); // Get the current path
  const [dialogOpen, setDialogOpen] = useState(false); // State for controlling the dialog

  // Handle user logout
  const handleLogout = async () => {
    try {
      const response = await logout();
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.error);
    }
  };

  // Handle dialog open
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const menuItems = [
    { text: 'Dashboard', icon: Menu, path: paths.UserDashboard },
    { text: 'Reports', icon: qoest, path: paths.DailyReports },
    { text: 'Quest', icon: massage, path: paths.UserQuest },
    { text: 'Learning Roadmap', icon: campos, path: paths.LearningRoadmap },
    { text: 'Leader Board', icon: ledaerbord, path: paths.LeaderBoard },
    { text: 'Admin Invite', icon: Group, path: paths.AdminInvite },
    { text: 'Backlog', icon: <AssignmentIcon sx={{ color: 'gray' }} />, path: paths.AdminBacklog },
    { text: 'Mentees Overview', icon: <PeopleIcon sx={{ color: 'gray' }} />, path: paths.MenteesOverview },
    { text: 'Admin Position', icon: <AdminPanelSettingsIcon sx={{ color: 'gray' }} />, path: paths.AdminPosition }, // New menu item
  ];

  return (
    <Box className={`${styles.scrollableContainer} ${styles.customScrollbar}`} sx={{ display: 'flex' }}>
      <CssBaseline />
      {!isSmallScreen && (
        <Drawer variant="permanent" open={open} sx={{ '& .MuiDrawer-paper': { background: '#1D1D1D' } }}>
          <DrawerHeader sx={{ backgroundImage: `url(${sidepng})`, backgroundSize: 'cover', height: '22vh' }}>
            {open && (
              <LogoImage src={Logo} alt="Logo" />
            )}
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{ mt: 1, color: 'white' }}
            >
              {open ? <ChevronLeftIcon /> : <img src={Group} alt="qoest" style={{ width: 30, height: 30 }} />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ borderColor: '#3A3A4D' }} />
          {open && (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 2, marginTop: 3 }}>
              <Avatar alt={`${user?.firstName} ${user?.lastName}`} src={user?.avatar || Avatarpng} sx={{ width: 61, height: 61, marginRight: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography align="center" sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '1.2rem' }}>{user?.firstName} {user?.lastName}</Typography>
                <Typography align="center" sx={{ color: '#FFFFFF', fontSize: '0.9rem' }}>{user?.role}</Typography>
              </Box>
            </Box>
          )}
          <List>
            {open && (
              <Typography variant="subtitle1" sx={{ mr: 3, mt: 2, mb: 3, fontSize: '1.1rem', fontWeight: 'bold', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
                Quick Access
              </Typography>
            )}
            {menuItems.map(({ text, icon, path }, index) => {
              const isActive = location.pathname === path;
              return (
                <ListItem key={text} disablePadding sx={{ display: 'block', marginY: '17px' }}>
                  <ListItemButton
                    component={RouterLink}
                    to={path}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'space-between',
                      alignContent: 'center',
                      px: 2.5,
                      backgroundColor: isActive ? '#DD3624' : 'inherit',
                      '&:hover': {
                        backgroundColor: isActive ? '#DD3624' : index % 2 === 0 ? '#0143FF80' : '#555',
                        transform: 'scale(1.05)',
                        transition: 'all 0.3s ease-in-out',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                      },
                      '&:active': {
                        transform: 'scale(0.95)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : 'auto',
                        ml: open ? 4 : 'auto',
                        color: 'gray',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          color: '#FF5722',
                          transform: 'rotate(360deg)',
                        },
                      }}
                    >
                      {typeof icon === 'string' ? (
                        <img src={icon} alt={text} style={{ width: 20, height: 20 }} />
                      ) : (
                        icon
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider sx={{ borderColor: '#3A3A4D' }} />
          <List>
            {open && (
              <Typography variant="subtitle1" sx={{ mr: 7, mt: 2, mb: 3, fontSize: '1.1rem', fontWeight: 'bold', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
                Account
              </Typography>
            )}
            {open && ['Settings', 'Log Out'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block', marginY: '17px' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'space-between',
                    alignContent: 'center',
                    px: 2.5,
                    '&:hover': {
                      backgroundColor: index % 2 === 0 ? '#DD3624' : '#0143FF80',
                      transform: 'scale(1.05)',
                      transition: 'all 0.3s ease-in-out',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                  }}
                  onClick={text === 'Log Out' ? handleDialogOpen : undefined}
                  component={text === 'Settings' ? RouterLink : 'div'}
                  to={text === 'Settings' ? paths.UserProfile : undefined}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1 : 'auto',
                      ml: open ? 4 : 'auto',
                      color: 'gray',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        color: '#FF5722',
                        transform: 'rotate(360deg)',
                      },
                    }}
                  >
                    {index % 2 === 0 ? <TuneIcon sx={{ color: 'white' }} /> : <LogoutIcon sx={{ color: 'white' }} />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: '#FFFFFF', fontWeight: 'bold', fontSize: '1rem' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      {isSmallScreen && (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigationCustom
            showLabels
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Dashboard"
              icon={<RouterLink to={paths.UserDashboard}><img src={Menu} alt="Menu" style={{ width: 20, height: 20 }} /></RouterLink>}
            />
            <BottomNavigationAction
              label="Reports"
              icon={<RouterLink to={paths.DailyReports}><img src={qoest} alt="qoest" style={{ width: 20, height: 20 }} /></RouterLink>}
            />
            <BottomNavigationAction
              label="Quest"
              icon={<RouterLink to={paths.UserQuest}><img src={massage} alt="massage" style={{ width: 20, height: 20 }} /></RouterLink>}
            />
            <BottomNavigationAction
              label="Learning Roadmap"
              icon={<RouterLink to={paths.LearningRoadmap}><img src={campos} alt="campos" style={{ width: 20, height: 20 }} /></RouterLink>}
            />
            <BottomNavigationAction
              label="Leader Board"
              icon={<RouterLink to={paths.LeaderBoard}><img src={ledaerbord} alt="ledaerbord" style={{ width: 20, height: 20 }} /></RouterLink>}
            />
            <BottomNavigationAction
              label="Settings"
              icon={<RouterLink to={paths.UserProfile}><TuneIcon sx={{ color: 'white' }} /></RouterLink>}
            />
            <BottomNavigationAction
              label="Log Out"
              icon={<LogoutIcon sx={{ color: 'white' }} />}
              onClick={handleDialogOpen}
            />
          </BottomNavigationCustom>
        </Box>
      )}
      <StyledDialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#fff' }}>
          {"Logout Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#fff' }}>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </StyledDialog>
    </Box>
  );
}
