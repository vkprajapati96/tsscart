import React from 'react'
import StatCards from './StatCards'
import ChartSection from './ChartSection'

const Dashboard = () => {
  return (
    <div className='space-y-6'>
{/* stats card */}
{/* <StatCards/> */}
<StatCards/>
<ChartSection/>
    </div>
  )
}

export default Dashboard