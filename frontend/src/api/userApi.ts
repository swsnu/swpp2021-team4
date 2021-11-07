import axios from 'axios';

interface SignupFormType {
  email: string
  username: string
  password: string
}

export const signup = (formData: SignupFormType) => {
  return axios.post('/user/signup/', formData)
    .then((res) => res)
    .catch((err) => err.response);
}
