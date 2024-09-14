// utils/apiUtils.ts
import { message } from "antd";

export const handleApiRequest = async (
    apiCall: () => Promise<any>,
    onSuccess: (response: any) => void,
    setLoading: (loading: boolean) => void
) => {
    setLoading(true);
    try {
        const response = await apiCall();
        if (response.code === 200 || response.code === 201) {
            message.success(response.message);
            onSuccess(response);
        } else {
            message.error(response.message || "Unknown error occurred");
        }
    } catch (error: any) {
        message.error(error.response?.message || "Error occurred");
        console.error("API request error:", error);
    } finally {
        setLoading(false);
    }
};
