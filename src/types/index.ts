import { OutputFileEntry } from "@uploadcare/react-uploader";
import { User } from "firebase/auth";

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
  userLikes: string[];
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

export interface ProfileInfo {
  user: User | null
  displayName: string | null | undefined
  photoUrl: string | null | undefined
}

export interface UserProfile{
  userId: string
  displayName: string,
  photoUrl: string
  userBio: string
}

export interface ProfileResponse extends UserProfile{
  id: string
}