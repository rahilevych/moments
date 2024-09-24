import { useContext } from 'react';
import postimg from '../assets/images/postimg.png';
import profile from '../assets/images/profile.png';
import {
  BookmarkSimple,
  ChatCircle,
  Heart,
  ShareFat,
  Smiley,
} from '@phosphor-icons/react';
import { UserContext } from '../context/UserContext';
import { PostType } from '../types/PostType';

interface Props {
  post: PostType;
}

const PostComponent = (props: Props) => {
  const timeAgo = (createdAt: string | Date) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - createdDate.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1)
      return `${interval} YEAR${interval === 1 ? '' : 'S'} AGO`;
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1)
      return `${interval} MONTH${interval === 1 ? '' : 'S'} AGO`;
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} DAY${interval === 1 ? '' : 'S'} AGO`;
    interval = Math.floor(seconds / 3600);
    if (interval >= 1)
      return `${interval} HOUR${interval === 1 ? '' : 'S'} AGO`;
    interval = Math.floor(seconds / 60);
    if (interval >= 1)
      return `${interval} MINUTE${interval === 1 ? '' : 'S'} AGO`;
    return `${seconds} SECOND${seconds === 1 ? '' : 'S'} AGO`;
  };

  return (
    <div className='post flex flex-col w-2/5 h-fit border border-gray-200 rounded-lg my-4 bg-white'>
      <div className='post__navigation flex flex-row px-4 py-2'>
        <div className='post__user flex flex-row items-center'>
          <div className='rounded-full w-10 h-10 overflow-hidden'>
            <img
              src={profile}
              alt='profile'
              className='w-full h-full object-cover'
            />
          </div>
          <p className='pl-4'>{props.post.user_id.username}</p>
        </div>
        <div className='post__menu ml-auto'>
          <button className='text-gray-400'>...</button>
        </div>
      </div>
      <div className='post__img w-full h-96'>
        <img
          src={props.post.image_url}
          alt='post'
          className='w-full h-full object-cover'
        />
      </div>
      <div className='post__reaction px-4 py-2 flex flex-row gap-2 justify-between'>
        <div className='flex flex-row gap-2'>
          <Heart size={24} />
          <ChatCircle size={24} />
          <ShareFat size={24} />
        </div>
        <BookmarkSimple size={24} />
      </div>
      <div className='post__likes px-4'>
        {props.post.comments.length > 0
          ? ` ${props.post.likes.length} likes`
          : '12  likes'}
      </div>
      <div className='post__description px-4 py-2'>{props.post.caption}</div>
      <div className='post__comments px-4 py-2 text-sm text-gray-400'>
        {props.post.comments.length > 0
          ? `View all ${props.post.comments.length} comments`
          : 'Add first comment'}
      </div>
      <div className='px-4 text-xs text-gray-400'>
        {timeAgo(props.post.createdAt)}
      </div>
      <div className='flex flex-row w-full relative px-4 pb-4'>
        <Smiley size={24} className='absolute left-4 top-2.5' />
        <input
          className='w-full my-2 pl-12 border border-gray-200 rounded-full py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400'
          type='text'
          placeholder='Add a comment...'
        />
        <button className='absolute right-4 top-2.5 text-indigo-600'>
          Post
        </button>
      </div>
    </div>
  );
};

export default PostComponent;
