
import React, { useContext, useRef, useState, ChangeEvent } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  Link,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from "@/assets/Logo.png";
import { AuthContextUser } from '@/context/AuthContextUser';
import { toast } from "react-toastify";
import verification from '@/assets/verification.jpeg';
import { useForm } from "@/hooks/useForm";

const defaultTheme = createTheme();

interface VerificationFormValues {
  email: string;
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
  digit5: string;
  digit6: string;
}

export default function Verification() {
  const { verifyEmailCode } = useContext(AuthContextUser);
  const [, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, setErrors, handleInputChange, handleKeyUp, setValues } = useForm<VerificationFormValues>({
    email: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: '',
    digit6: '',
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputFocus = (index: number) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputChangeDigits = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) return; // Allow only digits
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear error for this digit field
    }));
    const index = parseInt(name.replace('digit', ''), 10) - 1;
    if (value.length === 1) handleInputFocus(index);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const fieldErrors: Record<string, string> = {};

    if (!values.email) {
      fieldErrors.email = 'Email is required';
    } else if (!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      fieldErrors.email = 'Invalid email format';
    }

    for (let i = 1; i <= 6; i++) {
      if (!values[`digit${i}` as keyof VerificationFormValues]) {
        fieldErrors[`digit${i}` as keyof VerificationFormValues] = 'This field is required';
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const verificationCode = `${values.digit1}${values.digit2}${values.digit3}${values.digit4}${values.digit5}${values.digit6}`;
    const userEmail = values.email;

    try {
      const response = await verifyEmailCode(verificationCode, userEmail);
      toast.success(response.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            order: { xs: 1, md: 2, lg: 2, xl: 2 },
            backgroundImage: `url(${verification})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '40%',
          }}
        />
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square sx={{ backgroundColor: '#121212', order: { xs: 2, md: 1, lg: 1, xl: 1 } }}>
          <Box sx={{ my: 5, mx: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 10, width: '30vw' }}>
              <img style={{ width: '12vw', height: '12vh' }} src={Logo} alt="Company Logo" />
              <Typography component="h1" variant="h5" sx={{ color: 'white', alignSelf: 'flex-start', mb: 3 }}>
                We've sent a Verification link to your email!
              </Typography>
              <Typography component="h3" variant="h6" sx={{ color: 'white', alignSelf: 'flex-start', mb: 3 }}>
                6 Digit code has been sent to you. Open your email and click the Verification link. Once verified, you'll be directed to the login page.
              </Typography>
              <Box mt={2} sx={{ textAlign: 'left', color: 'white' }}>
                <div>
                  Didn't receive the code?{' '}
                  <Link component={RouterLink} to="/register" variant="body2">
                    Click here to resend
                  </Link>
                </div>
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleInputChange}
                onKeyUp={() => handleKeyUp('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#242424',
                    '& input': {
                      color: 'white', // Change text color to white
                    },
                    border: errors.email ? '2px solid red' : values.email ? '2px solid green' : 'none'
                  },
                }}
                InputLabelProps={{ style: { color: 'grey' } }}
              />
              {!errors.email && values.email && !values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) && (
                <span style={{ color: 'red', display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '2px solid lightcoral',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '8px',
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>!</span>
                  </span>
                  Try again with a valid email
                </span>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index - 1] = el)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#242424',
                        borderRadius: '10px',
                        '& input': { color: 'white' },
                        border: errors[`digit${index}` as keyof VerificationFormValues] ? '2px solid red' : values[`digit${index}` as keyof VerificationFormValues] ? '2px solid green' : 'none'
                      },
                      width: '11%',
                      '&:not(:last-child)': { marginRight: '8px' },
                    }}
                    margin="normal"
                    required
                    fullWidth
                    id={`digit${index}`}
                    name={`digit${index}`}
                    autoComplete={`digit${index}`}
                    value={values[`digit${index}` as keyof VerificationFormValues]}
                    onChange={handleInputChangeDigits}
                    error={Boolean(errors[`digit${index}` as keyof VerificationFormValues])}
                    helperText={errors[`digit${index}` as keyof VerificationFormValues]}
                    inputProps={{ maxLength: 1, pattern: '[0-9]*', inputMode: 'numeric' }}
                    InputLabelProps={{ style: { color: 'grey' } }}
                  />
                ))}
              </Box>
              <Box mt={7}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ width: '100%', height: '51px', borderRadius: '12px', padding: '16px 24px', marginTop: '4px', backgroundColor: '#0143FF' }}
                >
                  Continue
                  <span style={{ marginLeft: '5px' }}>&gt;</span>
                </Button>
              </Box>
              <Link component={RouterLink} to="/login" variant="body2" sx={{ color: 'white', display: 'block', mt: 2 }}>
                Back to Login
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
