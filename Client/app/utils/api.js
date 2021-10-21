import axios from 'axios';

const Api = {
  register: async (data) => {
    const res = await axios.post('http://localhost:5000/register', data);
    return res;
  },
  login: async (data) => {
    const res = await axios.post('http://localhost:5000/login', data);
    return res;
  },
  getUserEvents: async (token) => {
    const res = await axios.get('http://localhost:5000/event', {
      headers: { 'x-auth-token': token }
    });
    return res;
  },
  getAllUsers: async (token) => {
    const res = await axios.get('http://localhost:5000/users', {
      headers: { 'x-auth-token': token }
    });
    return res;
  },
  addEvent: async (data, token) => {
    const res = await axios.post('http://localhost:5000/event', data, {
      headers: { 'x-auth-token': token }
    });
    return res;
  },
  deleteEvent: async (eventId, token) => {
    const url = `http://localhost:5000/event/${eventId}`;
    const res = await axios.delete(url, {
      headers: { 'x-auth-token': token }
    });
    return res;
  },
  editEvent: async (data, eventId, token) => {
    const url = `http://localhost:5000/event/${eventId}`;
    const res = await axios.put(url, data, {
      headers: { 'x-auth-token': token }
    });
    return res;
  },
  isTokenValid: async (token) => {
    const res = await axios.post('http://localhost:5000/tokenIsValid', null, {
      headers: { 'x-auth-token': token }
    });
    return res;
  }
};

export default Api;
