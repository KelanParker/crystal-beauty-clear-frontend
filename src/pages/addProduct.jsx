import { Link } from "react-router-dom";

export default function AddProductForm() {
    return (
        <div className="w-full h-full rounded-2xl flex items-center justify-center p-4">
           <div className="w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Product</h1>
            <input 
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Product ID" 
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Product Name" 
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Alternative Names" 
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Price" 
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Labeled Price" 
            />
            <textarea 
                className="w-[400px] h-[100px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Description"
            />
            <input 
                className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]" 
                placeholder="Stock"
            />
            <div className="w-[400px] h-[100px] flex items-center justify-between">
                <Link to="/admin/products" className="bg-red-500 text-white px-4 py-2 w-[170px] text-center rounded-lg mt-4 hover:bg-red-700">Cancel</Link>
                <button className="bg-green-500 text-white px-4 py-2 w-[170px] text-center rounded-lg mt-4 ml-4 hover:bg-green-700 cursor-pointer">Add Product</button>
            </div>

           </div>
        </div>
    );
}
