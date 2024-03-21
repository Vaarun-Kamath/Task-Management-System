'use client'
import { useRef, useEffect } from "react"
import { Chart } from "chart.js/auto"

export default function BarChart(){
    const chartRef = useRef(null)

    useEffect(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d")

            const newChart = new Chart(context, {
                type: "bar",
                data: {
                    labels: ["Pending Tasks", "Completed Tasks", "Tasks beyond deadline"],
                    datasets: [
                        {
                            label: "Tasks status",
                            data: [12, 16, 5],
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
    }, [])

    return (
        <div style={{position: "relative", width: "1000px", height: "500px"}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}