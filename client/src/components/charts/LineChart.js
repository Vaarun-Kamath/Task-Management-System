'use client'
import { useRef, useEffect } from "react"
import { Chart } from "chart.js/auto"

export default function LineChart(){
    const chartRef = useRef(null)

    useEffect(()=>{
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destroy()
            }

            const context = chartRef.current.getContext("2d")

            const newChart = new Chart(context, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Tasks completed",
                            data: [4, 9, 3],
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
    }, [])

    return (
        <div style={{position: "relative", width: "1000px", height: "500px"}}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
}