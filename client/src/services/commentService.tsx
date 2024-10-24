import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';

export const addComment = async (formData: FormData) => {
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
      return result;
    }
  } catch (error) {
    console.error('Error by adding comment', error);
  }
};

export const getCommentsByIds = async (commentIds: string[]) => {
  try {
    const commentRequests = commentIds.map((id) =>
      axios.get(`${baseUrl}/comments/${id}`)
    );
    const commentResponses = await Promise.all(commentRequests);
    const fetchedComments = commentResponses.map((response) => response.data);
    return fetchedComments;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};
