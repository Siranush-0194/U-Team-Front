import { Menu } from "antd";
import "antd/dist/antd.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
// import "./App.css";
import Institutes from "./Institutes";
import { PoweroffOutlined, UserOutlined, BankOutlined, DashboardOutlined } from "@ant-design/icons";

function AdminDashboard() {

  return (
    <div >
      <div  >
        <Header />
        <div style={{ display: "block", flexDirection: 'row'}}>
          <SideMenu />
          <Content />
        </div>
       
      </div>
    </div>

  );
}

function Header() {
  return (<div style={{display:"block", position: "absolute",left: "700px",top:"20px"}}>
    
                      Header                    
            </div>)
}

function SideMenu() {
  const navigate = useNavigate()

  return (
    <div 
    style={{ display: "block", flexDirection: 'row',  position: "absolute",left: "16px",top:"210px",backgroundColor:"red"}}>
   
  
      <Menu
        onClick={({ key }) => {
          if (key === "signout") {
            ///sdsdsd
          } else {
            navigate(key);
          }
        }}
        items={[
        
          { label: "Dashboard", key: "/dashboard", icon: <DashboardOutlined />},     
          { label: "Institutes", key: "/institutes", icon: <BankOutlined />},
          { label: "Profile", key: "/profile", icon: <UserOutlined /> },
          { label: "Signout", key: "/signout", icon: <PoweroffOutlined />, danger: true }

        ]}>
                </Menu>
    </div>)
}

function Content() {
  return (
    <div>
      <Routes>    
               
        <Route path="/institutes" element={<Institutes/>}></Route>
        <Route path="/profile" element={<div>sdjnclksjcndkj</div>}></Route>
      </Routes>
    </div>
  )
}


export default AdminDashboard;
