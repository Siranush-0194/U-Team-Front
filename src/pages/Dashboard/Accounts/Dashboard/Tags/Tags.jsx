import { useState, useEffect } from "react";
import axios_01 from "../../../../../axios";
import { useSelector } from "react-redux";
import { Card } from "antd";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    axios_01
      .get(`/api/tag?courseId=${user.course.id}`)
      .then((response) => {
        setTags(response.data.name);
      })
      .catch(() => setTags([]));
  }, [user.course.id, setTags]);

  return <Card>{tags}</Card>;
};

export default Tags;
