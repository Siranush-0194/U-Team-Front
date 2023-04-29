import { Select, Space, Tag } from "antd";
import { useState, useEffect } from "react";
import { axios_01 } from "../../axios";
import { useSelector } from "react-redux";

const Tags = ({ list, lists, onChange, onClickTag }) => {
  const [tags, setTags] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

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
  }, [lists]);

  useEffect(() => {
    if (selectedCourseId) {
      axios_01.get(`/api/forum?courseId=${selectedCourseId} `)
        .then(response => {
          setSelectedCourseId(response?.data?.id)

        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedCourseId]);

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
        <Tag color="#108ee9" key={tag.id} onClick={() => onClickTag?.(tag.name)}>{tag.name}</Tag>
      ))}
    </Space>
  );
};

export default Tags;
