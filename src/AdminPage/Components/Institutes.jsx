import React from "react";
import { Menu } from "antd";
import "antd/dist/antd.min.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PoweroffOutlined, UserOutlined, BankOutlined, DashboardOutlined } from "@ant-design/icons";
import menu from "../menu";
import { useState,useEffect } from "react";
import axios from "../../modules/axios";

const INSTITUTES_URL='/institute/getAll'

export default function Institutes() {
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      
      axios.get(INSTITUTES_URL).then((response) => {
     
        setPost(response.data);
      }).catch(e => {
        console.log(e);
      });
    }, []);
  
    if (!post) return null;
  
    
      return (
        <>
        <div 
    style={{ display: "block", flexDirection: 'row',  position: "absolute",left: "250px",top:"210px",backgroundColor:"red"}}>
   
  
      <Menu
        onClick={({  }) => {
          
        }}
        items={[
        
          { label: "Dashboard", key: "/dashboard", icon: <DashboardOutlined />},     
          { label: "Institutes", key: "/institutes", icon: <BankOutlined />},
          { label: "Profile", key: "/profile", icon: <UserOutlined /> },
          { label: "Signout", key: "/admsignout", icon: <PoweroffOutlined />, danger: true }

        ]}>
                </Menu>
    </div>
        
            {post ? 
                post.map(data => {
                    return(
                       <div className="data" key={data.id}>
                         <h3>{data.name}</h3>
                       </div>
                    )
                }) : <h3>No data yet</h3> }
                
        </>
     
    );
  }
