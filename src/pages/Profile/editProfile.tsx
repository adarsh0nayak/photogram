import { Label } from '@radix-ui/react-label';
import * as React from 'react';
import { Textarea } from '../../components/ui/textarea';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileEntry, ProfileResponse } from '../../types';
import { FileUploader } from '../../components/fileUploader';
import avatar from '../../assets/images/image1.jpg';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { createUserProfile, updateUserProfile } from '../../repository/user.service';
import { useUserAuth } from '../../context/userAuthContext';

interface IEditProfileProps {
}

export const EditProfile: React.FunctionComponent<IEditProfileProps> = () => {
    const location = useLocation();
    const {id, userId, userBio, displayName, photoUrl} = location.state as ProfileResponse;
    const [fileEntry, setFileEntry] = React.useState<FileEntry>({ files: [] });
    const [data, setData] = React.useState<ProfileResponse>({id, userBio, displayName, photoUrl, userId});
    const {user, updateProfileInfo} = useUserAuth();

    const updateProfile = async(e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            if(id){
                await updateUserProfile(id, data);
                console.log('The updated user profile');
            }else{
                const response = await createUserProfile(data);
                console.log('The created user profile is: ', response);
            }
            updateProfileInfo({user, displayName, photoUrl});
            navigate('/profile');
        }catch(error){
            console.log(error);
        }
    }

    const navigate = useNavigate();
    React.useEffect(() => {
        if(fileEntry.files.length) setData(prev => ({...prev, photoUrl: fileEntry.files[0].cdnUrl as string}));
    }, [fileEntry]);
    return (
    <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
            <h3 className="bg-slate-800 text-white text-center text-lg p-2">
              Edit Profile
            </h3>
            <div className="p-8">
              <form onSubmit={updateProfile}>
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="photos">
                    Profile Picture
                  </Label>
                  <div className='mb-4'>
                    {data.photoUrl ? <img src={data.photoUrl || avatar} alt="avatar" className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover' /> : <img src={avatar} alt="avatar" className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover' />}
                  </div>
                  <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={false}/>
                </div>
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="displayName">
                    Display Name
                  </Label>
                  <Input
                    className="mb-8"
                    id="displayName"
                    placeholder="Enter your username"
                    value={data.displayName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setData((prev) => ({ ...prev, displayName: e.target.value }));
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-4" htmlFor="userBio">
                    Profile Bio
                  </Label>
                  <Textarea
                    className="mb-8"
                    id="userBio"
                    placeholder="What is in your mind!"
                    value={data.userBio}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      setData((prev) => ({ ...prev, userBio: e.target.value }));
                    }}
                  />
                </div>
                <Button className="mt-4 w-32 mr-8" type="submit">
                  Update
                </Button>
                <Button variant="destructive" className="mt-4 w-32 mr-8" onClick={() => {navigate('/profile')}}>
                  Cancel
                </Button>
              </form>
            </div>
        </div>
    </div>
  );
};