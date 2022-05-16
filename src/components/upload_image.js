import { Upload, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';  
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export const ImageUpload = (props) => {
   
    const uploadButton = (
        <div>
          {<PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const { handleChange, imageUrl } = props;
    console.log(imageUrl)
    return (
        <Upload
            style={{width: '300px', height: '300px'}}
            name="avatar"
            maxCount={1}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" width="250" height="250" /> : uploadButton}
        </Upload>
    )
}
