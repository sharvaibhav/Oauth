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

export function fetchAccessToken(code){
  let data = getQueryData(code);
  let promise = new Promise((resolve, reject)=>{
    request
      .post('https://www.linkedin.com/oauth/v2/accessToken')
      .send(data)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .accept('application/json')
      .end(function(err, resp){
        //this.accessToken = resp.body.access_token;
        if(resp){
          resolve({accessToken:resp.body.access_token,expires_in:resp.body.expires_in});
        }else{
          reject({err:err});
        }
    });
  })
  return promise;
}

export function fetchProfiledata(tokenRes){
  let promise = new Promise((resolve, reject)=>{
    request
      .get('https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,location,industry,current-share,num-connections,summary,specialties,positions)?format=json')
      .set('Authorization', 'Bearer ' + tokenRes.accessToken)
      .accept('application/json')
      .end(function(err, resp){
        //this.accessToken = resp.body.access_token;
        if(resp){
          resolve({profileData:resp.body,expires_in:tokenRes.expires_in,access_token:tokenRes.accessToken});
        }else{
          reject({err:err});
        }
        //curContext.props.history.push('/home');
    });
  });
  return promise;
}

export function getQueryData(code){

  let data = querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,//should match as in Linkedin application setup
      client_id: client_id,
      client_secret: client_secret// the secret
  });
  return data;
}