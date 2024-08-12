import Box from '@mui/material/Box';
import From from '@/components/UI/common/From';
import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { z, ZodError } from 'zod';
import { Formik, Form } from 'formik';
import Success from '@/assets/Success.png';
import backgroundImage1 from '@/assets/backgroundImage1.jpeg';
import reportstate from '@/assets/reportstate.png';
import err from '@/assets/err.png';
import lockeditem from '@/assets/lockeditem.png';
import { createWeeklyReportService, WeeklyReport } from '@/services/weeklyReportService';
import styles from '@/theme/ScrollbarStyles.module.css';

// Zod schema
const schema = z.object({
  moodRating: z.number().int().positive().lte(5),
  moodExplanation: z.string().nonempty(),
  significantEvent: z.string().nonempty(),
  newInterestingLearning: z.string().nonempty(),
  maintainWeeklyRoutine: z.object({
    status: z.boolean(),
    details: z.string().nonempty(), // Ensure details is nonempty if status is false
  }),
  achievedGoals: z.object({
    goals: z.array(z.string().nonempty()),
    shared: z.boolean(),
  }),
  freeTime: z.object({
    status: z.boolean(),
    details: z.string().nonempty(), // Ensure details is nonempty if status is false
  }),
  productProgress: z.string().nonempty(),
  courseChapter: z.string().nonempty(),
  learningGoalAchievement: z.object({
    status: z.boolean(),
    details: z.string().nonempty(), // Ensure details is nonempty if status is false
  }),
  mentorInteraction: z.object({
    status: z.boolean(),
    details: z.string().nonempty(), // Ensure details is nonempty if status is false
  }),
  supportInteraction: z.object({
    status: z.boolean(),
    details: z.string().nonempty(), // Ensure details is nonempty if status is false
  }),
  additionalSupport: z.string().nonempty(),
  openQuestions: z.string().nonempty(),
});


