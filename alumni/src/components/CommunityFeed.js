import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  
import axios from 'axios';
import defaultUserImage from '../assets/user.jpg'
import backendUrl from '../common';
export const CommunityFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seemore,setSeeMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(backendUrl.allposts.url, {
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
    <div id="communityFeed" className="flex flex-col gap-6 p-6 bg-gray-900 text-white">
      <div className="w-full flex items-center justify-center flex-col">
        <Link to="/community" className="flex items-center gap-2">
          <h3 className="font-bold text-3xl text-white">Community Feed</h3>
        </Link>
        <div className="h-[1px] w-56 bg-gray-500 mt-2" />
      </div>

      <Link to="/community">
        <div className="lg:w-[70%] bg-gray-800 rounded-xl h-[640px] mx-auto overflow-auto scrollbar-none p-4 space-y-6">
          {loading ? (
            <div className="text-center py-10 text-gray-400">Loading posts...</div>
          ) : data?.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No posts available</div>
          ) : (
            data.map((post) => (
              <div key={post._id} className="border-b border-gray-600 pb-4 p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorPic || defaultUserImage}
                    width={35}
                    height={35}
                    className="rounded-full border border-gray-500"
                    alt="User"
                  />
                  <div className='flex flex-col'>
                    <p className="font-semibold text-white">{post.authorName}</p>
                    <p className="text-sm text-white">{post.profession}</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg text-blue-400">{post.title}</p>
                  <span className={`text-gray-300 whitespace-pre-line ${seemore ? "line-clamp-none" : "line-clamp-4"}`}>{post.content}</span>
                  <span className='cursor-pointer text-blue-400' onClick={(e)=>{e.preventDefault(); setSeeMore(!seemore)}}>
                    {
                      post.content?.length>100 && (seemore?("see less"):("...more"))
                    }
                  </span>
                  <div>
                    <img src={post?.postImage}
                      className='w-full'/>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Link>
    </div>
  );
};