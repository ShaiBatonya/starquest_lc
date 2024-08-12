import React, { useState, useEffect, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Typography, CircularProgress, Avatar, Grid, Box, Tabs, Tab, CssBaseline, IconButton, InputAdornment } from '@mui/material';
import { getMeService, updateMeService, updatePasswordService, deleteMeService } from '@/services/userService';
import { RootState } from '@/redux/store';
import { setUser, updateUser } from '@/redux/authSlice';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';
import AvatarEditor from 'react-avatar-editor';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Logo from "@/assets/Logo.png";
import { z, ZodError } from 'zod';
import selfi1 from "@/assets/selfi1.png";
import selfi2 from "@/assets/selfi2.png";
import selfi3 from "@/assets/selfi3.png";
import selfi5 from "@/assets/selfi5.png";
import { User } from '@/typings/IndexTypes';
import propilldhas from '@/assets/propilldhas.jpeg';

const profileSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email address"),
  role: z.string().nonempty("Role is required"),
});

const passwordSchema = z.object({
  currentPassword: z.string().nonempty("Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/\d/, "Password must include at least one digit"),
  confirmPassword: z.string().nonempty("Password confirmation is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#FFFFFF',
  borderRadius: '15px',
  padding: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
  marginTop: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  height: '100%',
}));

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
`;

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF5722',
  '&:hover': {
    backgroundColor: '#E64A19',
  },
  color: '#FFFFFF',
  padding: theme.spacing(1, 4),
  borderRadius: '20px',
  margin: theme.spacing(2, 0),
  animation: `${fadeIn} 0.5s ease-in-out`,
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    color: '#B0BEC5',
  },
  '& .MuiInputBase-input': {
    color: '#FFFFFF',
  },
  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: '#B0BEC5',
  },
  animation: `${fadeIn} 0.5s ease-in-out`,
});

const StyledTabs = styled(Tabs)({
  backgroundColor: '#2e2e3a',
  borderRadius: '8px',
  marginBottom: '16px',
});

const StyledTab = styled(Tab)({
  color: '#B0BEC5',
  '&.Mui-selected': {
    color: '#FF5722',
  },
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
  border: `2px solid ${theme.palette.primary.main}`,
  animation: `${scaleUp} 0.5s ease-in-out`,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#2e2e3a',
  borderRadius: '15px',
  padding: theme.spacing(3),
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
  textAlign: 'center',
  animation: `${fadeIn} 1s ease-in-out`,
  height: '90%',
  overflowY: 'auto',
}));

const avatarOptions = [
  { src: selfi1, alt: 'Avatar 1' },
  { src: selfi2, alt: 'Avatar 2' },
  { src: selfi3, alt: 'Avatar 3' },
  { src: selfi5, alt: 'Avatar 4' },
];

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
    role: '',
    settingExample: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [tabIndex, setTabIndex] = useState(0);
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [avatarEditor, setAvatarEditor] = useState<AvatarEditor | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getMeService();
        if (!userData || !userData.firstName || !userData.email || !userData.role) {
          throw new Error('Invalid user data');
        }

        dispatch(setUser(userData));
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          avatar: userData.avatar || '',
          role: userData.role,
          settingExample: '',
        });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarImage(e.target.files[0]);
    }
  };

  const handleAvatarSelect = async (avatar: string) => {
    setFormData({ ...formData, avatar });
    try {
      await updateMeService({ ...formData, avatar });
      dispatch(updateUser({ avatar }));
    } catch (err) {
      alert(`Failed to update avatar: ${(err as Error).message}`);
    }
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      profileSchema.parse(formData);  // Validate form values before calling the update function
      if (avatarEditor) {
        const canvas = avatarEditor.getImageScaledToCanvas().toDataURL();
        setFormData({ ...formData, avatar: canvas });
        await updateMeService({ ...formData, avatar: canvas });
        dispatch(updateUser({ ...formData, avatar: canvas }));
      } else {
        await updateMeService(formData);
        dispatch(updateUser(formData));
      }
      alert('Profile updated successfully');
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path[0];
          fieldErrors[path] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        alert(`Failed to update profile: ${(err as Error).message}`);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      passwordSchema.parse(passwordData);  // Validate password values before calling the update function
      await updatePasswordService(passwordData);
      alert('Password updated successfully');
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          const path = error.path[0];
          fieldErrors[path] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        alert(`Failed to update password: ${(err as Error).message}`);
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      setUpdating(true);
      try {
        await deleteMeService();
        alert('Profile deleted successfully');
        dispatch(setUser(null));
      } catch (error) {
        console.error('Failed to delete profile', error);
        alert(`Failed to delete profile: ${(error as Error).message}`);
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (loading) return <CircularProgress sx={{ color: '#FF5722', mt: 4 }} />;

  return (
    <Box
      sx={{
        bgcolor: '#000000',
        minHeight: '100vh',
        py: 4,
        backgroundImage: `url(${propilldhas})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <StyledContainer maxWidth="lg">
        <CssBaseline />
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <img style={{ width: '12vw', height: '12vh' }} src={Logo} alt="Company Logo" />
              <StyledAvatar alt={`${formData.firstName} ${formData.lastName}`} src={formData.avatar} />
              <Typography variant="h4" gutterBottom>
                {formData.firstName} {formData.lastName}'s Profile
              </Typography>
              <Typography variant="h6" gutterBottom>
                Role: {formData.role}
              </Typography>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <StyledButton variant="contained" startIcon={<CloudUploadIcon />}>
                  Change Avatar
                </StyledButton>
              </label>
              {avatarImage && (
                <AvatarEditor
                  ref={setAvatarEditor}
                  image={avatarImage}
                  width={250}
                  height={250}
                  border={50}
                  borderRadius={125}
                  scale={1.2}
                  rotate={0}
                />
              )}
              <Box display="flex" justifyContent="center" mt={2}>
                {avatarOptions.map((avatar) => (
                  <IconButton
                    key={avatar.alt}
                    onClick={() => handleAvatarSelect(avatar.src)}
                    sx={{
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.2)',
                      },
                    }}
                  >
                    <Avatar src={avatar.src} alt={avatar.alt} sx={{ width: 56, height: 56, border: '2px solid #FF5722' }} />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledTabs value={tabIndex} onChange={handleTabChange} centered>
              <StyledTab label="Personal Info" />
              <StyledTab label="Settings" />
              <StyledTab label="Security" />
            </StyledTabs>
            <StyledBox>
              <form onSubmit={tabIndex === 2 ? handleUpdatePassword : handleUpdateProfile}>
                {tabIndex === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                      />
                    </Grid>
                  </Grid>
                )}
                {tabIndex === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Settings</Typography>
                      <StyledTextField
                        name="settingExample"
                        label="Example Setting"
                        value={formData.settingExample}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.settingExample)}
                        helperText={errors.settingExample}
                      />
                    </Grid>
                  </Grid>
                )}
                {tabIndex === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Security</Typography>
                      <StyledTextField
                        name="currentPassword"
                        label="Current Password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.currentPassword)}
                        helperText={errors.currentPassword}
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
                      <StyledTextField
                        name="newPassword"
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.newPassword)}
                        helperText={errors.newPassword}
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
                      <StyledTextField
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPasswordConfirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
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
                      />
                    </Grid>
                    <Box mt={4} textAlign="center">
                      <StyledButton
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        disabled={updating}
                      >
                        {updating ? 'Updating...' : 'Update Password'}
                      </StyledButton>
                    </Box>
                    <Box mt={4} textAlign="center">
                      <StyledButton
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteProfile}
                        disabled={updating}
                      >
                        {updating ? 'Deleting...' : 'Delete Profile'}
                      </StyledButton>
                    </Box>
                  </Grid>
                )}
                {tabIndex !== 2 && (
                  <Box mt={4} textAlign="center">
                    <StyledButton
                      type="submit"
                      variant="contained"
                      startIcon={<SaveIcon />}
                      disabled={updating}
                    >
                      {updating ? 'Updating...' : 'Update Profile'}
                    </StyledButton>
                  </Box>
                )}
              </form>
            </StyledBox>
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
};

export default UserProfile;
