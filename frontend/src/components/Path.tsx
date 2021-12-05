import React, { useEffect, useState } from 'react';
import arrowDownIcon from '../static/arrow_down.svg';
import '../styles/components/Path.scss';
import { PathListType, PlaceType } from '../store/Post/postInterfaces';
import returnPathTime from '../utils/returnPathTime';

interface PropsType {
  from: PlaceType
  to: PlaceType
  transportation?: string
  pathList?: PathListType
  onChangePath?: (e: React.ChangeEvent<HTMLSelectElement>, origin: PlaceType, destination: PlaceType) => void
}

const transportationTypes = [
  { value: '', name: '이동수단' },
  { value: 'car', name: '자동차' },
  { value: 'pub', name: '대중교통' },
  { value: 'vic', name: '자전거' },
  { value: 'wal', name: '걷기' }
]

function Path(props: PropsType) {
  const {
    from,
    to,
    transportation = '',
    pathList = {},
    onChangePath = () => {}
  } = props;

  const [posFrom, setPosFrom] = useState('');
  const [posTo, setPosTo] = useState('');
  const [time, setTime] = useState('');
  const [pathInfoData, setPathInfoData] = useState({
    transportation: '',
    velocity: 0
  });

  useEffect(() => {
    const setPathTime = async () => {
      const pathTime: string = await returnPathTime(posFrom, posTo, pathList[from.id]?.transportation || transportation);
      setTime(pathTime);
    }
    if (posFrom && posTo) {
      setPathTime();
    }
  }, [posFrom, posTo, pathList]);

  useEffect(() => {
    setPosFrom(`${from.lon},${from.lat}`);
    setPosTo(`${to.lon},${to.lat}`);
  }, [from, to]);

  useEffect(() => {
    let transportationName: string = '';
    let velocity: number = 0;
    switch (transportation) {
      case 'car':
        transportationName = '자동차';
        velocity = 80;
        break;
      case 'pub':
        transportationName = '대중버스';
        velocity = 40;
        break;
      case 'vic':
        transportationName = '자전거';
        velocity = 20;
        break;
      case 'wal':
        transportationName = '걷기';
        velocity = 4;
        break;
      default:
        transportationName = '';
        velocity = 0;
    }
    if (velocity && transportationName) {
      setPathInfoData({
        transportation: transportationName,
        velocity
      });
    }
  }, [transportation])

  return (
    <div className="path-container">
      <img src={arrowDownIcon} />
      {
        Object.keys(pathList).length > 0 &&
        <>
          <select
            id="path"
            className="path-select-container"
            name="path"
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChangePath(event, from, to)}
          >
            {
              transportationTypes.map((t: {name: string, value: string}) => {
                return pathList[from.id] && pathList[from.id].transportation === t.value
                  ? <option key={t.value} value={t.value} selected>{t.name}</option>
                  : <option key={t.value} value={t.value}>{t.name}</option>;
              })
            }
          </select>
          <span>
            {
              pathList[from.id]?.transportation && !time.includes('NaN')
              ? `약 ${time}`
              : ''
            }
          </span>
        </>
      }
      {
        Object.keys(pathList).length == 0 &&
        <span style={{ marginLeft: 20, fontSize: '0.75rem' }}>
          {
            transportation && !time.includes('NaN')
            ? `약 ${time} (${pathInfoData.transportation}, 시속 ${pathInfoData.velocity}km 기준)`
            : ''
          }
        </span>
      }
    </div>
  )
}

export default React.memo(Path);
