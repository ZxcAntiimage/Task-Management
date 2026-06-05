"use client"

import { CircularProgressProps, ExtendedProgressProps } from "@/entities"
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts"

export function PieChart({ value = 45, size = 64, showText = false }: ExtendedProgressProps) {
  const chartData = [{ value: value, fill: "#546FFF" }]

  return (
    <div 
      className="relative flex items-center justify-center bg-transparent shrink-0"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="75%" 
          outerRadius="100%"
          barSize={4}
          data={chartData}
          startAngle={90}  
          endAngle={-270} 
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
            className="stroke-[#202236] stroke-[3px]" 
          />
          <RadialBar
            background={false}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center select-none">
          <span className="text-white text-sm font-semibold tracking-wide">
            {value}%
          </span>
        </div>
      )}
    </div>
  )
}
