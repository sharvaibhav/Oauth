import React, {Component} from 'react';
import signin from '../images/signin-google.png';
import queryString from 'query-string';
import querystring from 'querystring';
import request from 'superagent';
import Home from './home';
import './style.css'

import FirstPage from './FirstPage';

import {redirect_uri,response_type,client_id,scope,client_secret,authurl,fetchAccessToken,refreshToken} from '../services/loginServicesGoogle';

class Login extends Component {

  constructor(){
    super();
    this.queries = '';
    this.accessToken = '';
    this.state={
      'dataFetched':false,
      'profileData' : {},
      'expires_in' : '',
      'access_token':'',
      'refresh_token':'',
      'loggedIn':false
    }
    this.getNewCodeFlag = false;
  }

  componentDidMount(){
    var curContext = this;
    this.queries = queryString.parse(this.props.location.search);
    var setIntervalRef;
    if(this.queries.code || (this.queries.code && sessionStorage.getItem('access_token') == null)){
      fetchAccessToken(this.queries.code).then((res)=>{
        console.log(res);
        if(res.access_token){
          sessionStorage.setItem('access_token',res.access_token);
          sessionStorage.setItem('refresh_token',res.refresh_token);
          
          this.setState({...this.state,'dataFetched':true,'access_token':res.access_token,'refresh_token':res.refresh_token,'expires_in':res.expires_in,'loggedIn':true},()=>{
            console.log(this.state);
            setIntervalRef = setInterval(()=>{
                this.setState(...this.state,{'expires_in':this.state.expires_in -1})
                sessionStorage.setItem('time_remaining',this.state.expires_in);
            },1000)
          });
          //this.props.history.push('/home',this.state);
        }
      });
    }else if(sessionStorage.getItem('access_token')){
      this.setState({...this.state,'loggedIn':true,'access_token':sessionStorage.getItem('access_token'),'expires_in':sessionStorage.getItem('time_remaining')},()=>{
          setIntervalRef = setInterval(()=>{
              this.setState(...this.state,{'expires_in':this.state.expires_in -1})
              sessionStorage.setItem('time_remaining',this.state.expires_in);
          },1000)
      })
    }
  }

  refreshToken = ()=>{
    //var currContext = this;
    refreshToken(sessionStorage.getItem('refresh_token')).then(res =>{
      sessionStorage.setItem('access_token',res.access_token);
      sessionStorage.setItem('time_remaining',res.access_token);
      this.setState({...this.state,'access_token':res.access_token,'expires_in':res.expires_in});
      console.log("token refreshed --" + res.access_token)
    });
  }

  render() {
    let dataObject;
      if(this.state.dataFetched){
         dataObject = this.state.profileData;
      }
      return (
          <div className="App">
              {!this.state.loggedIn && 
                <a href={authurl}><img src={signin} alt="Sign in with Linkedin"/></a>
              }
              {this.state.loggedIn && 
                <FirstPage loginTimeRemaining={this.state.expires_in} refreshToken={this.refreshToken}/>
              }
          </div>
      );
  }
}

export default Login;