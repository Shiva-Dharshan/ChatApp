import { signOut } from 'firebase/auth'
import { useRef, useState } from 'react'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import  Auth  from './components/Auth'
import { auth } from './components/firebase-config'

const cookies=new Cookies()

function App() {
  const [IsAuth,SetIsAuth]=useState(cookies.get("auth-token"))
  const[Room,setRoom]=useState(null)
  const roomInputRef=useRef(null)

  const signUserOut=async ()=>{
    await signOut(auth)
    cookies.remove("auth-token")
    SetIsAuth(false)
    setRoom(null)
  }
  
  if(!IsAuth){
  return (
    <>
    <Auth setIsAuth={SetIsAuth}/>
    </>
  )
  }
  return(
    <>
    <div>{Room?<div><Chat room={Room}/></div>:
    
    <div className='flex flex-col text-center bg-neutral-900 p-10 w-[50%] m-auto '>
      <label className='text-4xl'>Enter the room:</label>
      <input className='mt-5 p-3 w-[90%] mx-auto' ref={roomInputRef}></input>
      <button className='mt-5 text-xl py-2 px-14 rounded-sm bg-yellow-500  w-max mx-auto' 
      onClick={()=>setRoom(roomInputRef.current.value)}>Enter</button></div>}
      </div>
      <div>
        <button onClick={signUserOut} className=' mx-10 rounded-sm px-10 py-4 bg-red-500'>Signout</button></div>

    </>
  )
}

export default App
