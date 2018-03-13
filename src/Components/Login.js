import React, {Component} from 'react';
import signin from '../images/signin-google.png';
import queryString from 'query-string';
import querystring from 'querystring';
import request from 'superagent';
import Home from './home';
import './style.css'

import {redirect_uri,response_type,client_id,scope,client_secret,authurl,verifyOauthToken} from '../services/loginServicesGoogle';




class Login extends Component {

  constructor(){
    super();
    this.queries = '';
    this.accessToken = '';
    this.state={
      'dataFetched':false,
      'profileData' : {},
      'expires_in' : '',
      'access_token':''
    }
    this.getNewCodeFlag = false;
  }

  componentDidMount(){
    var curContext = this;
    this.queries = queryString.parse(this.props.location.hash);

    verifyOauthToken(this.queries.access_token).then(function(res){
      console.log(res);
    })

    // if(this.queries.code){
    //   fetchAccessToken(this.queries.code).then(fetchProfiledata).then((data)=>{
    //     curContext.setState(prevState => ({...prevState,dataFetched:true,profileData: data.profileData,expires_in:data.expires_in}));
    //     //curContext.props.history.push(`/home?profileData=${data.profileData}&expires_in=${data.expires_in}`);
    //     console.log(data);
    //     setInterval(function(){
    //       curContext.setState(prevState => ({...prevState,expires_in:prevState.expires_in - 1000}));
    //     },1000)
    //   })
    //   // }
    // }
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
                <Home data ={dataObject} expires_in={this.state.expires_in}/>
              }
          </div>
      );
  }
}

export default Login;