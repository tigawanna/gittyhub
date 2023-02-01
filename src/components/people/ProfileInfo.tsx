import React, { useState } from "react";
import dayjs from "dayjs";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { TbPoint, TbBrandTwitter } from "react-icons/tb";
import { MdCorporateFare } from "react-icons/md";
import relativeTime from "dayjs/plugin/relativeTime";

import { FragmentRefs, graphql } from "relay-runtime";
import { useFragment, useMutation } from "react-relay";
import { ProfileInfo_user$data } from "./__generated__/ProfileInfo_user.graphql";
import { ProfileInfounfollowMutation } from "./__generated__/ProfileInfounfollowMutation.graphql";
import { ProfileInfofollowMutation } from "./__generated__/ProfileInfofollowMutation.graphql";
import { TheIcon } from "../Shared/wrappers/TheIcon";
dayjs.extend(relativeTime);

interface ProfileInfoProps {
  refs: {
    readonly " $fragmentSpreads": 
    FragmentRefs<"ProfileInfo_user" | "Profile_user" | "App_user" | "Home_user" | any>;
  } | null
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({refs}) => {
  // console.log("profile info props ===   ==== ",user,token)
const data = useFragment(ProfileInfoVIEWERfragmant, refs);
// console.log("data in profile from fragment === ", data)


 const user= data as ProfileInfo_user$data

  const extradetails = {
    company: user?.company,
    email: user?.email,
    location: user?.location,
    twitter: user?.twitterUsername,
  };


  const [yes, setYes] = useState<any>(user?.viewerIsFollowing);
  const [followMutation] = useMutation<ProfileInfofollowMutation>(FOLLOWUSER)
  const [unfollowMutation] = useMutation<ProfileInfounfollowMutation>(UNFOLLOWUSER)
  // const [active, setActive] = useState<string>("");
  // const username = user?.login as string;
  const admin = user?.isViewer;
  //console.log("og user",admin)
  const followThem = (their_id: string) => {
    setYes(true);
    followMutation({ variables: { input: { userId: their_id } } })
  };
  const unfollowThem = (their_id: string) => {
    setYes(false);
    unfollowMutation({ variables: { input: { userId: their_id } } })
  };

  // console.log("main user === ",user)
  return (
    <div className="h-full w-full dark-styles">
      <div className="w-full   p-2 flex-col-center ">
        <div className="p-1 h-full w-full flex flex-col md:flex-row items-center">
          <div
            className="h-[40%] md:h-[30%] max-w-[200px] 
            max-h-[200px] w-[70%] md:w-[15%] rounded-[5%] 
              shadow  shadow-slate-400"
          >
            <img
              className="
             h-[100%] w-[100%] rounded-[5%]  m-1"
              src={user?.avatarUrl as string}
              alt=""
              height={"40px"}
              width={"40px"}
           />
          </div>

          <div
            className="text-[15px]  flex flex-col md:flex-row  items-center md:justify-evenly
         shadow-md shadow-slate-600 dark:shadow-slate-600  p-3  m-2 w-full 
           font-sans  h-full"
          >
            <div className="text-[15px] w-full ">
              <div className=" text-[15px] md:text-xl font-bold  ">
                {user?.name}
              </div>
              <div className="text-[15px] md:text-lg ">@{user?.login}</div>
              <div className="text-[15px] max-w-[80%]">{user?.bio}</div>
              <div className="text-[15px]">
                Joined {" :"} {dayjs(user?.createdAt).fromNow()}
              </div>
            </div>

            <div className="text-[15px] w-full ">
              <ProfileInfoItemWrapper
                valkey="email"
                value={extradetails?.email}
              />
              <ProfileInfoItemWrapper
                valkey={"company"}
                value={extradetails?.company}
              />
              <ProfileInfoItemWrapper
                valkey="location"
                value={extradetails?.location}
              />
              <ProfileInfoItemWrapper
                valkey={"twitter"}
                value={extradetails?.twitter}
              />
            </div>
          </div>
        </div>

        <div className="w-[95%] flex">
          {!admin ? (
            <div>
              {yes ? (
                <button
                  onClick={() => unfollowThem(user?.id as string)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit w-full "
                >
                  {"Unfollow"}
                </button>
              ) : (
                <button
                  onClick={() => followThem(user?.id as string)}
                  className="bg-slate-600 hover:bg-slate-800 text-white hover:text-red-200 
                  text-[12px] rounded-md p-[4px] m-[3px] h-fit "
                >
                  {user?.isFollowingViewer ? "Follow back" : "Follow"}
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

interface ProfileInfoItemWrapperProps {
  value: string|null;
  valkey: string;
}

export const ProfileInfoItemWrapper: React.FC<ProfileInfoItemWrapperProps> = ({
  valkey,
  value,
}) => {
  // console.log("kyett",valkey,value)
  if (!value) {
    return null;
  }

  const WhatIcon = () => {
    // console.log("kye",valkey,value)
    switch (valkey) {
      case "company":
        return MdCorporateFare;
      case "email":
        return AiOutlineMail;
      case "twitter":
        return TbBrandTwitter;
      case "location":
        return IoLocationOutline;
      default:
        return TbPoint;
    }
  };

  return (
    <div className="flex items-center">
      <TheIcon Icon={WhatIcon()} color={""} size={""} />
      <div className="text-[15px] ">{value}</div>
    </div>
  );
};




export const ProfileInfoVIEWERfragmant = graphql`
# github graphql query to get more details
  fragment ProfileInfo_user on User{
    id
    name
    login
    email
    bio
    avatarUrl
    company
    twitterUsername
    createdAt
    isFollowingViewer
    viewerIsFollowing
    isViewer
    location
    url
   
  }
`;


export const FOLLOWUSER = graphql`
  mutation ProfileInfofollowMutation($input: FollowUserInput!) {
    followUser(input: $input) {
      clientMutationId
     }
  }
`;

export const UNFOLLOWUSER = graphql`
mutation ProfileInfounfollowMutation($input:UnfollowUserInput!){
  unfollowUser(input:$input){
    clientMutationId
  }
}
`;
