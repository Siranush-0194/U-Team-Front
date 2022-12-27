import React, { useMemo, useState } from 'react';
import { Menu, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UsergroupAddOutlined,BankOutlined , LogoutOutlined, HomeOutlined, SendOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';
import { Switch as AntSwitch, Space } from 'antd';
import axios from '../../axios';
import { useTranslation } from 'react-i18next';
import '../../i18n';
function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

const items = [
    getItem('Home', 'home', <HomeOutlined />),
    getItem('Institutes', 'institutes', <EditOutlined />),
    getItem('Invitation', 'invitation', <SendOutlined />),
    getItem('Admins', 'admins', <UserOutlined />),
    getItem('Teachers', 'teachers',<UserOutlined />),
    getItem('Students', 'students', <UserOutlined />),
    getItem('Institutes', 'allInstitutes', <BankOutlined />),
    getItem('Departments', 'departments', <BankOutlined />),
    getItem('Courses', 'courses', <BankOutlined />),
    // getItem('Groups', 'groups', <BankOutlined />),
    getItem('Logout','logout',<LogoutOutlined />)
];

const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === 'am' ? 'en' : 'am');
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { i18n } = useTranslation();
    const menu = useMemo(() => {
        return {
            
            home: () => history.push("/dashboard"),
            institutes: () => history.push("/dashboard/institutes"),
            invitation: () => history.push("/dashboard/invitation"),
            admins: () => history.push("/dashboard/editAdmins"),
            teachers: () => history.push("/dashboard/teachers"),
            students: () => history.push("/dashboard/students"),
            allInstitutes: () => history.push("/dashboard/allinstitutes"),
            departments: () => history.push("/dashboard/departments"),
            courses: () => history.push("/dashboard/courses"),
            groups: () => history.push("/dashboard/groups"),
            logout:() => history.push("/"),

            logout: async (action) => {
                try {
                    if (action === 0) return setIsModalOpen(false);
                    else if (action === 1) return setIsModalOpen(true);

                    await axios.post("/logout");

                    dispatch({ type: "logout" });

                    history.push("/");
                } catch (error) {
                    // 
                }
            }
        }
    }, []);

    const onClick = (e) => {
        if (menu[e.key] && typeof menu[e.key] === "function") {
            return menu[e.key](1);
        }
    };

    return (
        <>
       
            <Space direction="vertical">
                <AntSwitch className='switcher' checkedChildren="Eng" unCheckedChildren="հայ" defaultChecked onChange={changeLanguage} />
            </Space>
            <Modal open={isModalOpen} onOk={() => menu.logout(2)} onCancel={() => menu.logout(0)}>
                <p>Do you want to logout?</p>
            </Modal>

            <Menu
                className="navigation"
                onClick={onClick}
                style={{ width: 256, }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </>
    );
};

export default NavBar;
