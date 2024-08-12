
import { useState, useContext, FormEvent, ChangeEvent } from "react";
import { AuthContextUser } from "@/context/AuthContextUser";
import { Navigate, useNavigate } from "react-router-dom";
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
  IconButton,
  InputAdornment,
} from '@mui/material';

import autoback from '@/assets/auto_back.png'
import {
  FormValuesRegister,
} from '@/typings/IndexTypes';
import Logo from "@/assets/Logo.png";
import { Link as RouterLink } from 'react-router-dom';
import { z, ZodError } from 'zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Create a default MUI theme
const defaultTheme = createTheme();

// Define schema for input validation
const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/\d/, "Password must include at least one digit"),
  passwordConfirm: z.string().nonempty("Password confirmation is required"),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

// Component for handling Register functionality
export default function Register() {
  const navigate = useNavigate();
  const { user, register } = useContext(AuthContextUser);
  const [, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<FormValuesRegister>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    // Clear error for the field being modified
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      schema.parse(values);  // Validate form values before calling the register function

      const response = await register(values);
      if (response && response.message) {
     
        setErrors({});
        navigate("/verification");
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (err) {
      // Set error message if registration fails
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path[0];
          fieldErrors[path] = error.message;
        });
        // Set errors for individual fields
        setErrors(fieldErrors);
      } else if (err instanceof Error) {
     
      } else {
      
      }
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  const isEmailValid = values.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) !== null;
  const isPasswordMatch = values.password === values.passwordConfirm;
  const passwordErrors = [
    !values.password.match(/.{8,}/) && "Password must be at least 8 characters long",
    !values.password.match(/[A-Z]/) && "Password must include at least one uppercase letter",
    !values.password.match(/\d/) && "Password must include at least one digit"
  ].filter(Boolean);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Background image container */}
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            order: { xs: 1, md: 2, lg: 2, xl: 2 },
            backgroundImage: `url(${autoback})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '40%',
          }}
        />

        {/* Form container */}
        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square sx={{ backgroundColor: '#121212', order: { xs: 2, md: 1, lg: 1, xl: 1 }, }}>
          <Box sx={{ my: 5, mx: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* Registration form */}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 10, width: '30vw' }}>
              {/* Logo */}
              <img style={{ width: '12vw', height: '12vh' }} src={Logo} alt="Company Logo" />

              {/* Form title */}
              <Typography component="h1" variant="h5" sx={{ color: 'white', alignSelf: 'flex-start', mb: 3 }}>
                Sign Up
              </Typography>

              {/* Full Name field */}
              <span style={{ color: 'white' }}>First Name</span>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#242424',
                    borderRadius: '10px',
                    '& input': {
                      color: 'white', // Inherit text color
                    },
                    border: errors.firstName ? '2px solid red' : values.firstName ? '2px solid green' : 'none',
                  },
                }}
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="Enter your first name"
                name="firstName"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
                onChange={handleInputChange}
                autoComplete="name"
                autoFocus
                InputLabelProps={{
                  style: { color: 'grey' }
                }}
                value={values.firstName}
              />

              {/* Last Name field */}
              <span style={{ color: 'white' }}>Last Name</span>
              <TextField
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#242424',
                    borderRadius: '10px',
                    '& input': {
                      color: 'white', // Inherit text color
                    },
                    border: errors.lastName ? '2px solid red' : values.lastName ? '2px solid green' : 'none',
                  },
                }}
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Enter your last name"
                name="lastName"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
                onChange={handleInputChange}
                autoComplete="name"
                InputLabelProps={{
                  style: { color: 'grey' }
                }}
                value={values.lastName}
              />

              {/* Email field */}
              <span style={{ color: 'white' }}>Enter Your Email Address</span>
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
                autoComplete="email"
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

              {/* Password fields */}
              <Grid container spacing={2}>
                {/* Password field */}
                <Grid item xs={12} sm={6}>
                  <span style={{ color: 'white' }}>Password</span>
                  <TextField
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#242424',
                        borderRadius: '10px',
                        '& input': {
                          color: 'white', // Inherit text color
                        },
                        border: errors.password ? '2px solid red' : values.password ? '2px solid green' : 'none',
                      },
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Create new password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    InputLabelProps={{
                      style: { color: 'grey' }
                    }}
                    value={values.password}
                    onChange={handleInputChange}
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
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                  />
                </Grid>
                {/* Confirm Password field */}
                <Grid item xs={12} sm={6}>
                  <span style={{ color: 'white' }}>Confirm Password</span>
                  <TextField
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: '#242424',
                        borderRadius: '10px',
                        '& input': {
                          color: 'white', // Inherit text color
                        },
                        border: errors.passwordConfirm ? '2px solid red' : values.passwordConfirm ? '2px solid green' : 'none',
                      },
                    }}
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm your password"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    InputLabelProps={{
                      style: { color: 'grey' }
                    }}
                    value={values.passwordConfirm}
                    onChange={handleInputChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                            edge="end"
                          >
                            {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.passwordConfirm)}
                    helperText={errors.passwordConfirm}
                  />
                </Grid>
              </Grid>

              {/* Password Errors */}
              {passwordErrors.length > 0 && (
                <Box mt={1}>
                  {passwordErrors.map((error, index) => (
                    <Typography key={index} variant="body2" color="error" align="center">
                      {error}
                    </Typography>
                  ))}
                </Box>
              )}

              {!isPasswordMatch && (
                <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                  Passwords do not match.
                </Typography>
              )}

              {/* Register button */}
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
                  Sign Up
                  <span style={{ marginLeft: '5px' }}>&gt;</span>
                </Button>
              </Box>

              {/* Login link */}
              <Box mt={2} sx={{ textAlign: 'center', color: 'white' }}>
                <div>
                  Already have an account?{' '}
                  <Link component={RouterLink} to="/login" variant="body2">
                    Log In
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

