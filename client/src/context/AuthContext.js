import { useContext,createContext, useEffect,useState } from "react";
import { GoogleAuthProvider, signInWithRedirect,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import axios from "axios";
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
            axios.post(`http://localhost:5000/user/${currentUser.uid}`)
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