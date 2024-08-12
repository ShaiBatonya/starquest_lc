import Box from '@mui/material/Box';
import From from '@/components/UI/common/From';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import sad from '@/assets/sad.png';
import smile from '@/assets/smile.png';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { Checkbox } from '@mui/material';
import styles from '@/theme/ScrollbarStyles.module.css';
import { z, ZodError } from 'zod';
import Divider from '@mui/material/Divider';
import lockeditem from '@/assets/lockeditem.png';
import Success from '@/assets/Success.png';
import backgroundImage1 from '@/assets/backgroundImage1.jpeg';
import reportstate from '@/assets/reportstate.png';
import { Formik, Form } from 'formik';

import { updateEndOfDayReportService } from '@/services/updateEndOfDayReportService';
import { getLastDailyReportService } from '@/services/getAllDailyReportsService';

export const schema = z.object({
  mood: z.object({
    endOfDay: z.number().min(1, 'End of day mood must be between 1 and 5').max(5, 'End of day mood must be between 1 and 5'),
  }),
  dailyGoals: z.array(
    z.object({
      description: z.string().nonempty('Description cannot be empty'),
      completed: z.boolean(),
    })
  ),
  actualActivity: z.array(
    z.object({
      duration: z.number().min(0, 'Duration must be a positive number'),
      category: z.string().nonempty('Category cannot be empty'),
    })
  ),
});

