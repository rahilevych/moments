import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Modal from './Modal';
import DetailedPost from './DetailedPost';
import { PostType } from '../types/PostType';

interface Props {
  posts: PostType[];
}
const UserPosts = (props: Props) => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  if (!user) {
    return null;
  }
  const openModal = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (
    <div className='post-grid grid grid-cols-3 gap-2 p-4'>
      {props.posts?.map((post) => (
        <div
          key={post._id}
          className='post-item w-full h-48 overflow-hidden cursor-pointer'
          onClick={() => openModal(post)}>
          <img
            src={post.image_url}
            alt='Post'
            className='w-full h-full object-cover'
          />
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedPost && <DetailedPost post={selectedPost} />}
      </Modal>
    </div>
  );
};

export default UserPosts;
