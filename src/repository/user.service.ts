import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import {db} from '../firebaseConfig';
import {UserProfile} from '../types/index';
import { ProfileResponse } from '../types';

const  COLLECTION_NAME = 'users'

export const createUserProfile = (user: UserProfile) => {
    try{
        return addDoc(collection(db, COLLECTION_NAME), user);
    }catch(error){
        console.log(error);
    }
}

export const getUserProfile = async (userId: string) => {
    try{
        const q = query(collection(db, COLLECTION_NAME), where("userId", "==", userId));
        let querySnapshot = await getDocs(q);
        let tempData: ProfileResponse | {} = {};
        if(querySnapshot.size){
            querySnapshot.forEach(doc => {
                const userData = doc.data();
                tempData = {
                    ...userData,
                    id: doc.id
                };
            });
            return tempData;
        }else{
            return tempData;
        }
    }catch(error){
        console.log(error);
    }
}

export const updateUserProfile = (id: string, user: UserProfile) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    return updateDoc(docRef, {...user});
} 

export const getAllUsers = async (userId: string) => {
    try{
        const q = query(collection(db, COLLECTION_NAME), where("userId", "!=", userId));
        let querySnapshot = await getDocs(q);
        let users: ProfileResponse[] = [];
        if(querySnapshot.size){
            querySnapshot.forEach(document => {
                let doc = document.data() as UserProfile
                users.push({id: document.id, ...doc});
            });
        }
        return users;
    }catch(error){
        console.log(error);
    }    
}