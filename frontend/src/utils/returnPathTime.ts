import axios from "axios";

export default async (origin: string, destination: string, type: 'car' | 'pub' | 'vic' | 'wal') => {
  let distance: number = 0; // unit: meter
  let meterPerHour: number = 0;
  switch (type) {
    case 'car':
      meterPerHour = 80000;
      break;
    case 'pub':
      meterPerHour = 40000;
      break;
    case 'vic':
      meterPerHour = 20000;
      break;
    case 'wal':
      meterPerHour = 4000;
      break;
    default:
      meterPerHour = 0;
  }

  return axios.get(`https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`, {
    headers: {
      Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_NAVI_REST_API_KEY || 'SET_ENV_KEY'}`
    }
  }).then(res => {
    let result: string = '';
    distance = res.data.routes[0]?.summary?.distance;
    if (distance / meterPerHour >= 1) {
      const hour = Math.floor(distance / meterPerHour);
      result += `${hour}시간 `;
      distance %= hour * meterPerHour;
    }
    let minutes = Math.floor(distance / (meterPerHour / 60));
    result += `${minutes}분`;
    return result;
  }).catch(() => '');
};
