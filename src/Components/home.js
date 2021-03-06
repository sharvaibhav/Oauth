import React from 'react';
import axios from 'axios';

import loginHoc from './hocLoggedIn';

// export default (props)=> {
//   return(<div>
//     <div className='my-data'>
//         <h1> {props} {props}</h1> <br/>
//           <img src={props} alt='vaibhav Sharma' /> <br/>
//         <h2> {props}</h2>
//         <p className='text-right'> Time for token to expire:-  {props} </p>
//       </div> 
//    </div>)
// }

class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = Object.assign({},this.props.location.state);
    this.getGoogleApiData();
  }

  componentDidMount(){
    setInterval(()=>{
      this.setState(prevState=>({...prevState,expires_in:prevState.expires_in - 1}));
    },1000)
  }

  async getGoogleApiData(){
    const res = await axios('https://www.googleapis.com/youtube/v3/channels?part=part%3DcontentDetails&access_token'+this.state.access_token);
    console.log(res);
  }
  render(){
    return (
      <div>
        <h1> Hi! You have logged in to the application </h1>
        <h2> the Token will expire in {this.state.expires_in} seconds</h2>
      </div>
    );
  }
}

export default loginHoc(Home,);