'use client'
import { useRef, useEffect } from "react"
import { Chart } from "chart.js/auto"

export default function PieChart(){
    const chartRef = useRef(null)

    useEffect(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d")

            const newChart = new Chart(context, {
                type: "pie",
                data: {
                    labels: ["Your Projects", "Collaborated Projects"],
                    datasets: [
                        {
                            // label: "Tasks completed per month this year",
                            data: [5, 3],
                            backgroundColor: [
                                "rgb(255, 99, 132, 0.3)",
                                "rgb(255, 159, 64, 0.3)",
                                "rgb(104, 10, 86, 0.3)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132, 0.3)",
                                "rgb(255, 159, 64, 0.3)",
                                "rgb(255, 205, 86, 0.3)",
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
    }, [])

    return (
        <div style={{position: "relative", width: "500px", height: "500px"}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}