import { Avatar, Card, Image, List, Select } from 'antd';
import axios, { axios_01 } from '../../../../../axios';
import { useEffect, useState } from 'react';
import Likes from '../Likes/Like';
import { CommentOutlined } from '@ant-design/icons';
import Item from '../../../../../components/Other/Item';
import CommentForm from '../Comments/Comments';

const { Option } = Select;

const TeacherForum = (item, mediaKey) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [forumData, setForumData] = useState([]);
  const [commentIsOpen, setCommentIsOpen] = useState({});

  const handleChange = (value) => {
    setSelectedCourseId(value);
  };

  useEffect(() => {
    axios.get('/api/teacher/courses')
      .then(response => {
        setCourses(response.data);
        setSelectedCourseId(response.data?.[0].id)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      axios_01.get(`/api/forum?courseId=${selectedCourseId} ` )
        .then(response => {
          setForumData(response.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [selectedCourseId]);

  return (
    <div>
      <Select  defaultValue={selectedCourseId}  style={{ width: '150px' }} onChange={handleChange}>
        {courses.map(course => (
          <Option key={course.id} value={course.id}>
            {course.name}
          </Option>
        ))}
      </Select>

      <div style={{ marginTop: 10 }}>
        {forumData && (
          <Card>
            <List
              className="demo-loadmore-list"
              itemLayout="vertical"
              dataSource={Array.isArray(forumData) ? [...forumData] : [forumData]}
              renderItem={(item) => (
                <Card
                  style={{ marginTop: 10 }}
                  key={item.id}
                  actions={[
                    <Likes id={item?.id} likedByMe={item?.likedByMe} likeCount={item?.likes}/>,
                    // <EditOutlined />,
                    ...(item.commentsUrl ? [<CommentOutlined key='comment' onClick={() => setCommentIsOpen({
                      ...commentIsOpen,
                      [item.id]: !commentIsOpen[item.id]
                    })} />] : []),
                    // <DeleteOutlined key="delete" style={{ color: 'red' }} />,
                  ]}
                >
                                     <Item item={item} mediaKey={item.hasOwnProperty('commentsUrl') ? 'question' : 'post'} />
                                     <div style={{ marginTop: 10 }}>
                  {item.hasOwnProperty('commentsUrl') ? <CommentForm question={item} isOpen={commentIsOpen[item.id]} /> : null}
                </div>
                </Card>
              )}
            />
          </Card>
        )}
      </div>
    </div>

  );
}



export default TeacherForum;