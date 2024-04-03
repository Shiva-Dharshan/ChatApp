import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase-config'


export default function Chat(props) {
  const [newMessage,setnewMessage]=useState("")
  const[messages,setMessages]=useState([])
  const messagesRef=collection(db,"messages")
  const {room}=props;

  useEffect(()=>{
    const queryMessages=query(messagesRef,where("room","==",room),
    orderBy("createdAt"))
    const unsubscribe=onSnapshot(queryMessages,(snapshot)=>{
      let messages=[];
      snapshot.forEach((doc)=>{
        messages.push({...doc.data(),id:doc.id})
      });
      setMessages(messages)
    });
    return()=>unsubscribe();
  },[])

  const handlesubmit=async (e)=>{
    e.preventDefault();
    if(newMessage==="")
    return;
  await addDoc(messagesRef,{
    text:newMessage,
    createdAt:serverTimestamp(),
    user:auth.currentUser.displayName,
    room,
  })
  setnewMessage("")
  }
  return (
    <>
    <div className='bg-neutral-900 flex flex-col justify-center items-center h-auto w-max p-10 mx-auto'>
      <h1 className='text-4xl mb-10'>Welcome to : {room.toUpperCase()}</h1>
      <div>{messages.map((message)=><div className='' key={message.id}>
        <span className='text-yellow-500 font-semibold'>{message.user}:</span>
        <h1>{message.text}</h1></div>)}</div>
      <form onSubmit={handlesubmit} className=''>
        <input 
        className='px-20 py-5' 
        onChange={(e)=>setnewMessage(e.target.value)} 
        value={newMessage}
        placeholder='Type your message here' /><br></br>
        <button type='submit' className='mx-auto text-center py-4 px-10 mt-2 bg-yellow-500 rounded-sm'>Send</button>
      </form>
      </div>
    </>
  )
}
