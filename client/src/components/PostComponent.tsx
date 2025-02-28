import { PostType } from '../types/PostType';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import DetailedPost from './DetailedPost';

import PostForm from './PostForm';
import { User } from '@phosphor-icons/react';

import { usePost } from '../hooks/usePost';
import { PostIconsNav } from './PostIconsNav';
import socket from '../services/socketService';

interface Props {
  postId: string;
}

const PostComponent: React.FC<Props> = ({ postId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setCurrentPost, posts } = usePost();
  const post: PostType | undefined = posts?.find((p) => p._id === postId);
  if (!post) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    socket.emit('join', postId);
    return () => {
      socket.emit('leave', postId);
    };
  }, [postId]);

  const openModal = (post: any) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setCurrentPost(null);
    setIsModalOpen(false);
  };

  return (
    <div className='post flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-fit border border-gray-200 rounded-lg my-4 bg-white'>
      <div className='post__navigation flex flex-row px-4 py-2'>
        <div className='post__user flex flex-row items-center'>
          <div className='rounded-full w-8 h-8 sm:w-10 sm:h-10 overflow-hidden'>
            {post.user_id.user_img ? (
              <img
                src={post.user_id.user_img}
                alt='Profile'
                className='w-full h-full object-cover'
              />
            ) : (
              <User
                size={28}
                className='w-full h-full rounded-full border-2 border-gray-300'
              />
            )}
          </div>
          <p className='pl-3 sm:pl-4 text-sm sm:text-base'>
            {post.user_id.username}
          </p>
        </div>
      </div>
      <div className='post__img w-full h-56 sm:h-72 md:h-80 lg:h-96'>
        <img
          src={post.image_url}
          alt='post'
          className='w-full h-full object-cover'
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {<DetailedPost />}
        </Modal>
      </div>

      <PostIconsNav postId={post._id} />
      <div className='post__description px-4 py-2 text-sm sm:text-base'>
        {post.caption}
      </div>
      <div
        className='post__comments px-4 py-2 text-xs sm:text-sm text-gray-400 cursor-pointer'
        onClick={() => openModal(post)}>
        {post.comments.length > 0
          ? `View all ${post.comments.length} comments`
          : 'Add first comment'}
      </div>

      <div className='flex flex-row w-full px-4 pb-4'>
        <PostForm post={post} />
      </div>
    </div>
  );
};

export default PostComponent;
