/*

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import React from "react";

export default function OAuth() {
    const handleGoogleLogin = () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            const res = await fetch{'/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: result.user.displaNyName, email: result.user.email, photo: result.user.photoURL }),
            })
            const data = await res.json();
        } catch (error) {
            console.log("cold not sign in with google", error);
        };
  return (
    <button type='button' className='bg-red-700 text-white p-3 rounded-lg 
    uppercase hover:opacity-95'>Continue with google</button>
  )

}}
  */