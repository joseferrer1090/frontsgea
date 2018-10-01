import React from 'react';
import CreateNewUser from '../components/CreateNewUser';

class UserLayout extends React.PureComponent {
  render(){
    return (
      <div>
        <h1>UserLayout page</h1>
        <CreateNewUser />
      </div>
        );
    }
}

export default UserLayout;