export default function DailyReports(): JSX.Element {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [redirectToBackground, setRedirectToBackground] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [radioErrors, setRadioErrors] = useState<Record<string, string>>({});
  const [inputs, setInputs] = useState<WeeklyReport>({
    moodRating: 1,
    moodExplanation: '',
    significantEvent: '',
    newInterestingLearning: '',
    maintainWeeklyRoutine: {
      status: false,
      details: '',
    },
    achievedGoals: {
      goals: [''],
      shared: true,
    },
    freeTime: {
      status: false,
      details: 'yes',
    },
    productProgress: '',
    courseChapter: '',
    learningGoalAchievement: {
      status: false,
      details: '',
    },
    mentorInteraction: {
      status: false,
      details: '',
    },
    supportInteraction: {
      status: false,
      details: '',
    },
    additionalSupport: '',
    openQuestions: '',
  });

  const updateNestedState = (name: string, value: any) => {
    const keys = name.split('.');
    setInputs(prevInputs => {
        const newState = { ...prevInputs };
        let current: any = newState;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) current[keys[i]] = {};
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        return newState;
    });
};

  const validateRadioInputs = () => {
    const radioFieldErrors: Record<string, string> = {};
  
    if (!inputs.maintainWeeklyRoutine.status && !inputs.maintainWeeklyRoutine.details) {
      radioFieldErrors['maintainWeeklyRoutine'] = 'Please select an option';
    }
  
    if (!inputs.achievedGoals.goals.length || !document.querySelector('input[name="achievedGoals.goals"]:checked')) {
      radioFieldErrors['achievedGoals'] = 'Please select an option';
    }
    if (!inputs.mentorInteraction.details.trim()) {
      radioFieldErrors['mentorInteraction'] = 'Please enter details';
    }
  
    if (!inputs.learningGoalAchievement.details.trim()) {
      radioFieldErrors['learningGoalAchievement'] = 'Please enter details';
    }
    if (!inputs.freeTime.status) {
      radioFieldErrors['freeTime'] = 'Please select an option';
    }
  
    if (!inputs.learningGoalAchievement.status) {
      radioFieldErrors['learningGoalAchievement'] = 'Please select an option';
    }
  
  
    if (!inputs.supportInteraction.status) {
      radioFieldErrors['supportInteraction'] = 'Please select an option';
    }
  
    setRadioErrors(radioFieldErrors);
  
    return Object.keys(radioFieldErrors).length === 0;
  };
  
  
  
  
  
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    if (keys[0] === 'achievedGoals' && keys[1] === 'goals') {
        const index = parseInt(keys[2]);
        setInputs((prev: WeeklyReport) => {
            const newGoals = [...prev.achievedGoals.goals];
            newGoals[index] = value;
            return {
                ...prev,
                achievedGoals: {
                    ...prev.achievedGoals,
                    goals: newGoals
                }
            };
        });
    } else {
        setInputs((prev: WeeklyReport) => {
            const newInputs = { ...prev };
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
    }

    setErrors((prev: Record<string, string>) => ({ ...prev, [name]: '' }));
    setRadioErrors((prev: Record<string, string>) => ({ ...prev, [name.split('.')[0]]: '' }));
};




const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  if (name === "maintainWeeklyRoutine.status") {
      const boolValue = value === "yes";
      setInputs(prev => ({
          ...prev,
          maintainWeeklyRoutine: {
              ...prev.maintainWeeklyRoutine,
              status: boolValue,
          },
      }));
  } else {
      updateNestedState(name, value);
  }

  setRadioErrors(prevErrors => ({
      ...prevErrors,
      [name.split('.')[0]]: '',
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
      const response = await createWeeklyReportService(inputs);
      console.log('Response:', response);
        console.log('Form submitted:', inputs);
        const isRadioValid = validateRadioInputs();
        if (isRadioValid) {
            setShowSuccessMessage(true);
            console.log('Form submitted:', inputs);
        }
        schema.parse(inputs);
        setErrors({});
        console.log('Form submitted:', inputs);
    
        setShowSuccessMessage(true);
    } catch (err) {
        if (err instanceof ZodError) {
            const fieldErrors: Record<string, string> = {};
            err.errors.forEach((error) => {
                const path = error.path.join('.');
                fieldErrors[path] = error.message;
            });
            setErrors(fieldErrors);
            setShowErrorMessage(true); // Set showErrorMessage to true when there's an error
        }
    }
};


  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
    setRedirectToBackground(true);
  };

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const handleTryAgain = () => {
    setShowErrorMessage(false);
    // Reset form fields or any other necessary actions
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
            backgroundColor: '#424648', // Change background color for smaller screens
          },
        }}
      >
        <Formik initialValues={inputs} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
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
                  onClick={handleCloseSuccessMessage}
                >
                  <Typography variant="h5" sx={{ color: 'white' }}>
                    X
                  </Typography>
                </Box>
                <Box sx={{ marginBottom: '29px' }}>
                  <img src={Success} alt="Success" />
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
                      <img src={reportstate} alt="Report State" />
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
                        Next Report Loading Soon!
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: 'white',
                          textAlign: 'left',
                          marginBottom: '16px',
                        }}
                      >
                        1 week from now a fresh report will be generated!  🌟
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ) : (
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
                      Weekly OverView
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
                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px', width: '100%' }}>
                        <Typography sx={{ width: '37px', height: '19px' }} variant="h6" color="white" gutterBottom>
                          Mind
                        </Typography>
                        <Typography sx={{ width: '150px', height: '19px' }} variant="caption" color="white" gutterBottom>
                          Professional Learning
                        </Typography>
                        <TextField
                          name="moodExplanation"
                          label="Goal 1"
                          onChange={handleInputChange}
                          onKeyUp={() => handleKeyUp('moodExplanation')}
                          error={Boolean(errors.moodExplanation)}
                          helperText={errors.moodExplanation}
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
                              height: '51px',
                              backgroundColor: '#242424',
                              borderRadius: '10px',
                              '& input': {
                                padding: '12px',
                                color: 'white', // Inherit text color
                              },
                            },
                          }}
                        />
                {inputs.achievedGoals.goals.map((goal, index) => (
        <TextField
          key={index}
          name={`achievedGoals.goals.${index}`}
          label={`Goal ${index + 1}`}
          value={goal}
          onChange={handleInputChange}
          onKeyUp={() => handleKeyUp(`achievedGoals.goals.${index}`)}
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
              height: '51px',
              backgroundColor: '#242424',
              borderRadius: '10px',
              '& input': {
                padding: '12px',
                color: 'white',
              },
            },
          }}
        />
      ))}
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px', width: '100%' }}>
                        <Typography sx={{ width: '37px', height: '19px' }} variant="h6" color="white" gutterBottom>
                          Body
                        </Typography>
                        <Typography sx={{ width: '150px', height: '19px' }} variant="caption" color="white" gutterBottom>
                          Food & Exercise
                        </Typography>
                        <TextField
                          name="significantEvent"
                          label="Goal 3"
                          onChange={handleInputChange}
                          onKeyUp={() => handleKeyUp('significantEvent')}
                          error={Boolean(errors.significantEvent)}
                          helperText={errors.significantEvent}
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
                              height: '51px',
                              backgroundColor: '#242424',
                              borderRadius: '10px',
                              '& input': {
                                padding: '12px',
                                color: 'white', // Inherit text color
                              },
                            },
                          }}
                        />
                        <TextField
                          name="significantEvent"
                          label="Goal 4"
                          onChange={handleInputChange}
                          onKeyUp={() => handleKeyUp('significantEvent')}
                        
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
                              height: '51px',
                              backgroundColor: '#242424',
                              borderRadius: '10px',
                              '& input': {
                                padding: '12px',
                                color: 'white', // Inherit text color
                              },
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px', width: '100%' }}>
                        <Typography sx={{ width: '37px', height: '19px' }} variant="h6" color="white" gutterBottom>
                          Soul
                        </Typography>
                        <Typography sx={{ width: '150px', height: '19px' }} variant="caption" color="white" gutterBottom>
                          Reading, Family & Friends
                        </Typography>
                        <TextField
                          name="newInterestingLearning"
                          label="Goal 5"
                          onChange={handleInputChange}
                          onKeyUp={() => handleKeyUp('newInterestingLearning')}
                          error={Boolean(errors.newInterestingLearning)}
                          helperText={errors.newInterestingLearning}
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
                              height: '51px',
                              backgroundColor: '#242424',
                              borderRadius: '10px',
                              '& input': {
                                padding: '12px',
                                color: 'white', // Inherit text color
                              },
                            },
                          }}
                        />
                        <TextField
                          name="newInterestingLearning"
                          label="Goal 6"
                          onChange={handleInputChange}
                          onKeyUp={() => handleKeyUp('newInterestingLearning')}
                       
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
                              height: '51px',
                              backgroundColor: '#242424',
                              borderRadius: '10px',
                              '& input': {
                                padding: '12px',
                                color: 'white', // Inherit text color
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                
                    
                  
                    }}
                  >

                    
                  </Box>

                  <Box
  sx={{
    display: 'flex',
    flexDirection: 'row', // Change to row to place boxes side by side
    justifyContent: 'space-between',
    width: '97%',
    alignItems: 'center',
    padding: '23px',
  }}
