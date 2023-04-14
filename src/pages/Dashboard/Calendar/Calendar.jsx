import React, { useEffect, useState } from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import { axios_03 } from '../../../axios';

const MyCalendar = () => {
  // const [event, setEvent] = useState();


  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios_03.get('/api/getAll').then((response) => {
      console.log(response);
      const events = response.data.map((event) => ({
        title: event.subject,
        start: moment(event.startTime),
        end: moment(event.endTime),
        location: event.location,
        lecturer: event.lecturer,
      }));
      setEvents(events);
    });
  }, []);








  return (
    <Calendar
      events={events}
      style={{ height: '100vh' }}
      dateCellRender={(date, today) => {
        const formattedDate = date.format('YYYY-MM-DD');
        const event = events.find((e) => e.start.format('YYYY-MM-DD') === formattedDate);

        if (event) {
          return (
            <div>
              <p>{event.title}</p>
              <p>{event.lecturer}</p>
            </div>
          );
        } else {
          return null;
        }
      }}
    />
  );
};

export default MyCalendar