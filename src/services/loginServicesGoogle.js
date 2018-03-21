import request from 'superagent';
import querystring from 'querystring';

export const redirect_uri = 'http://localhost:3000/login';
export const response_type = 'code';
export const client_id = '912818969018-etmhuo58u1peqbdba1koiue35v62ssgi.apps.googleusercontent.com';
export const scope = 'https://www.googleapis.com/auth/drive.metadata.readonly';
export const include_granted_scopes = 'true';
export const client_secret = 'GiAJnVYi3CXIVFsXnqXFSzSR';
export const state = 'state_parameter_passthrough_value';
const access_type = 'offline';
const accessTokenUrl = 'https://www.googleapis.com/oauth2/v4/token';
const refreshTokenUrl = 'https://www.googleapis.com/oauth2/v4/token';

export const authurl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=${access_type}&redirect_uri=${redirect_uri}&response_type=${response_type}&client_id=${client_id}`;


export function fetchAccessToken(code){
  let data = getQueryData(code,'authorization_code');
  let promise = new Promise((resolve, reject)=>{
    request
      .post(accessTokenUrl)
      .send(data)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .accept('application/json')
      .end(function(err, resp){
        //this.accessToken = resp.body.access_token;
        if(resp){
          resolve({access_token:resp.body.access_token,expires_in:resp.body.expires_in,refresh_token:resp.body.refresh_token});
        }else{
          reject({err:err});
        }
    });
  })
  return promise;
}

export function getQueryData(code,grant_type){

  let data = querystring.stringify({
      grant_type: grant_type,
      code: code,
      redirect_uri: redirect_uri,//should match as in Linkedin application setup
      client_id: client_id,
      client_secret: client_secret// the secret
  });
  return data;
}


export function getRefreshQueryData(code,grant_type){

  let data = querystring.stringify({
      grant_type: grant_type,
      refresh_token: code,
      redirect_uri: redirect_uri,//should match as in Linkedin application setup
      client_id: client_id,
      client_secret: client_secret// the secret
  });
  return data;
}

export function refreshToken(refresh_token){
  let data = getRefreshQueryData(refresh_token,'refresh_token');
  let promise = new Promise((resolve, reject)=>{
    request
      .post(refreshTokenUrl)
      .send(data)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .accept('application/json')
      .end(function(err, resp){
        //this.accessToken = resp.body.access_token;
        if(resp){
          resolve({access_token:resp.body.access_token,expires_in:resp.body.expires_in});
        }else{
          reject({err:err});
        }
    });
  })
  return promise;
}