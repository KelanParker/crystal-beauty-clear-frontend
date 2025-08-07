import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/auth';
import { CRYSTAL_BEAUTY_IMAGES, uploadImage, supabase } from '../../../utils/supabaseStorage';
import { BsImage, BsUpload, BsDownload, BsTrash, BsEye, BsCopy, BsGrid, BsList, BsFolder, BsGear, BsPalette, BsCode, BsShield } from 'react-icons/bs';
import { FaSave, FaEdit, FaTimes, FaCheck, FaPlus } from 'react-icons/fa';

export default function DeveloperPanel() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('images');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('hero');
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [editingUrls, setEditingUrls] = useState({});
  const [savedMessage, setSavedMessage] = useState('');
  const [bucketContents, setBucketContents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || (currentUser.role !== 'developer' && currentUser.role !== 'owner')) {
      navigate('/');
      return;
    }
    setUser(currentUser);
    loadBucketContents();
  }, [navigate]);

  const loadBucketContents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.storage.from('site-images').list('', {
        limit: 100,
        offset: 0
      });
      
      if (error) {
        console.error('Error loading bucket contents:', error);
      } else {
        setBucketContents(data || []);
      }
    } catch (error) {
      console.error('Error loading bucket contents:', error);
    }
    setIsLoading(false);
  };

  const categories = [
    { id: 'hero', name: 'Hero Images', description: 'Homepage hero slider images', color: 'bg-purple-500' },
    { id: 'products', name: 'Products', description: 'Product showcase images', color: 'bg-pink-500' },
    { id: 'categories', name: 'Categories', description: 'Product category icons', color: 'bg-blue-500' },
    { id: 'team', name: 'Team Photos', description: 'Team member photos', color: 'bg-green-500' },
    { id: 'values', name: 'Company Values', description: 'Value proposition icons', color: 'bg-yellow-500' },
    { id: 'office', name: 'Office/Store', description: 'Physical location photos', color: 'bg-indigo-500' },
    { id: 'ecommerce', name: 'E-commerce Icons', description: 'Shopping and payment icons', color: 'bg-red-500' },
    { id: 'testimonials', name: 'Testimonials', description: 'Customer photos', color: 'bg-teal-500' },
    { id: 'backgrounds', name: 'Backgrounds', description: 'Background textures', color: 'bg-gray-500' },
    { id: 'branding', name: 'Branding', description: 'Logos and brand assets', color: 'bg-orange-500' },
    { id: 'placeholders', name: 'Placeholders', description: 'Fallback images', color: 'bg-cyan-500' },
  ];

  const handleFileUpload = async (files, category) => {
    setIsUploading(true);
    const fileArray = Array.from(files);
    
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const progressKey = `${category}_${i}`;
      
      try {
        setUploadProgress(prev => ({ ...prev, [progressKey]: 0 }));
        
        // Mock progress for demonstration
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100));
          setUploadProgress(prev => ({ ...prev, [progressKey]: progress }));
        }
        
        const url = await uploadImage(file, category);
        console.log(`Uploaded ${file.name} to ${category}:`, url);
        
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }
    
    setUploadProgress({});
    setIsUploading(false);
    loadBucketContents();
    setSavedMessage(`Successfully uploaded ${fileArray.length} file(s) to ${category}`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleUrlEdit = (category, key, newUrl) => {
    setEditingUrls(prev => ({
      ...prev,
      [`${category}.${key}`]: newUrl
    }));
  };

  const saveUrlEdit = (category, key) => {
    const editKey = `${category}.${key}`;
    const newUrl = editingUrls[editKey];
    
    // In a real app, this would update the database
    console.log(`Updating ${category}.${key} to:`, newUrl);
    
    setEditingUrls(prev => {
      const updated = { ...prev };
      delete updated[editKey];
      return updated;
    });
    
    setSavedMessage(`Updated ${key} URL successfully!`);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const cancelUrlEdit = (category, key) => {
    const editKey = `${category}.${key}`;
    setEditingUrls(prev => {
      const updated = { ...prev };
      delete updated[editKey];
      return updated;
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSavedMessage('URL copied to clipboard!');
    setTimeout(() => setSavedMessage(''), 2000);
  };

  const tabs = [
    { id: 'images', label: 'Image Manager', icon: BsImage },
    { id: 'upload', label: 'Bulk Upload', icon: BsUpload },
    { id: 'settings', label: 'Site Settings', icon: BsGear },
    { id: 'theme', label: 'Theme Config', icon: BsPalette },
    { id: 'code', label: 'Code Generator', icon: BsCode },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <BsShield className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-2xl font-bold">Developer Panel</h1>
                  <p className="text-sm text-gray-300">Advanced Site Management</p>
                </div>
              </div>
            </div>
            
            {savedMessage && (
              <div className="bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-2 rounded-lg backdrop-blur-sm">
                {savedMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 p-8">
              
              {/* Image Manager Tab */}
              {activeTab === 'images' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Image Manager</h2>
                    <div className="flex items-center space-x-4">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                      
                      <div className="flex bg-black/30 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-500' : 'hover:bg-white/10'}`}
                        >
                          <BsGrid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-500' : 'hover:bg-white/10'}`}
                        >
                          <BsList className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Category Images */}
                  <div className="space-y-6">
                    {CRYSTAL_BEAUTY_IMAGES[selectedCategory] && (
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-4 h-4 rounded-full ${categories.find(c => c.id === selectedCategory)?.color}`}></div>
                          <h3 className="text-xl font-semibold capitalize">{selectedCategory} Images</h3>
                        </div>
                        
                        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                          {Object.entries(CRYSTAL_BEAUTY_IMAGES[selectedCategory]).map(([key, url]) => {
                            const editKey = `${selectedCategory}.${key}`;
                            const isEditing = editingUrls.hasOwnProperty(editKey);
                            
                            return (
                              <div key={key} className="bg-black/30 rounded-lg border border-white/10 p-4">
                                <div className="aspect-video bg-black/50 rounded-lg mb-3 relative overflow-hidden">
                                  <img
                                    src={url}
                                    alt={key}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
                                    }}
                                  />
                                  <div className="absolute top-2 right-2 flex space-x-1">
                                    <button
                                      onClick={() => window.open(url, '_blank')}
                                      className="p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
                                    >
                                      <BsEye className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={() => copyToClipboard(url)}
                                      className="p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
                                    >
                                      <BsCopy className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm">{key}</h4>
                                    {!isEditing ? (
                                      <button
                                        onClick={() => setEditingUrls(prev => ({ ...prev, [editKey]: url }))}
                                        className="p-1 text-gray-400 hover:text-white"
                                      >
                                        <FaEdit className="w-3 h-3" />
                                      </button>
                                    ) : (
                                      <div className="flex space-x-1">
                                        <button
                                          onClick={() => saveUrlEdit(selectedCategory, key)}
                                          className="p-1 text-green-400 hover:text-green-300"
                                        >
                                          <FaCheck className="w-3 h-3" />
                                        </button>
                                        <button
                                          onClick={() => cancelUrlEdit(selectedCategory, key)}
                                          className="p-1 text-red-400 hover:text-red-300"
                                        >
                                          <FaTimes className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {isEditing ? (
                                    <input
                                      type="text"
                                      value={editingUrls[editKey]}
                                      onChange={(e) => setEditingUrls(prev => ({ ...prev, [editKey]: e.target.value }))}
                                      className="w-full px-2 py-1 text-xs bg-black/50 border border-white/20 rounded text-white"
                                    />
                                  ) : (
                                    <p className="text-xs text-gray-400 truncate">{url}</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Bulk Upload Tab */}
              {activeTab === 'upload' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Bulk Upload Manager</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                      <div key={category.id} className="bg-black/30 rounded-lg border border-white/10 p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-xs text-gray-400">{category.description}</p>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e.target.files, category.id)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={isUploading}
                          />
                          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                            <BsUpload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-400">Drop files or click to upload</p>
                          </div>
                        </div>
                        
                        {/* Progress indicators */}
                        {Object.entries(uploadProgress).map(([key, progress]) => {
                          if (!key.startsWith(category.id)) return null;
                          return (
                            <div key={key} className="mt-2">
                              <div className="w-full bg-black/50 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Site Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Site Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-black/30 rounded-lg border border-white/10 p-6">
                      <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Site Title</label>
                          <input
                            type="text"
                            defaultValue="Crystal Beauty Clear"
                            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Site Description</label>
                          <input
                            type="text"
                            defaultValue="Professional Skincare Solutions"
                            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-lg border border-white/10 p-6">
                      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            defaultValue="info@crystalbeauty.com"
                            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <input
                            type="tel"
                            defaultValue="+1 (555) 123-4567"
                            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Theme Config Tab */}
              {activeTab === 'theme' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Theme Configuration</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-black/30 rounded-lg border border-white/10 p-6">
                      <h3 className="text-lg font-semibold mb-4">Color Scheme</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { name: 'Primary', value: '#ec4899', var: '--color-primary' },
                          { name: 'Secondary', value: '#8b5cf6', var: '--color-secondary' },
                          { name: 'Accent', value: '#f59e0b', var: '--color-accent' },
                          { name: 'Text', value: '#1f2937', var: '--color-text' },
                        ].map((color) => (
                          <div key={color.name}>
                            <label className="block text-sm font-medium mb-2">{color.name}</label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="color"
                                defaultValue={color.value}
                                className="w-8 h-8 rounded border border-white/20"
                              />
                              <input
                                type="text"
                                defaultValue={color.value}
                                className="flex-1 px-2 py-1 bg-black/50 border border-white/20 rounded text-white text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-lg border border-white/10 p-6">
                      <h3 className="text-lg font-semibold mb-4">Typography</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Primary Font</label>
                          <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white">
                            <option>Inter</option>
                            <option>Roboto</option>
                            <option>Open Sans</option>
                            <option>Montserrat</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Heading Font</label>
                          <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white">
                            <option>Playfair Display</option>
                            <option>Merriweather</option>
                            <option>Lora</option>
                            <option>Crimson Text</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Code Generator Tab */}
              {activeTab === 'code' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Code Generator</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-black/30 rounded-lg border border-white/10 p-6">
                      <h3 className="text-lg font-semibold mb-4">Generate Component Code</h3>
                      <p className="text-gray-400 mb-4">Generate React component code with current image URLs</p>
                      
                      <div className="flex space-x-4">
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                          Generate Hero Component
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200">
                          Generate Product Grid
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-200">
                          Export All URLs
                        </button>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-lg border border-white/10 p-6">
                      <h3 className="text-lg font-semibold mb-4">Current Image URLs JSON</h3>
                      <pre className="bg-black/50 p-4 rounded-lg text-sm text-green-400 overflow-auto max-h-96">
                        {JSON.stringify(CRYSTAL_BEAUTY_IMAGES, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
