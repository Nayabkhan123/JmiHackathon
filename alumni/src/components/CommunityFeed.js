import React, { useState } from 'react'

export const CommunityFeed = () => {
    // const [data,setdata] = useState([])
    const data = [
        {
            userName:"Nayab",
            userImage:"https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-user-profile-vector-png-image_4830519.jpg",
            postTitle:"today, we have a good day in Jamia Millia Islamia",
            postDescription:"A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati",
            date:"18-04-2025",
        },
        {
            userName:"Nayab",
            userImage:"https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-user-profile-vector-png-image_4830519.jpg",
            postTitle:"today, we have a good day in Jamia Millia Islamia",
            postDescription:"A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati",
            date:"18-04-2025",
        },
        {
            userName:"Nayab",
            userImage:"https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-user-profile-vector-png-image_4830519.jpg",
            postTitle:"today, we have a good day in Jamia Millia Islamia",
            postDescription:"A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati",
            date:"18-04-2025",
        },
        {
            userName:"Rizwan",
            userImage:"https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-user-profile-vector-png-image_4830519.jpg",
            postTitle:"today, we have a good day in Jamia Millia Islamia",
            postDescription:"A training program titled Artificial Intelligence/Machine Learning Innovative Analyst is scheduled to take place from May 2025 to February 2026 at IIT Guwahati. The training program is going to be conducted by Daksh Gurukul, IIT Guwahati in collaboration with Assam Building & Other Construction Workers’ Welfare Board (ABOCWWB). An MoU between IIT Guwahati and ABOCWWB has been already signed by Prof. Rohit Sinha, Dean, Research and Development, IIT Guwahati",
            date:"18-04-2025",
        },
    ]
  return (
    <div id='communityFeed' className='flex flex-col gap-4'>
        <div className='w-full flex items-center justify-center flex-col'>
            <h3 className='font-bold text-3xl text-center'>Community Feed</h3>
            <div className='h-[1px] w-56 bg-black'></div>
        </div>
        <div className='lg:w-[70%] bg-accent h-[640px] mx-auto overflow-auto scrollbar-none'>
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
    </div>
  )
}
