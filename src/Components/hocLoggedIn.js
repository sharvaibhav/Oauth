import React from 'react';

const loginHoc = (WrappedComponent,loggedIn) => {
  return class LoggedInComponent extends React.Component {
    constructor(props) {
      super(props);

      this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
      console.log(e)
    }

    render() {
      if(loggedIn){
        return (
          <div><WrappedComponent {...this.props} onClick={this.onClick} /></div>
        );
      }else{
        return(<div> Please login </div>);
      }
    }
  }
}

export default loginHoc;