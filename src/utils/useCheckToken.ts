import { DocumentNode } from "graphql";
import { gql, GraphQLClient } from "graphql-request";
import { useState,useEffect } from 'react';
import { useLocalStoreValues } from "../store";

type T = {
query: DocumentNode;
  variables?: {};
}; 

export type GqlErr={
    
    message:string,
    documentation_url: string,
    status: number,
    headers: {
        map:any
}
}


export const GETVIEWER = gql`
  query getViewer {
    viewer {
      id
      name
      login
      email
      bio
      avatarUrl
    }
  }
`;

export const useCheckToken=()=>{
const { localValues, updateMainUser,updateToken } = useLocalStoreValues()
const [viewer,setViewer] = useState(null)
const [loading, setLoading] = useState(true);
const [error, setError] = useState<GqlErr|null>(null);
const token = localValues.token
    

 

 const fetchdata=async()=>{
   const endpoint = "https://api.github.com/graphql";    //https://api.github.com/graphql
    const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
    const graphQLClient = new GraphQLClient(endpoint,headers);
  try {
    const res = await graphQLClient.request(
      GETVIEWER
    );
    
 
    
    updateMainUser({ user: res, error: null });
    setError(null)
    setLoading(false)

    if(res.error){
    setError(res.error);
    setLoading(false);
    updateToken(null)
    }
    else{
    setViewer(res);
    setLoading(false);
    }
 } catch (e:any) {
     updateMainUser({user: null,error: e.response,});
     setError(e.response);
      setLoading(false);
       updateToken(null);
  }
}
 useEffect(()=>{

if(!token){
   setLoading(false);
   setError({message:"No token present",status:400,documentation_url:"",headers:{map:""}})
}
else{
fetchdata();
}

console.log("token changed  ===== ",token)
 },[token])
return {viewer,error,loading,token}

}
