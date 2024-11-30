import React from 'react'
import Navbar from './Navbar';

function NavContainer({children}) {
  return (
    <div>
      <Navbar/>
      <div>{children}</div>
    </div>
  );
}

export default NavContainer