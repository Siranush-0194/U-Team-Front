import { Avatar, Card, Image, List, Select } from 'antd';
import axios, { axios_01 } from '../../../../../axios';
import { useEffect, useState } from 'react';
import Likes from '../Likes/Like';
import { CommentOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Item from '../../../../../components/Other/Item';
import Tags from '../../../../../components/Tags';

const { Option } = Select;

const TeacherForum = (item, mediaKey ) => {
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
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedCourseId) {
          axios_01.get(`/api/forum?courseId=${selectedCourseId}`)
            .then(response => {
                
              setForumData(response.data);

            })
            .catch(error => {
              console.log(error);
            });
        }
      }, [selectedCourseId]);
    //   console.log(forumData?.data?.title);

    return (
         <div>
      <Select  style={{width:'150px'}}  onChange={handleChange}>
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
                    <Likes id={forumData?.data[4]?.id} likedByMe={forumData?.data[4]?.likedByMe} />,
                    <EditOutlined />,
                    ...(item.commentsUrl ? [<CommentOutlined key='comment' onClick={() => setCommentIsOpen({
                      ...commentIsOpen,
                      [item.id]: !commentIsOpen[item.id]
                    })} />] : []),
                    <DeleteOutlined key="delete" style={{ color: 'red' }} />,
                  ]}
                >
                    <List.Item>
            <List.Item.Meta
                avatar={<Avatar />}
                title={forumData?.data[4]?.author?.firstName}
                description={forumData?.data[4]?.title}
            />


            <div className="item-content">
                <div className="item-content-description">{forumData?.data[4]?.content}</div>

                {forumData?.data[4]?.media.split(mediaKey) ? <Image width="300px" style={{ objectFit: 'cover' }} src={forumData?.data[4]?.media} alt="" /> : null}
            </div>

            {/* <div className="item-tags">
                <Tags lists={forumData?.data[4]?.tags} />
            </div> */}
        </List.Item>
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