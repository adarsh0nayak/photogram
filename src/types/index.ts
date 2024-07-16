import { OutputFileEntry } from "@uploadcare/react-uploader";

export interface UserSignUp {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface Post {
  caption: string;
  photos: PhotoMeta[];
  likes: number;
  userLikes: [];
  userId: string | null;
  date: Date;
}

export interface PhotoMeta {
  cdnUrl: string;
  uuid: string;
}

export interface FileEntry {
  files: OutputFileEntry[];
}

export interface  DocumentResponse extends Post{
  id: string;
}