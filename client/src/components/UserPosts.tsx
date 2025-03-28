import { useEffect, useState } from 'react';
import Modal from './Modal';
import DetailedPost from './DetailedPost';
import { usePost } from '../hooks/usePost';
import { UserType } from '../types/UserType';

interface Props {
  profileUser: UserType;
}

const UserPosts: React.FC<Props> = ({ profileUser }) => {
  const { posts, fetchPosts, setCurrentPost } = usePost();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: any) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentPost(null);
    setIsModalOpen(false);
  };
  useEffect(() => {
    profileUser && fetchPosts(profileUser?._id);
  }, [profileUser]);

  return (
    <div className='post-grid grid grid-cols-3 gap-2 p-4 '>
      {posts?.map((post) => (
        <div
          key={post._id}
          className=' w-auto aspect-w-1 aspect-h-1 overflow-hidden cursor-pointer'
          onClick={() => openModal(post)}>
          <img
            src={post.image_url}
            alt='Post'
            className='w-full h-full object-cover'
          />
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DetailedPost onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default UserPosts;
