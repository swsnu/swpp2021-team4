import React from 'react';
import '../styles/components/PlaceSearchSection.scss';


interface PropType {
  selectedTab: 'place' | 'search'
  onClickTabButton: (type: 'place' | 'search') => void
}

function PlaceSearchSection(props: PropType) {
  const { selectedTab, onClickTabButton } = props;

  return (
    <div className="place-search-container">
      <div className="place-search-tab-container">
        <div
          id="place"
          className={"tab-title" + (selectedTab === 'place' ? ' selected' : '')}
          onClick={() => onClickTabButton('place')}
        >
          Places
        </div>

        <div
          id="search"
          className={"tab-title" + (selectedTab === 'search' ? ' selected' : '')}
          onClick={() => onClickTabButton('search')}
        >
          Search
        </div>
      </div>
    </div>
  );
}

export default React.memo(PlaceSearchSection);
