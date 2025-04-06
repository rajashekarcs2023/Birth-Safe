"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Week 24",
    weight: 62,
    bloodPressure: 110,
  },
  {
    name: "Week 25",
    weight: 62.5,
    bloodPressure: 112,
  },
  {
    name: "Week 26",
    weight: 63.1,
    bloodPressure: 115,
  },
  {
    name: "Week 27",
    weight: 63.8,
    bloodPressure: 118,
  },
  {
    name: "Week 28",
    weight: 64.3,
    bloodPressure: 116,
  },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="weight"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Weight (kg)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="bloodPressure"
          stroke="#82ca9d"
          name="Blood Pressure (systolic)"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

