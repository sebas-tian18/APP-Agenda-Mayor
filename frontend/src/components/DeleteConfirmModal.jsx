function DeleteConfirmModal({ isOpen, onClose, onConfirm, userName }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmar Eliminación</h3>
          <p className="text-gray-700 mb-6">
            ¿Estás seguro que deseas eliminar al usuario <span className="font-semibold">{userName}</span>?
            Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-300"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteConfirmModal;