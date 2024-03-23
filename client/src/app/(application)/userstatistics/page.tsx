import React from 'react'
import BarChart from '@/components/charts/Barchart'
import ProjTaskBreakdown from '@/components/charts/ProjTaskBreakdown'
import TasksTimeline from '@/components/charts/TasksTimeline'

const UserStatistics = () => {
  return (
    <div>
        <h1>
            Tasks Completion Insights
        </h1>
        {/* <TasksTimeline projectId = "65fc000186af725e003b0042"/>
        <h1>Tasks Insights</h1>
        <BarChart projectId = "65fc000186af725e003b0042" />
        <h1>Projects Insights</h1>
        <ProjTaskBreakdown projectId = "65fc000186af725e003b0042"/> */}
    </div>
    
  )
}

export default UserStatistics