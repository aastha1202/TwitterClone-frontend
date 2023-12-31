import Image from "next/image";
import React from "react";
import {AiOutlineRetweet,AiOutlineHeart,AiOutlineMessage} from 'react-icons/ai'
import{GoShare} from 'react-icons/go'
import { Tweet } from "@/gql/graphql";
import Link from "next/link";



interface FeedCardProps{
 data: Tweet
}

const FeedCard: React.FC <FeedCardProps> = (props) => {
  const {data}=props
  console.log('tweets',data)
  return (
    <div className="border-b-2 border-slate-500  p-4 hover:bg-stone-950 transition-all cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          {data.author?.profileImageURL && <Image src={data.author?.profileImageURL}  className="rounded-full" alt="woman" width={50} height={50}/>}
        </div>
        <div className="col-span-11 pl-4 w-[90%] ">
       <Link href={data.author?.id ? data.author?.id : ''}><h2>{data.author?.firstName} {data.author?.lastName}</h2></Link>  
          <p >
            {data?.content}   
          </p>
          {data?.imageUrl && <Image src={data?.imageUrl} width={500} height={500} alt='tweet-image'/>}
        <div className="flex flex-row justify-between text-xl sm:p-4 ">
            <AiOutlineMessage size={25} className="hover:text-pink-500"/>
            <AiOutlineRetweet  size={25} className="hover:text-pink-500"/>
            <AiOutlineHeart size={25} className="hover:text-pink-500"/> 
            <GoShare  size={25} className="hover:text-pink-500"/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
