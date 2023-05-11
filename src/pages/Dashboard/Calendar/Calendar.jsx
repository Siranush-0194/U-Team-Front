import React, { useEffect, useState } from 'react';
import { Button, Calendar } from 'antd';
import moment from 'moment';
import { axios_02, axios_03 } from '../../../axios';
import './style.css';

const MyCalendar = () => {


  const [events, setEvents] = useState([]);
  const [calendar,setCalendar] = useState();
  const [buttonColor, setButtonColor] = useState(null);
  const [buttonState, setButtonState] = useState(null);

  useEffect(() => {
    axios_03.get('/api/getAll').then((response) => {
      // console.log(response);
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

    useEffect(() => {
        axios_03.get('/api/buttonState').then((response) => {
            // console.log(response);
            if (response.data === 1){
                setButtonColor('green')
                setButtonState('')
            }

            if (response.data === 0){
                setButtonColor('gray')
                setButtonState('none')
            }

            if (response.data === -1){
                setButtonColor('red')
                setButtonState('none')
            }
            console.log(response.data)
        });
    }, []);

  // const handleGoogleOAuthClick = () => {
  //   axios_03.get('/google/oauth2')
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       // Handle the error
  //     });
  // }
   
  const handleButtonClick = () => {
  
    window.location.href = 'http://localhost:8002/google/oauth2/';
  };





  const colors = ['#f5222d', '#fa8c16', '#1890ff', '#52c41a', '#722ed1', '#eb2f96'];


    return (
    <>
    <Button type='primary'onClick={ handleButtonClick} style={{backgroundColor: buttonColor, pointerEvents: buttonState}}>Sign in with Google</Button>
    <div style={{ overflow: 'hidden'}}>
      <Calendar
        events={events}
        style={{ height: '100vh' }}
        dateCellRender={(date, today) => {
          const formattedDate = date.format('YYYY-MM-DD');
          const event = events.find((e) => e.start.format('YYYY-MM-DD') === formattedDate);

          if (event) {
            const index = Math.floor(Math.random() * colors.length);
            return (
              <>
              <div>
                <span >{event.title}</span>
                <span>{event.lecturer}</span>
                <div
                  style={{
                    position: 'absolute',
                    top: 35,
                    right:175,
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: colors[index],
                  }}
                />
             
             </div>
              </>
              
            );
          } else {
            return null;
          }
        }}
      />
    </div>
    </>
    
  );
};

export default MyCalendar;