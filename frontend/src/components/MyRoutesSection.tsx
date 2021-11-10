import React from 'react';
import '../styles/components/MyRoutesSection.scss';
import addIcon from '../static/add_day_icon.svg';
// import Place from './Place';

interface PropType {
  days: number
  selectedDay: number
  onClickDay: (value: number) => void;
  onClickAddIcon: (value: number) => void
}

function MyRoutesSection(props: PropType) {
  const { days, selectedDay, onClickDay, onClickAddIcon } = props;

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
        {/* <Place /> */}
      </div>
    </div>
  )
}

export default React.memo(MyRoutesSection);
