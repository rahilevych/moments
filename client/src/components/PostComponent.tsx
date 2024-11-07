import { PostType } from '../types/PostType';
import { useContext, useEffect, useState } from 'react';
import Modal from './Modal';
import DetailedPost from './DetailedPost';
import { UserContext } from '../context/UserContext';
import { PostContext } from '../context/PostContext';
import { getPostById } from '../services/postServices';
import { getUserById } from '../services/userService';

import PostIconsNav from './PostIconsNav';

import PostForm from './PostForm';
import { User } from '@phosphor-icons/react';

interface Props {
  post: PostType;
}

const PostComponent = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setPost } = useContext(PostContext);
  const { user, setProfileUser } = useContext(UserContext);

  const toggleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  const fetchPost = async () => {
    console.log('user from post component>>>', user);
    try {
      setProfileUser(user && (await getUserById(user._id)));
      setPost(await getPostById(props.post._id));
    } catch (error) {
      console.error('Error by getting user', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className='post flex flex-col w-full sm:w-3/4 md:w-2/3 lg:w-2/5 h-fit border border-gray-200 rounded-lg my-4 bg-white'>
      <div className='post__navigation flex flex-row px-4 py-2'>
        <div className='post__user flex flex-row items-center'>
          <div className='rounded-full w-8 h-8 sm:w-10 sm:h-10 overflow-hidden'>
            {props.post.user_id.user_img ? (
              <img
                src={props.post.user_id.user_img}
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
            {props.post.user_id.username}
          </p>
        </div>
      </div>
      <div className='post__img w-full h-56 sm:h-72 md:h-80 lg:h-96'>
        <img
          src={props.post.image_url}
          alt='post'
          className='w-full h-full object-cover'
        />
        <Modal isOpen={isModalOpen} onClose={toggleOpenModal}>
          {<DetailedPost post={props.post} />}
        </Modal>
      </div>

      <PostIconsNav post={props.post} fetchPost={fetchPost} />
      <div className='post__description px-4 py-2 text-sm sm:text-base'>
        {props.post.caption}
      </div>
      <div
        className='post__comments px-4 py-2 text-xs sm:text-sm text-gray-400 cursor-pointer'
        onClick={toggleOpenModal}>
        {props.post.comments.length > 0
          ? `View all ${props.post.comments.length} comments`
          : 'Add first comment'}
      </div>

      <div className='flex flex-row w-full px-4 pb-4'>
        <PostForm />
      </div>
    </div>
  );
};

export default PostComponent;
