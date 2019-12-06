import axios from 'axios';
import {API_URL} from '../config/constants'

 export  const getLoginDetails = async ()=> {
      return await axios.get(`${API_URL}/loginDetails`).then(res => res.data)
}

