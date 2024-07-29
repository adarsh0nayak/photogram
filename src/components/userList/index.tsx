import * as React from 'react';
import { getAllUsers } from '../../repository/user.service';
import { useUserAuth } from '../../context/userAuthContext';
import { ProfileResponse } from '../../types';
import avatar from '../../assets/images/image1.jpg';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

interface IUserListProps {
}

export const UserList: React.FunctionComponent<IUserListProps> = ({}) => {
  const {user} = useUserAuth();
  const [suggestedUsers, setSuggestedUsers] = React.useState<ProfileResponse[]>([]);
  
  const getAllUsersList = async(userId: string) => {
    let data = await getAllUsers(userId);
    setSuggestedUsers(data as ProfileResponse[]);
  }

  const renderUsers = () => {
    return suggestedUsers.map(( user => <div key = {user.id} className='flex flex-row items-center mb-4 border-gray-400 justify-start'>
      <span className='mr-2'>
        <img src={user.photoUrl ? user.photoUrl : avatar} alt="user" className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'/>
      </span>
      <span className='text-xs'>{user?.displayName ? user.displayName : "Guest User"}</span>
      <Button className="text-xs p-3 py-2 h-6 bg-slate-900 last-of-type:ml-auto">Follow</Button>
    </div>))
  }

  React.useEffect(() => {
    getAllUsersList(user?.uid as string);
  }, []);
  return <div className='text-white py-8 px-3'>
    <Link to={'/profile'}>
      <div className='flex flex-row items-center border-b pb-4 mb-4 border-gray-400 cursor-pointer'>
        <span className='mr-2'>
          <img src={user?.photoURL ? user?.photoURL : avatar} alt="avatar" className='w-10 h-10 rounded-full border-2 border-slate-800 object-cover'/>
        </span>
        <span className='text-xs'>{user?.displayName ? user.displayName : "Guest User"}</span>
      </div>
    </Link>
    <h3 className='text-sm text-slate-300'>Suggested Friends</h3>
    <div className='my-4'>
      {suggestedUsers.length ? renderUsers() : " "}
    </div>
  </div>;
};

