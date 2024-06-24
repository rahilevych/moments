// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Heart, ChatCircle, ShareFat, BookmarkSimple, Smiley } from '@phosphor-icons/react';

// const PostDetailPage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   useEffect(() => {
//     // Функция для получения данных поста
//     const fetchPost = async () => {
//       try {
//         // Замените URL на ваш API для получения поста
//         const response = await fetch(`/api/posts/${postId}`);
//         const data = await response.json();
//         setPost(data.post);
//         setComments(data.comments);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleNewCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handlePostComment = async () => {
//     try {
//       // Логика отправки нового комментария
//       const response = await fetch(`/api/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: newComment }),
//       });
//       const data = await response.json();
//       setComments([...comments, data.comment]);
//       setNewComment('');
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   if (!post) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
//         <div className="post__navigation flex flex-row px-4 py-2">
//           <div className="post__user flex flex-row items-center">
//             <div className="rounded-full ">
//               <img src={post.user_img} alt="User" className="w-10 h-10 rounded-full" />
//             </div>
//             <p className="pl-4">{post.username}</p>
//           </div>
//           <div className="post__menu ml-auto"></div>
//         </div>
//         <div className="post__img w-full h-96">
//           <img src={post.image_url} alt="Post" className="w-full h-full object-cover" />
//         </div>
//         <div className="post__reaction px-4 py-2 flex flex-row gap-2 justify-between">
//           <div className="flex flex-row gap-2">
//             <Heart size={24} />
//             <ChatCircle size={24} />
//             <ShareFat size={24} />
//           </div>
//           <BookmarkSimple size={24} />
//         </div>
//         {/* <div className="post__likes px-4">{post.likes.length} likes</div> */}
//         <div className="post__description px-4 py-2">{post.caption}</div>
//         <div className="post__comments px-4 py-2 text-sm text-gray-400">
//           {comments.map((comment) => (
//             <div key={comment._id} className="mb-2">
//               <span className="font-semibold">{comment.username}</span> {comment.text}
//             </div>
//           ))}
//         </div>
//         <div className="px-4 text-xs text-gray-400">1 HOUR AGO</div>
//         <div className="flex flex-row w-full relative">
//           <input
//             className="w-full my-2 pl-[50px] border-none"
//             type="text"
//             placeholder="Add a comment..."
//             value={newComment}
//             onChange={handleNewCommentChange}
//           />
//           <Smiley size={24} className="absolute left-3 top-4" />
//           <button className="absolute right-3 top-4" onClick={handlePostComment}>
//             Post
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostDetailPage;
