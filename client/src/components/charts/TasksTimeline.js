'use client'
import { useRef, useEffect, useState } from "react"
import { Chart } from "chart.js/auto"
import { GetTasksTimeline } from "@/app/api/task/handler"

export default function TasksTimeline(props){
    const chartRef = useRef(null)
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            
              const projectId = props.projectId;
              const response = await GetTasksTimeline(projectId);
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
                type: "line",
                data: {
                    labels: chartData.labels,
                    // ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Tasks completed",
                            data: chartData.values,
                            // [4, 9, 3],
                            backgroundColor: [
                                "rgb(10, 10, 132, 0.9)",
                            ],
                            borderColor: [
                                "rgb(10, 10, 132, 0.9)",
                            ],
                            borderWidth: 1,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            type: "category"
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            })
            chartRef.current.chart = newChart
        }
    }, [chartData])

    return (
        <div style={{position: "relative", width: "1000px", height: "500px"}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}