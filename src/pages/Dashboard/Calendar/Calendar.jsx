import ApiCalendar from "react-google-calendar-api";
import { GoogleConfig } from '../../../utils/google';

const apiCalendar = new ApiCalendar(GoogleConfig);

const Calendar = () => {
  return apiCalendar.getEvent('Ro5QAnZSfH2BcMxD3VBHSWF3iHkz').then((r) => console.log(r));
}

export default Calendar;