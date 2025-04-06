import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Week 24",
    weight: 62,
  },
  {
    name: "Week 25",
    weight: 62.5,
  },
  {
    name: "Week 26",
    weight: 63.1,
  },
  {
    name: "Week 27",
    weight: 63.8,
  },
  {
    name: "Week 28",
    weight: 64.3,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}kg`}
        />
        <Bar dataKey="weight" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

