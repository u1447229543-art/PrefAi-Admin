import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

const DocumentCard = ({ image, title, type, folderName, userName, email, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <>
      <div 
        className="w-full max-w-[350px] bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative"
        onClick={handleCardClick}
      >
        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Delete document"
        >
          <Trash2 size={20} />
        </button>

        {/* Image Section */}
        <div className="relative overflow-hidden group h-64">
          {type !== "application/pdf" ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <img
                src="https://img.icons8.com/color/48/000000/pdf-2.png"
                alt={title}
                className="w-[200px] h-[200px] transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <h2 className="text-lg font-bold text-[#170048] mb-2">
            File Name - {title}
          </h2>
          <h2 className="text-lg font-bold text-[#170048] mb-2">
            User Name - {userName}
          </h2>
          <h2 className="text-lg font-bold text-[#170048] mb-2">
            Email - {email}
          </h2>
          <h2 className="text-lg font-bold text-[#170048] mb-2">
            Folder Name - {folderName}
          </h2>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="w-full h-full flex items-center justify-center p-8">
              {type !== "application/pdf" ? (
                <img
                  src={image}
                  alt={title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              ) : (
                <iframe
                  src={image}
                  title={title}
                  className="w-full h-[80vh] border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocumentCard;