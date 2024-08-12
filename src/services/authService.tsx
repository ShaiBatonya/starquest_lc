import axiosInstance from "@/config/axiosInstance";
import { LoginResponse } from "@/typings/IndexTypes";


export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });

    return {
      success: true,
      message: data.message,
      customerToken: data.customer_token,
      user: data.user || null, // Ensure user is either User or null
    };
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

/*  export const authUserService = async (customerToken: string) => {
  try {
    const { data } = await axiosInstance.get("/users/customers/auth", {
      headers: {
        Authorization: `Bearer ${customerToken}`,
      },
    });

    return {
      success: true,
      user: data.user,
    };
  } catch (error: any) {
    throw new Error(error.response.data.error || "An error occurred");
  }
};   */ 

export const logoutService = async () => {
  try {
    await axiosInstance.get("/auth/logout");

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error : any) {
    throw new Error(error.response.data.error);
  }
};



export const registerService = async (values: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
 
}): Promise<{ success: boolean; message: string }> => {
  try {
    const { firstName, lastName, email, password, passwordConfirm,  } = values;

    const response = await axiosInstance.post("/auth/signup", {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
   
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: any) {
    throw new Error((error.response?.data?.error || "Error in registering user") as string);
  }
};

export const forgotPasswordService = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auth/forgotPassword", {
      email,
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: any) {
    throw new Error(error.response.data.error || "Error in sending password link");
  }
};
export const verifyEmailService = async (code: string, email: string): Promise<{ status: string; message: string } | any> => {
  try {
    const response = await axiosInstance.post('/auth/verifyEmail', { code, email });
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};




