import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  
import axios from 'axios';

export const CommunityFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/all-posts', {
          withCredentials: true,
        });

        setData(response.data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div id='communityFeed' className='flex flex-col gap-4'>
        <div className='w-full flex items-center justify-center flex-col'>
            <h3 className='font-bold text-3xl text-center'>Community Feed</h3>
            <div className='h-[1px] w-56 bg-black'></div>
        </div>

      <Link to="/community">
        <div className="lg:w-[70%] bg-gray-800 rounded-xl h-[640px] mx-auto overflow-auto scrollbar-none p-4 space-y-6">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading posts...</div>
          ) : data.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No posts available</div>
          ) : (
            data.map((post) => (
              <div key={post._id} className="border-b border-gray-600 pb-4 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorPic || 'https://via.placeholder.com/35'}
                                    width={35}
                                    height={35}
                    className="rounded-full border border-gray-500"
                    alt="User"
                  />
                  <p className="font-semibold text-white">{post.authorName}</p>
                            </div>
                            <div>
                  <p className="font-bold text-lg text-blue-400">{post.title}</p>
                  <p className="text-gray-300 line-clamp-6">{post.content}</p>
                            </div>
                        </div>
            ))
          )}
        </div>
      </Link>
    </div>
  );
};
