import { useState, useEffect } from 'react';

import { toggleLikePost } from '../services/postServices';
import { ChatCircle, Heart } from '@phosphor-icons/react';
import { timeAgo } from '../utils/timeAgo';
import { useUser } from '../hooks/useUser';
import { usePost } from '../hooks/usePost';
import { PostType } from '../types/PostType';
interface Props {
  post: PostType;
}
const PostIconsNav: React.FC<Props> = ({ post }) => {
  const { setCurrentPost, fetchPost } = usePost();
  const { user } = useUser();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    post && user && setLiked(post.likes.includes(user?._id));
  }, [post?.likes]);

  const handleLikeClick = async () => {
    try {
      post && setCurrentPost(await toggleLikePost(post._id));
      setLiked(!liked);
      post && (await fetchPost(post._id));
    } catch (error) {}
  };

  return (
    <div className='flex flex-col'>
      <div className='post__reaction px-4 py-2 flex flex-row gap-2 justify-between'>
        <div className='flex flex-row gap-2'>
          <Heart
            size={24}
            onClick={handleLikeClick}
            weight={liked ? 'fill' : 'regular'}
            color={liked ? 'red' : 'black'}
          />
          <ChatCircle size={24} />
        </div>
      </div>
      <div className='post__likes px-4'>
        {post && post.likes.length > 0
          ? `${post.likes.length} likes`
          : '0 likes'}
      </div>
      <div className='px-4 text-xs text-gray-400'>
        {timeAgo(post?.createdAt || new Date())}
      </div>
    </div>
  );
};

export default PostIconsNav;
