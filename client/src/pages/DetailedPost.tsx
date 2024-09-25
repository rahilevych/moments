import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Heart,
  ChatCircle,
  ShareFat,
  BookmarkSimple,
  Smiley,
} from '@phosphor-icons/react';
import { PostContext } from '../context/PostContext';
import { CommentContext } from '../context/CommentContext';

import profile from '../assets/images/profile.png';
import { UserContext } from '../context/UserContext';
import {
  getPostById,
  toggleLikePost,
  toggleSavePost,
} from '../services/postServices';

import { addComment } from '../services/commentService';
import { getUserById } from '../services/userService';
import { timeAgo } from '../utils/timeAgo';

const DetailedPost = () => {
  const { id, postId } = useParams();
  const { post, setPost } = useContext(PostContext);
  const { user, setUser, profileUser } = useContext(UserContext);
  const { setComment } = useContext(CommentContext);

  const { setText, text } = useContext(CommentContext);

  const handleLikeClick = async () => {
    try {
      console.log('profile user>>>>>>', profileUser);
      post && (await toggleLikePost(post._id, setPost));
      await fetchPost();
    } catch (error) {}
  };

  const handleSaveClick = async () => {
    if (user && post && post._id) {
      console.log('save button was clicked');
      await toggleSavePost(post._id, user._id, user, setUser);
    }
  };

  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user && post && text.trim() !== '' && postId) {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('user_id', user._id);
        formData.append('post_id', post._id);
        await addComment(formData, postId, setPost, setComment);
        await getPostById(postId, setPost);
        setText('');
      } else {
        console.error('User, post or text is missing');
      }
    } catch (error) {}
  };

  const fetchPost = async () => {
    try {
      if (id) await getUserById(id, setUser);
      if (postId) await getPostById(postId, setPost);
    } catch (error) {
      console.error('Error by getting user', error);
    }
  };

  useEffect(() => {
    fetchPost();
    console.log('post>>>>>>>>>>>>>>', post);
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-5xl flex'>
        <div className='w-2/3 p-4'>
          <div className='post__navigation flex flex-row px-4 py-2'>
            <div className='post__user flex flex-row items-center'>
              <div className='rounded-full '>
                <img
                  alt='User'
                  className='w-10 h-10 rounded-full'
                  src={post?.user_id.user_img || profile}
                />
              </div>
              <p className='pl-4'>{post?.user_id.username || ''}</p>
            </div>
            <div className='post__menu ml-auto'></div>
          </div>
          <div className='post__img w-full h-96'>
            <img
              alt='Post'
              src={post?.image_url}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='post__reaction px-4 py-2 flex flex-row gap-2 justify-between'>
            <div className='flex flex-row gap-2'>
              <Heart
                size={24}
                onClick={handleLikeClick}
                weight={
                  user && post?.likes.map((user) => user._id).includes(user._id)
                    ? 'fill'
                    : 'regular'
                }
                className={`transition-transform transform hover:scale-110 fill-current ${
                  user && post?.likes.map((user) => user._id).includes(user._id)
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              />
              <ChatCircle size={24} />
              <ShareFat size={24} />
            </div>
            <BookmarkSimple
              size={24}
              onClick={handleSaveClick}
              style={{
                color:
                  post &&
                  user?.saved_posts?.map((post) => post._id).includes(post?._id)
                    ? 'red'
                    : 'gray',
              }}
            />
          </div>
          <div className='post__description px-4 py-2'>
            {post?.caption || 'No description available'}
          </div>
          <div className='px-4 text-xs text-gray-400'>
            {timeAgo(post?.createdAt || new Date())}
          </div>
          <div className='flex flex-row w-full relative mt-4'>
            <form onSubmit={submitForm} className='flex w-full'>
              <Smiley size={24} className='absolute left-3 top-2' />
              <input
                className='w-full pl-[50px] border rounded-full'
                type='text'
                placeholder='Add a comment...'
                value={text}
                onChange={handleInputChangeComment}
              />
              <button className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-full'>
                Post
              </button>
            </form>
          </div>
        </div>

        <div
          className='w-1/3 p-4 border-l overflow-y-auto'
          style={{ maxHeight: '80vh' }}>
          <h3 className='text-lg font-semibold mb-4'>Comments</h3>
          {post?.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id} className='mb-4'>
                <div className='flex items-center mb-2'>
                  <img
                    alt='Avatar'
                    className='w-8 h-8 rounded-full'
                    src={comment.user_id?.user_img || profile}
                  />
                  <p className='ml-2 font-semibold'>
                    {comment.user_id?.username || ''}
                  </p>
                </div>
                <p>{comment.text}</p>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
