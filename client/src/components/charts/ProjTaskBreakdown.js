'use client'
import { useRef, useEffect, useState } from "react"
import { Chart } from "chart.js/auto"
import { GetTasksBreakdown } from "@/app/api/task/handler"

export default function ProjTaskBreakdown(props){
    const chartRef = useRef(null)
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            
              const projectId = props.projectId;
              const response = await GetTasksBreakdown(projectId);
              setChartData(response.content);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          } 
        };
    
        fetchData();
      }, []);

    useEffect(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d")

            const newChart = new Chart(context, {
                type: "pie",
                data: {
                    labels: chartData.labels,
                    // ["Your Projects", "Collaborated Projects"],
                    datasets: [
                        {
                            // label: "Tasks completed per month this year",
                            data: chartData.values,
                            // [5, 3],
                            backgroundColor: [
                                "rgb(5, 99, 255, 0.7)",
                                "rgb(23, 203, 71, 0.7)",
                                "rgb(255, 36, 29, 0.7)",
                            ],
                            borderColor: [
                                "rgb(5, 99, 255, 0.7)",
                                "rgb(23, 203, 71, 0.7)",
                                "rgb(255, 36, 29, 0.7)",
                            ],
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    responsive: true,
                }
            })
            chartRef.current.chart = newChart
        }
    }, [chartData])

    return (
        <div style={{position: "relative", width: "500px", height: "500px"}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}