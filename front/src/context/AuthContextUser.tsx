import { createContext, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUser, setLoading, setError } from '@/redux/authSlice';
import { loginService,   /*  authUserService, */  logoutService, registerService, forgotPasswordService,verifyEmailService } from '@/services/authService';
import { ErrorResponse,AuthContextUserProps } from '@/typings/IndexTypes';

export const AuthContextUser = createContext<AuthContextUserProps>({
  user: null,
  login: async () => ({ success: false, message: '' }),
  logout: async () => ({ success: false, message: '' }),
  register: async () => ({ success: false, message: '' }),
  forgot: async () => ({ success: false, message: '' }),
  verifyEmailCode: async () => ({ success: false, message: '' }), 
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [cookies, setCookie, removeCookie] = useCookies(['customer_token']);
  const [, setLoadingUser] = useState(true);

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const loginResponse = await loginService(email, password);
      setCookie('customer_token', loginResponse.customerToken, { path: '/', maxAge: 10800 });
      dispatch(setUser(loginResponse.user ?? null)); // Ensure user is either User or null
      return { success: true, message: loginResponse.message };
    } catch (error) {
      console.error('Login failed:', error);
      dispatch(setError('Login failed. Please try again.'));
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      dispatch(setLoading(false));
    }
  };
    const verifyEmailCode = async (code: string, email: string) => {
      dispatch(setLoading(true));
      try {
        const response = await verifyEmailService(code, email);
        return { success: true, message: response.message };
      } catch (error) {
        console.error('Email verification failed:', error);
        dispatch(setError('Email verification failed. Please try again.'));
        return { success: false, message: 'Email verification failed. Please try again.' };
      } finally {
        dispatch(setLoading(false));
      }
    };
    const logout = async () => {
      dispatch(setLoading(true));
      try {
        // Perform logout service
        await logoutService();
        
        // Remove the session cookie
        removeCookie('customer_token', { path: '/' });
        
        // Clear user state
        dispatch(setUser(null));
        
        return { success: true, message: 'Logout successful' };
      } catch (error) {
        console.error('Logout failed:', error);
        dispatch(setError('Logout failed. Please try again.'));
        return { success: false, message: 'Logout failed. Please try again.' };
      } finally {
        dispatch(setLoading(false));
      }
    };
    

  const register = async (values: any) => {
    dispatch(setLoading(true));
    try {
      const response = await registerService(values);
      if (!response.success) {
        throw new Error(response.message);
      }
      return { success: true, message: response.message };
    } catch (error) {
      console.error('Registration failed:', error);
      dispatch(setError('Registration failed. Please try again.'));
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const forgot = async (email: string) => {
    dispatch(setLoading(true));
    try {
      const response = await forgotPasswordService(email);
      return { success: true, message: response.message };
    } catch (error) {
      console.error('Forgot password failed:', error);
      dispatch(setError('Forgot password failed. Please try again.'));
      return { success: false, message: 'Forgot password failed. Please try again.' };
    } finally {
      dispatch(setLoading(false));
    }
  };
  
 
useEffect(() => {
  const authUser = async () => {
    if (cookies['customer_token']) {
      dispatch(setLoading(true)); // Dispatching loading action
      try {
        const decodedToken = cookies['customer_token']; // Decoding the token
        dispatch(setUser(decodedToken)); // Dispatching user data to Redux store
      } catch (error) {
        removeCookie('customer_token', { path: '/' }); // Removing cookie
        dispatch(setUser(null)); // Setting user to null
        dispatch(setError((error as ErrorResponse)?.error || 'An error occurred during authentication')); // Dispatching error message
      } finally {
        dispatch(setLoading(false)); // Dispatching loading complete action
        setLoadingUser(false); // Update loadingUser state
      }
    }
  };

  authUser(); // Calling authentication function
}, [cookies, dispatch, removeCookie]); 

/* useEffect(() => {
  // Function to authenticate user
  const authUser = async () => {
    // Check if customer token exists in cookies
    if (cookies['customer_token']) {
      // Set loading state to true while authenticating
      dispatch(setLoading(true));
      try {
        // Authenticate user using customer token
        const authResponse = await authUserService(cookies['customer_token']);
        // Set authenticated user data in state
        dispatch(setUser(authResponse.user));
      } catch (error) {
        // If authentication fails, remove invalid token from cookies
        removeCookie('customer_token', { path: '/' });
        // Clear user data from state
        dispatch(setUser(null));
        // Set error message in state
        dispatch(setError((error as ErrorResponse)?.error || 'An error occurred during authentication'));
      } finally {
        // Set loading state to false after authentication process is complete
        dispatch(setLoading(false));
      }
    }
  };

  // Call authUser function when component mounts or when dependencies change
  authUser();
}, [cookies, dispatch, removeCookie]);     */


  return (
    <AuthContextUser.Provider value={{ user, login, logout, register, forgot, verifyEmailCode  }}>
      {children}
    </AuthContextUser.Provider>
  );
};
