import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/Map.scss';

declare global {
  interface Window {
    kakao: any;
  }
}
const { kakao } = window;

const dummyPlaces = [
  {day: 1, name: '곱창고', lat: 37.49995, lon: 127.027925},
  {day: 1, name: '시코르', lat: 37.50203907104957, lon: 127.02531725648348},
  {day: 2, name: '삼성전자', lat: 37.49733554663784, lon: 127.02791103551873},
  {day: 2, name: '와라와라', lat: 37.49498833856227, lon: 127.03127140544494},
  {day: 1, name: '서운중학교', lat: 37.493508152438245, lon: 127.0247135738803},
]

// interface DummyPlace {
//   day: number
//   name: string
//   lat: number
//   lon: number
// }

interface PropType {
  // marks: any
  // fromWhere: string // create | edit
  // days: number
  location?: string
  selectedDay?: number
  placeList?: any[]
}

function Map(props: PropType) {
  const { location, selectedDay, placeList = dummyPlaces } = props;
  const [markers, setMarkers] = useState<any>([]);
  const map = useRef<any>();

  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(37.49793, 127.027640), // default is location's position. if it is not given, then Gangnam station will be the center.
      level: 6
    };

    map.current = new kakao.maps.Map(container, options);
    if (map && placeList) {
      console.log('map loaded!');
    }
  }, []);

  useEffect(() => {
    console.log(placeList);
    const allMarkers = placeList.map((mark: any) => {
      console.log('mark', mark);
      const { day, place } = mark;
      return {
        day,
        marker: new kakao.maps.Marker({
          map: day === selectedDay ? map.current : null,
          position: new kakao.maps.LatLng(place.lat, place.lon),
        })
      };
    });
    setMarkers(allMarkers);
  }, [placeList]);

  useEffect(() => {
    markers.forEach((mark: any) => mark.day !== selectedDay ? mark.marker.setMap(null) : mark.marker.setMap(map.current));
  }, [selectedDay]);

  useEffect(() => {
    if (location) {
      let places = new kakao.maps.services.Places();
      let placesSearchCB = (results: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          // console.log(results);
          // let x = 0;
          // let y = 0;
          // results.forEach((result: any) => {
          //   x += parseFloat(result.x);
          //   y += parseFloat(result.y);
          // });
          // x /= results.length;
          // y /= results.length;
          
          map.current?.setCenter(new kakao.maps.LatLng(results[0].y, results[0].x));

        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert('검색 중 오류가 발생했습니다.');
        }
      }
      places.keywordSearch(location, placesSearchCB);
    }
  }, [location]);

  return (
    <div className="map-container">
      <div className="map-title">Map</div>
      <div id="map" />
      <div className="map-create-btn">Create</div>
    </div>
  );
}

export default React.memo(Map);
