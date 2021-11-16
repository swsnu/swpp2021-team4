import React from 'react';
import '../styles/components/MyRoutesSection.scss';
import addIcon from '../static/add_day_icon.svg';
import { PlaceType } from '../store/Post/postInterfaces';
import cart from "../static/cart-icon.svg";
import CreatePlaceCard from './CreatePlaceCard';

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
        {
          routePlaces.map((result: { day: number, place: PlaceType }) => {
            const { place, day } = result;
            return day !== selectedDay ? null :
              <CreatePlaceCard
                key={place.id}
                place={place}
                icon={cart}
                onClickButton={() => {}}
              />
          })
        }
      </div>
    </div>
  )
}

export default React.memo(MyRoutesSection);
