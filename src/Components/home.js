import React from 'react';

export default (props)=> 
  <div>
    <div className='my-data'>
        <h1> {props.data.firstName} {props.data.lastName}</h1> <br/>
          <img src={props.data.pictureUrl} alt='vaibhav Sharma' /> <br/>
        <h2> {props.data.summary}</h2>
        <p className='text-right'> Time for token to expire:-  {props.expires_in} </p>
      </div> 
   </div>