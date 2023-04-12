import { useEffect, useState } from 'react';
import { Upload, Form } from 'antd';
import { axios_02 } from '../../../../../axios';
import useGetBase64 from '../../../../../hooks/useGetBase64';
import { useSelector } from "react-redux";

const LocalStorage = () => {
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
            type: data.file.type,
            dataFile: data.file.originFileObj
        });

        setFiles(files);

        if (files.length === data.fileList.length) {
            files.forEach((e) => {
                const formData = new FormData();

                formData.append(`file`, e.code ? e.file : e.dataFile, e.code ? undefined : e.name);
                formData.append("type", 'local');
                formData.append("courseId", user.course.id);

                post.push(new Promise((resolve, reject) => {
                    axios_02.post('/api/storage', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    }).then((response) => resolve(response)).catch((e) => reject(e))
                }));

                setPost(post);
            });

            Promise.all(post).finally((response) => {
                setFiles([]);
                setPost([]);
                setFile([])
            })
        }
    };

    useEffect(() => {
        axios_02
            .get(`/api/storage/${user.course.id}/local`)
            .then((response) => {
                setMedia(response.data)
            })
            .catch(() => {
                console.log('error');
            });
    }, [user.course.id]);

    return (
        <>
            <Form>
                <Form.Item>
                    <Upload
                        name="media"
                        listType="picture-card"
                        className="media-uploader"
                        customRequest={() => {}}
                        beforeUpload={getBase64.beforeUploadFile}
                        onChange={handleChange}
                        fileList={file?.fileList || []}
                        maxCount={10}
                        multiple={true}
                    >
                        + Upload
                    </Upload>
                </Form.Item>
            </Form>

            {media.map(m => {
                return <img type={m.mimeType} key={m.id} data={m.path} width="50" height="50"/>
            })}
        </>
    );
}

export default LocalStorage;