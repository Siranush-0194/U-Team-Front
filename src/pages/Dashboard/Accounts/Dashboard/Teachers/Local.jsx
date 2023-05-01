import { useEffect, useState } from 'react';
import { Upload, Form, List, Button } from 'antd';
import { axios_02, PORTS } from '../../../../../axios';
import useGetBase64 from '../../../../../hooks/useGetBase64';
import { DeleteOutlined,  FilePdfOutlined, FileTextOutlined, FileWordOutlined } from '@ant-design/icons';


import { useSelector } from 'react-redux';

const getFileIcon = (mimeType) => {
    switch (mimeType) {
        case 'application/pdf':
            return <FilePdfOutlined style={{ fontSize: '24px' }} />;
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

const TeacherLocalStorage = ({ type }) => {
    const getBase64 = useGetBase64();

    const [media, setMedia] = useState([]);
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [post, setPost] = useState([]);
    const user = useSelector(function (state) {
        return state?.user;
      });

    const handleChange = async (data) => {
        const file = await getBase64.init(data.file.originFileObj);

        files.push({
            file,
            code: getBase64.isMedia.includes(data.file.type),
            name: data.file.name,
            // type: data.file.type,
            dataFile: data.file.originFileObj
        });

        setFiles(files);

        if (files.length === data.fileList.length) {
            files.forEach((e) => {
                const formData = new FormData();

                formData.append(`file`, e.code ? e.file : e.dataFile, e.code ? undefined : e.name);
                formData.append(`type`, 'local');
             

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
            .get(`/api/storage/local`)
            .then((response) => {
                setMedia(response.data)
            })
            .catch(() => {
                console.log('error');
            });
    }
  

    useEffect(() => {
        getMedia();
    }, [user.id]);

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

export default TeacherLocalStorage;