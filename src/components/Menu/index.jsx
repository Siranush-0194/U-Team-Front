import React, { useMemo, useState } from 'react';
import { Menu, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UsergroupAddOutlined, LogoutOutlined, HomeOutlined, SendOutlined } from '@ant-design/icons';

import axios from '../../axios';

function getItem(label, key, icon, children, type) {
    return { key, icon, children, label, type };
}

const items = [
    getItem('Home', 'home', <HomeOutlined />),
    getItem('Institutes', 'institutes', <UsergroupAddOutlined />),
    getItem('Invitation', 'invitation', <SendOutlined/> ),
    getItem('Logout', 'logout', <LogoutOutlined />),
];

const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const menu = useMemo(() => {
        return {
            home: () => history.push("/dashboard"),
            institutes: () => history.push("/dashboard/institutes"),
            invitation: () => history.push("/dashboard/invitation"),
          

            logout: async (action) => {
                try {
                    if (action === 0) return setIsModalOpen(false);
                    else if (action === 1) return setIsModalOpen(true);

                    const response = await axios.post("/logout");

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

        console.log(e)
    };

    return (
        <>
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
