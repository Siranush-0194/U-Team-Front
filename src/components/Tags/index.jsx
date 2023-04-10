import { Select, Space, Tag } from "antd";
import { useState, useEffect } from "react";

import { axios_01 } from "../../axios";
import { useSelector } from "react-redux";

const Tags = ({ list, lists, onChange }) => {
  const [tags, setTags] = useState([]);

  const user = useSelector(function (state) {
    return state?.user;
  });

  useEffect(() => {
    !lists &&
      axios_01.get(`/api/tag?courseId=${user.course.id}`).then((response) => {
        if (response.status === 200) {
          setTags(
            response.data.tags.map((tag) => ({
              value: tag.name,
              label: tag.name,
            }))
          );
        }
      });
  }, [lists, user.course.id]);

  return !lists ? (
    <Select
      size="large"
      mode="tags"
      style={{
        width: "100%",
      }}
      defaultValue={list}
      placeholder="Tags Mode"
      onChange={onChange}
      options={tags}
    />
  ) : (
    <Space wrap size={[0, 8]}>
      {lists.map((tag) => (
        <Tag color="#108ee9" key={tag.id}>{tag.name}</Tag>
      ))}
    </Space>
  );
};

export default Tags;
