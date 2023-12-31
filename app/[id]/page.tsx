'use client'
import FeedCard from "@/components/FeedCard";
import TwitterLayout from "@/components/Layouts/TwitterLayout";
import { Tweet } from "@/gql/graphql";
import { useCurrentUser, useFollowUser, useUnfollowUser, useUserById } from "@/hooks/user";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {BsArrowLeftShort} from 'react-icons/bs'

 const UserProfilePage = ()=>{
    const {user:logged_user} = useCurrentUser()
    const {id} = useParams()
    const {data} = useUserById(id as string )
    const { mutate: followUser } = useFollowUser();
    const { mutate: unfollowUser } = useUnfollowUser()
    console.log('userdata',data?.getUserById)
    const user= data?.getUserById
    const query = new QueryClient()
    const [yesFollowing, setYesFollowing] = useState(false)

    useEffect(() => {
        if (!user || !logged_user) return;
    
        const isFollowing = logged_user.followings?.some(el => el?.id === user.id);
        setYesFollowing(!!isFollowing);
      }, [user, logged_user, yesFollowing]);

    const handleFollowUser = useCallback( async ()=>{
        if(!user?.id) return 
        followUser(user?.id)

    },[query, user?.id])
    const handleUnfollowUser = useCallback(async ()=>{
        if(!user?.id) return 
        unfollowUser(user?.id)
    },[query, user?.id])
 return(
    <div>
        <TwitterLayout>
            <div>
                <nav className="flex border-b-2 border-slate-900 pl-5 gap-10">
                    <BsArrowLeftShort size={30}/>
                    <div className="flex flex-col">
                    <h2 className="text-xl">{user?.firstName} {user?.lastName}</h2>
                    <h2>{user?.tweets?.length} posts </h2>
                    </div>
                </nav>

                <div className="flex flex-col justify-center gap-2 pl-[7%] pt-[5%] pb-[3%] border-b-2 border-slate-500 ">
                 {user?.profileImageURL ?  <Image src={user?.profileImageURL} className="rounded-full" alt="user-profile" width={100} height={100}/>: <></>}

                 {user && <h2 className="text-2xl ">{user?.firstName} {user?.lastName}</h2>}
                 <div className="flex gap-5 items-center justify-around">
                        <span>{user?.followers?.length} Followers</span>
                        <span>{user?.followings?.length} Followings</span>
                    {logged_user?.id !== user?.id &&
                      (yesFollowing ?   (<button onClick={handleUnfollowUser} className=" bg-white text-black rounded-md px-2 py-1    "> UnFollow </button>):(<button onClick={handleFollowUser} className=" bg-white text-black rounded-md px-2 py-1 ">Follow</button>))
                    }
                    </div>
                </div>

                    { user?.tweets?.map((tweet) => {
                    return (
                       <FeedCard data={tweet as Tweet} key={tweet?.author?.id}  />
                    );
                    })}

            </div>
        </TwitterLayout>
    </div>
 )
}




export default UserProfilePage