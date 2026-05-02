import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

export default function MonthlyOrdersChart({ orders }) {

  const map = {};

  orders.forEach(order => {
    const date = new Date(order.createdAt);

    const key = date.toLocaleString("en-IN", {
      month: "short",
      year: "numeric"
    });

    map[key] = (map[key] || 0) + 1;
  });

  const data = Object.keys(map).map(key => ({
    month: key,
    orders: map[key],
  }));

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis dataKey="month" />
          
          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="orders"
            stroke="#ef4f5f"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}