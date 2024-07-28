import { FileUploader } from "../../components/fileUploader";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useUserAuth } from "../../context/userAuthContext";
import React, { useState } from "react";
import { FileEntry, PhotoMeta, Post as PostType } from "../../types";
import { createPost } from "../../repository/post.service";
import { useNavigate } from "react-router-dom";

const initialPost: PostType = {
  caption: "",
  photos: [],
  date: new Date(),
  likes: 0,
  userLikes: [],
  userId: null,
};

export function Post() {
  const { user } = useUserAuth();
  const [fileEntry, setFileEntry] = useState<FileEntry>({ files: [] });
  const [post, setPost] = useState<PostType>(initialPost);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const photoMeta: PhotoMeta[] = fileEntry.files.map<PhotoMeta>(
        ({ cdnUrl, uuid }) => ({
          cdnUrl: cdnUrl as string,
          uuid: uuid as string,
        })
      );
      const newPost: PostType = {
        ...post,
        photos: photoMeta,
        userId: user?.uid as string,
      };
      createPost(newPost);
      setPost(initialPost);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="border max-w-3xl w-full">
        <h3 className="bg-slate-800 text-white text-center text-lg p-2">
          Create Post
        </h3>
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="caption">
                Photo Caption
              </Label>
              <Textarea
                className="mb-8"
                id="caption"
                placeholder="What is in your mind!"
                value={post.caption}
                onChange={(e) => {
                  setPost((prev) => ({ ...prev, caption: e.target.value }));
                }}
              />
            </div>
            <div className="flex flex-col">
              <Label className="mb-4" htmlFor="photos">
                Photos
              </Label>
              <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={true}/>
            </div>
            <Button className="mt-8 w-32" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
