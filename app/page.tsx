'use client';

import Image from 'next/image'
import FeedCard from "@/components/FeedCard"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useCallback, useState } from 'react';
import   { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useCurrentUser } from '@/hooks/user';
import { CiImageOn } from "react-icons/ci";
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet';
import { Tweet } from '@/gql/graphql';
import TwitterLayout from '@/components/Layouts/TwitterLayout';


export default function Home() {
   
  const [content, setContent] =useState('')
   const {user} = useCurrentUser()
   const {tweets=[]} = useGetAllTweets()
   console.log('tweetsss',tweets)
   const {mutate} = useCreateTweet()
   console.log(user)
   const [imageURL, setImageURL]= useState('')

  


const handleInputChangeFile = useCallback(((input: HTMLInputElement)=>{
  return async(event: Event) =>{
    event.preventDefault();
    const file= input.files?.item(0)
    if(!file) return;
    console.log('file',file)
    // console.log(input.files)


    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'twitter-image');
    formData.append('folder', `upload/${user?.id}/tweets`);

    const response = await fetch('https://api.cloudinary.com/v1_1/djk2jit4c/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      setImageURL(result.secure_url);
      // Now, you can use the imageUrl as needed (e.g., save it to your database)
      console.log('Image uploaded to Cloudinary:', imageURL);
    } else {
      console.error('Failed to upload image to Cloudinary');
    }
 
  }
}),[])



function handleImageSelect(){
  console.log('clicked')
  const input = document.createElement('input')
  input.setAttribute('type','file')
  input.setAttribute('accept','image/*')

  const handlerFn= handleInputChangeFile(input)
  input.addEventListener('change',handlerFn)
  input.click()
}
  const handleTweetPost= useCallback(()=> {
    mutate({
      content,
      imageUrl:imageURL
    },
    {
      onSuccess: () => {
        // Reset the content and imageURL states after successful mutation
        setContent('');
        setImageURL('');
      }})
    
  },[content,imageURL,mutate])

  return (
       
     <div>
        <GoogleOAuthProvider clientId="749460574142-0fr4t6vncnb5kg09ih0g9p24ah40brpa.apps.googleusercontent.com">
      <TwitterLayout>
     <div>
   
      <div className="border-b-2 border-slate-500 p-4 hover:bg-stone-950 transition-all cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          {user?.profileImageURL && <Image src={user.profileImageURL} alt="user-profile" width={50} height={50} />}
        </div>
        <div className="col-span-11 pl-4 w-[90%] ">
          <textarea  value={content} onChange={e=> setContent(e.target.value)} className='w-full bg-transparent text-xl border-slate-500 resize-none ' placeholder="What is happening?!" rows={3} />
          
          {imageURL && <Image src={imageURL} alt='tweet-img' width={500} height={500}/>}
        <div className="flex flex-row justify-between text-xl items-center  ">
          <CiImageOn size={30} onClick={handleImageSelect}/>
          <button className=' bg-blue-500 rounded-2xl sm:rounded-full px-4 py-2 text-sm sm:text-xl ' onClick={handleTweetPost}>Post</button>
        </div>
        </div>
      </div>
    </div>
    {
      
      tweets?.map((tweet)=> tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
    }
        </div>
   
     
   </TwitterLayout>
   <ReactQueryDevtools/>
   <Toaster/>
   </GoogleOAuthProvider>
   </div>
   
  )
}
