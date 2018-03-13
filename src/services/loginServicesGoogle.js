import request from 'superagent';
import querystring from 'querystring';

export const redirect_uri = 'http://localhost:3000/login';
export const response_type = 'token';
export const client_id = '912818969018-76nd7bj4850f0equg0ba0o0j0m8s2le0.apps.googleusercontent.com';
export const scope = 'https://www.googleapis.com/auth/drive.metadata.readonly';
export const include_granted_scopes = 'true';
export const client_secret = 'jhRJdBFqfMVQUCks';
export const state = 'state_parameter_passthrough_value';

export const authurl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&include_granted_scopes=${include_granted_scopes}&state=${state}&redirect_uri=${redirect_uri}&response_type=${response_type}&client_id=${client_id}`;


export function verifyOauthToken(access_token){
  let promise = new Promise((resolve, reject)=>{
    request
      .get('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token='+access_token)
      .accept('application/json')
      .end(function(err, resp){
        //this.accessToken = resp.body.access_token;
        if(resp){
          resolve({profileData:resp});
        }else{
          reject({err:'err'});
        }
        //curContext.props.history.push('/home');
    });
  });
  return promise;
}