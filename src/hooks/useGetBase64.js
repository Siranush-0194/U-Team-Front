import { message } from 'antd';

const useGetBase64 = () => {
  return {
    beforeUpload: (file) => {
        const isJpgOrPng = [
          "image/jpeg",
          "image/jpg",
          "image/gif",
          "video/mp4",
          "video/ogg",
          "image/png",
        ].includes(file.type);
    
        if (!isJpgOrPng) {
          message.error("You can only upload JPG/PNG file!");
        }
    
        const isLt9M = file.size / 1024 / 1024 < 9;
    
        if (!isLt9M) {
          message.error("Image must smaller than 9MB!");
        }
    
        return isJpgOrPng && isLt9M;
      },
    init: (data) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.readAsDataURL(data);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }
  };
};

export default useGetBase64;
