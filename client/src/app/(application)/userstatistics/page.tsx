import React from 'react'
import BarChart from '@/components/charts/Barchart'
import PieChart from '@/components/charts/PieChart'
import LineChart from '@/components/charts/LineChart'

const UserStatistics = () => {
  return (
    <div>
        <h1>
            Tasks Completion Insights
        </h1>
        <LineChart/>
        <h1>Tasks Insights</h1>
        <BarChart/>
        <h1>Projects Insights</h1>
        <PieChart/>
    </div>
    
  )
}

export default UserStatistics