import axios from 'axios';

export default token => {
  if(token) {
    // If there is token apply it to eveyr request
    axios.defaults.headers.common['Authorization'] = token;
  }
  else{
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
}