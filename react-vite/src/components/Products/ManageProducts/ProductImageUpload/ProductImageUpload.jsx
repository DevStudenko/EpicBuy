import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProductThunk } from "../../redux/session";
import { useModal } from "../../context/Modal";

const ProductImageUpload = (productId) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const { closeModal } = useModal();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "product");
        formData.append("id", productId);

        const result = await dispatch(editProductThunk(formData, productId));
        if (result.errors) {
            setError(result.errors);
        } else {
            setError(null);
            setFile(null);
            closeModal();
        }
    };

    return (
        <div onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
            {error && <p>{error}</p>}
        </div>
    );
}

export default ProductImageUpload
