import {
  ReactNode,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { PostType } from '../types/PostType';
import { getPostById, getUserPostsByUserId } from '../services/postServices';
import { useAuth } from '../hooks/useAuth';
import { CommentType } from '../types/CommentType';

type PostContextType = {
  currentPost: PostType | null;
  posts: PostType[] | null;
  setCurrentPost: Dispatch<SetStateAction<PostType | null>>;
  setPosts: Dispatch<SetStateAction<PostType[] | null>>;
  fetchPost: (id: string) => Promise<PostType>;
  fetchPosts: (id: string) => Promise<void>;
};

export const PostContext = createContext<PostContextType | undefined>(
  undefined
);
type PostContextProviderProps = {
  children: ReactNode;
};

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  const [currentPost, setCurrentPost] = useState<PostType | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);

  const { socket } = useAuth();

  const fetchPost = async (id: string) => {
    try {
      const response = await getPostById(id);
      if (!response.success) {
        return;
      }
      setCurrentPost(response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const fetchPosts = async (id: string) => {
    try {
      const response = await getUserPostsByUserId(id);

      if (!response.success) {
        return;
      }
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const updatePostLikes = (updatedPost: PostType) => {
    setPosts((prevPosts) =>
      prevPosts
        ? prevPosts.map((p) =>
            p._id === updatedPost._id
              ? { ...p, likes: [...updatedPost.likes] }
              : p
          )
        : []
    );

    setCurrentPost((prev) =>
      prev && prev._id === updatedPost._id
        ? { ...prev, likes: [...updatedPost.likes] }
        : prev
    );
  };
  const updateCommentLikes = (updatedComment: CommentType) => {
    setCurrentPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: prev.comments?.map((c) =>
          c._id === updatedComment._id ? updatedComment : c
        ),
      };
    });
  };

  const updatePostComments = (newComment: CommentType) => {
    setCurrentPost((prev) =>
      prev && prev._id === newComment.post_id
        ? { ...prev, comments: [...(prev.comments || []), newComment] }
        : prev
    );
    setPosts((prevPosts) =>
      prevPosts
        ? prevPosts.map((p) =>
            p._id === newComment.post_id
              ? { ...p, comments: [...(p.comments || []), newComment] }
              : p
          )
        : null
    );
  };
  const removePostComment = (commentId: string, postId: string) => {
    setCurrentPost((prev) => {
      if (!prev) {
        return prev;
      }
      if (prev._id !== postId) {
        return prev;
      }
      const updatedComments =
        prev.comments?.filter((c) => c._id !== commentId) || [];
      return { ...prev, comments: updatedComments };
    });

    setPosts((prevPosts) => {
      if (!prevPosts) {
        return null;
      }
      return prevPosts.map((p) => {
        if (p._id !== postId) return p;
        const updatedComments =
          p.comments?.filter((c) => c._id !== commentId) || [];
        return { ...p, comments: updatedComments };
      });
    });
  };

  useEffect(() => {
    if (!socket) return;

    const handleUpdateLikes = (currentPost: PostType) => {
      updatePostLikes(currentPost);
    };

    const handleUpdateCommentLikes = (updatedComment: CommentType) => {
      updateCommentLikes(updatedComment);
    };

    const handleCommentAdded = (comment: CommentType) => {
      updatePostComments(comment);
    };

    const handleCommentDeleted = ({
      commentId,
      postId,
    }: {
      commentId: string;
      postId: string;
    }) => {
      removePostComment(commentId, postId);
    };

    socket.on('update_likes', handleUpdateLikes);
    socket.on('update_comment_likes', handleUpdateCommentLikes);
    socket.on('comment_added', handleCommentAdded);
    socket.on('comment_deleted', handleCommentDeleted);

    return () => {
      socket.off('update_likes', handleUpdateLikes);
      socket.off('update_comment_likes', handleUpdateCommentLikes);
      socket.off('comment_added', handleCommentAdded);
      socket.off('comment_deleted', handleCommentDeleted);
    };
  }, [socket]);

  return (
    <PostContext.Provider
      value={{
        currentPost,
        posts,
        setPosts,
        setCurrentPost,

        fetchPost,
        fetchPosts,
      }}>
      {children}
    </PostContext.Provider>
  );
};
