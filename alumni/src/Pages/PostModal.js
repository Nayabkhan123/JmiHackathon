import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PostModal = ({ onClose, initialData }) => {
  const currUser = useSelector(state => state?.user?.user); // Get current user from Redux state
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    authorName: currUser?.name || '',  // Auto-populate for new posts
    authorPic: currUser?.profilePic || '',  // Auto-populate for new posts
    profession: currUser?.profession || '',  // Auto-populate for new posts
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData?._id) {
        // If editing an existing post, send PUT request
        await axios.put(`http://localhost:8000/api/edit-post/${initialData._id}`, formData, { withCredentials: true });
      } else {
        // If creating a new post, send POST request
        await axios.post('http://localhost:8000/api/create-post', formData, { withCredentials: true });
      }
      onClose(true);  // Close the modal after success
    } catch (err) {
      console.error('Post submission error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 w-full max-w-lg relative">
        <h2 className="text-xl font-semibold text-white">{initialData ? 'Edit Post' : 'New Post'}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Post Title */}
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Post Content */}
          <textarea
            name="content"
            placeholder="Write your post here..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full border border-gray-600 bg-gray-700 text-white rounded-md px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Hidden Fields for Author Info - Automatically populated for new posts */}
          <input
            type="hidden"
            name="authorName"
            value={formData.authorName}
          />
          <input
            type="hidden"
            name="authorPic"
            value={formData.authorPic}
          />
          <input
            type="hidden"
            name="profession"
            value={formData.profession}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : initialData ? 'Update' : 'Post'}
            </button>
          </div>
        </form>

        {/* Close button in top-right corner */}
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PostModal;