>
<Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <Typography
      variant="body1"
      style={{
        fontSize: '15px',
        fontWeight: 400,
        lineHeight: '18.9px',
        textAlign: 'left',
        marginBottom: '4px',
      }}
      gutterBottom
    >
      Did you maintain your weekly routine?
    </Typography>

    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <input onChange={handleRadioChange} type="radio" id="maintain-yes" name="maintainWeeklyRoutine.status" value="yes" style={{ marginRight: '5px' }} />
      <label htmlFor="maintain-yes" style={{ color: 'white', marginRight: '10px' }}>Yes</label>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <input onChange={handleRadioChange} type="radio" id="maintain-no" name="maintainWeeklyRoutine.status" value="no" style={{ marginRight: '5px' }} />
      <label htmlFor="maintain-no" style={{ color: 'white' }}>No</label>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      <input onChange={handleRadioChange} type="radio" id="maintain-other" name="maintainWeeklyRoutine.details" value="other" style={{ marginRight: '5px' }} />
      <label htmlFor="maintain-other" style={{ color: 'white', marginRight: '10px' }}>Other</label>
      <input onChange={handleInputChange} onKeyUp={() => handleKeyUp('maintainWeeklyRoutine.details')} name='maintainWeeklyRoutine.details' type="text" placeholder="Please specify" style={{ height: '51px', width: '214px', border: '1px solid #2E2E2E', borderRadius: '10px', backgroundColor: '#242424', padding: '5px', color: 'white' }} />
    </Box>
    {radioErrors['maintainWeeklyRoutine'] && (
      <Typography sx={{ color: 'red' }}>{radioErrors['maintainWeeklyRoutine']}</Typography>
    )}
