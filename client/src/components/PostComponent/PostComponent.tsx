import React from 'react';
import postimg from '../../assets/images/postimg.png';
import profile from '../../assets/images/profile.png';
import {
  BookmarkSimple,
  ChatCircle,
  Heart,
  PaperPlaneRight,
  PaperPlaneTilt,
  ShareFat,
  Smiley,
} from '@phosphor-icons/react';
const PostComponent = () => {
  return (
    <div className='post flex flex-col w-96 h-fit border border-indigo-600 '>
      <div className='post__navigation flex flex-row px-4 py-2'>
        <div className='post__user flex flex-row items-center'>
          <div className='rounded-full '>
            <img src={profile} alt='' />
          </div>
          <p className='pl-4'>username</p>
        </div>
        <div className='post__menu'></div>
      </div>
      <div className='post__img w-full h-96'>
        <img src={postimg} alt='' />
      </div>
      <div className='post__reaction px-4 py-2 flex flex-row gap-2 justify-between'>
        <div className='flex flex-row gap-2'>
          <Heart size={24} />
          <ChatCircle size={24} />
          <ShareFat size={24} />
        </div>

        <BookmarkSimple size={24} />
      </div>
      <div className='post__likes px-4'>12 likes</div>
      <div className='post__description px-4 py-2'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde qui, id
        delectus recusandae incidunt cupiditate sunt non velit in commodi autem
      </div>
      <div className='post__comments px-4 py-2 text-sm text-gray-400'>
        View all 100 comments
      </div>
      <div className=' px-4 text-xs text-gray-400'>1 HOUR AGO</div>
      <div className='flex flex-row w-full relative'>
        <input
          className='w-full my-2 pl-[50px] border-none'
          type='text'
          placeholder='Add a comment...'
        />
        <Smiley size={24} className='absolute left-3 top-4' />
        <button className='absolute right-3 top-4'>Post</button>
      </div>
    </div>
  );
};

export default PostComponent;
