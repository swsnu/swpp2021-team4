import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
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
