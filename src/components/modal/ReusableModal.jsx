// components/modal/ReusableModal.jsx
import { Modal, Button } from "antd";

const ReusableModal = ({
  isOpen,
  title,
  content,
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  confirmLoading = false,
  footer, // 👈 Accept custom footer
}) => {
  return (
    <Modal
      open={isOpen}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      centered
      footer={
        footer ?? (
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>{cancelText}</Button>
            <Button type="primary" loading={confirmLoading} onClick={onOk}>
              {okText}
            </Button>
          </div>
        )
      }
    >
      {content}
    </Modal>
  );
};

export default ReusableModal;
