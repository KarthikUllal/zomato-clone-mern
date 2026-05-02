import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RevenueTrendChart({ orders }) {

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);

      const label = d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });

      days.push({
        key: d.toDateString(),
        label,
        revenue: 0,
      });
    }
    return days;
  };

  const days = getLast7Days();

  orders.forEach(order => {
    const orderDate = new Date(order.createdAt).toDateString();

    const day = days.find(d => d.key === orderDate);
    if (day) {
      day.revenue += order.totalAmount;
    }
  });

  return (
    <div style={{ width: "100%", height: 350, marginTop: "20px" }}>
      <ResponsiveContainer>
        <LineChart data={days}>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />

          <XAxis dataKey="label" />

          <YAxis tickFormatter={(val) => `₹${val}`} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#cb202d"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}