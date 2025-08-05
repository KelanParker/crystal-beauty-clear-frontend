import axios from "../../utils/axiosInstance"
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductForm() {
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([])
    const navigate = useNavigate();

async function handleAddProduct() {
    if (!productID || !name || !price || !labeledPrice || !stock) {
        toast.error("Please fill in all required fields.");
        return;
    }

    let imageUrls = ["default.png"]; // fallback default

    if (images.length > 0) {
  try {
    toast.loading("Uploading images...");
    
    const uploadPromises = images.map((img) => mediaUpload(img));
    const uploadedUrls = await Promise.all(uploadPromises);
    
    imageUrls = uploadedUrls;
    
    toast.dismiss();
    toast.success("Images uploaded!");
  } catch (err) {
    toast.dismiss();
    toast.error("Image upload failed");
    console.error(err);
    return;
  }
}


    const productData = {
        productID,
        name,
        alternativeNames: alternativeNames.split(",").map(name => name.trim()),
        category: "Skin Care",
        brand: "Radiance Haven",
        price: parseFloat(price),
        labeledPrice: parseFloat(labeledPrice),
        quantity: 10,
        stock: parseInt(stock, 10),
        isAvailable: true,
        rating: 4.5,
        description,
        imageUrl: imageUrls
    };

    const token = localStorage.getItem("token");
    console.log("Product Data:", productData);

    try {
        const res = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "/api/products",
            productData,
            {
                headers: {
                    Authorization: "Bearer " + token
                }
            }
        );
        toast.success("Product added successfully!");
        console.log(res)
        // Optionally clear form
        setProductID("");
        setName("");
        setAlternativeNames("");
        setPrice("");
        setLabeledPrice("");
        setDescription("");
        setStock("");
        setImages([]);
        navigate("/admin/products");
    } catch (error) {
        console.error("Failed to add product", error?.response?.data || error.message);
        toast.error("Product adding failed");
    }
}



    return (
        <div className="w-full h-full rounded-2xl flex items-center justify-center p-4">
           <div className="w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Product</h1>
            <input
                value={productID}
                onChange={(e) => setProductID(e.target.value)} 
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Product ID" 
            />
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                placeholder="Product Name" 
            />
            <input
                value={alternativeNames}
                onChange={(e) => setAlternativeNames(e.target.value)}
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                placeholder="Alternative Names"
            />
            <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                placeholder="Price"
                type="number"
            />
            <input
                value={labeledPrice}
                onChange={(e) => setLabeledPrice(e.target.value)}
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                placeholder="Labeled Price"
                type="number"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-[400px] h-[100px] border border-gray-400 rounded-2xl text-center m-[5px]"
                placeholder="Description"
            />
           <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                if (e.target.files) {
                    setImages(Array.from(e.target.files)); // Convert FileList to array
                }
                }}
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                placeholder="Product Images"
            />

            {images.length > 0 && (
            <img
                src={URL.createObjectURL(images[0])}
                alt="Preview"
                className="w-[100px] h-[100px] object-cover mt-2 rounded-lg"
            />
            )}


            <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                placeholder="Stock"
                type="number"
            />
            <div className="w-[400px] h-[100px] flex items-center justify-between">
                <Link to="/admin/products" className="bg-red-500 text-white px-4 py-2 w-[170px] text-center rounded-lg mt-4 hover:bg-red-700">Cancel</Link>
                <button
                onClick={handleAddProduct}
                className="bg-green-500 text-white px-4 py-2 w-[170px] text-center rounded-lg mt-4 ml-4 hover:bg-green-700 cursor-pointer">Add Product</button>
            </div>

           </div>
        </div>
    );
}

