import { useState, useEffect, MouseEvent } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Box, Button, Menu, MenuItem, IconButton, Modal, Typography, Divider, Fade, Backdrop } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getAllDailyReportsService, DailyReport } from '@/services/getAllDailyReportsService';
import { getAllWeeklyReportsService, WeeklyReport } from '@/services/getAllWeeklyReportsService';
import axiosInstance from "@/config/axiosInstance";
import sky from '@/assets/sky.jpeg';
import { Dayjs } from 'dayjs';

type Report = DailyReport | WeeklyReport;

type Dessert = {
  name: string;
  calories: string;
  createdAt: string;
  id: string;
};

function createData(report: Report): Dessert {
  const submittedAt = new Date(report.createdAt);
  const nowDate = new Date();
  const minutesDiff = Math.floor((nowDate.getTime() - submittedAt.getTime()) / (1000 * 60));
  const timeDiffString = minutesDiff < 60 
    ? `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''} ago` 
    : `${Math.floor(minutesDiff / 60)} hour${Math.floor(minutesDiff / 60) !== 1 ? 's' : ''} ago`;

  return {
    name: `Submitted on ${new Date(report.createdAt).toLocaleDateString()}`,
    calories: timeDiffString,
    createdAt: report.createdAt,
    id: 'userId' in report ? report._id : '', 
  };
}