</Box>

  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
  <Typography
    variant="body1"
    style={{
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '18.9px',
      textAlign: 'left',
      marginBottom: '4px',
    }}
    gutterBottom
  >
    Did you obtain your weekly goals?
  </Typography>

  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <input onChange={handleRadioChange} type="radio" id="weekly-yes"  value="yes" style={{ marginRight: '5px' }} />
    <label htmlFor="weekly-yes" style={{ color: 'white', marginRight: '10px' }}>Yes</label>
  </Box>
  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
    <input onChange={handleRadioChange} type="radio" id="weekly-no"  value="no" style={{ marginRight: '5px' }} />
    <label htmlFor="weekly-no" style={{ color: 'white' }}>No</label>
  </Box>

  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
    <input onChange={handleRadioChange} type="radio" id="weekly-other" value="other" style={{ marginRight: '5px' }} />
    <label htmlFor="weekly-other" style={{ color: 'white', marginRight: '10px' }}>Other</label>
    <input type="text" id="weekly-other-text" placeholder="Please specify" style={{ height: '51px', width: '214px', borderRadius: '10px', border: '1px solid #2E2E2E', backgroundColor: '#242424', padding: '5px', color: 'white' }} />
  </Box>
  {radioErrors['achievedGoals'] && (
    <Typography sx={{ color: 'red' }}>{radioErrors['achievedGoals']}</Typography>
  )}
</Box>

</Box>


<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px',
    width: '100%',
  }}
>
  <Typography
    variant="body1"
    style={{
      fontSize: '15px',
      fontWeight: 400,
      lineHeight: '18.9px',
      textAlign: 'left',
      marginBottom: '4px',
    }}
    gutterBottom
  >
    Things I want to share with my mentor:
  </Typography>
  <TextField
    name="mentorInteraction.details"
    label="I want to share..."
    onChange={handleInputChange}
    onKeyUp={() => handleKeyUp('mentorInteraction.details')}
    error={Boolean(radioErrors['mentorInteraction'])}
    helperText={radioErrors['mentorInteraction']}
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





                  <Box sx={{ position: 'relative', width: '100%' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: '20px',
                        width: '100%',
                        pointerEvents: 'none',
                      }}
                    >
                      <Typography variant="h6" align="right" color="gray" gutterBottom>
                        Project progress
                      </Typography>
                      <Typography sx={{ mr: '10px' }} variant="subtitle2" align="left" color="gray" gutterBottom>
                        share with your weekly progress on your project
                      </Typography>
                      <TextField
                        name="shareWithMentor"
                        label="1st Accomplishment ..."
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
                              color: 'white', // Inherit text color
                            },
                          },
                        }}
                      />
                      <TextField
                        name="shareWithMentor"
                        label="2st Accomplishment ..."
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
                              color: 'white', // Inherit text color
                            },
                          },
                        }}
                      />
                      <TextField
                        name="shareWithMentor"
                        label="3st Accomplishment ..."
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
                              color: 'white', // Inherit text color
                            },
                          },
                        }}
                      />
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
                        <Box sx={{ marginBottom: '54px' }}>
                          <img src={lockeditem} alt="Locked Item" />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', pr: '26px', pl: '26px' }} mb={4}>
                          <Typography
                            variant="h4"
                            sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left', marginBottom: '8px' }}
                          >
                            Activity currently locked
                          </Typography>
                          <Box></Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: 'white', textAlign: 'left', marginBottom: '16px', mr: '10px', ml: '10px' }}
                          >
                            But i'ts eagerly awaiting your arrival at Solaris Major planet 🚀
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '20px',
                      width: '100%',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      Weekly wisdom
                    </Typography>
                    <Typography sx={{ mr: '10px' }} variant="subtitle2" align="left" color="white" gutterBottom>
                      What new Knowledge o Skills did you gain this week?
                    </Typography>
                    <TextField
  name="learningGoalAchievement.details"
  label="I want to share..."
  onChange={handleInputChange}
  onKeyUp={() => handleKeyUp('learningGoalAchievement.details')}
  error={Boolean(errors['learningGoalAchievement.details'])}
  helperText={errors['learningGoalAchievement.details'] }
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
                      name="achievedGoals"
                      label="I want to share..."
                 
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
                            color: 'white', // Inherit text color
                          },
                        },
                      }}
                    />
                    <TextField
                      name="shareWithMentor"
                      label="I want to share..."
                    
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
                            color: 'white', // Inherit text color
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
                      padding: '20px',
                      width: '100%',
                    }}
                  >
                    <Typography variant="h6" align="right" color="white" gutterBottom>
                      Challenges you have experienced this week:
                    </Typography>
                    <Typography sx={{ mr: '10px' }} variant="subtitle2" align="left" color="white" gutterBottom>
                      Let us know about your difficulties.
                    </Typography>
                    <TextField
    name="mentorInteraction.details"
    label="I want to share..."
    onChange={handleInputChange}
    onKeyUp={() => handleKeyUp('mentorInteraction.details')}
    error={Boolean(errors['mentorInteraction.details'])}
    helperText={errors['mentorInteraction.details']}
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
  name="supportInteraction.details"
  label="I want to share..."
  onChange={handleInputChange}
  onKeyUp={() => handleKeyUp('supportInteraction.details')}
  error={Boolean(errors['supportInteraction.details'])}
  helperText={errors['supportInteraction.details']}
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
        color: 'white', // Inherit text color
      },
    },
  }}
