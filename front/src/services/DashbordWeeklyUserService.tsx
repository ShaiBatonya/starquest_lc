import axiosInstance from "@/config/axiosInstance";

export const DashbordWeeklyUserService = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/weekly");
    return { 
      success: true, 
      data: response.data 
    };
  } catch (error: any) {
    throw new Error(error.response.data.error || "Failed to retrieve weekly dashboard statistics");
  }
};
