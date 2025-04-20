import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PostCard from './PostCard';
import PostModal from './PostModal';
import backendUrl from '../common';

const CommunityPage = () => {
  const currUser = useSelector((state) => state?.user?.user);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(backendUrl.allposts.url, { withCredentials: true });
      setPosts(res.data.posts);
    } catch (err) {
      console.error('Error fetching posts', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditData(post);
    setShowModal(true);
  };

  const handleModalClose = (updated = false) => {
    setShowModal(false);
    setEditData(null);
    if (updated) fetchPosts();
  };

  return (
    <div className="bg-gray-900 w-100vw">
    <div className="max-w-5xl mx-auto p-4 text-white bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
        <h1 className="text-3xl font-bold text-white">Community Forum</h1>
        {currUser && (
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Post
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-400">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No posts yet. Be the first to share!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onEdit={() => handleEdit(post)}
              onDelete={(id) => setPosts(posts.filter((p) => p._id !== id))}
              currUser={currUser}
            />
          ))}
        </div>
      )}

      {showModal && (
        <PostModal
          onClose={handleModalClose}
          initialData={editData}
        />
      )}
    </div>
    </div>
  );
};

export default CommunityPage;
