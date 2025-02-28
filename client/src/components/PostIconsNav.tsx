import { ChatCircle, Heart } from '@phosphor-icons/react';
import socket from '../services/socketService';
import { usePost } from '../hooks/usePost';
import { useUser } from '../hooks/useUser';
import { PostType } from '../types/PostType';
import { timeAgo } from '../utils/timeAgo';

interface Props {
  postId: string;
}
export const PostIconsNav: React.FC<Props> = ({ postId }) => {
  const { posts } = usePost();
  const { user } = useUser();
  const post: PostType | undefined = posts?.find((p) => p._id === postId);
  if (!post) {
    return <div>Loading...</div>;
  }

  const liked = post.likes.some((id) => id === user?._id);

  const handleLikeClick = async () => {
    console.log('Emitting like event for post:', post._id);
    socket.emit('like', post._id);
  };

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
        {post.likes.length > 0 ? `${post.likes.length} likes` : '0 likes'}
      </div>
      <div className='px-4 text-xs text-gray-400'>
        {timeAgo(post?.createdAt || new Date())}
      </div>
    </div>
  );
};
