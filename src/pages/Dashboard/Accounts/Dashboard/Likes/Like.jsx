import React, { useState } from "react";
import { axios_01 } from "../../../../../axios";
import { Button } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

const Likes = ({ id, likedByMe,likeCount }) => {
  const [liked, setLiked] = useState(likedByMe);
  const [count, setCount] = useState(typeof likeCount === "number" ? likeCount : 0);

  const toggleLike = () => {
    axios_01.put(`/api/post-like/`, { postId: id }, { liked: !liked })
      .then(() => {
        setLiked(!liked);
        setCount(count + (liked ? -1 : 1))
      })
      .catch(() => {
      });
    axios_01.put(`/api/question-like/`, { questionId: id }, { liked: !liked })
      .then(() => {
        setLiked(!liked);
        setCount(count + (liked ? -1 : 1));
      })
      .catch(() => {

      })
  };

  return (
    <Button onClick={toggleLike} >
      {liked ? <HeartFilled /> : <HeartOutlined />} {count}
    </Button>
  )
}
export default Likes;
