import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = ({ newPost }) => {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editData, setEditData] = useState({ postTitle: '', postDescription: '' });

  useEffect(() => {
    fetchPosts();
  }, [newPost]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setEditData({
      postTitle: post.postTitle,
      postDescription: post.postDescription,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    try {
        let url = "http://localhost:5000/api/posts/${id}"
      await axios.put(url, editData);
      setEditPostId(null)
      fetchPosts()// Refresh posts
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 w-full">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center gap-4 mb-4">
            <img
              src={post.userImage}
              alt={post.userName}
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800">{post.userName}</h4>
              <p className="text-sm text-gray-500">{post.profession}</p>
            </div>
          </div>

          {/* If editing, show form */}
          {editPostId === post._id ? (
            <div className="space-y-2">
              <input
                name="postTitle"
                value={editData.postTitle}
                onChange={handleEditChange}
                className="w-full border p-2 rounded-md"
              />
              <textarea
                name="postDescription"
                value={editData.postDescription}
                onChange={handleEditChange}
                rows="4"
                className="w-full border p-2 rounded-md"
              />
              <div className="text-right space-x-2">
                <button
                  onClick={() => setEditPostId(null)}
                  className="px-4 py-1 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEditSubmit(post._id)}
                  className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-900">{post.postTitle}</h3>
              <p className="text-gray-700 mt-1 whitespace-pre-line">{post.postDescription}</p>
              <div className="text-sm text-gray-400 text-right">
                {new Date(post.createdAt).toLocaleString()}
              </div>
              <button
                onClick={() => handleEditClick(post)}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                ✏ Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;