import axios from 'axios';
import { getPostById } from './postServices';
import { baseUrl } from '../utils/baseUrl';
import { Dispatch, SetStateAction } from 'react';
import { PostType } from '../types/PostType';
import { CommentType } from '../types/CommentType';

export const addComment = async (
  formData: FormData,
  id: string,
  post: PostType,
  setPost: Dispatch<SetStateAction<PostType | null>>,
  setComments: Dispatch<SetStateAction<CommentType[]>>,
  setComment: Dispatch<SetStateAction<CommentType | null>>
) => {
  await getPostById(id, setPost);
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseUrl}/comments`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const result = response.data;
      setComment(result);
      console.log('comment that was added', result);
      await getPostById(id, setPost);

      post &&
        (await getCommentsByIds(post?.comments, post, setPost, setComments));
      console.log('comments for post', post && post.comments);
    }
  } catch (error) {
    console.error('Error by adding comment', error);
  }
};

export const getCommentsByIds = async (
  commentIds: string[],
  post: PostType,
  setPost: Dispatch<SetStateAction<PostType | null>>,
  setComments: Dispatch<SetStateAction<CommentType[]>>
) => {
  post && getPostById(post?._id, setPost);
  try {
    const commentRequests = commentIds.map((id) =>
      axios.get(`${baseUrl}/comments/${id}`)
    );
    const commentResponses = await Promise.all(commentRequests);
    const fetchedComments = commentResponses.map((response) => response.data);
    console.log('get comments by ids fetched comments', fetchedComments);
    setComments(fetchedComments);
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
