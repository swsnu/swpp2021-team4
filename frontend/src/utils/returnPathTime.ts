import axios from "axios";

export default async (origin: string, destination: string, type: 'car'|'pub'|'vic'|'wal') => {
  let distance: number = 0; // unit: meter
  let meterPerHour: number =
    type === 'car' ? 80000 :
    type === 'pub' ? 40000 :
    type === 'vic' ? 20000 :
    type === 'wal' ? 4000 :
    0;
  let result: string = '';

  return axios.get(`/v1/directions?origin=${origin}&destination=${destination}`, {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_NAVI_REST_API_KEY || 'SET_ENV_KEY'}`
    }
  }).then(res => {
    distance = res.data.routes[0]?.summary?.distance;
    if (distance/meterPerHour >= 1) {
      const hour = Math.floor(distance/meterPerHour);
      result += `${hour}시간 `;
      distance %= hour*meterPerHour;
    }
    return result += `${Math.floor(distance/(meterPerHour/60))}분`
  }).catch(() => '');
};
