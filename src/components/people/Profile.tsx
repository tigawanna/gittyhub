import React, { useState } from "react";
import { graphql } from "relay-runtime";

import { AppPROFILEVIEWERQuery } from "../../__generated__/AppPROFILEVIEWERQuery.graphql";
import {
  PreloadedQuery,
  useFragment,
  useLazyLoadQuery,
  usePreloadedQuery,
} from "react-relay";
import {
  PROFILEVIEWER,
  ROOTVIEWER,
} from "../../App";
import { AppROOTVIEWERQuery } from "../../__generated__/AppROOTVIEWERQuery.graphql";
import { ProfileInfo } from "./ProfileInfo";
import { Repositories } from "../repo/Repositories";
import { TabItem } from "../Shared/TabItem";
import { Followers } from "./Followers";
import { Following } from "./Following";
import { Profile_user$data } from "./__generated__/Profile_user.graphql";
import { ProfileVIEWERQuery } from "./__generated__/ProfileVIEWERQuery.graphql";
import { useLoaderData, useLocation } from "react-router-dom";
interface ProfileProps {}

// type LocationGenerics = MakeGenerics<{
//   LoaderData: {
//     userQueryRef: PreloadedQuery<
//       AppPROFILEVIEWERQuery,
//       {}
//     >;
//   };
// }>;
export const Profile: React.FC<ProfileProps> = ({}) => {
  const stuff = useLoaderData()
  const [currTab, setCurrTab] = useState<string>("repo");

  const viewerData =
    usePreloadedQuery<AppPROFILEVIEWERQuery>(
      PROFILEVIEWER,
        //@ts-expect-error
      stuff.userQueryRef
    );
  const tabsInfo = useFragment(
    ProfileVIEWERfragmant,
    viewerData.user
  );
  const response = tabsInfo as Profile_user$data;
  const tabs = [
    ["repo", response?.repositories?.totalCount],
    [
      "followers",
      response?.followers?.totalCount,
    ],
    [
      "following",
      response?.following?.totalCount,
    ],
  ];
  const tabsData =
    useLazyLoadQuery<ProfileVIEWERQuery>(
      ProfileViewerQuery,
      { login: response.login }
    );
 


  return (
    <div className=" h-full flex flex-col justify-start">
      <div className="h-[20%]">
        <ProfileInfo refs={viewerData.user} />
      </div>

      <div className="min-h-[80%] flex flex-col justify-start">
        <div
          className="w-full flex items-center justify-evenly 
           sticky z-20 top-[50px] dark:bg-slate-700 bg-white text-xl"
        >
          {tabs.map((item, index) => {
            return (
              <TabItem
                value={item[0] as string}
                count={item[1] as number}
                currTab={currTab}
                setValue={setCurrTab}
                key={index}
              />
            );
          })}
        </div>

        {currTab === "repo" ? (
          <Repositories refs={tabsData.user} />
        ) : null}

        {currTab === "followers" ? (
          <Followers refs={tabsData.user} />
        ) : null}

        {currTab === "following" ? (
          <Following refs={tabsData.user} />
        ) : null}
      </div>
    </div>
  );
};

export const ProfileViewerQuery = graphql`
  # github graphql query to get more details
  query ProfileVIEWERQuery($login: String!) {
    user(login: $login) {
      ...Repositories_repositories
      ...Following_following
      ...Followers_followers
    }
  }
`;

export const ProfileVIEWERfragmant = graphql`
  # github graphql query to get more details
  fragment Profile_user on User {
    id
    name
    login
    email
    bio
    avatarUrl
    followers(first: 1) {
      totalCount
      nodes {
        id
      }
    }
    following(first: 1) {
      totalCount
      nodes {
        id
      }
    }

    repositories(first: 1) {
      totalCount
      nodes {
        id
      }
    }
  }
`;
