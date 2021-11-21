import React from 'react';
import '../styles/components/MyRoutesSection.scss';
import addIcon from '../static/add_day_icon.svg';
import { PlaceType } from '../store/Post/postInterfaces';
import deleteIcon from '../static/delete.svg';
import CreatePlaceCard from './CreatePlaceCard';

interface PropType {
  days: number
  selectedDay: number
  routePlaces: any[]
  onClickDay: (value: number) => void
  onClickAddIcon: (value: number) => void
  onDeletePlace: (place: any) => void
}

function MyRoutesSection(props: PropType) {
  const { days, selectedDay, onClickDay, onClickAddIcon, routePlaces, onDeletePlace } = props;

  const renderDayButtons = () => {
    const results = [];
    for (let i=0; i < days; i++) {
      results.push(
        <div
          key={i+1}
          className={"my-routes-day-btn " + (i+1 === selectedDay ? ' selected' : '')}
          onClick={() => onClickDay(i+1)}
        >
          Day {i+1}
        </div>
      )
    }
    return results;
  }               

  return (
    <div className="my-routes-container">
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '90%', display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
          {renderDayButtons()}
        </div>
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
                icon={deleteIcon}
                type="route"
                onClickCartButton={onDeletePlace}
                isPlaceInCart={() => true}
              />
          })
        }
      </div>
    </div>
  )
}

export default React.memo(MyRoutesSection);
