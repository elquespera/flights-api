import './MapWidget.scss';
import { AirportEntity, GPSCoordinates } from '../../../utils/common.types';
import Map from '../../Map/Map';

const MapWidget = (
  props: { airports: AirportEntity[], center: GPSCoordinates | null }
) => {
  return (
    <Map {...props} zoom={7}></Map> 
  )
}

export default MapWidget;