export default function From() {
  const location = useLocation();
  const [rows, setRows] = useState<Dessert[]>([]);
  const [activeButton, setActiveButton] = useState<string>(location.pathname);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedReport, setSelectedReport] = useState<DailyReport | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const pageOptions = [
    { path: '/daily-reports', name: 'Daily Reports', color: '#1976d2' },
    { path: '/weekly-reports', name: 'Weekly Reports', color: '#800080' },
    { path: '/end-of-day-reports', name: 'End of Day Reports', color: '#3F8CFF' }
  ];

  const currentPage = pageOptions.find(option => option.path === location.pathname);
  const reportTypeName = currentPage ? currentPage.name : 'Unknown';
  const reportTypeColor = currentPage ? currentPage.color : '#ffffff';

  const fetchReports = async () => {
    try {
      let reports: Report[] = [];
      if (location.pathname === '/daily-reports' || location.pathname === '/end-of-day-reports') {
        reports = await getAllDailyReportsService();
      } else if (location.pathname === '/weekly-reports') {
        reports = await getAllWeeklyReportsService();
      }
      setRows(reports.map(createData));
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [location.pathname]);

  const handleSort = () => {
    const sortedRows = [...rows].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setRows(sortedRows);
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    setAnchorEl(null);
    handleSort();
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setAnchorEl(null);
    if (date) {
      const filteredRows = rows.filter(row => {
        const rowDate = new Date(row.createdAt).setHours(0, 0, 0, 0);
        const selectedDateTimestamp = date.toDate().setHours(0, 0, 0, 0);
        return rowDate === selectedDateTimestamp;
      });
      setRows(filteredRows);
    } else {
      fetchReports();
    }
  };

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const fetchReportDetails = async (id: string) => {
    try {
      const response = await axiosInstance.get(
        location.pathname === '/weekly-reports'
          ? `/weekly-reports/${id}`
          : `/daily-reports/${id}`
      );
      setSelectedReport(response.data.data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching report details:', error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  const buttonStyle = {
    backgroundColor: reportTypeColor,
    '&:hover': {
      backgroundColor: `${reportTypeColor}90`,
    },
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: '8px',
    boxShadow: '0 3px 5px 2px rgba(63, 81, 181, 0.3)',
  };

  const viewDetailsButtonStyle = {
    ...buttonStyle,
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: '376px',
          height: '794px',
          backgroundColor: '#2E2E2E',
          borderRadius: '8px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          marginRight: '20px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#242424',
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            padding: '8px',
          }}
        >
          <IconButton
            sx={{
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
            onClick={handleMenuOpen}
          >
            <SortIcon /> Sort
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleSortOrderChange('asc')}>Oldest to Newest</MenuItem>
            <MenuItem onClick={() => handleSortOrderChange('desc')}>Newest to Oldest</MenuItem>
            <MenuItem>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                onError={() => setSelectedDate(null)} 
              />
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <TableContainer component={Paper} sx={{ overflow: 'hidden', backgroundColor: '#2E2E2E' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '8px',
                mb: '20px',
                mt: '20px',
              }}
            >
              {pageOptions.map(option => (
                <RouterLink
                  key={option.name}
                  to={option.path}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setActiveButton(option.path)}
                >
                  <Button
                    sx={{
                      borderRadius: '11px',
                      color: '#ffffff',
                      backgroundColor: activeButton === option.path ? option.color : 'transparent',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      padding: '10px 20px',
                      '&:hover': {
                        backgroundColor: activeButton === option.path ? option.color : 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {option.name.split(' ')[0]}
                  </Button>
                </RouterLink>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingRight: '16px',
                color: '#ffffff',
                fontSize: '16px',
                paddingTop: '8px',
                mb: '22px',
              }}
            >
              <Box
                sx={{
                  fontWeight: 'bold',
                  mr: '7px',
                  mb: '2px',
                  width: '12px',
                  height: '12px',
                  backgroundColor: reportTypeColor,
                  borderRadius: '50%',
                  marginLeft: '14px',
                }}
              />
              {reportTypeName}
            </Box>
            <Table sx={{ width: '100%' }} aria-label="simple table">
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" sx={{ color: '#ffffff', borderBottom: '1px solid #6D6D6D', borderTop: '1px solid #6D6D6D', fontSize: '1rem' }}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff', borderBottom: '1px solid #6D6D6D', borderTop: '1px solid #6D6D6D', fontSize: '1rem' }}>
                      {row.calories}
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff', borderBottom: '1px solid #6D6D6D', borderTop: '1px solid #6D6D6D' }}>
                      {row.id && (
                        <Button
                          variant="contained"
                          startIcon={<VisibilityIcon />}
                          sx={viewDetailsButtonStyle}
                          onClick={() => fetchReportDetails(row.id)}
                        >
                          View Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="report-details-title"
          aria-describedby="report-details-description"
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalOpen}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                borderRadius: '12px',
                boxShadow: 24,
                p: 4,
                backgroundImage: `url(${sky})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  color: '#fff',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
                onClick={handleCloseModal}
              >
                <CloseIcon />
              </IconButton>
              {selectedReport ? (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography id="report-details-title" variant="h4" component="h2" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
                      Report Details
                    </Typography>
                    <Typography variant="h4" component="p" sx={{mr: 5, color: '#fff', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '8px 8px', borderRadius: '4px' }}>
                      {new Date(selectedReport.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2, borderColor: '#fff' }} />
                  <Table>
                    <TableBody>
                      {selectedReport.mood && (
                        <>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Mood Start of Day:</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '1.1rem' }}>{selectedReport.mood.startOfDay}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Mood End of Day:</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '1.1rem' }}>{selectedReport.mood.endOfDay}</TableCell>
                          </TableRow>
                        </>
                      )}
                      {selectedReport.morningRoutine && (
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Morning Routine:</TableCell>
                          <TableCell sx={{ color: '#fff', fontSize: '1.1rem' }}>{selectedReport.morningRoutine.routine}</TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Wakeup Time:</TableCell>
                        <TableCell sx={{ color: '#fff', fontSize: '1.1rem' }}>{selectedReport.wakeupTime}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Daily Goals:</TableCell>
                        <TableCell sx={{ color: '#fff', fontSize: '1.1rem' }}>
                          {selectedReport.dailyGoals?.map(goal => (
                            <div key={goal.description}>{goal.description} ({goal.completed ? 'Completed' : 'Not Completed'})</div>
                          ))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Expected Activity:</TableCell>
                        <TableCell sx={{ color: '#fff', fontSize: '1.1rem' }}>
                          {selectedReport.expectedActivity?.map(activity => (
                            <div key={activity.category}>{activity.category} ({activity.duration} mins)</div>
                          ))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#fff', fontSize: '1.1rem' }}>Actual Activity:</TableCell>
                        <TableCell sx={{ color: '#fff', fontSize: '1.1rem' }}>
                          {selectedReport.actualActivity?.map(activity => (
                            <div key={activity.category}>{activity.category} ({activity.duration} mins)</div>
                          ))}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </>
              ) : (
                <Typography sx={{ color: '#fff', fontSize: '1.1rem' }}></Typography>
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
}
