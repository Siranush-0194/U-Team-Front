import { useEffect, useState } from 'react';
import { Upload, Form, List, Select } from 'antd';
import axios, { axios_01, axios_02, PORTS } from '../../../../../axios';
import useGetBase64 from '../../../../../hooks/useGetBase64';
import { FileExcelOutlined, FilePdfOutlined, FileTextOutlined, FileWordOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';

// import './style.scss';





const Schedule = ({ type }) => {
    const getBase64 = useGetBase64();

    const [media, setMedia] = useState([]);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [post, setPost] = useState([]);
    const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState();
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [forumData, setForumData] = useState([]);


    useEffect(() => {
        axios.get("/api/group/get-course").then((response) => {
            let groups = [], subgroups = [];
      
            response.data.forEach(group => {
              if (!group.parentId) {
                groups.push({
                  value: group.id,
                  label: `${group.course.number} - ${group.number} ${group.course.degree} ${group.course.type}`,
                  children: []
                })
              } else {
                subgroups.push({
                  value: group.id,
                  label: `${group.course.number} - ${group.number} ${group.course.degree} ${group.course.type}`,
                  children: []
                })
              }
            });
      
            setGroups(groups);
            setSelectedCourseId(response.data?.[0].id)
           
          }).catch(() => setCourses([]));
    }, []);
console.log(groups);
    useEffect(() => {
        if (selectedCourseId) {
            axios.get(`/api/schedule/get/${selectedCourseId} `)
                .then(response => {
                    console.log(selectedCourseId);
                    let $courseId
                    $courseId = response.data
                    setCourseId(response.data)

                    setForumData(response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [selectedCourseId]);

    useEffect(() => {
        getMedia();
    }, [selectedCourseId]);

    const handleChange = async (data) => {
        setSelectedCourseId(data);

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
                formData.append(`role`, `student`);
                formData.append(`groupId`, selectedCourseId);            
                formData.append(`courseId`, courseId);


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
            .get(`/api/schedule/get`)
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


    return (
        <>
            <Select  style={{ width: '150px' }} onChange={handleChange} options={groups}/>

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
                            title={"excel"}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}

export default Schedule;