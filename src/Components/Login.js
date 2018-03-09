import React, {Component} from 'react';
import signin from '../images/signin.png';
import queryString from 'query-string';
import querystring from 'querystring';
import request from 'superagent';



const redirect_uri = 'http://localhost:3000/login';
const response_type = 'code';
const client_id = '81sftw5i3bu0ga';
const scope = 'r_basicprofile';
const client_secret = 'jhRJdBFqfMVQUCks';

const authurl = `https://www.linkedin.com/oauth/v2/authorization?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;


class Login extends Component {

  constructor(){
    super();
    this.queries = '';
    this.accessToken = '';
    this.state={
      'dataFetched':false,
      'profileData' : {},
      'expires_in' : ''
    }
  }

  componentDidMount(){
    var curContext = this;
    this.queries = queryString.parse(this.props.location.search);
    if(this.queries.code){
      this.fetchAccessToken().then(this.fetchProfiledata).then((data)=>{
        curContext.setState(prevState => ({
          ...prevState,
          dataFetched:true,
          profileData: data.profileData
      }));
        //curContext.props.history.push(`/home?profileData=${data.profileData}&expires_in=${data.expires_in}`);
        console.log(data);
      })
    }
  }

  fetchAccessToken(){
    let data = this.getQueryData();
    let promise = new Promise((resolve, reject)=>{
      request
        .post('https://www.linkedin.com/oauth/v2/accessToken')
        .send(data)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .accept('application/json')
        .end(function(err, resp){
          //this.accessToken = resp.body.access_token;
          if(resp){
            resolve({accessToken:resp.body.access_token,expriryTime:resp.body.expires_in});
          }else{
            reject({err:err});
          }
      });
    })
    return promise;
  }

  fetchProfiledata(tokenRes){
    let promise = new Promise((resolve, reject)=>{
      request
        .get('https://api.linkedin.com/v1/people/~:(id,first-name,last-name,headline,picture-url,location,industry,current-share,num-connections,summary,specialties,positions)?format=json')
        .set('Authorization', 'Bearer ' + tokenRes.accessToken)
        .accept('application/json')
        .end(function(err, resp){
          //this.accessToken = resp.body.access_token;
          if(resp){
            resolve({profileData:resp.body,expires_in:tokenRes.expires_in});
          }else{
            reject({err:err});
          }
          //curContext.props.history.push('/home');
      });
    });
    return promise;
  }

  getQueryData(){
    this.queries = queryString.parse(this.props.location.search);
    console.log(this.queries);
    let data = querystring.stringify({
        grant_type: "authorization_code",
        code: this.queries.code,
        redirect_uri: redirect_uri,//should match as in Linkedin application setup
        client_id: client_id,
        client_secret: client_secret// the secret
    });
    return data;
  }


  render() {
    let dataObject;
      if(this.state.dataFetched){
         dataObject = this.state.profileData;
      }
      return (
          <div className="App">
              {!this.state.dataFetched && 
                <a href={authurl}><img src={signin} alt="Sign in with Linkedin"/></a>
              }
              {this.state.dataFetched && 
                <div className='my-data'>
                  <h1> {dataObject.firstName} {dataObject.lastName}</h1> <br/>
                    <img src={dataObject.pictureUrl} alt='vaibhav Sharma' /> <br/>
                  <h2> {dataObject.summary}</h2>
                </div>
              }

          </div>
      );
  }
}

export default Login;