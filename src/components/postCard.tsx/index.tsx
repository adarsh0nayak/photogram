import * as React from 'react';
import { DocumentResponse } from '../../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import image1 from '../../assets/images/image1.jpg';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUserAuth } from '../../context/userAuthContext';
import { updateLikesOnPost } from '../../repository/post.service';

interface IPostCardProps {
    data: DocumentResponse
}

const PostCard: React.FunctionComponent<IPostCardProps> = (props) => {
    const {data} = props;
    const {user} = useUserAuth();
    const [likesInfo, setLikesInfo] = React.useState<{likes: number, isLike: boolean}>({likes: data.likes, isLike: data.userLikes.includes(user?.uid as string)});
    
    const updateLikes = async(isVal: boolean) => {
        setLikesInfo({
            likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
            isLike: isVal 
        });
        if(isVal){
            data.userLikes?.push(user?.uid as string);
        }else{
            data.userLikes?.splice(data.userLikes.indexOf(user?.uid as string), 1);
        }

        updateLikesOnPost(data.id, data.userLikes, isVal ? likesInfo.likes + 1 : likesInfo.likes - 1);
    };

    return <Card className='mb-6'>
        <CardHeader className='flex flex-col p-3'>
            <CardTitle className='text-sm text-center flex justify-start items-center'>
                <span className='mr-2'>
                    <img src={data.photoUrl? data.photoUrl : image1} className='w-10 h-10 rounded-full border-2 border-slate-800' alt={data.id}/>
                </span>
                <span>{data.username}</span>
            </CardTitle>
            <CardContent className='p-0'>
                <img src={data?.photos[0]?.cdnUrl} alt={data.id} />
            </CardContent>
            <CardFooter className='flex flex-col p-3'>
                <div className='flex justify-between w-full mb-3'>
                    <HeartIcon className={cn("mr-3", "cursor-pointer", likesInfo.isLike ? "fill-red-500": "fill-none")} onClick={() => updateLikes(!likesInfo.isLike)}/>
                    <MessageCircle className='mr-3'/>
                </div>
                <div className='w-full text-sm'>{likesInfo.likes} likes</div>
                <div className='w-full text-sm'>
                    <span>{data.username}</span>: {data.caption}
                </div>
            </CardFooter>
        </CardHeader>
    </Card>
};

export default PostCard;
