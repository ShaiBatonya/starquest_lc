import axiosInstance from "@/config/axiosInstance";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  workspaces: { workspaceId: string }[];
};

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<{ status: string; data: User[] }>('/users');
  return response.data.data;
};
