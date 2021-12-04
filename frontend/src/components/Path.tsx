import React, { useEffect, useState } from 'react';
import arrowDownIcon from '../static/arrow_down.svg';
import '../styles/components/Path.scss';
import { PathListType, PlaceType } from '../store/Post/postInterfaces';
import returnPathTime from '../utils/returnPathTime';

interface PropsType {
  from: PlaceType
  to: PlaceType
  pathList: PathListType
  onChangePath: (e: React.ChangeEvent<HTMLSelectElement>, origin: PlaceType, destination: PlaceType) => void
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
    pathList,
    onChangePath
  } = props;

  const [posFrom, setPosFrom] = useState('');
  const [posTo, setPosTo] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const setPathTime = async () => {
      const pathTime: string = await returnPathTime(posFrom, posTo, pathList[from.id]?.transportation);
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

  return (
    <div className="path-container">
      <img src={arrowDownIcon} />
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
      <span>{
        pathList[from.id]?.transportation && typeof time === 'string'
        ? `약 ${time}`
        : ''
      }</span>
    </div>
  )
}

export default React.memo(Path);
