import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import Cookies from 'universal-cookie'
import { auth, provider } from './firebase-config'

const cookies=new Cookies()

export default function Auth(props) {
    const {setIsAuth}=props
        const signInWithGoogle=async ()=>{
            try{
            const result=await signInWithPopup(auth,provider)
             cookies.set("auth-token",result.user.refreshToken) 
             setIsAuth(true)
            }catch(err){
                console.log(err)
            }
        }
  return (
    <>
    <div className='flex flex-col items-center justify-center rounded-sm text-center m-auto bg-neutral-900 p-10 w-max mx-auto h-[30pc]'>
        <h1 className='text-3xl text-zinc-600'>Sign in with google!</h1>
        <button
        className='p-3 rounded-sm bg-yellow-500 text-md px-14 mt-5'
        onClick={signInWithGoogle} >
        Sign in</button>
    </div>
    </>
  )
}
