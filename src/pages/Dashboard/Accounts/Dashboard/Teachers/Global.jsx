import { useEffect, useState } from 'react';
import { Upload, Form, List, Button, Select} from 'antd';
import axios, { axios_02, PORTS } from '../../../../../axios';
import useGetBase64 from '../../../../../hooks/useGetBase64';
import { useSelector } from "react-redux";
import { DeleteOutlined,  FilePdfOutlined, FileTextOutlined, FileWordOutlined } from '@ant-design/icons';



const getFileIcon = (mimeType) => {
  
    switch (mimeType) {
        case 'application/pdf':
            return <FilePdfOutlined   style={{ fontSize: '24px' }} />;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return <FileWordOutlined style={{ fontSize: '24px' }} />
        case "application/vnd.oasis.opendocument.spreadsheet":
            return <FileTextOutlined style={{ fontSize: '24px' }} />
        case 'text/plain':
            return <FileTextOutlined style={{ fontSize: '24px' }} />;
        default:
            return null;
    }
};

const TeacherGlobalStorage= ({ type }) => {
    const getBase64 = useGetBase64();
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [media, setMedia] = useState([]);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [post, setPost] = useState([]);

 

    const { Option } = Select;

    const CoursehandleChange = (value) => {
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

    const handleChange = async (data) => {
        const file = await getBase64.init(data.file.originFileObj);

        files.push({
            file,
            code: getBase64.isMedia.includes(data.file.type),
            name: data.file.name,
            type: data.file.type,
            dataFile: data.file.originFileObj
        });

        setFiles(files);

        if (files.length === data.fileList.length) {
            files.forEach((e) => {
                const formData = new FormData();

                formData.append(`file`, e.code ? e.file : e.dataFile, e.code ? undefined : e.name);
                formData.append(`type`, 'global');
                formData.append(`courseId`, selectedCourseId);

                post.push(new Promise((resolve, reject) => {
                    axios_02.post('/api/storage', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }).then((response) => resolve(response)).catch((e) => reject(e))
             
                }
                    ));

                setPost(post);
            });

            Promise.all(post).finally(() => {
                getMedia();
                setFiles([]);
                setPost([]);
                setFile([]);
            })
        }
    };

    const getMedia = () => {
        axios_02
            .get(`/api/storage/global/${selectedCourseId}`)
            .then((response) => {
                setMedia(response.data)
            })
            .catch(() => {
                console.log('error');
            });
    }
  

    useEffect(() => {
        getMedia();
    }, [selectedCourseId]);

    const deleteFile = (id) => {
        axios_02.delete(`/api/storage/${id}`).then(() => {
          // Refresh the media list
          getMedia();
        }).catch((error) => {
          console.log(error);
        });
      }

    return (
        <>
         <Select placeholder="Courses"  dropdownMatchSelectWidth={false} defaultValue={selectedCourseId}  style={{ width: '150px' }} onChange={CoursehandleChange}>
        {courses.map(course => (
          <Option key={course?.id} value={course?.id}>
                        { course.number +  course.degree  +   course.type} 

          </Option>
        ))}
      </Select>
            <Form>
                <Form.Item>
                    <Upload
                        name="media"
                        listType="picture-card"
                        className="media-uploader"
                        customRequest={() => { }}
                        beforeUpload={getBase64.beforeUploadFile}
                        onChange={handleChange}
                        fileList={file?.fileList || []}
                        maxCount={10}
                        multiple={true}
                    >
                        Upload File
                    </Upload>
                </Form.Item>
            </Form>
            <List
                itemLayout="vertical"
                dataSource={media}
                className='storage-lists'
                grid={{ gutter: 16, column: 3 }}
                renderItem={item => (

                    <>
                        <List.Item>
                            <List.Item.Meta

                                onClick={() => {
                                    window.open(PORTS[8003] + item.path, "_blank")

                                }}
                                avatar={getFileIcon(item.mimeType)}
                                title={item.name}
                            />
                            <div>
                               
                                <Button icon={<DeleteOutlined />} danger onClick={() => deleteFile(item.id)}>Delete</Button>
                            </div>
                        </List.Item>

                    </>

                )}
            />
        </>
    );
}

export default TeacherGlobalStorage;