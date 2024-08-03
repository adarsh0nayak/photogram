import { SearchIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Stories } from "../../components/stories";
import { useEffect, useState } from "react";
import { DocumentResponse } from "../../types";
import { getPosts } from "../../repository/post.service";
import PostCard from "../../components/postCard.tsx";

let initialData: DocumentResponse[] = [{
  id: '',
  caption: '',
  date: new Date,
  likes: 0,
  photos: [],
  userId: '',
  username: '',
  photoUrl: '',
  userLikes: []
}];

export const Home: React.FunctionComponent = () => {
  const [data, setData] = useState<DocumentResponse[]>(initialData);
  const getAllPosts = async() => {
    const response : DocumentResponse[] = await getPosts() || [];
    setData(response);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return <div className="flex flex-col">
    <div className="relative mb-6 w-full text-gray-600">
      <Input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-sm text-base focus:outline-none" placeholder="search" type="text" name="search"/>
      <button type="submit" className="absolute right-2.5 top-2.5">
        <SearchIcon className="w-5 h-5 text-gray-400"/>
      </button>
    </div>
    <div className="mb-5 overflow-y-auto">
      <h2 className="mb-5">Stories</h2>
      <Stories/>
    </div>
    <div className="mb-5">
      <h2 className="mb-5">Feed</h2>
      <div className="w-full flex justify-center">
        <div className="flex flex-col max-w-sm rounded-sm">
          {data.map(item => <PostCard data={item} key={item.id}/>)}
        </div>
      </div>
    </div>
  </div>;
};
