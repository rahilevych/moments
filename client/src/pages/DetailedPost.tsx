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
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import profile from '../assets/images/profile.png';

const DetailedPost = () => {
  const { id } = useParams();
  const { posts, toggleLikePost, toggleSavePost, setPost, post, getPostById } =
    useContext(PostContext);
  const { user, getUserProfile } = useContext(AuthContext);
  const { users } = useContext(UserContext);
  const { getUserPostsByUserId } = useContext(PostContext);

  const { setText, addComment, text, getCommentsByIds, comments } =
    useContext(CommentContext);

  const findUsername = (userId: string) => {
    const foundUser = users?.find((user) => user._id === userId);
    return foundUser?.username;
  };
  const findAvatar = (userId: string) => {
    const foundUser = users?.find((user) => user._id === userId);
    return foundUser?.user_img || profile;
  };

  const handleLikeClick = async () => {
    if (user && user._id && post) {
      await toggleLikePost(post._id);
    }
  };

  const handleSaveClick = async () => {
    if (user && post && post._id) {
      console.log('save button was clicked');
      await toggleSavePost(post._id, user._id);
    }
  };

  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && post && text.trim() !== '' && id) {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('user_id', user._id);
      formData.append('post_id', post._id);

      await addComment(formData, id);
      await getCommentsByIds(post.comments);
      await getPostById(id);
      setText('');
    } else {
      console.error('User, post or text is missing');
    }
  };

  useEffect(() => {
    getUserProfile();
    console.log('user from det', user);
    user && getUserPostsByUserId(user?._id);
    console.log(id);
    console.log(posts);
    if (id && posts) {
      getPostById(id);
      const currentPost = posts.find((post) => post._id === String(id));
      if (currentPost) {
        setPost(currentPost);
        if (currentPost.comments && currentPost.comments.length > 0) {
          findAvatar(currentPost.user_id);
          findUsername(currentPost.user_id);
          getCommentsByIds(currentPost.comments);
        }
      } else {
        console.error('Post not found');
      }
    }
  }, []);
  //}, [comments, addComment, getCommentsByIds]);

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
                  src={findAvatar(post?.user_id || profile)}
                />
              </div>
              <p className='pl-4'>{findUsername(post?.user_id || '')}</p>
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
                style={{
                  color:
                    user && post?.likes.includes(user?._id) ? 'red' : 'gray',
                }}
              />
              <ChatCircle size={24} />
              <ShareFat size={24} />
            </div>
            <BookmarkSimple
              size={24}
              onClick={handleSaveClick}
              style={{
                color:
                  post && user?.saved_posts?.includes(post?._id)
                    ? 'red'
                    : 'gray',
              }}
            />
          </div>
          <div className='post__description px-4 py-2'>
            {post?.caption || 'No description available'}
          </div>
          <div className='px-4 text-xs text-gray-400'>1 HOUR AGO</div>
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
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className='mb-4'>
                <div className='flex items-center mb-2'>
                  <img
                    alt='Avatar'
                    className='w-8 h-8 rounded-full'
                    src={findAvatar(comment.user_id || profile)}
                  />
                  <p className='ml-2 font-semibold'>
                    {findUsername(comment.user_id || '')}
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
