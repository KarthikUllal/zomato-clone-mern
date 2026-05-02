import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function OrdersTrendChart({ orders }) {

  const getLast7Days = () => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const label = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short"
      });

      days.push({
        key: d.toDateString(),
        date: label,
        orders: 0
      });
    }

    return days;
  };

  const days = getLast7Days();

  orders.forEach(order => {
    const orderDate = new Date(order.createdAt).toDateString();

    const day = days.find(d => d.key === orderDate);

    if (day) {
      day.orders += 1;
    }
  });

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart data={days}>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="date" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="orders"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.25}
            strokeWidth={3}
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}