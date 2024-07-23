import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import {db} from '../firebaseConfig';
import { DocumentResponse, Post } from '../types';

const  COLLECTION_NAME = 'posts'

export const createPost = (post: Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post);
}

export const getPosts = async () => {
    try{
        const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc')); 
        let querySnapShot = await getDocs(q);
        const resArr: DocumentResponse[] = [];
        if(querySnapShot.size){
            querySnapShot.forEach((doc) => {
                const data = doc.data() as Post;
                const responseObj : DocumentResponse = {
                    id: doc.id,
                    ...data
                };
                resArr.push(responseObj);
            });
        }else{
            console.log('No Document found');
        }

        return resArr;
    }catch(error:any){
        console.log(error.message);
    }
}

export const getPostByUserId = (id: string) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'), where("userId", "==", id));
    return getDocs(q);
}

export const getPost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return getDoc(docRef);
}

export const deletePost = (id: string) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return deleteDoc(docRef);
}

export const updateLikesOnPost = (id: string, userLikes: string[], likes: number) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    updateDoc(docRef, {
        userLikes, likes
    });
}