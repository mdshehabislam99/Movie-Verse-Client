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

const AuthContext = createContext();
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
    return createUserWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        return result;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateUserProfile = (profileData) => {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in");
    }

    return updateProfile(auth.currentUser, {
      displayName: profileData.displayName,
      photoURL: profileData.photoURL,
    }).then(() => {
      const updatedUser = {
        ...auth.currentUser,
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      };
      setUser(updatedUser);
      return updatedUser;
    });
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        return result;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

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
