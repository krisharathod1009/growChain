import React from 'react'
import SideBar from './SiderBar'
import NavContainer from './NavContainer'

function ParentContainer({children}) {
  return (
    <div className="grid grid-cols-[230px,1fr]">
      <SideBar />
      <NavContainer>{children}</NavContainer>
    </div>
  );
}

export default ParentContainer