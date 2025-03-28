import { useEffect } from 'react';
import profile from '../assets/images/profile.png';
import PostForm from './PostForm';
import { usePost } from '../hooks/usePost';
import { PostIconsNav } from './PostIconsNav';
import { useAuth } from '../hooks/useAuth';
import { Comment } from './Comment';
import { Trash } from '@phosphor-icons/react';
import { deletePostById } from '../services/postServices';
type Props = {
  onClose: () => void;
};

const DetailedPost = ({ onClose }: Props) => {
  const { currentPost, fetchPosts } = usePost();
  const { socket, user } = useAuth();
  if (!currentPost) {
    return <div>Loading...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm('Do you want to delete a post')) {
      try {
        await deletePostById(currentPost._id);
        user && fetchPosts(user?._id);
      } catch (error) {
        console.error('Error delete post', error);
      }
    }
    onClose();
  };

  useEffect(() => {
    socket?.emit('join', currentPost?._id);

    return () => {
      socket?.emit('leave', currentPost?._id);
    };
  }, [currentPost?._id, socket]);

  const isAuthor = user?._id === currentPost?.user_id._id;
  return (
    <div
      title='detailedpost'
      className='p-5 flex flex-col lg:flex-row items-start justify-between bg-white w-full'>
      <div className='flex flex-col lg:flex-row gap-7 w-full'>
        <div className='w-full lg:w-3/5'>
          <div className='post__navigation flex flex-row px-4 py-2'>
            <div className='post__user flex flex-row items-center'>
              <div className='rounded-full'>
                <img
                  alt='User'
                  className='w-10 h-10 rounded-full'
                  src={currentPost?.user_id.user_img || profile}
                />
              </div>
              <p className='pl-4'>{currentPost?.user_id.username || ''}</p>

              {isAuthor && currentPost && (
                <div className='absolute top-4 right-12'>
                  <button onClick={handleDelete}>
                    <Trash className='w-6 h-6 text-red-500' />
                  </button>
                </div>
              )}
            </div>
            <div className='post__menu ml-auto'></div>
          </div>
          <div className='post__img w-full h-80'>
            <img
              alt='Post'
              src={currentPost?.image_url}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='post__description px-4 py-2'>
            {currentPost?.caption || 'No description available'}
          </div>
        </div>

        <div className='flex flex-col justify-between  w-full min-w-60 p-4 border-l lg:border-l-0 lg:w-2/5'>
          <h3 className='text-lg font-semibold mb-4'>Comments</h3>

          {currentPost?.comments && (
            <div className='max-h-96 overflow-y-auto w-full'>
              {currentPost.comments?.length > 0 ? (
                currentPost.comments.map((comment) => (
                  <div key={comment._id} className='mb-4 flex w-full flex'>
                    <Comment comment={comment} />
                  </div>
                ))
              ) : (
                <p>No comments yet. Be the first to comment!</p>
              )}
            </div>
          )}

          <div className='flex flex-col gap-4 w-full relative mt-4 justify-between'>
            {currentPost && <PostIconsNav postId={currentPost._id} />}{' '}
            {currentPost && <PostForm post={currentPost} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
