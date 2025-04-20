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
        <div className='lg:w-[70%] bg-gray-200 h-[640px] mx-auto overflow-auto scrollbar-none'>
            {
                data.map((post)=>{
                    return (
                        <div className='px-10 pt-10 flex gap-3 flex-col'>
                            <div className='flex items-center gap-3'>
                                <img src={post.userImage} 
                                    width={35}
                                    height={35}
                                    className='rounded-full'/>
                                <p className='font-semibold'>{post.userName}</p>
                            </div>
                            <div>
                                <p className='font-bold'>{post.postTitle}</p>
                                <p className='line-clamp-6'>{post.postDescription}</p>
                            </div>
                            <div className='h-[1px] bg-black'></div>
                        </div>
                    )
                })
            }
        </div>
      </Link>
    </div>
  );
};
