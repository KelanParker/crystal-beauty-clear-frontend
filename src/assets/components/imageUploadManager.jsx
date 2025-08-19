// Image Upload Utility for ELIORE Admin
// This component helps admin users upload images to Supabase storage

import { useState } from 'react';
import { uploadMultipleImages } from '../../../utils/supabaseStorage';
import toast from 'react-hot-toast';
import { FaUpload, FaCopy, FaTrash, FaEye } from 'react-icons/fa';

export default function ImageUploadManager() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState('products');

    const folders = [
        { value: 'hero', label: 'Hero Section Images (1920x1080px)' },
        { value: 'products', label: 'Product Images (400x400px)' },
        { value: 'categories', label: 'Category Icons (300x300px)' },
        { value: 'team', label: 'Team Photos (300x300px)' },
        { value: 'values', label: 'Company Values Icons (100x100px)' },
        { value: 'office', label: 'Office/Store Photos (600x400px)' },
        { value: 'ecommerce', label: 'E-commerce Icons (64x64px)' },
        { value: 'testimonials', label: 'Customer Photos (150x150px)' },
        { value: 'backgrounds', label: 'Background Images (1920x1080px)' },
        { value: 'branding', label: 'Logo & Branding (Various sizes)' },
        { value: 'placeholders', label: 'Placeholder Images' }
    ];

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            toast.error('Please select files to upload');
            return;
        }

        setUploading(true);
        try {
            const uploadedUrls = await uploadMultipleImages(selectedFiles, selectedFolder);
            
            const newImages = selectedFiles.map((file, index) => ({
                name: file.name,
                url: uploadedUrls[index],
                folder: selectedFolder,
                size: file.size,
                type: file.type
            }));

            setUploadedImages(prev => [...prev, ...newImages]);
            setSelectedFiles([]);
            toast.success(`Successfully uploaded ${uploadedUrls.length} image(s)`);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload images');
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        toast.success('URL copied to clipboard!');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                📸 ELIORE - Image Upload Manager
            </h2>
            
            {/* Folder Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Image Category:
                </label>
                <select
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                >
                    {folders.map(folder => (
                        <option key={folder.value} value={folder.value}>
                            {folder.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* File Upload Section */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Images:
                </label>
                <div className="flex items-center gap-4">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="flex-1 p-3 border border-gray-300 rounded-lg"
                    />
                    <button
                        onClick={handleUpload}
                        disabled={uploading || selectedFiles.length === 0}
                        className="flex items-center gap-2 bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 disabled:bg-gray-400 transition-colors"
                    >
                        <FaUpload />
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Selected Files:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-3">
                                <p className="font-medium text-sm truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                <p className="text-xs text-gray-500">{file.type}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                        ✅ Uploaded Images ({uploadedImages.length}):
                    </h3>
                    <div className="space-y-3">
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg">
                                <img 
                                    src={image.url} 
                                    alt={image.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{image.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {image.folder} • {formatFileSize(image.size)}
                                    </p>
                                    <p className="text-xs text-blue-600 font-mono truncate">
                                        {image.url}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => copyToClipboard(image.url)}
                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                                        title="Copy URL"
                                    >
                                        <FaCopy />
                                    </button>
                                    <a
                                        href={image.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-green-500 hover:bg-green-50 rounded"
                                        title="View Image"
                                    >
                                        <FaEye />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Usage Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">📋 How to Use:</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Select the appropriate category for your images</li>
                    <li>Choose one or more image files</li>
                    <li>Click "Upload" to save them to Supabase storage</li>
                    <li>Copy the generated URLs to use in your components</li>
                    <li>Update the CRYSTAL_BEAUTY_IMAGES object in supabaseStorage.js with the new URLs</li>
                </ol>
            </div>

            {/* Recommended Image Sizes */}
            <div className="mt-4 bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">📏 Recommended Image Sizes:</h4>
                <div className="text-sm text-yellow-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>• Hero Images: 1920x1080px</div>
                    <div>• Product Images: 400x400px</div>
                    <div>• Category Icons: 300x300px</div>
                    <div>• Team Photos: 300x300px</div>
                    <div>• Value Icons: 100x100px</div>
                    <div>• Office Photos: 600x400px</div>
                    <div>• E-commerce Icons: 64x64px</div>
                    <div>• Testimonial Photos: 150x150px</div>
                </div>
            </div>
        </div>
    );
}
