import { useEffect } from 'react';

interface MessageModalProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ message, type, visible, onClose }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Dismiss modal after 1s

      return () => clearTimeout(timer); // Cleanup the timeout on unmount
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`p-4 rounded-md shadow-lg ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageModal;
