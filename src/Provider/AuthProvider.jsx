import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  };

 const signIn = (email, password) => {
   setLoading(true);
   return signInWithEmailAndPassword(auth, email, password).then((result) => {
     auth.currentUser.reload().then(() => {
       setUser(auth.currentUser);
     });
     return result;
   });
 };

  const logout = () => {
    setLoading(true);
    return signOut(auth)
  };

  const updateUserProfile = (user, profileData) => {
      updateProfile(user, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      const updatedUser = {
        ...user,
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
        phone: profileData.phone,
        address: profileData.address,
      };

      return updatedUser;
    };
  

  const signInWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);



  const value = {
    user,
    loading,
    createUser,
    signIn,
    logout,
    signInWithGoogle,
    updateUserProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
