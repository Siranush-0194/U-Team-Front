import { React } from 'react';
import '../style.scss'
import { AudioOutlined, MailOutlined, BellOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Card } from 'antd';
import { Switch as AntSwitch } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';
import { UserOutlined } from '@ant-design/icons';
import { Button,Badge, Calendar } from 'antd';
import StudentAccount from './Students/StudentsAcc';

const { Search } = Input;


const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event.',
        },
        {
          type: 'success',
          content: 'This is usual event.',
        },
        {
          type: 'error',
          content: 'This is error event.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'This is warning event',
        },
        {
          type: 'success',
          content: 'This is very long usual event。。....',
        },
        {
          type: 'error',
          content: 'This is error event 1.',
        },
        {
          type: 'error',
          content: 'This is error event 2.',
        },
        {
          type: 'error',
          content: 'This is error event 3.',
        },
        {
          type: 'error',
          content: 'This is error event 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};
const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};
const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};

const AccountsDashboard = () => {
    const { i18n } = useTranslation();
    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am');
      };
    
    return(
    
        <>
 

        <Card className='head'>
        <img
        src="../images/Uteam.jpeg"
        className="logo"
        alt="logo"
        width={50}
        height={18000}
      />
        <Search placeholder="input search text" className='search' enterButton />
       <BellOutlined className="notification" style={{ fontSize: '150%'}}/>
       <MailOutlined className="messenger" style={{ fontSize: '150%'}}/>
       <StudentAccount/>   

       <Button type="primary"  className='question'>+ Question </Button>
        <AntSwitch className='switcher' checkedChildren="Eng" unCheckedChildren="հայ" defaultChecked onChange={changeLanguage} />
        </Card>
        {/* <Card className="calendar"> */}
        {/* <Calendar  fullscreen={false}    dateCellRender={dateCellRender} monthCellRender={monthCellRender} />; */}
      {/* </Card> */}


      </>
    )
}


export default AccountsDashboard;