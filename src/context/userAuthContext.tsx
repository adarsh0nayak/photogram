import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
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

const logIn = async function(email: string, password: string){
    try{
        let data = await signInWithEmailAndPassword(auth, email, password);
        return data;
    }catch(error: any){
        console.log(error.message);
    }
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

export const UserAuthProvider : React.FunctionComponent<IUserAuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                console.log(`User logged in is: ${user.email}`);
                setUser(user);
            }else{
                console.log(`User logged out`);
                setUser(null);
            }
        });

        return () => {
            subscribe();
        }
    }, []);

    let value: AuthContextData = useMemo(() => ({
        user,
        logIn,
        logOut,
        signUp, 
        googleSignIn
    }), [user]);
    return <userAuthContext.Provider value={value}>
        {children}
    </userAuthContext.Provider>
}

export const useUserAuth = () => {
    return useContext(userAuthContext);
}