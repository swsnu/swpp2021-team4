import axios from 'axios';
import {
  signinAction,
} from "../store/User/userAction";

interface SignupFormType {
  email: string
  username: string
  password: string
}

export const signup = (formData: SignupFormType) => {
  return axios.post('/user/signup/', formData)
    .then(() => {
      const { username, password } = formData;
      signinAction({ username, password });
    })
    .catch(() => console.log('signpup failed!'));
}
