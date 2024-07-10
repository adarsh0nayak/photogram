import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

interface IUserAuthProviderProps {
    children : React.ReactNode
}

type AuthContextData = {
    user: User | null;
    logIn: typeof logIn;
    signUp: typeof signUp;
    logOut: typeof logOut;
    googleSignIn: typeof googleSignIn;
};

const logIn = function(email: string, password: string){
    return signInWithEmailAndPassword(auth, email, password);
}

const signUp = function(email: string, password: string){
    return createUserWithEmailAndPassword(auth, email, password);
}

const logOut = function(){
    signOut(auth);
}

const googleSignIn = function(){
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    logOut,
    signUp, 
    googleSignIn
});

export const userAuthProvider : React.FunctionComponent<IUserAuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                console.log(`User logged in is: ${user}`);
                setUser(user);
            }else{
                console.log(`User logged out`);
                setUser(null);
            }
        });

        return () => {
            subscribe();
        }
    });

    let value: AuthContextData = {
        user,
        logIn,
        logOut,
        signUp, 
        googleSignIn
    };
    return <userAuthContext.Provider value={value}>
        {children}
    </userAuthContext.Provider>
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}