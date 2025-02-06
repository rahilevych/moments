import { useEffect } from 'react';
import profile from '../assets/images/profile.png';
import { PostType } from '../types/PostType';
import PostIconsNav from './PostIconsNav';
import PostForm from './PostForm';
import { usePost } from '../hooks/usePost';

interface Props {
  post: PostType;
}

const DetailedPost: React.FC<Props> = ({ post }) => {
  //const { id } = useParams();
  const { fetchPost } = usePost();

  useEffect(() => {
    fetchPost(post._id);
  }, []);

  return (
    <div className='p-5 flex flex-col lg:flex-row items-start justify-between bg-white w-full'>
      <div className='flex flex-col lg:flex-row gap-7 w-full'>
        <div className='w-full lg:w-3/5'>
          <div className='post__navigation flex flex-row px-4 py-2'>
            <div className='post__user flex flex-row items-center'>
              <div className='rounded-full'>
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
          <div className='post__img w-full h-80'>
            <img
              alt='Post'
              src={post?.image_url}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='post__description px-4 py-2'>
            {post?.caption || 'No description available'}
          </div>
        </div>

        <div className='flex flex-col justify-between w-full min-w-60 p-4 border-l lg:border-l-0 lg:w-2/5'>
          <h3 className='text-lg font-semibold mb-4'>Comments</h3>
          <div className='max-h-96 overflow-y-auto'>
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
          <div className='flex flex-col gap-4 w-full relative mt-4 justify-between'>
            <PostIconsNav post={post} fetchPost={fetchPost} />
            <PostForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
