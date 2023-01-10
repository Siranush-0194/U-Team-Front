import { React } from 'react';
import '../style.scss'
import { AudioOutlined, MailOutlined, BellOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Card } from 'antd';
import { Switch as AntSwitch } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '../../../../i18n';
import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import StudentAccount from '../StudentsAcc';
const { Search } = Input;

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
     


      </>
    )
}


export default AccountsDashboard;