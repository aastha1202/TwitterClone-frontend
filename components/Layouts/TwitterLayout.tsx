"use client";

import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React, { useCallback } from "react";
import { AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { GoHome, GoPerson } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import Image from 'next/image'
import { useCurrentUser } from "@/hooks/user";
import toast, { Toaster } from "react-hot-toast";
import { graphQlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import getQueryClient from "@/lib/get-query-client";
import Link from "next/link";




interface TwitterLayoutProps{
    children : React.ReactNode
}
interface TwitterSidebar{
    title:string;
    icon:React.ReactNode;
    link: string
  }


  

const TwitterLayout: React.FC<TwitterLayoutProps>=(props)=> {

     const queryClient = getQueryClient(); 
     const {user} = useCurrentUser();
     const SidebarMenuItem: TwitterSidebar[]=[
      {
        title:"Home",
        icon: <GoHome size="30px"/>,
        link: '/'
      },
      {
        title:"Explore",
        icon: <AiOutlineSearch size="30px"/>,
        link: '/'
      },
      {
        title:"Notifications",
        icon: <IoMdNotificationsOutline size="30px"/>,
        link: '/'
      },
      {
        title:"Messages",
        icon: <AiOutlineMessage size="30px"/>,
        link: '/'
      },
      {
        title:"Profile",
        icon: <GoPerson size="30px"/>,
        link: `/${user?.id}`
    
      }
    
    
    ]  
     
    // const queryClient = useQueryClient()
    const  handleGoogleLogin =  useCallback(async(cred: CredentialResponse)=>{
        
        console.log('clicked')
        const googleToken = cred.credential
        if(!googleToken){
         return toast.error('Error')
        }
    
        toast.loading('Verifying...',{id:'1'})
        const {verifyGoogleToken} = await graphQlClient.request(verifyUserGoogleTokenQuery,{token:googleToken})
    
        toast.success('Verified success',{id:'1'})
        if(verifyGoogleToken) window.localStorage.setItem('token',verifyGoogleToken)
        console.log(verifyGoogleToken)
    
    
        //refecthing 
       await queryClient.invalidateQueries(['current-user'] as InvalidateQueryFilters)
    
      },[queryClient])
  

  
    


  return(
    <GoogleOAuthProvider clientId="749460574142-0fr4t6vncnb5kg09ih0g9p24ah40brpa.apps.googleusercontent.com">
    <div>
  <div>
      {/* <DynamicQueryClientProvider client={new QueryClient()} > */}
     <div>
    <div className='grid grid-cols-12 sm:pl-40 sm:pr-40 sm:pt-3 h-screen w-fit'>
      <div className='  col-span-3 flex flex-col gap-5 text-xl sticky  '>
        <FaXTwitter size="30px" />
        {SidebarMenuItem.map((item,index)=> 
        <Link href={item.link} key={index} className="flex">  <div key={index} className='flex flex-row  gap-2 h-10 hover:bg-stone-900 cursor-pointer  rounded-3xl px-3 sm:px-3  sm:py-3 sm:items-center'>
        {item.icon}<span className=' hidden sm:inline-block  text-xl'>{item.title}</span></div></Link>)}
      
        <button className=' bg-blue-500  p-2 rounded-2xl sm:rounded-3xl sm:py-4'>Post</button>
        {user && <div className='flex gap-2 items-center  justify-center absolute bottom-0   p-3 hover:bg-stone-900 rounded-full cursor-pointer  '>
         {user && user.profileImageURL && <Image className='rounded-3xl ' src={user.profileImageURL} alt='user-profile' width={50} height={50}/>}
         <div >
          <p className='hidden sm:inline text-xl'> {user.firstName} {user.lastName}</p>
          {/* <p>{user.email}</p> */}
          {/* <p>{user.lastName}</p> */}
          </div>
        </div>

      }
        </div>
      <div className='col-span-6 border-x-2 mx-4 overflow-auto scrollable-content border-gray-600 ' >
          {props.children}
        </div>
     {!user ?  (<div className='col-span-3'>
        <h3>New to Twitter?</h3>
        <GoogleLogin
        onSuccess={credentialResponse => {handleGoogleLogin(credentialResponse)}}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      </div>):
        <div  className='col-span-3  h-max p-[5%]  bg-stone-900  '>
        <h1> Users you may Know </h1>
        {  user?.recommendedUser?.map((el)=>(
          <div className=" p-[1%] " key = {el?.id}>
         <Link href={`/${el?.id}`}  className="flex items-center gap-2"> {el?.profileImageURL && <Image src={el?.profileImageURL} width={50} height={50} className="rounded-full" alt="profile-pic"/>}
            <h2>{el?.firstName} {el?.lastName}</h2>
            </Link></div>
        ))
        } 
        </div>
      }
     
    </div>
    </div>
     
   
 
   </div>
    </div>
    </GoogleOAuthProvider>
  )
}

export default TwitterLayout