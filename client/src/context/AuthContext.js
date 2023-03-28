import { useContext,createContext, useEffect,useState } from "react";
import { GoogleAuthProvider, signInWithRedirect,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState({});
    const googleSignin = ()=>{
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth,provider)
    }
    const logout = ()=>{
        signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser )
            console.log(currentUser);
        })
        return ()=>{
            unsubscribe()
        }
    },[])
    return(
        <AuthContext.Provider value={{googleSignin,logout,user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth =  ()=>{
    return useContext(AuthContext)
}