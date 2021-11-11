import React from 'react';
import '../styles/components/MyRoutesSection.scss';
import addIcon from '../static/add_day_icon.svg';
import { PlaceType } from '../store/Post/postInterfaces';
import Place from './Place';
// import Place from './Place';

interface PropType {
  days: number
  selectedDay: number
  onClickDay: (value: number) => void;
  onClickAddIcon: (value: number) => void
  routePlaces: any[]
}

function MyRoutesSection(props: PropType) {
  const { days, selectedDay, onClickDay, onClickAddIcon, routePlaces } = props;

  const renderDayButtons = () => {
    const results = [];
    for (let i=1; i < days+1; i++) {
      results.push(
        <div
          key={i}
          className={"my-routes-day-btn " + (i === selectedDay ? ' selected' : '')}
          onClick={() => onClickDay(i)}
        >
          Day {i}
        </div>
      )
    }
    return results;
  }               

  return (
    <div className="my-routes-container">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {renderDayButtons()}
        <img
          style={{ marginLeft: '11px' }}
          onClick={() => onClickAddIcon(days+1)}
          src={addIcon}
        />
      </div>
      <div className="my-routes-places-container">
        { routePlaces.map((result: { day: number, place: PlaceType }) => {
          const { place, day } = result;
          console.log(result);
          return day === selectedDay
            ? <Place key={place.id} place={place} icon='' onClickButton={() => {}} onAddButton={() => {console.log('눌렵씁니다')}} />
            : null;
        })}
      </div>
    </div>
  )
}

export default React.memo(MyRoutesSection);
