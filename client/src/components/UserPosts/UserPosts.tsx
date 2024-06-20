// PostGridComponent.jsx
import React, { useEffect, useState } from 'react';
import postimg from '../../assets/images/postimg.png';
import { PostType } from '../../types/PostType';
import axios from 'axios';

const UserPosts = () => {
  // const posts = [
  //   postimg,
  //   postimg,
  //   postimg,
  //   postimg,
  //   postimg,
  //   postimg,
  //   postimg,
  //   postimg,
  //   postimg,
  // ];

  const [posts, setPosts] = useState<PostType[] | null>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4003/users/6662f11b344bcc1173c89cb7`
      );
      setPosts(response.data.posts);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='post-grid grid grid-cols-3 gap-2 p-4'>
      {posts?.map((post, index) => (
        <div key={index} className='post-item w-full h-48 overflow-hidden'>
          <img
            src={post.image_url}
            alt='Post'
            className='w-full h-full object-cover'
          />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
