import { useContext, useState, useEffect } from 'react';
import { PostType } from '../types/PostType';
import { toggleLikePost } from '../services/postServices';
import { ChatCircle, Heart } from '@phosphor-icons/react';
import { PostContext } from '../context/PostContext';
import { timeAgo } from '../utils/timeAgo';
import { UserContext } from '../context/UserContext';

interface Props {
  post: PostType;
  fetchPost: any;
}

const PostIconsNav = (props: Props) => {
  const { setPost } = useContext(PostContext);
  const { user } = useContext(UserContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    user && setLiked(props.post.likes.includes(user?._id));
  }, [props.post.likes]);

  const handleLikeClick = async () => {
    try {
      props.post && setPost(await toggleLikePost(props.post._id));
      setLiked(!liked);
      await props.fetchPost();
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
        {props.post.likes.length > 0
          ? `${props.post.likes.length} likes`
          : '0 likes'}
      </div>
      <div className='px-4 text-xs text-gray-400'>
        {timeAgo(props.post?.createdAt || new Date())}
      </div>
    </div>
  );
};

export default PostIconsNav;
