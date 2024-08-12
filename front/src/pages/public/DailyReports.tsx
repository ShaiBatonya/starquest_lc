import Box from '@mui/material/Box';
import From from '@/components/UI/common/From';
import { useState } from 'react';
import { TextField, MenuItem, Button, Checkbox,IconButton } from '@mui/material';
import { z, ZodError } from 'zod';
import Typography from '@mui/material/Typography';
import sad from '@/assets/sad.png';
import smile from '@/assets/smile.png';
import * as React from 'react';
import sucs from '@/assets/sucs.png';
import err from '@/assets/err.png';
import { Grid } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import Success from '@/assets/Success.png';
import styles from '@/theme/ScrollbarStyles.module.css';
import backgroundImage from '@/assets/dailypng.jpg';
import daily_start from '@/assets/daily_start.png';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Formik, Form } from 'formik';
import { createDailyReportService } from '@/services/DailyReportService';

const schema = z.object({
  wakeupTime: z.string().nonempty(),
  mood: z.object({
    startOfDay: z.number().nonnegative(),
  }),
  morningRoutine: z.object({
    routine: z.string().nonempty(),
  }),
  dailyGoals: z.array(
    z.object({
      description: z.string().nonempty(),
    })
  ),
  expectedActivity: z.array(
    z.object({
      duration: z.number().nonnegative(),
      category: z.string().nonempty(),

    })
  ),
});
export default function DailyReports(): JSX.Element {

 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCheckboxMessage, setShowCheckboxMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [age, setAge] = React.useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [radioErrors, setRadioErrors] = useState<Record<string, string>>({});
  const [showBackgroundScreen, setShowBackgroundScreen] = useState(true);

  const [tasks] = useState<Task[]>([
    { id: 'task1', content: 'Free Flow', color: '#ED0201', time: 30 },
    { id: 'task2', content: 'Mizam', color: '#06065C', time: 45 },
    { id: 'task3', content: 'Product Refinement', color: '#9747FF', time: 60 },
    { id: 'task4', content: 'Workout', color: '#3F8CFF', time: 120 },
    { id: 'task5', content: 'Free Time', color: '#A80100', time: 15 },
    { id: 'task6', content: 'learning session', color: '#002BB5', time: 90 },
    { id: 'task7', content: 'Technical session', color: '#3F8CFF', time: 30 },
    { id: 'task8', content: 'LinkedIn session', color: '#9747FF', time: 120 },
    { id: 'task9', content: 'improvement session', color: '#ED0201', time: 60 },
    { id: 'task10', content: 'Filling out a report', color: '#3F8CFF', time: 15 },
  ]);

  const timeOptions = [
    { value: 15, label: '15mins' },
    { value: 30, label: '30mins' },
    { value: 45, label: '45mins' },
    { value: 60, label: '60mins ' },
    { value: 90, label: '90mins' },
    { value: 120, label: '120mins' },
  ];

  const [, setDraggedTask] = useState<Task | null>(null);
  const [secondBoxTasks, setSecondBoxTasks] = useState<Task[]>([]);
  interface DailyReportState {
    wakeupTime: string;
    mood: {
      startOfDay: number;
    };
    morningRoutine: {
      routine: string;
    };
    dailyGoals: {
      description: string;
    }[];
    expectedActivity: {
      duration: number;
      category: string;
    }[];
  }

  const [inputs, setInputs] = useState<DailyReportState>({
    wakeupTime: '',
    mood: {
      startOfDay: 0,
    },
    morningRoutine: {
      routine: '',
    },
    dailyGoals: [
      { description: '' },
      { description: '' },
      { description: '' },
    ],
    expectedActivity: [
      { duration: 1, category: 'learning' },
    ],
  });


  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '15px',
    width: '100%',
  };

  const questionTextStyles = {
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '18.9px',
    textAlign: 'left',
    marginBottom: '4px',
  };

  const boxStyles = {
    display: 'flex',
    mt: '5px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#242424',
    borderRadius: '10px',
    width: '232px',
    height: '51px',
  };

  const imgStyles = {
    happy: { marginLeft: '9px', width: '31px', height: '31px' },
    sad: { marginRight: '9px', width: '25px', height: '25px' },
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCheckboxMessage(event.target.checked);
  };

  const handleCloseCheckboxMessage = () => {
    setShowCheckboxMessage(false);
  };


  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);

  };


  const validateRadioInputs = () => {
    const radioFieldErrors: Record<string, string> = {};

    if (inputs.mood.startOfDay === 0) {
      radioFieldErrors['mood.startOfDay'] = 'Please select an option';
    }

    setRadioErrors(radioFieldErrors);

    return Object.keys(radioFieldErrors).length === 0;
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      mood: {
        ...prevInputs.mood,
        startOfDay: Number(value),
      },
    }));
    setRadioErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name.startsWith('dailyGoals')) {
      const [, index, field] = name.split('.');
      setInputs((prevInputs) => ({
        ...prevInputs,
        dailyGoals: prevInputs.dailyGoals.map((goal, goalIndex) =>
          goalIndex === parseInt(index)
            ? { ...goal, [field]: value }
            : goal
        ),
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`dailyGoals.${index}.description`]: '',
      }));
    } else if (name === 'morningRoutine.routine') {
      setInputs((prevInputs) => ({
        ...prevInputs,
        morningRoutine: {
          ...prevInputs.morningRoutine,
          routine: value,
        },
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        'morningRoutine.routine': '',
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };
  

  const handleKeyUp = (field: string) => {
    if (field === 'wakeupTime' && inputs.wakeupTime) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    } else if (field === 'morningRoutine' && !inputs.morningRoutine.routine) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        morningRoutine: 'This field is required',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: '',
      }));
    }
  };


  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };
  const addGoal = () => {
    if (inputs.dailyGoals.length < 5) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        dailyGoals: [...prevInputs.dailyGoals, { description: '' }],
      }));
    }
  };

  const removeGoal = (index: number) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      dailyGoals: prevInputs.dailyGoals.filter((_, goalIndex) => goalIndex !== index),
    }));
  };

  interface Task {
    id: string;
    content: string;
    color: string;
    time: number;
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.setData('task', JSON.stringify(task));
  };


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData('task'));
    if (secondBoxTasks.length < 10) {
      setSecondBoxTasks(prevTasks => [...prevTasks, droppedTask]);
      setDraggedTask(null);


    }
  };

  const handleTimeChange = (taskId: string, time: number) => {
    const updatedTasks = secondBoxTasks.map(task =>
      task.id === taskId ? { ...task, time: time } : task
    );
    setSecondBoxTasks(updatedTasks);
  };

  const handleTimeDailyChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };


  const handleStartButtonClick = () => {
    setShowBackgroundScreen(false);
  };
  const handleTryAgain = () => {
    setShowErrorMessage(false);
    // Reset form fields or any other necessary actions
  };

  const handleSubmit = async () => {
    try {
      const isRadioValid = validateRadioInputs();
      if (isRadioValid) {
        // Additional logic if needed
      }
      schema.parse(inputs);

      // If validation succeeds, clear any previous errors
      setErrors({});
      // Proceed with form submission logic here
      console.log('Form submitted:', inputs);

      const response = await createDailyReportService(inputs);
      console.log('Response:', response);
      setShowSuccessMessage(true);
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path.join('.');
          fieldErrors[path] = error.message;
        });
        // Set errors for individual fields
        setErrors(fieldErrors);
        setShowErrorMessage(true); // Set showErrorMessage to true when there's an error
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
        {showBackgroundScreen ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundPositionX: '190px',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'right',
            }}
          >
            <Box
              sx={{
                width: '500px',
                height: '350px',
                gap: '0px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #1E1E1E 0%, #3A3A3A 100%)',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              <Box sx={{ marginBottom: '67px' }}>
                <img src={daily_start} alt="Daily Start" style={{ borderRadius: '8px' }} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  alignItems: 'center',
                  pr: '26px',
                  pl: '26px',
                  pb: '26px',
                }}
                mb={4}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '8px',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  Fill out new Daily Report!
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    marginBottom: '16px',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  Don't miss the chance to power up your study process by submitting your daily reports on time! 🌟
                </Typography>
              </Box>
              <Button
                sx={{
                  width: '200px',
                  height: '60px',
                  backgroundColor: '#0143FF',
                  background: 'linear-gradient(90deg, #0143FF 0%, #0056FF 100%)',
                  borderRadius: '30px',
                  boxShadow: '0 4px 15px rgba(0, 85, 255, 0.5)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #0056FF 0%, #0143FF 100%)',
                  },
                }}
                onClick={handleStartButtonClick}
              >
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>Fill New Report</span>
              </Button>
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
                <img src={Success}></img>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '15px',
              }}>

              <Typography variant="h6" align="right" color="white" gutterBottom>
                Let’s plan out your day
              </Typography>
            </Box>



            <Formik i initialValues={inputs} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>




                  <Box sx={containerStyles}>
                    <Typography align="left" color="white" gutterBottom component="div">
                      <Typography variant="body1" sx={questionTextStyles} component="span">
                        How are you feeling today?
                      </Typography>
                      <Box sx={boxStyles}>
                        <img src={smile} alt="Happy" style={imgStyles.happy} />
                        {[1, 2, 3, 4, 5].map((level) => (
                          <React.Fragment key={level}>
                            <input  onChange={handleRadioChange} type="radio" id={`level${level}`} name="mood.startOfDay" value={level} />
                            <label htmlFor={`level${level}`}> </label>
                          </React.Fragment>
                        ))}

                        <img src={sad} alt="Sad" style={imgStyles.sad} />
                      </Box>
                      {radioErrors['mood.startOfDay'] && (
                        <Typography sx={{ color: 'red' }} component="span">{radioErrors['mood.startOfDay']}</Typography>
                      )}
                    </Typography>
                  </Box>


                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      padding: '15px',
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
                    >
                      When did you wake up today?
                    </Typography>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="string"

                        style={{
                          border: '1px solid #2E2E2E',
                          borderRadius: '12px',
                          width: '62px',
                          color: 'white',
                          height: '50px',
                          backgroundColor: '#242424',
                          padding: '5px',
                          marginRight: '5px',
                          textAlign: 'center',
                        }}
                        name="wakeupTime"
                        value={inputs.wakeupTime} // Bind input value to state
                        onChange={handleInputChange} // Handle changes with handleInputChange


                      />
                      <span style={{ marginRight: '5px', color: '#ccc' }}>:</span>
                      {/*            <input

                  type="string"
                  min="0"
                  max="59"
                  style={{
                    border: '1px solid #2E2E2E',
                    borderRadius: '12px',
                    width: '51px',
                    color: 'white',
                    height: '50px',
                    backgroundColor: '#242424',
                    padding: '5px',
                    marginLeft: '5px',
                    textAlign: 'center',
                  }}
                  name="wakeupTime"
            
                
                /> */}
                      <Box sx={{ display: 'flex', alignItems: 'center', alignContent: 'center' }} ml={2}>
                        <FormControl sx={{ borderRadius: '12px', width: '81px', height: '50px', backgroundColor: '#242424', textAlign: 'center' }}>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                            value={age}
                            onChange={handleTimeDailyChange}
                            sx={{
                              '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                              },
                              color: '#ccc',
                              '&:hover': {
                                boxShadow: 'none'
                              },
                              '& .MuiSelect-icon': {
                                color: 'white'
                              }
                            }}
                          >
                            <MenuItem sx={{ color: '#ccc' }} value={10}>AM</MenuItem>
                            <MenuItem sx={{ color: '#ccc' }} value={20}>PM</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    {errors['wakeupTime'] && (
                      <Typography variant='caption' sx={{ color: 'red' }}>{errors['wakeupTime']}</Typography>
                    )}
                    {errors['wakeupTime'] && (
                      <Typography variant='caption' sx={{ color: 'red' }}>{errors['wakeupTime']}</Typography>
                    )}
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
                    <Typography variant="body1"
                      style={{

                        fontSize: '15px',
                        fontWeight: 400,
                        lineHeight: '18.9px',
                        textAlign: 'left',
                        marginBottom: '4px',
                      }} gutterBottom>
                      Tell us about your morning routine:
                    </Typography>
                    <TextField
  name="morningRoutine.routine"
  label="Write here..."
  value={inputs.morningRoutine.routine}
  onChange={handleInputChange}
  onKeyUp={() => handleKeyUp('morningRoutine')}
  error={Boolean(errors['morningRoutine.routine'])}
  helperText={errors['morningRoutine.routine']}
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
             

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '15px', width: '100%' }}>
        <Typography variant="h6" color="white" gutterBottom>
          Daily Goals
        </Typography>
        <Typography variant="subtitle2" color="white" gutterBottom>
          Please set your 3 daily goals (Maximum of 5 daily goals)
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px', width: '100%' }}>
          {inputs.dailyGoals.map((goal, index) => (
            <Box key={index} sx={{ position: 'relative', marginBottom: '10px', flex: '1 1 280px' }}>
              <TextField
                name={`dailyGoals.${index}.description`}
                label={`Goal ${index + 1}`}
                value={goal.description}
                onChange={handleInputChange}
                onKeyUp={() => handleKeyUp(`dailyGoals.${index}.description`)}
                error={Boolean(errors[`dailyGoals.${index}.description`])}
                helperText={errors[`dailyGoals.${index}.description`]}
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
                  width: '100%',
                }}
              />
              {index >= 3 && (
                <IconButton
                  onClick={() => removeGoal(index)}
                  sx={{ position: 'absolute', top: '50%', right: '-10px', transform: 'translateY(-50%)', color: 'red' }}
                >
                  <Close />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
        {inputs.dailyGoals.length < 5 && (
          <Box sx={{ display: 'flex', justifyContent: 'left', width: '100%', }}>
            <Button
              onClick={addGoal}
              variant="contained"
              startIcon={<Add />}
              sx={{
                width: '51px',
                height: '51px',
                
                backgroundColor: '#0143FF',
                color: '#242424',
                '&:hover': {
                  backgroundColor: '#585858',
                  color: '#242424',
                },
              }}
            />
          </Box>
        )}
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
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            '& .MuiSvgIcon-root': {
                              width: 32,
                              height: 32,
                              color: '#585858',
                              borderRadius: '70px',
                            },
                          }}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="please set your daily goals in on whatsapp and check rhe Checkbox"
                      defaultChecked
                      color="default"
                    />
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
                      display: showCheckboxMessage ? 'flex' : 'none',
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
                      onClick={handleCloseCheckboxMessage}
                    >
                      <Typography variant="h5" sx={{ color: 'white' }}>
                        X
                      </Typography>
                    </Box>
                    <Box sx={{ marginBottom: '29px' }}>
                      <img src={sucs} alt="sucs" />
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
                        sx={{
                          fontFamily: 'Plus Jakarta Sans',
                          fontSize: '20px',
                          fontWeight: 600,
                          lineHeight: '25.2px',
                          textAlign: 'center',
                          color: 'white',

                          marginBottom: '8px',
                        }}
                      >
                        Have you shared your daily goals on the WhatsApp group today??
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: 'white',
                          textAlign: 'left',
                          marginBottom: '16px',
                        }}
                      >
                        Let’s share them and submit the daily report! 🌟
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        <Button
                          variant="contained"
                          sx={{
                            width: '107px',
                            height: '39px',
                            padding: '10px 12px',
                            gap: '4px',
                            borderRadius: '12px ',
                            border: '1px solid #ED0201',
                            opacity: 1,
                            background: '#242424',
                            color: '#ED0201',
                            mr: 2, // Added margin-right for spacing
                          }}
                        >
                          No
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            width: '107px',
                            height: '39px',
                            padding: '10px 12px',
                            gap: '4px',
                            borderRadius: '12px ',
                            border: '1px solid var(--Main-button-Regular, #0143FF)',
                            opacity: 1,
                            background: '#242424',
                            color: '#0143FF',
                          }}
                        >
                          Yes
                        </Button>
                      </Box>
                    </Box>
                  </Box>

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
                      How my day looks
                    </Typography>

                    <Typography variant="subtitle2" align="left" color="white" gutterBottom>
                      Please drag and drop activities that you will be performing today. There’s by default time for each activity that can change below
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    >


                      <Box
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          height: '300px',
                          width: '100%',


                          borderRadius: '5px',
                          padding: '10px',

                        }}
                      >

                        {tasks.map((task) => (
                          <Box
                            key={task.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task)}
                            sx={{
                              backgroundColor: task.color,
                              borderRadius: '12px',
                              padding: '10px',
                              margin: '5px',
                              width: '220px',
                              height: '60px',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-around',

                            }}
                          >
                            <strong>{task.content}</strong>
                            <TextField
                              select

                              value={task.time}
                              onChange={(e) => handleTimeChange(task.id, Number(e.target.value))}
                              variant="outlined"
                              size="small"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'white',
                                  },
                                  '& input': {
                                    color: 'white',
                                  },
                                },
                                '& .MuiSelect-select': {
                                  color: 'white',
                                },
                              }}
                            >
                              {timeOptions.map((option) => (
                                <MenuItem sx={{ color: 'grey' }} key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                        ))}
                      </Box>

                      <Box
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        sx={{


                          borderRadius: '5px',
                          padding: '10px',
                          height: '300px',
                          display: 'flex',
                          backgroundColor: '#242424',
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          width: '100%',
                          overflowY: 'auto',
                          border: '1px dashed blue',
                          borderStyle: 'dashed ',
                          borderSpacing: '10px',
                        }}
                      >

                        {secondBoxTasks.map((task) => (
                          <Box
                            key={task.id}
                            sx={{

                              backgroundColor: task.color,
                              borderRadius: '12px',
                              padding: '10px',
                              margin: '5px',
                              width: '220px',
                              height: '60px',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-around',

                            }}
                          >
                            <strong>{task.content}</strong>
                            <TextField
                              select
                              value={task.time}
                              onChange={(e) => handleTimeChange(task.id, Number(e.target.value))}
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'white',
                                  },
                                  '& input': {
                                    color: 'white',
                                  },
                                },
                                '& .MuiSelect-select': {
                                  color: 'white',
                                },
                              }}
                            >
                              {timeOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Box>
                        ))}
                      </Box>
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
                    <Typography variant="body1"
                      style={{

                        fontSize: '15px',
                        fontWeight: 400,
                        lineHeight: '18.9px',
                        textAlign: 'left',
                        marginBottom: '4px',
                      }} gutterBottom>
                      Share your daily progress on current corse:
                    </Typography>
                    <TextField
                      name="routine"
                      label="Write here..."

                      onChange={handleInputChange}
                      onKeyUp={() => handleKeyUp('routine')}
                      error={Boolean(errors.routine)}
                      helperText={errors.routine}
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

                  {/*     <Box sx={{

              position: 'fixed',
              bottom: '130px',
              right: '190px',
            }}>
              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  width: '170px',
                  height: '51px',
                  fontWeight: 'bold',
                  padding: '16px, 24px, 16px, 24px',
                  borderRadius: '12px 12px 12px 12px',
                  gap: '4px',

                  backgroundColor: '#0143FF',

                }}
              >
                Submit Report
                <span style={{ marginLeft: '5px' }}>&gt;</span>
              </Button>
            </Box> */}
                  <Button   style={{
                  width: '170px',
                  height: '51px',
                  fontWeight: 'bold',
                  padding: '16px, 24px, 16px, 24px',
                  borderRadius: '12px 12px 12px 12px',
                  gap: '4px',
color: 'white',
                    backgroundColor: '#0143FF',
                  }} type="submit" disabled={isSubmitting}>Submit</Button>
                </Form>
              )}
            </Formik>
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
                display: showErrorMessage ? 'flex' : 'none', // Show the error message box if showErrorMessage is true
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
                <img src={err}></img>
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
                  Error! Something went wrong..
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'white',
                    textAlign: 'left',
                    marginBottom: '16px',
                  }}
                >
                  oops, you can try again
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
      </Box>


    </Grid>
  );
} 