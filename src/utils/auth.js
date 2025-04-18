import axios from 'axios';

export const refreshToken = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/users/refresh',
      {},
      { withCredentials: true }
    );
    
    if (response.data.success) {
      localStorage.setItem('accessToken', response.data.accessToken);
      return response.data.accessToken;
    }
    throw new Error('Token refresh failed');
  } catch (error) {
    console.error('Refresh token error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post(
      'http://localhost:5000/api/users/logout',
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
    window.location.href = '/login';
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};
