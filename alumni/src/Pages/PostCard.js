import React, { useState } from 'react';
import axios from 'axios';
import backendUrl from '../common';

const PostCard = ({ post, onEdit, onDelete, currUser }) => {
  const isAuthor = currUser?.name === post.authorName;
  const [seemore,setSeeMore] = useState(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${backendUrl.deletePost.url}/${post._id}`, {
        withCredentials: true,
      });
      onDelete(post._id);
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className="bg-gray-800 w-[90%] md:w-[70%] mx-auto px-8 py-4 flex flex-col gap-2 rounded-lg shadow-md space-y-2 text-white">
      <div className="flex items-center gap-4 mb-2">
        <img
          src={post.authorPic || '/default-avatar.png'}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border border-gray-700"
        />
        <div>
          <p className="font-semibold">{post.authorName}</p>
          <p className="text-sm text-gray-400">{post.profession || 'Alumnus'}</p>
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <div>
          <h3 className="text-md md:text-xl font-bold">{post.title}</h3>
          <span className={`text-gray-300 whitespace-pre-line ${seemore ? "line-clamp-none" : "line-clamp-4"}`}>{post.content}</span>
          <span className='cursor-pointer text-blue-400' onClick={()=>setSeeMore(!seemore)}>
            {
              post.content?.length>100 && (seemore?("see less"):("...more"))
            }
          </span>
        </div>
        <div>
          <img src={post?.postImage}
            className='w-full'/>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(post.createdAt).toLocaleString()}</span>
        {isAuthor && (
          <div className="space-x-2">
            <button
              onClick={onEdit}
              className="px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-700 text-gray-300"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 border border-red-500 rounded-md hover:bg-red-700 text-red-400"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
