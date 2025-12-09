import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function StatsChart({ data }) {

  const safe = Array.isArray(data) ? data : [];

  return (
    <div style={{ width:"100%", height:360 }}>
      <ResponsiveContainer>
        <LineChart data={safe} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#0d5fc0" strokeWidth={3} dot={{ r:4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}