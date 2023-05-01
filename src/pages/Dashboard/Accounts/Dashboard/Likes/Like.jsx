import React, { useState} from "react";
import { axios_01 } from "../../../../../axios";
import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const Likes = ({ id,likedByMe}) => {
  const [liked, setLiked] = useState(likedByMe) ;
  const [loading, setLoading] = useState(false);

const toggleLike = () => {
  
  axios_01.put(`/api/post-like/`, {postId:id},{ liked: !liked })
    .then(() => {
      setLiked(!liked);
      
    })
    .catch(() => {
    
    });
    axios_01.put(`/api/question-like/`, {questionId:id},{ liked: !liked })
    .then(() => {
      setLiked(!liked);
    
    })
    .catch(() => {
   
    })
};
return(
  <Button onClick={toggleLike} >
  {liked ? <HeartFilled /> : <HeartOutlined />} 
</Button>
)


}
export default Likes;
