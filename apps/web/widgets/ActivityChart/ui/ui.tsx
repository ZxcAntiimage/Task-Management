"use client"

import { CustomizedDot, CustomTooltip } from "@/features/chart"
import { data } from "@/features/store/data/databaseChart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function ActivityChart() {
  return (
    <div className="min-w-70 min-h-32.5 w-full h-auto md:h-45">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={200}>
        <LineChart data={data} margin={{ top: 30, right: 10, left: -25, bottom: 0 }}>
          <CartesianGrid vertical={true} horizontal={false} stroke="#F5F5F7" strokeDasharray="0" />
          <YAxis 
            domain={[1, 3]} 
            ticks={[1, 2, 3]} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#141522", fontSize: 12, fontWeight: 500 }}
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#141522", fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          
          <Tooltip 
            content={<CustomTooltip />} 
            position={{ x: 115, y: -15 }}
          />
          
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#141522"
            strokeWidth={3}
            dot={<CustomizedDot />}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}