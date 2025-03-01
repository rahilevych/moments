import React, { useState } from 'react';
import { addComment } from '../services/commentService';
import { useAuth } from '../hooks/useAuth';
import { usePost } from '../hooks/usePost';

import { PostType } from '../types/PostType';
interface Props {
  post: PostType;
}
const PostForm: React.FC<Props> = ({ post }) => {
  const { fetchPost } = usePost();
  const { user } = useAuth();
  const [text, setText] = useState<string>('');

  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user && post && text.trim() !== '') {
        const formData = new FormData();
        formData.append('text', text);
        formData.append('user_id', user._id);
        formData.append('post_id', post._id);
        await addComment(formData);
        fetchPost(post._id);
        setText('');
      } else {
        console.error('User, post or text is missing');
      }
    } catch (error) {}
  };

  return (
    <div className='flex flex-row justify-between w-full'>
      <form onSubmit={submitForm} className='flex w-full'>
        <input
          className='w-full pl-[10px] border rounded-full'
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
  );
};

export default PostForm;
