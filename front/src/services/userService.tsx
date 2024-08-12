import axiosInstance from "@/config/axiosInstance";
import { User } from "@/typings/IndexTypes";

export const getAllUsersService = async (): Promise<User[]> => {
  try {
    const { data } = await axiosInstance.get("/users");
    if (data && data.data) {
      return data.data; // Assuming 'data.data' is the actual array of users
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to fetch users");
  }
};

export const inviteUserService = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post(`/users/invite`, { email });
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to send invite");
  }
};

export const getMeService = async (): Promise<User> => {
  try {
    const { data } = await axiosInstance.get("/users/me");
    const userData = data.data;

    if (!userData) {
      throw new Error('Invalid user data');
    }

    return {
      id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar || '',
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to fetch user data");
  }
};

export const updateMeService = async (userData: any): Promise<User> => {
  try {
    const { data } = await axiosInstance.patch("/users/updateMe", userData);
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to update user data");
  }
};

export const updatePasswordService = async (passwordData: { currentPassword: string, newPassword: string, confirmPassword: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await axiosInstance.patch("/users/updateMyPassword", passwordData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to update password");
  }
};

export const deleteMeService = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await axiosInstance.delete("/users/deleteMe");
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to delete user");
  }
};

export const getUserService = async (id: string): Promise<User> => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to fetch user");
  }
};

export const updateUserService = async (id: string, userData: any): Promise<User> => {
  try {
    const { data } = await axiosInstance.patch(`/users/${id}`, userData);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to update user data");
  }
};

export const deleteUserService = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await axiosInstance.delete(`/users/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to delete user");
  }
};
