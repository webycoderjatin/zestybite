import axios from 'axios'


const getUserInfoFromId = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/admin/u/${id}`);
        return response.data;
    } catch (err) {
        return err;
    }
};


export default getUserInfoFromId