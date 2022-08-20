const AirporSearchItem = (
  { name, searchName, iata, distance, search, nearby, onClick }:
  { name: string, searchName: string, iata: string, distance?: number, 
    search: string, nearby: boolean, onClick: (name: string, iata: string) => void }) => {
  let airportName;
  const s_name = name.toLowerCase();
  const searchIndex = s_name.indexOf(search);
  if (search.length > 0 && searchIndex >= 0) {
    airportName = (
      <span>
        {name.slice(0, searchIndex)}
        <b>{name.slice(searchIndex, searchIndex + search.length)}</b>
        {name.slice(searchIndex + search.length)}
      </span>
    )
  } else {
    airportName = name;
  }

  return (
    <li onClick={() => onClick(name, iata)}>
      <span className='airport-search-list-item'>
        <span className='airport-search-icon material-icons'>
          {nearby ? 'near_me' : 'flight'}
        </span>
        <span className='airport-name'>{airportName}</span>
      </span>
      {distance
        ? <span className='airport-search-distance'>{`${distance} km`}</span>
        : ''
      }
    </li>
  );
}

export default AirporSearchItem;