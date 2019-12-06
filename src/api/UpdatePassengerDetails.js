import axios from 'axios';
import {API_URL} from '../config/constants'

 export  const updateSeat = async (passengerDetails) => {
     console.log(passengerDetails);
      return await axios.put(`${API_URL}/passengerDetails/${passengerDetails.id}`, passengerDetails).then(res => res.data)
}
