import axios from "axios";

export default (origin: string, destination: string, type: 'car'|'pub'|'vic'|'wal') => {
  axios.get(`https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`, {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_NAVI_REST_API_KEY || 'SET_ENV_KEY'}`
    }
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));


  return type;
};
