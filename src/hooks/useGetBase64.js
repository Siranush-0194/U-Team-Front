import { message } from 'antd';

const useGetBase64 = () => {
  const isMedia = [
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "video/mp4",
    "video/ogg",
    "image/png",
  ];

  return {
    isMedia,
    beforeUploadFile: (file) => {
      const isFile = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.oasis.opendocument.spreadsheet",
        'text/plain',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
         'application/msword',        
         'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         'application/rtf',
         'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ].includes(file.type);

      if (!isFile) {
        message.error("Invalid credentails");
      }

      const isLt9M = file.size / 1024 / 1024 < 9;

      if (!isLt9M) {
        message.error("Image must smaller than 9MB!");
      }

      return isFile && isLt9M;
    },
    beforeUploadMedia: (file) => {
      const isJpgOrPng = isMedia.includes(file.type);

      if (!isJpgOrPng) {
        message.error("Invalid credentails");
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
