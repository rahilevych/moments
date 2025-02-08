import { ChatCircle, Heart } from '@phosphor-icons/react';
import socket from '../services/socketService';
import { useEffect, useState } from 'react';
import { usePost } from '../hooks/usePost';
import { useUser } from '../hooks/useUser';
import { PostType } from '../types/PostType';
import { timeAgo } from '../utils/timeAgo';

interface Props {
  post: PostType;
}
export const PostIconsNav: React.FC<Props> = ({ post }) => {
  const { updatePostLikes, fetchPost } = usePost();
  const { user } = useUser();
  const [localPost, setLocalPost] = useState<PostType>(post);
  const liked = localPost.likes.includes(user?._id!);

  const handleLikeClick = () => {
    socket.emit('like', localPost._id);
  };

  useEffect(() => {
    const handleUpdateLikes = ({ post: updatedPost }: { post: PostType }) => {
      if (updatedPost._id === localPost._id) {
        updatePostLikes(updatedPost);

        fetchPost(updatedPost._id);
        setLocalPost(updatedPost);
      }
    };

    socket.on('update_likes', handleUpdateLikes);

    return () => {
      socket.off('update_likes', handleUpdateLikes);
    };
  }, [localPost._id, updatePostLikes]);

  return (
    <div className='flex flex-col'>
      <div className='post__reaction px-4 py-2 flex flex-row gap-2 justify-between'>
        <div className='flex flex-row gap-2'>
          <Heart
            size={24}
            onClick={handleLikeClick}
            weight={liked == true ? 'fill' : 'regular'}
            color={liked == true ? 'red' : 'black'}
          />
          <ChatCircle size={24} />
        </div>
      </div>
      <div className='post__likes px-4'>
        {localPost.likes.length > 0
          ? `${localPost.likes.length} likes`
          : '0 likes'}
      </div>
      <div className='px-4 text-xs text-gray-400'>
        {timeAgo(localPost?.createdAt || new Date())}
      </div>
    </div>
  );
};
