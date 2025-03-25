import { useEffect, useState } from 'react';
import { UserType } from '../types/UserType';
import { getUserById, toggleSubscribe } from '../services/userService';

interface Props {
  user: UserType;
  otherUser: UserType;
  handleProfileUserChange(profileUser: UserType): void;
}

const SubscribeBtn = ({ user, otherUser, handleProfileUserChange }: Props) => {
  const initState = otherUser.followers.some((u) => u._id === user._id);
  const [isSubscribed, setIsSubscribed] = useState(initState);

  const handleSubscribe = async (otherUser: UserType) => {
    const response = await toggleSubscribe(otherUser._id, user._id);
    console.log(response);
    const result = await getUserById(otherUser._id);
    if (result.success) {
      handleProfileUserChange(result.data);
    } else {
      console.error('Failed to fetch user:', result.error);
    }
  };
  useEffect(() => {
    setIsSubscribed(otherUser.followers.some((u) => u._id === user._id));
  }, [handleSubscribe]);
  return (
    <button
      onClick={() => handleSubscribe(otherUser)}
      className={`px-4 py-2 rounded-md ${
        isSubscribed ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
      }`}>
      {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};

export default SubscribeBtn;
