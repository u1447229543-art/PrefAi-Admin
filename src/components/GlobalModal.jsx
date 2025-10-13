import { Modal } from "@mui/material";
import { X } from "lucide-react";

const GlobalModal = ({ open, close, children }) => {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="flex items-center"
    >
      <div className="bg-white rounded-lg w-1/2 flex flex-col p-4 m-auto">
        <X className="ml-auto" onClick={close} />
        {children}
      </div>
    </Modal>
  );
};

export default GlobalModal;
