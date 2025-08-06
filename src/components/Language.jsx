import { useState } from "react";
import { Table, Button, Modal, Upload, Input, message, Form } from "antd";
// import ImgCrop from 'antd-img-crop';

const { Dragger } = Upload;

import flag from "../assets/flag.png";

const Language = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [languages, setLanguages] = useState([
    {
      key: 1,
      language: "English",
      code: "EN",
      default: true,
      imageUrl: flag, // Default image for existing languages
    },
    {
      key: 2,
      language: "Spanish",
      code: "ES",
      default: false,
      imageUrl: flag,
    },
  ]);
  const [newLanguage, setNewLanguage] = useState({ language: '', code: '' });
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null); // State for the uploaded image URL

  const showModal = () => {
    setIsModalOpen(true);
    setNewLanguage({ language: '', code: '' }); // Reset input fields
    setFileList([]); // Reset file list
    setImageUrl(null); // Reset image preview
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url || await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });

    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(`<img src="${src}" style="max-width: 100%;"/>`);
    }
  };

  const handleAddLanguage = () => {
    if (!newLanguage.language || !newLanguage.code || !imageUrl) {
      message.error("Please fill in all fields and upload an image!");
      return;
    }

    const newLang = {
      key: Date.now(),
      language: newLanguage.language,
      code: newLanguage.code,
      default: false,
      imageUrl: imageUrl, // Save the uploaded image URL
    };

    setLanguages([...languages, newLang]);
    setNewLanguage({ language: '', code: '' }); // Reset fields
    setImageUrl(null); // Reset image preview
    setFileList([]); // Clear file list
    setIsModalOpen(false);
    message.success("Language added successfully!");
  };

  const handleDelete = (key) => {
    setLanguages(languages.filter(lang => lang.key !== key));
    message.success("Language deleted successfully!");
  };

  const columns = [
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <img src={record.imageUrl || flag} alt="flag" className="w-5 h-5 rounded-full mr-2" />
          {record.language}
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Default",
      dataIndex: "default",
      key: "default",
      render: (isDefault) => (
        <Button
          className="rounded-full border-[#1E2230B2] hover:!border-[#1E2230B2] text-black hover:!text-black"
          onClick={() => handleDefaultToggle(isDefault)}
        >
          {isDefault ? "Default" : "Selectable"}
        </Button>
      ),
    },
    {
      title: "",
      key: "actions",
      width: 150,
      render: (text, record) => (
        <div className="flex gap-2">
          <Button
            className="text-black bg-[#F3F3F4] rounded-full hover:!bg-[#F3F3F4] hover:!text-black outline-none border-none"
            onClick={() => handleEdit(record.key)}
          >
            Edit
          </Button>
          <Button
            className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDefaultToggle = (isDefault) => {
    // Logic for toggling between Default and Selectable
    console.log("Toggle default/subscription state:", isDefault);
  };

  const handleEdit = (key) => {
    // Logic for editing a language entry
    console.log("Edit language with key:", key);
  };

  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const url = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(url); // Set the preview URL
      setFileList(info.fileList); // Ensure the file list is updated
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Supported Languages</h1>
        <Button
          className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
          onClick={showModal}
        >
          Add New
        </Button>
      </div>

      <div className="mt-4">
        <Table
          columns={columns}
          dataSource={languages}
          size="small"
          pagination={false}
          className="custom-table"
          scroll={{ x: "max-content" }}
        />
      </div>

      <Modal
        title="Add New Language"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form layout="vertical" className="mt-4">
          <Form.Item label="Upload Flag Image">
            <ImgCrop rotationSlider>
              <Upload
              className="!w-full"
                listType="picture-card"
                fileList={fileList}
                onChange={handleUploadChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>

        <div className="mb-3">
          <p className="text-[#333333CC]">Supported Files: .png, .jpg, .jpeg. Image will be resized into 50x50px</p>
        </div>
          <Form.Item label="Language Name">
            <Input
              placeholder="Language Name"
              value={newLanguage.language}
              onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Language Code">
            <Input
              placeholder="Language Code"
              value={newLanguage.code}
              onChange={(e) => setNewLanguage({ ...newLanguage, code: e.target.value })}
            />
          </Form.Item>
        </Form>


        <div className="flex justify-end">
          <Button 
            className="text-white bg-black rounded-full hover:!bg-black hover:!text-white outline-none"
            onClick={handleAddLanguage}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Language;
