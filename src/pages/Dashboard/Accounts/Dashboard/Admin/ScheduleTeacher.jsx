import { useEffect, useState } from 'react';
import { Upload, Form, List, Select, Button } from 'antd';
import axios, { axios_01, axios_02, PORTS } from '../../../../../axios';
import useGetBase64 from '../../../../../hooks/useGetBase64';
import { DeleteOutlined, FileExcelOutlined, FilePdfOutlined, FileTextOutlined, FileWordOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';

// import './style.scss';





const ScheduleTeacher = ({ type }) => {
    const getBase64 = useGetBase64();

    const [media, setMedia] = useState([]);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [post, setPost] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacherId, setSelectedTeacherId] = useState(null);
    const [teacherId, setTeacherId] = useState(null);
    const [forumData, setForumData] = useState([]);


    useEffect(() => {
        axios.get("/api/teacher/get").then((response) => {
          setTeachers(response.data)
          setSelectedTeacherId(response.data?.[0].id)

        }).catch(() => setTeachers([]));
      }, []);
      console.log(teachers);



    useEffect(() => {
        if (selectedTeacherId) {
            axios.get(`/api/schedule//${selectedTeacherId} `)
                .then(response => {
                    console.log(selectedTeacherId);
                    let $teacherId
                    $teacherId = response.data
                    setTeacherId(response.data)

                    setForumData(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedTeacherId]);

    useEffect(() => {
        getMedia();
    }, [selectedTeacherId]);

    const handleChange = async (data) => {
        setSelectedTeacherId(data);

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

                formData.append(`schedule`, e.code ? e.file : e.dataFile, e.code ? undefined : e.name);
                formData.append(`role`, `teacher`);         
                formData.append(`userId`, selectedTeacherId);


                post.push(new Promise((resolve, reject) => {
                    axios.post('/api/schedule/store', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }).then((response) => resolve(response)).catch((e) => reject(e))
                }));

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
        axios
            .get(`/api/schedule/teachers`)
            .then((response) => {
                setMedia(response.data)
            })
            .catch(() => {
                console.log('error');
            });
    }

    useEffect(() => {
        getMedia();
    }, []);
    const deleteFile = (id) => {
        axios.delete(`/api/schedule/delete/${id}`).then(() => {
          // Refresh the media list
          getMedia();
        }).catch((error) => {
          console.log(error);
        });
      }


    return (
        <>
             <Select  placeholder="Teachers"  dropdownMatchSelectWidth={false}  defaultValue={selectedTeacherId}  style={{ width: '150px' }}  onChange={handleChange} >
        {teachers.map(teacher => (
          <Option key={teacher.id} value={teacher.id}>
            { teacher.firstName + " " + teacher.lastName} 
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
                    <List.Item>
                        <List.Item.Meta
                            onClick={() => {
                                window.open(PORTS[8000] + item.path, "_blank")
                            }}
                            avatar={<FileExcelOutlined size="32"/> }
                            title={item?.teacher?.firstName  + " " +  item?.teacher?.lastName }
                            description={item.name}
                        />
                          <div>
                               
                               <Button icon={<DeleteOutlined />} danger 
                               onClick={() => deleteFile(item.id)}>Delete
                               </Button>
                           </div>
                    </List.Item>
                )}
            />
        </>
    );
}

export default ScheduleTeacher;