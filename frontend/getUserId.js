import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const getUserId = async () => {
  try {
    const response = await axios.get(`${baseURL}/check-auth`, {
      withCredentials: true,
    });
    return response.data.user.id;
  } catch (err) {
    if (err.response?.status === 401) {
      console.log("Not authorized");
    } else {
      console.log(err);
    }
    return null;
  }
};

export default getUserId;