/>

                    <TextField
                      name="shareWithMentor"
                      label="I want to share..."
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
                          height: '50px',
                          width: '100%',
                          backgroundColor: '#242424',
                          borderRadius: '10px',
                          '& input': {
                            padding: '12px',
                            color: 'white', // Inherit text color
                          },
                        },
                      }}
                    />
                  </Box>
                  <Button
                    style={{
                      width: '170px',
                      height: '51px',
                      fontWeight: 'bold',
                      padding: '16px, 24px, 16px, 24px',
                      borderRadius: '12px 12px 12px 12px',
                      gap: '4px',
    color: 'white',
                      backgroundColor: '#800080',
                    }}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                  <Box
                    sx={{
                      position: 'fixed',
                      bottom: '130px',
                      right: '190px',
                    }}
                  >
                    {/* <Button
                      onClick={handleSubmit}
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{
                        width: '170px',
                        height: '51px',
                        fontWeight: 'bold',
                        padding: '16px, 24px, 16px, 24px',
                        borderRadius: '12px 12px 12px 12px',
                        gap: '4px',
                        backgroundColor: '#800080',
                      }}
                    >
                      Submit Report
                      <span style={{ marginLeft: '5px' }}>&gt;</span>
                    </Button> */}
                  </Box>
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
        display: showErrorMessage ? 'flex' : 'none',
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
        onClick={handleCloseErrorMessage}
    >
        <Typography variant="h5" sx={{ color: 'white' }}>
            X
        </Typography>
    </Box>
    <Box sx={{ marginBottom: '29px' }}>
        <img src={err} alt="Error" />
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
            {errors.form || "Error! Something went wrong.."}
        </Typography>
        <Typography
            variant="subtitle1"
            sx={{
                color: 'white',
                textAlign: 'left',
                marginBottom: '16px',
            }}
        >
            Oops, you can try again
        </Typography>
    </Box>
    <Button
        onClick={handleTryAgain}
        variant="contained"
        sx={{
            width: 'Hug (129px)',
            height: 'Hug (51px)',
            padding: '16px 24px 16px 24px',
            gap: '4px',
            borderRadius: '12px',
            backgroundColor: '#0143FF',
            color: 'white',
        }}
    >
        Try Again
    </Button>
</Box>

                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  );
}