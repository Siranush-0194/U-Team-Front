import React from "react";

import { useState,useEffect } from "react";
import axios from "axios";

const INSTITUTES_URL='/institute/getAll'



export default function Institutes() {
    const [post, setPost] = useState(null);
  
    useEffect(() => {
        console.log(1);
      axios.get(INSTITUTES_URL).then((response) => {
        console.log(response);
        setPost(response.data);
      }).catch(e => {
        console.log(e);
      });
    }, []);
  
    if (!post) return null;
  
    return (
      <div>
        <h1>{post.name}</h1>
        {/* <p>{post.body}</p> */}
      </div>
    );
  }