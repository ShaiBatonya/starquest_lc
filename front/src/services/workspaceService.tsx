// src/services/workspaceService.ts

import axiosInstance from "@/config/axiosInstance";
import { User } from "@/typings/IndexTypes";

export const getWorkspaceUsersService = async (workspaceId: string): Promise<User[]> => {
  try {
    const { data } = await axiosInstance.get<{ data: User[] }>(`/workspace/${workspaceId}/users`);
    return data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to fetch workspace users");
  }
};

export const sendInvitationService = async (email: string, workspaceId: string): Promise<void> => {
  try {
    await axiosInstance.post('/workspace/send-invitation', { inviteeEmail: email, workspaceId });
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Failed to send invitation");
  }
};
