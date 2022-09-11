import './MapWidget.scss';
import { AirportEntity, GPSCoordinates } from '../../../utils/common.types';
import Map from '../../Map/Map';

const MapWidget = (
  props: { airports: AirportEntity[], center: GPSCoordinates | null }
) => {
  return (
    <div className='widget map-widget'>
      <Map {...props} zoom={7}></Map>
    </div> 
  )
}

export default MapWidget;

