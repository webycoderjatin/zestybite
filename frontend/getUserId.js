import axios from 'axios';

const getUserId = async () => {
  try {
    const response = await axios.get("http://localhost:5000/check-auth", {
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
