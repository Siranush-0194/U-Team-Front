import React, { useMemo, useState } from "react";
import { Menu, Modal, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  BankOutlined,
  LogoutOutlined,
  HomeOutlined,
  SendOutlined,
  UserOutlined,
  EditOutlined,
  TeamOutlined,
  CarryOutOutlined,
  HddOutlined,
  DatabaseOutlined,
  QuestionOutlined,
  BarsOutlined,
  TagsOutlined,
  CalendarOutlined 
} from "@ant-design/icons";
import axios from "../../axios";
import "../../i18n";
import "./App.scss";

function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type };
}

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { Sider } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const rule = useSelector(function (state) {
    return state.rule;
  });

  const items = useMemo(() => {
    const itemsData = {
      admin: [
        getItem("Home", "home", <HomeOutlined />),
        getItem("Institutes", "institutes", <EditOutlined />),
        getItem("Invitation", "invitation", <SendOutlined />),
        getItem("Admins", "admins", <UserOutlined />),
        getItem("Teachers", "teachers", <UserOutlined />),
        getItem("Students", "students", <UserOutlined />),
        getItem("Institutes", "allInstitutes", <BankOutlined />),
        getItem("Departments", "departments", <BankOutlined />),
        getItem("Courses", "courses", <BankOutlined />),
        getItem("Logout", "logout", <LogoutOutlined />),
      ],
      student: [
        getItem("Home", "home", <HomeOutlined />),
        getItem("Account", "accounts", <UserOutlined />),
        getItem("Teachers", "teachers", <TeamOutlined />),
        getItem("Students", "students", <TeamOutlined />),
        getItem("Notes", "notes", <CarryOutOutlined />),
        getItem("Local Storage", "localStorage", <HddOutlined />),
        getItem("Global Storage", "globalStorage", <DatabaseOutlined />),
        getItem("Questions", "questions", <QuestionOutlined />),
        getItem("Posts", "posts", <BarsOutlined />),
        getItem("Tags", "tags", <TagsOutlined />),
        getItem("Calendar", "calendar", <CalendarOutlined />),
        getItem("Logout", "logout", <LogoutOutlined />),
      ],
      teacher: [
        getItem("Home", "home", <HomeOutlined />),
        getItem("Account", "accounts", <UserOutlined />),
        getItem("Courses", "courses", <BankOutlined />),
        getItem("Notes", "notes", <CarryOutOutlined />),
        getItem("Local Storage", "localStorage", <HddOutlined />),
        getItem("Global Storage", "globalStorage", <DatabaseOutlined />),
        getItem("Questions", "questions", <QuestionOutlined />),
        getItem("Posts", "posts", <BarsOutlined />),
        getItem("Logout", "logout", <LogoutOutlined />),
      ],
    };

    return itemsData[rule];
  }, [rule]);
  const menu = useMemo(() => {
    const menuData = {
      admin: {
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
        },
      },
      student: {
        home: () => history.push("/dashboard"),
        teachers: () => history.push("/dashboard/teachers"),
        students: () => history.push("/dashboard/students"),
        accounts: () => history.push("/dashboard/account"),
        notes: () => history.push("/dashboard/notes"),
        localStorage: () => history.push("/dashboard/local"),
        globalStorage: () => history.push("/dashboard/global"),
        questions: () => history.push("/dashboard/questions"),
        posts: () => history.push("/dashboard/posts"),
        tags: () => history.push("/dashboard/tags"),
        calendar: () => history.push("/dashboard/calendar"),
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
        },
      },
      teacher: {
        home: () => history.push("/dashboard"),
        courses: () => history.push("/dashboard/courses"),
        accounts: () => history.push("/dashboard/account"),
        notes: () => history.push("/dashboard/notes"),
        localStorage: () => history.push("/dashboard/local"),
        globalStorage: () => history.push("/dashboard/global"),
        questions: () => history.push("/dashboard/questions"),
        posts: () => history.push("/dashboard/posts"),
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
        },
      },
    };

    return menuData[rule];
  }, [rule, history, setIsModalOpen, dispatch]);

  const onClick = (e) => {
    if (menu[e.key] && typeof menu[e.key] === "function") {
      return menu[e.key](1);
    }
  };

  return (
    <Sider>
      <Modal
        open={isModalOpen}
        onOk={() => menu.logout(2)}
        onCancel={() => menu.logout(0)}
      >
        <p>Do you want to logout?</p>
      </Modal>

      <Menu
        className="navigation"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default NavBar;
