import React from 'react';
import { CommentType } from '../types/CommentType';
import profile from '../assets/images/profile.png';
import { useAuth } from '../hooks/useAuth';
import { Heart } from '@phosphor-icons/react';
import { timeAgo } from '../utils/timeAgo';

interface Props {
  comment: CommentType;
}

export const Comment: React.FC<Props> = ({ comment }) => {
  const { user, socket } = useAuth();

  if (!comment) {
    return <div>Loading...</div>;
  }

  const liked = comment.likes.some((id) => id === user?._id);

  const handleLike = () => {
    console.log(comment._id);
    console.log(comment);
    console.log(liked);
    socket?.emit('like_comment', comment._id);
  };

  const handleDelete = () => {
    socket?.emit('delete_comment', comment._id, comment.post_id);
  };

  const canDelete =
    user?._id === comment.user_id._id || user?._id === comment.user_id._id;

  return (
    <div className='comment my-2'>
      <div className='flex-col items-start justify-start w-full'>
        <div className='flex items-start justify-start gap-2 w-full'>
          <img
            alt='Avatar'
            className='w-8 h-8 rounded-full'
            src={comment.user_id?.user_img || profile}
          />
          <p className='font-semibold '>{comment.user_id?.username || ''}</p>
        </div>
        <div className='flex justify-between w-full mt-1 '>
          {' '}
          <p className='break-all whitespace-normal w-full  '>{comment.text}</p>
          <button
            onClick={handleLike}
            className='p-2 focus:outline-none cursor-pointer ml-auto'>
            <Heart
              size={15}
              weight={liked ? 'fill' : 'regular'}
              color={liked ? 'red' : 'black'}
            />
          </button>
        </div>
      </div>

      <div className=' mt-1  flex items-start justify-start text-sm text-gray-500 gap-5 w-full'>
        <span>
          {' '}
          {timeAgo(comment?.createdAt || new Date(), { format: 'short' })}
        </span>
        <span>{comment.likes.length} likes</span>
        {canDelete && (
          <button onClick={handleDelete} className='text-red-500 '>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
