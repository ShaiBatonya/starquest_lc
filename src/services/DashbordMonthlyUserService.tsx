import axiosInstance from "@/config/axiosInstance";

export const getMonthlyDashboardStatistics = async () => {
  try {
    const response = await axiosInstance.get("/dashboard/monthly");
    return { 
      success: true, 
      data: response.data 
    };
  } catch (error: any) {
    throw new Error(error.response.data.error || "Failed to retrieve monthly dashboard statistics");
  }
};

