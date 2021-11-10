import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/Map.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

const dummyPlaces = [
  {day: 1, name: '곱창고', lat: 37.49995, lon: 127.027925},
  {day: 1, name: '시코르', lat: 37.50203907104957, lon: 127.02531725648348},
  {day: 2, name: '삼성전자', lat: 37.49733554663784, lon: 127.02791103551873},
  {day: 2, name: '와라와라', lat: 37.49498833856227, lon: 127.03127140544494},
  {day: 1, name: '서운중학교', lat: 37.493508152438245, lon: 127.0247135738803},
]

interface DummyPlace {
  day: number
  name: string
  lat: number
  lon: number
}

// interface PropType {
//   marks: any
//   days: number
//   fromWhere: string // create | edit
// }

function Map() {
  const [selectedDay, setSelecteDay] = useState(1);
  const [markers, setMarkers] = useState<any>([]);
  const map = useRef();

  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(37.49793, 127.027640), // default is location's position. if it is not given, then Gangnam station will be the center.
      level: 6
    };

    map.current = new window.kakao.maps.Map(container, options);
    if (map && dummyPlaces) {
      console.log('map loaded!');
    }
  }, []);

  useEffect(() => {
    const allMarkers = dummyPlaces.map((mark: DummyPlace) => {
      const { day, lat, lon } = mark;
      return {
        day,
        marker: new window.kakao.maps.Marker({
          map: day === selectedDay ? map.current : null,
          position: new window.kakao.maps.LatLng(lat, lon),
        })
      };
    });
    setMarkers(allMarkers);
  }, [dummyPlaces]);

  useEffect(() => {
    markers.forEach((mark: any) => mark.day !== selectedDay ? mark.marker.setMap(null) : mark.marker.setMap(map.current));
  }, [selectedDay]);

  return (
    <div className="map-container">
      <div className="map-title">Map</div>
      <div id="map" />
      <div className="map-create-btn" onClick={() => setSelecteDay(Math.floor(Math.random()*2)+1)}>Create</div>
    </div>
  );
}

export default Map;