const EndOfDayReports = (): JSX.Element => {

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [redirectToBackground] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [radioErrors, setRadioErrors] = useState<Record<string, string>>({});
  const [inputs, setInputs] = useState({
    mood: { endOfDay: 0 },
    dailyGoals: [{ description: '', completed: false }],
    actualActivity: [{ duration: 0, category: '' }],
  });
  const [dailyReportId, setDailyReportId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastDailyReport = async () => {
      try {
        const lastDailyReport = await getLastDailyReportService();
        if (lastDailyReport) {
          setDailyReportId(lastDailyReport._id);
          setInputs({
            mood: { endOfDay: lastDailyReport.mood.startOfDay },
            dailyGoals: lastDailyReport.dailyGoals.map((goal: any) => ({ ...goal, completed: false })),
            actualActivity: lastDailyReport.expectedActivity,
          });
        }
      } catch (error) {
        console.error('Error fetching last daily report:', error);
      }
    };

    fetchLastDailyReport();
  }, []);

  const validateRadioInputs = () => {
    const radioFieldErrors: Record<string, string> = {};

    if (!inputs.mood.endOfDay) {
      radioFieldErrors['mood'] = 'Please select an option for mood';
    }

    inputs.dailyGoals.forEach((goal, index) => {
      if (!goal.description.trim()) {
        radioFieldErrors[`dailyGoals[${index}].description`] = 'Description cannot be empty';
      }
    });

    inputs.actualActivity.forEach((activity, index) => {
      if (activity.duration <= 0) {
        radioFieldErrors[`actualActivity[${index}].duration`] = 'Duration must be a positive number';
      }
      if (!activity.category.trim()) {
        radioFieldErrors[`actualActivity[${index}].category`] = 'Category cannot be empty';
      }
    });

    setRadioErrors(radioFieldErrors);
    return Object.keys(radioFieldErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      let current: any = newInputs;
      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newInputs;
    });

    setErrors((prev) => ({ ...prev, [name]: '' }));
    setRadioErrors((prev) => ({ ...prev, [name.split('.')[0]]: '' }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      mood: { ...prevInputs.mood, endOfDay: Number(value) },
    }));

    setRadioErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleKeyUp = (fieldName: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  const handleSubmit = async () => {
    try {
      const isValid = validateRadioInputs();
      if (isValid && dailyReportId) {
        await updateEndOfDayReportService(dailyReportId, inputs);
        setShowSuccessMessage(true);
        console.log('Form submitted:', inputs);
      } else {
        console.error('Form validation failed or no daily report ID found');
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path[0];
          fieldErrors[path] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

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
      <Box sx={{ alignSelf: 'flex-start' }}>
        <From />
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
            position: 'fixed',
            top: '50%',
            left: '60%',
            transform: 'translate(-50%, -50%)',
            width: '467px',
            height: '273px',
            gap: '0px',
            borderRadius: '12px',
            display: showSuccessMessage ? 'flex' : 'none',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2E2E2E',
            padding: '16px',
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
            }}
            onClick={() => setShowSuccessMessage(false)}
          >
            <Typography variant="h5" sx={{ color: 'white' }}>
              X
            </Typography>
          </Box>
          <Box sx={{ marginBottom: '29px' }}>
            <img src={Success} alt="Success"></img>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'center',
              pr: '26px',
              pl: '26px',
            }}
            mb={4}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'left',
                marginBottom: '8px',
              }}
            >
              Report Submitted Successfully!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'white',
                textAlign: 'left',
                marginBottom: '16px',
              }}
            >
              New Report will be available at midnight.
            </Typography>
          </Box>
        </Box>
        {redirectToBackground ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundPositionX: '190px',
              backgroundImage: `url(${backgroundImage1})`,
              backgroundSize: 'cover',
              backgroundPosition: 'right',
            }}
          >
            <Box
              sx={{
                width: '467px',
                height: '273px',
                gap: '0px',
                borderRadius: '12px ',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: '#2E2E2E',
                padding: '16px',
              }}
            >
              <Box sx={{ marginBottom: '29px' }}>
                <img src={reportstate} alt="Next Report State"></img>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', pr: '26px', pl: '26px' }} mb={4}>
                <Typography
                  variant="h4"
                  sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left', marginBottom: '8px' }}
                >
                  Next Report Loading Soon!
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: 'white', textAlign: 'left', marginBottom: '16px' }}
                >
                  1 week from now a fresh report will be generated! 🌟
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Formik initialValues={inputs} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: '15px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '15px',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      Daily OverView
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '15px',
                      width: '100%',
                    }}
                  >
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650, backgroundColor: '#242424' }}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ width: '10px', paddingRight: '3px', border: '1px solid #424648' }}>
                              <span style={{ color: '#4CAF50' }}>Yes</span>
                            </TableCell>
                            <TableCell sx={{ width: '10px', paddingRight: '3px', border: '1px solid #424648' }}>
                              <span style={{ color: '#FF0000' }}>No</span>
                            </TableCell>
                            <TableCell align="left" sx={{ border: '1px solid #424648' }}>
                              <span style={{ color: '#ffffff' }}>Goal achieved?</span>
                            </TableCell>
                            <TableCell align="left" sx={{ border: '1px solid #424648' }}>
                              <span style={{ color: '#ffffff' }}>Specify completion time:</span>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {inputs.dailyGoals.map((goal, index) => (
                            <TableRow key={index}>
                              <TableCell align="left" sx={{ border: '1px solid #424648' }}>
                                <Checkbox
                                  name={`dailyGoals[${index}].completed`}
                                  checked={goal.completed}
                                  onChange={(e) => handleInputChange(e)}
                                  sx={{ color: '#4CAF50' }}
                                />
                              </TableCell>
                              <TableCell align="left" sx={{ border: '1px solid #424648' }}>
                                <Checkbox
                                  name={`dailyGoals[${index}].completed`}
                                  checked={!goal.completed}
                                  onChange={(e) => handleInputChange(e)}
                                  sx={{ color: '#FF0000' }}
                                />
                              </TableCell>
                              <TableCell align="left" sx={{ border: '1px solid #424648', color: '#ffffff' }}>
                                <TextField
                                  name={`dailyGoals[${index}].description`}
                                  value={goal.description}
                                  onChange={handleInputChange}
                                  fullWidth
                                  variant="outlined"
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      padding: '12px',
                                      height: '50px',
                                      width: '100%',
                                      backgroundColor: '#242424',
                                      borderRadius: '10px',
                                      '& input': {
                                        padding: '12px',
                                        color: 'white',
                                      },
                                    },
                                  }}
                                />
                              </TableCell>
                              <TableCell align="left" sx={{ border: '1px solid #424648', color: '#6D6D6D' }}>
                                {`Goal ${index + 1}`}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '15px',
                      width: '100%',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      Actual Activities executed:
                    </Typography>
                    <Typography variant="subtitle2" align="right" color="white" gutterBottom>
                      Please go over your activities from the daily report and confirm / edit your output for the day.
                    </Typography>

                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '10px',
                        height: '300px',
                        display: 'flex',
                        backgroundColor: '#242424',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        width: '100%',
                        overflowY: 'auto',
                      }}
                    >
                      {inputs.actualActivity.map((activity, index) => (
                        <Box key={index} sx={{ width: '100%', marginBottom: '10px' }}>
                          <TextField
                            name={`actualActivity[${index}].category`}
                            value={activity.category}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            label={`Activity ${index + 1} - Category`}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                padding: '12px',
                                height: '50px',
                                width: '100%',
                                backgroundColor: '#242424',
                                borderRadius: '10px',
                                '& input': {
                                  padding: '12px',
                                  color: 'white',
                                },
                              },
                            }}
                          />
                          <TextField
                            name={`actualActivity[${index}].duration`}
                            value={activity.duration}
                            onChange={handleInputChange}
                            fullWidth
                            variant="outlined"
                            label={`Activity ${index + 1} - Duration (minutes)`}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                padding: '12px',
                                height: '50px',
                                width: '100%',
                                backgroundColor: '#242424',
                                borderRadius: '10px',
                                '& input': {
                                  padding: '12px',
                                  color: 'white',
                                },
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '15px',
                      width: '100%',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      Self Reflection
                    </Typography>
                    <Typography sx={{ mr: '10px' }} variant="subtitle2" align="left" color="white" gutterBottom>
                      Tell us about 3 good things that happened today:
                    </Typography>
                    <TextField
                      name="reflection.firstGoodThing"
                      label="1st good thing that happened today"
                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('reflection.firstGoodThing')}
                      error={Boolean(errors['reflection.firstGoodThing'])}
                      helperText={errors['reflection.firstGoodThing']}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: 'gray',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: '12px',
                          height: '50px',
                          width: '100%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white',
                          },
                        },
                      }}
                    />
                    <TextField
                      name="reflection.secondGoodThing"
                      label="2nd good thing that happened today"
                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('reflection.secondGoodThing')}
                      error={Boolean(errors['reflection.secondGoodThing'])}
                      helperText={errors['reflection.secondGoodThing']}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: 'gray',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: '12px',
                          height: '50px',
                          width: '100%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white',
                          },
                        },
                      }}
                    />
                    <TextField
                      name="reflection.thirdGoodThing"
                      label="3rd good thing that happened today"
                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('reflection.thirdGoodThing')}
                      error={Boolean(errors['reflection.thirdGoodThing'])}
                      helperText={errors['reflection.thirdGoodThing']}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: 'gray',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: '12px',
                          height: '50px',
                          width: '100%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '15px',
                      width: '100%',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      How can you be better tomorrow?
                    </Typography>
                    <Typography sx={{ mr: '10px' }} variant="subtitle2" align="left" color="white" gutterBottom>
                      Tell us about 3 things you can improve tomorrow:
                    </Typography>
                    <TextField
                      name="improvement.firstThing"
                      label="1st thing I can improve.."
                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('improvement.firstThing')}
                      error={Boolean(errors['improvement.firstThing'])}
                      helperText={errors['improvement.firstThing']}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: 'gray',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: '12px',
                          height: '50px',
                          width: '100%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white',
                          },
                        },
                      }}
                    />
                    <TextField
                      name="improvement.secondThing"
                      label="2nd thing I can improve.."
                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('improvement.secondThing')}
                      error={Boolean(errors['improvement.secondThing'])}
                      helperText={errors['improvement.secondThing']}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: 'gray',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: '12px',
                          height: '50px',
                          width: '100%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white',
                          },
                        },
                      }}
                    />
                    <TextField
                      name="improvement.thirdThing"
                      label="3rd thing I can improve.."
                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('improvement.thirdThing')}
                      error={Boolean(errors['improvement.thirdThing'])}
                      helperText={errors['improvement.thirdThing']}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: 'gray',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: '12px',
                          height: '50px',
                          width: '100%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '15px',
                      width: '100%',
                    }}
                  >
                    <Typography variant="h6" align="left" color="white" gutterBottom>
                      How are you feeling today?
                      <Box
                        sx={{
                          display: 'flex',
                          mt: '5px',
                          FlexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          width: '232px',
                          height: '51px',
                        }}
                      >
                        <img src={smile} alt="Happy" style={{ marginLeft: '9px', width: '31px', height: '31px' }} />
                        <input onChange={handleRadioChange} type="radio" id="level1" name="mood.endOfDay" value="1" />
                        <label htmlFor="level1"> </label>
                        <input onChange={handleRadioChange} type="radio" id="level2" name="mood.endOfDay" value="2" />
                        <label htmlFor="level2"> </label>
                        <input onChange={handleRadioChange} type="radio" id="level3" name="mood.endOfDay" value="3" />
                        <label htmlFor="level3"> </label>
                        <input onChange={handleRadioChange} type="radio" id="level4" name="mood.endOfDay" value="4" />
                        <label htmlFor="level4"> </label>
                        <input onChange={handleRadioChange} type="radio" id="level5" name="mood.endOfDay" value="5" />
                        <label htmlFor="level5"> </label>
                        <img src={sad} alt="Sad" style={{ marginRight: '9px', width: '25px', height: '25px' }} />
                      </Box>
                      {radioErrors['mood'] && (
                        <Typography sx={{ color: 'red' }}>{radioErrors['mood']}</Typography>
                      )}
                    </Typography>
                  </Box>

                  <Divider sx={{ width: '100%', backgroundColor: '#424648', border: '1px solid #424648' }} />

                  <Box sx={{ position: 'relative', width: '100%', mt: '10px', mb: '10px', height: '270px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        padding: '20px',
                        width: '100%',
                        pointerEvents: 'none',
                      }}
                    >
                      <Typography sx={{ marginBottom: '55px' }} variant="h6" align="left" color="gray" gutterBottom>
                        Linkedin Activity summary
                      </Typography>
                      <Typography align="left" color="gray" gutterBottom sx={{ marginBottom: '55px' }}>
                        # of new connections in the last 30 days
                      </Typography>
                      <Typography align="left" color="gray" gutterBottom sx={{ marginBottom: '55px' }}>
                        # of new comments in the last 30 days
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          width: '467px',
                          height: '240px',
                          gap: '0px',
                          borderRadius: '12px ',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          backgroundColor: '#2E2E2E',
                          padding: '16px',
                        }}
                      >
                        <Box sx={{ marginBottom: '31px' }}>
                          <img src={lockeditem} alt="Locked"></img>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', pr: '26px', pl: '26px' }} mb={4}>
                          <Typography
                            variant="h4"
                            sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left', marginBottom: '8px' }}
                          >
                            Activity currently locked
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: 'white', textAlign: 'left', marginBottom: '16px', mr: '10px', ml: '10px' }}
                          >
                            But it's eagerly awaiting your arrival at Solaris Major planet 🚀
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ width: '100%', backgroundColor: '#424648', border: '1px solid #424648' }} />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '20px',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      Course progress
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        FlexDirection: 'row',
                        alignItems: 'space-between',
                        justifyContent: 'space-between',
                        borderRadius: '10px',
                        height: '51px',
                      }}
                    >
                      <Typography sx={{ mt: '10px', mr: '10px' }} variant="subtitle2" align="left" color="white" gutterBottom>
                        # of chapter/section reached today:
                      </Typography>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        style={{
                          border: '1px solid #2E2E2E',
                          borderRadius: '12px',
                          width: '51px',
                          height: '50px',
                          backgroundColor: '#242424',
                          padding: '5px',
                          color: 'white',
                        }}
                        name="wakeHour"
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ width: '100%', backgroundColor: '#424648', border: '1px solid #424648' }} />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '20px',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      FreeFlow
                    </Typography>
                    <Typography sx={{ mt: '10px', mr: '10px' }} variant="subtitle2" align="left" color="white" gutterBottom>
                      Feel free to share anything here:
                    </Typography>
                    <TextField
                      name="shareWithMentor"
                      label="Let your thoughts flow freely here..."
                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('shareWithMentor')}
                      error={Boolean(errors.shareWithMentor)}
                      helperText={errors.shareWithMentor}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        sx: {
                          color: 'gray',
                        },
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: '12px',
                          height: '300px',
                          width: '220%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white',
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Button
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                      sx={{
                        width: '170px',
                        height: '51px',
                        fontWeight: 'bold',
                        padding: '16px, 24px, 16px, 24px',
                        borderRadius: '12px 12px 12px 12px',
                        gap: '4px',
                        backgroundColor: '#3F8CFF',
                      }}
                    >
                      Submit Report
                      <span style={{ marginLeft: '5px' }}>&gt;</span>
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Box>
    </Grid>
  );
};

export default EndOfDayReports;
