import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

function OrderCharts({ orders }) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const filteredOrders = orders.filter(order => new Date(order.createdAt) >= sevenDaysAgo);

    const sortedOrders = [...filteredOrders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const formatXAxis = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    return (
        <div style={{ width: '100%', height: 350, marginTop: '20px' }}>
            <ResponsiveContainer>
                <LineChart data={sortedOrders} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis 
                        dataKey="createdAt" 
                        tickFormatter={formatXAxis} 
                        tick={{ fill: '#666', fontSize: 12 }}
                        minTickGap={30}
                    />
                    <YAxis 
                        tick={{ fill: '#666', fontSize: 12 }}
                        tickFormatter={(val) => `₹${val}`} 
                    />
                    <Tooltip 
                        labelFormatter={(label) => new Date(label).toLocaleString('en-IN')}
                        contentStyle={{ 
                            borderRadius: '8px', 
                            border: '1px solid #ddd', 
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)' 
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="totalAmount" 
                        stroke="#cb202d" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#cb202d', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        animationDuration={1500}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default OrderCharts;
