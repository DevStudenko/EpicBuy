import { useState } from 'react';
import CreateProduct from '../../Products/CreateProduct';
import ProductsList from '../../Products/ProductsList';
import UpdateProduct from '../../Products/UpdateProduct';
import ConfirmationModal from './ConfirmationModal';
import { useModal } from '../../../context/Modal';

const ManageProducts = () => {
    const { setModalContent, closeModal } = useModal();
    const [activeComponent, setActiveComponent] = useState(null);

    const handleEdit = (product) => {
        setModalContent(<UpdateProduct product={product} onClose={closeModal} />);
    };

    const handleDelete = (product) => {
        setModalContent(<ConfirmationModal product={product} onClose={closeModal} />);
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'createProduct':
                return <CreateProduct />;
            case 'productsList':
                return <ProductsList onEdit={handleEdit} onDelete={handleDelete} />;
            default:
                return <p>Select an option to view</p>;
        }
    };

    return (
        <div className="manage-products">
            <button onClick={() => setActiveComponent('createProduct')}>Add Product</button>
            <button onClick={() => setActiveComponent('productsList')}>Update Inventory</button>
            <div className="component-container">
                {renderComponent()}
            </div>
        </div>
    );
};

export default ManageProducts;
