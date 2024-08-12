
import { useState, useContext, FormEvent } from "react";
import { AuthContextUser } from "@/context/AuthContextUser";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  IconButton,
  InputAdornment,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink } from 'react-router-dom';
import Logo from "@/assets/Logo.png";
import autoback from '@/assets/auto_back.png';
import { FormValuesLogin } from '@/typings/IndexTypes';
import { z, ZodError } from 'zod';

// Create a default MUI theme
const defaultTheme = createTheme();

// Define schema for input validation
const schema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty(),
});

// Component for handling login functionality
export default function Login() {
  // Access the navigation function from react-router-dom
  const navigate = useNavigate();

  // Access user data and login function from AuthContext
  const { user, login } = useContext(AuthContextUser);
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State variables for loading status, form values, and messages
  const [, setLoading] = useState(false);
  const [values, setValues] = useState<FormValuesLogin>({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email" && !/^[\w@.\-+]*$/.test(value)) {
      return;
    }

    setValues((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleKeyUp = (fieldName: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  // Handle form submission for user login
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Call login function with email and password values
      const response = await login(values.email, values.password);
      schema.parse(values);
      setErrors({});
      // Display success message and navigate to home page
      toast.success(response.message);
      navigate("/");
    } catch (err) {
      // Set error message if login fails
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path[0] as string;
          fieldErrors[path] = error.message;
        });
        // Set errors for individual fields
        setErrors(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home page if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  const isEmailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
  const isPasswordValid = values.password.length > 0;

  return (
    // Apply the default theme to the entire component
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Right-side container with background image */}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            order: { xs: 1, md: 2, lg: 2, xl: 2 },
            backgroundImage: `url(${autoback})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '40%',
          }}
        />

        {/* Left-side container with login form */}
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square sx={{
          backgroundColor: '#121212',
          order: { xs: 2, md: 1, lg: 1, xl: 1 },
        }}>
          <Box
            sx={{
              my: 5,
              mx: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 10, width: '30vw' }}>
              {/* Logo */}
              <img style={{ width: '12vw', height: '12vh' }} src={Logo} />

              {/* Header */}
              <Typography component="h1" variant="h5" sx={{ color: 'white', alignSelf: 'flex-start', mb: 3 }}>
                Log in
              </Typography>

              {/* Email input */}
              <span style={{ color: 'white' }}>Email Address</span>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#242424',
                    borderRadius: '10px',
                    '& input': {
                      color: 'white', // Inherit text color
                    },
                    border: errors.email ? '2px solid red' : isEmailValid ? '2px solid green' : 'none',
                  },
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email address"
                name="email"
                error={Boolean(errors.email)}
                helperText={errors.email}
                onChange={handleInputChange}
                onKeyUp={() => handleKeyUp('email')}
                autoComplete="email"
                autoFocus
                InputLabelProps={{
                  style: { color: 'grey' }
                }}
                value={values.email}
              />
              {/* Display validation message */}
              {values.email.trim() !== '' && !isEmailValid && (
                <span style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
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

              {/* Password input */}
              <span style={{ color: 'white' }}>Password</span>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#242424',
                    borderRadius: '10px',
                    '& input': {
                      color: 'white', // Inherit text color
                    },
                    border: errors.password ? '2px solid red' : isPasswordValid ? '2px solid green' : 'none',
                  },
                }}
                margin="normal"
                required
                fullWidth
                label="Enter your Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                error={Boolean(errors.password)}
                helperText={errors.password}
                onChange={handleInputChange}
                onKeyUp={() => handleKeyUp('password')}
                autoComplete="password"
                InputLabelProps={{
                  style: { color: 'grey' }
                }}
                value={values.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Remember me checkbox and forgot password link */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: 'white',
                  alignItems: 'center',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon style={{ color: 'grey' }} />}  // Set the color of the unchecked icon
                      checkedIcon={<CheckCircleIcon style={{ color: 'grey' }} />}     // Set the color of the checked icon
                    />
                  }
                  label="Remember me"
                />
                <Link component={RouterLink} to="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Box>

              {/* Login button */}
              <Box mt={7}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    width: '100%',
                    height: '51px',
                    borderRadius: '12px',
                    padding: '16px 24px',
                    marginTop: '4px',
                    backgroundColor: '#0143FF',
                  }}
                >
                  Login
                  <span style={{ marginLeft: '5px' }}>&gt;</span>
                </Button>
              </Box>

              {/* Sign up link */}
              <Box mt={2} sx={{ textAlign: 'center', color: 'white' }}>
                <div>
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/register" variant="body2">
                    Sign In
                  </Link>
                </div>
              </Box>
              {/* Verification link */}
              <Box mt={2} sx={{ textAlign: 'center', color: 'white' }}>
                <div>
                  Verification?{' '}
                  <Link component={RouterLink} to="/verification" variant="body2">
                    Verification
                  </Link>
                </div>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
