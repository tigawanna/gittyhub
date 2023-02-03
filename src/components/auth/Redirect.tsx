import { useEffect } from 'react';
import {  OAuthResponse } from './types';
import { login_url, redirect_url } from '../../utils/env';
import { client } from '../../utils/pb/config';
import { useLocalStoreValues } from './../../store';
import { useNavigate } from 'react-router-dom';


interface RedirectProps {

}

export const Redirect = ({}: RedirectProps) => {
  // //no-console("inside Redirect component")

  const localstore = useLocalStoreValues()
  const navigate = useNavigate();

  const local_prov = JSON.parse(localStorage.getItem('provider') as string);
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code') as string;
  const state = url.searchParams.get('state') as string;

  // this hasto match what you orovided in the oauth provider , in tis case google
  const redirectUrl = redirect_url;
  useEffect(() => {
    const pbOauthLogin = async () => {
      client.autoCancellation(false);
      const oauthRes = await client
        .collection('devs')
        .authWithOAuth2(
          local_prov.name,
          code,
          local_prov.codeVerifier,
          redirectUrl
      ) as unknown as OAuthResponse
      
      // console.log("adding user access token afetr oauth", oauthRes.meta?.accessToken)
      // localstore.updateToken(oauthRes.meta?.accessToken)
      localstore.updateGhAccess(oauthRes.meta?.accessToken)
     
      // console.log("oathRes === ",oauthRes)
      // const rawUser = oauthRes?.meta?.rawUser as GithubRawUser


      // if (oauthRes.meta?.refreshToken){

  
      //   }
      // queryClient.setQueryData(['user'], client.authStore.model);
      ;
    };
    //no-console("redirect logic",local_prov.state , state)
    if (local_prov.state !== state) {
      const auth_url = login_url;
      if (typeof window !== 'undefined') {
        //no-console("redirecting to auth becasu it lacks ")
        window.location.href = auth_url;
      }
    } 
    else {
      pbOauthLogin().catch((e) => {
      // console.log('error logging in with provider  == ', e);
      });
    }
  }, []);
 



  return (
    <div className="w-full h-full flex items-center justify-center">
    {localstore.localValues.token?"done navigate to main":"loading"}
    </div>
  );
};
