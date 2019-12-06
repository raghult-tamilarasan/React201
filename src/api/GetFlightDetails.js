import axios from 'axios';
import {API_URL} from '../config/constants'

 export  const getPassengerList = async (flightNo)=> {
      return await axios.get(`${API_URL}/passengerDetails?flightNumber=${flightNo}`).then(res => res.data)
}

export  const getFlightDetails = async (flightNo)=> {
      return await axios.get(`${API_URL}/flightLists/${flightNo}`).then(res => res.data)
}

export  const getAllFlightDetails = async ()=> {
      return await axios.get(`${API_URL}/flightLists`).then(res => res.data)
}