import { useEffect, useState } from "react";
import { DocumentResponse, Post } from "../../types";
import { useUserAuth } from "../../context/userAuthContext";
import { getPostByUserId } from "../../repository/post.service";
import { HeartIcon } from "lucide-react";

export const MyPhotos:React.FunctionComponent<void> = () => {
  const [data, setData] = useState<DocumentResponse[]>([]);
  const {user} = useUserAuth();

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
          console.log(`response is ${JSON.stringify(responseObj)}`);
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

  useEffect(() => {
    getAllPost(user?.uid as string);
  }, []);

  const renderPost = () => {
    return data.map(item => (<div key={item.photos[0].uuid} className="relative">
      <div className="group absolute transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 left-0 w-full h-full">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <HeartIcon className="hidden fill-white group-hover:block"/>
          <div className="hidden text-white group-hover:block">{item.likes} likes</div>
        </div>
      </div>
      <img src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}/>
    </div>));
  };

  return (
    <div className="flex justify-center">
       <div className="border max-w-3xl w-full">
        <h3 className="bg-slate-800 text-white text-center text-lg p-2">
          Photos
        </h3>
        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.length !== 0 ? renderPost() : <div>...Loading</div>}
          </div>
        </div>
        </div> 
    </div>
  );
}
