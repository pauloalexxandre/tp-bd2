
interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Não exibe o modal se não estiver aberto

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
        <div className="overflow-y-auto max-h-[600px] h-[60vh] overflow-x-auto w-[60vw]  max-w-[800px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
