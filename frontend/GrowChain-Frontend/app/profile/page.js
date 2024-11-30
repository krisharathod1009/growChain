import ParentContainer from '@/components/Layout/ParentContainer'
import Profile from '@/components/Profile/Profile'
import React from 'react'

function page() {
  return (
    <div>
        <ParentContainer>
            <Profile/>
        </ParentContainer>
    </div>
  )
}

export default page