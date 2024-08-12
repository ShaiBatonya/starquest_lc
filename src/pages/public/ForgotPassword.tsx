
import React, { useContext, useState } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import Logo from "@/assets/Logo.png";
import { Link as RouterLink } from 'react-router-dom';
import { AuthContextUser } from '@/context/AuthContextUser';
import { toast } from "react-toastify";
import { useForm } from "@/hooks/useForm";

const defaultTheme = createTheme();

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPassword() {
  const { forgot } = useContext(AuthContextUser);
  const [, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { values, errors, setErrors, handleInputChange, handleKeyUp } = useForm<ForgotPasswordFormValues>({
    email: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const fieldErrors: Record<string, string> = {};

    if (!values.email) {
      fieldErrors.email = 'Email is required';
    } else if (!values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      fieldErrors.email = 'Invalid email format';
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    const userEmail = values.email;

    try {
      const response = await forgot(userEmail);
      setSuccessMessage(`Link was sent to ${userEmail}`);
      toast.success(response.message);
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
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            minHeight: '40%',
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'right' }}
          >
            <source src="https://s3-figma-videos-production-sig.figma.com/video/1308380530829107498/TEAM/fbf9/0b61/-e499-49e6-9fa7-44524724a4b4?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dKhsTRX3ORrZBQVTUAnuGyvhlB1lky-h7hhCl5sDKpiV99Xfr9LZ1IKdJqKOS5l1Fxv2z-374m9L420MggK-LLxH6lzKs1WqKQvp1Dmje3p3j-ic5XzbsEfDs~Wq8MIcJETHd3JR~sTMMksOFQB47Il-~qJi9CK~zwQVAhrXuu6ppnsDa0J0YGwRa7Ylj6NqbuDkOgbtpXR2qtOafcMhtDEdTtjQMh~Ic5WLTPFsS7XVo3jvfCb6hp0uxFdsMGuCudnwt9ulPZLfXHtPhkmxeVSAYSY3uNYMr38gBVwR6YXvDTCQASfG8BwMyy03cIXqv6xETRsf7K0FuwPCqfb~2g__" type="video/mp4" />
          </video>
        </Grid>
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square sx={{ backgroundColor: '#121212', order: { xs: 2, md: 1, lg: 1, xl: 1 } }}>
          <Box sx={{ my: 5, mx: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 10, width: '30vw' }}>
              <img style={{ width: '12vw', height: '12vh' }} src={Logo} />
              <Typography component="h1" variant="h5" sx={{ color: 'white', alignSelf: 'flex-start', mb: 3 }}>
                Forgot your password?
              </Typography>
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
                  backgroundColor: '#242424',
                  borderRadius: '10px',
                  '& .MuiOutlinedInput-root': {
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
              {successMessage && (
                <Typography variant="body1" sx={{ color: 'green', mt: 2 }}>
                  {successMessage}
                </Typography>
              )}
              <Box mt={7}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ width: '100%', height: '51px', borderRadius: '12px', padding: '16px 24px', marginTop: '4px', backgroundColor: '#0143FF' }}
                >
                  Reset Password
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
