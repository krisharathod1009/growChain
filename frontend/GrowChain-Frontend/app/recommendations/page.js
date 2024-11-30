import ParentContainer from '@/components/Layout/ParentContainer'
import Recommendations from '@/components/Recommendations/Recommendations'
import React from 'react'

function page() {
  return (
    <div>
        <ParentContainer>
            <Recommendations/>
        </ParentContainer>
    </div>
  )
}

export default page