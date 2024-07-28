import * as React from 'react';
import { useUserAuth } from '../../context/userAuthContext';
import { DocumentResponse, Post, ProfileResponse } from '../../types';
import image1 from '../../assets/images/image1.jpg';
import { Button } from '../../components/ui/button';
import { Edit2Icon, HeartIcon } from 'lucide-react';
import { getPostByUserId } from '../../repository/post.service';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../repository/user.service';

interface IProfileProps {
}

export const Profile: React.FunctionComponent<IProfileProps> = () => {
  const {user} = useUserAuth();
  const initialUserInfo: ProfileResponse = {
    id: "",
    userId: user?.uid as string,
    displayName: user?.displayName ? user?.displayName:  "Guest",
    photoUrl: user?.photoURL ? user?.photoURL : "",
    userBio: "Please update your bio"
  };
  
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  
  const getUserProfileInfo = async(userId: string) => {
    const data: ProfileResponse = await getUserProfile(userId) as ProfileResponse;
    if(data && Object.keys(data).length){
      setUserInfo(data);
    }
  }

  const getAllPost = async(id: string) => {
    try{
      const querySnapShot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];

      if(querySnapShot.size) {
        querySnapShot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data
          };
          tempArr.push(responseObj);
        });
        setData(tempArr);
      }else{
        console.log('No Document to fetch');
      }
    }catch(error){
      console.log(error);
    }
  }

  React.useEffect(() => {
    getAllPost(user?.uid as string);
    getUserProfileInfo(user?.uid as string);
  }, [user?.uid]);

  const renderPost = () => {
    return data.map(item => (<div key={item.photos[0].uuid} className="relative">
      <div className="group absolute transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 left-0 w-full h-full">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <HeartIcon className="hidden fill-white group-hover:block"/>
          <div className="hidden text-white group-hover:block">{item.likes} likes</div>
        </div>
      </div>
      <img src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`} alt={item.photos[0].uuid}/>
    </div>));
  };

  const [userInfo, setUserInfo] = React.useState<ProfileResponse>(initialUserInfo);
  const navigate = useNavigate();

  const editProfile = () => {
    navigate('/edit-profile', {state: userInfo});
  };
  return <div className='flex justify-center'>
    <div className='border max-w-3xl w-full'>
      <h3 className='bg-slate-800 text-white text-center text-lg p-2'>Profile</h3>
    <div className='p-8 pb-4 border-b'>
      <div className='flex flex-row items-center pb-2 mb-2'>
        <div className='mr-2'>
          <img src={userInfo.photoUrl || image1} alt="Profile" className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover'/>
        </div>
        <div>
          <div className='text-xl ml-3'>{userInfo.displayName}</div>
          <div className='text-xl ml-3'>{user?.email ? user?.email : ""}</div>
        </div> 
      </div>
      <div className='mb-4'>{userInfo.userBio}</div>
      <div>
        <Button onClick={editProfile}>
          <Edit2Icon className='mr-2 h-4 w-4'/> Edit Profile
        </Button>
      </div>
    </div>
    <div className='p-8'>
      <h2 className='mb-5'>My Posts</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'> {renderPost()}</div>
    </div>
    </div>
  </div>
};