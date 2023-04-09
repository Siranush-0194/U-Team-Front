import React, { useState, useEffect } from 'react';
import { axios_03 } from '../../../axios';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css"

const  MyCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
     function fetchEvents() {
              axios_03.get('/google/oauth2')
             .then(response => {
                console.log(response);
                setEvents(response.data);
                       })
        
    }

    fetchEvents();
  }, []);

  function renderTileContent({ date, view }) {
    const event = events.find((event) => event.date === date.toISOString());

    if (view === 'month' && event) {
      return (
        <div>
          {event.title}
        </div>
      );
    }

    return null;
  }

  return (
    <Calendar
      onChange={(value) => console.log(value)}
      tileContent={renderTileContent}
    />
  );
}


export default MyCalendar;