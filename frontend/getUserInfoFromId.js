import axios from 'axios'
const baseURL = import.meta.env.VITE_API_URL;


const getUserInfoFromId = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/admin/u/${id}`);
        return response.data;
    } catch (err) {
        return err;
    }
};


export default getUserInfoFromId