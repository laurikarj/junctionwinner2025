import React from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function AnalyticsPage() {
    // ...existing code from AnalyticsPage in App.jsx...
    // Dummy data
    const metrics = [
        { label: 'Total Energy Consumption', value: '12,500 kWh' },
        { label: 'Peak Demand', value: '2,100 kW' },
        { label: 'CO₂ Emissions', value: '3,200 kg' },
        { label: 'Renewable Usage', value: '68%' },
        { label: 'System Uptime', value: '99.98%' },
    ];
    const timeSeries = [
        { time: '00:00', usage: 200 }, { time: '04:00', usage: 350 }, { time: '08:00', usage: 600 },
        { time: '12:00', usage: 900 }, { time: '16:00', usage: 1200 }, { time: '20:00', usage: 800 }, { time: '24:00', usage: 400 }
    ];
    const barData = [
        { name: 'Site A', value: 4000 },
        { name: 'Site B', value: 3000 },
        { name: 'Site C', value: 2000 },
        { name: 'Site D', value: 2780 },
        { name: 'Site E', value: 1890 },
    ];
    const pieData = [
        { name: 'Solar', value: 400 },
        { name: 'Wind', value: 300 },
        { name: 'Grid', value: 300 },
        { name: 'Battery', value: 200 },
    ];
    const alerts = [
        { time: '2025-09-27 10:12', message: 'Peak demand threshold exceeded', severity: 'High' },
        { time: '2025-09-27 09:45', message: 'Device B offline', severity: 'Medium' },
        { time: '2025-09-27 08:30', message: 'CO₂ emissions above target', severity: 'Low' },
    ];
    const topConsumers = [
        { device: 'Pump 1', usage: 3200 },
        { device: 'Compressor', usage: 2100 },
        { device: 'Lighting', usage: 1800 },
    ];
    const efficiency = [
        { name: 'Pump 1', actual: 90, expected: 95 },
        { name: 'Compressor', actual: 80, expected: 90 },
        { name: 'Lighting', actual: 98, expected: 97 },
    ];
    const forecast = [
        { day: 'Mon', usage: 1200 },
        { day: 'Tue', usage: 1300 },
        { day: 'Wed', usage: 1100 },
        { day: 'Thu', usage: 1400 },
        { day: 'Fri', usage: 1500 },
        { day: 'Sat', usage: 900 },
        { day: 'Sun', usage: 800 },
    ];
    const trend = [
        { month: 'Jan', usage: 9000 },
        { month: 'Feb', usage: 8500 },
        { month: 'Mar', usage: 9500 },
        { month: 'Apr', usage: 10000 },
        { month: 'May', usage: 11000 },
        { month: 'Jun', usage: 12000 },
    ];
    const pieColors = ['#009fe3', '#00c49f', '#ffbb28', '#ff8042'];
    return (
        <div style={{ padding: 32, maxWidth: 1200, margin: '0 auto', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Analytics Dashboard</h1>
            {/* Key Metrics */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
                {metrics.map(m => (
                    <div key={m.label} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24, minWidth: 180, flex: 1 }}>
                        <div style={{ fontSize: 18, color: '#009fe3', fontWeight: 600 }}>{m.label}</div>
                        <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{m.value}</div>
                    </div>
                ))}
            </div>
            {/* Charts */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ flex: 2, minWidth: 320, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Energy Usage (24h)</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={timeSeries}>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Line type="monotone" dataKey="usage" stroke="#009fe3" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Energy Source Breakdown</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                                {pieData.map((entry, idx) => (
                                    <Cell key={`cell-${idx}`} fill={pieColors[idx % pieColors.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Top Sites</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#009fe3" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* Alerts & Anomalies */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Recent Alerts</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {alerts.map(a => (
                        <li key={a.time + a.message} style={{ marginBottom: 8, color: a.severity === 'High' ? '#e53935' : a.severity === 'Medium' ? '#ffb300' : '#009fe3', fontWeight: 500 }}>
                            [{a.time}] {a.message} <span style={{ fontSize: 13, color: '#888', fontWeight: 400 }}>({a.severity})</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Device/Asset Analytics */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Top Consumers</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {topConsumers.map(tc => (
                            <li key={tc.device} style={{ marginBottom: 6 }}>{tc.device}: <b>{tc.usage} kWh</b></li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Efficiency Scores</div>
                    <table style={{ width: '100%', fontSize: 15 }}>
                        <thead>
                            <tr><th align="left">Device</th><th>Actual</th><th>Expected</th></tr>
                        </thead>
                        <tbody>
                            {efficiency.map(e => (
                                <tr key={e.name}><td>{e.name}</td><td>{e.actual}%</td><td>{e.expected}%</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Trends & Forecasts */}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 32 }}>
                <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Predicted Usage (This Week)</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={forecast}>
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="usage" fill="#00c49f" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontWeight: 600, marginBottom: 8 }}>Monthly Trend</div>
                    <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={trend}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Line type="monotone" dataKey="usage" stroke="#ff8042" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {/* Custom Filters (static UI) */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Filters</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <input type="date" style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
                    <select style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
                        <option>All Devices</option>
                        <option>Pump 1</option>
                        <option>Compressor</option>
                        <option>Lighting</option>
                    </select>
                    <select style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}>
                        <option>All Metrics</option>
                        <option>Usage</option>
                        <option>Efficiency</option>
                        <option>Emissions</option>
                    </select>
                </div>
            </div>
            {/* Export & Sharing (static UI) */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 32 }}>
                <div style={{ fontWeight: 600, marginBottom: 12 }}>Export & Sharing</div>
                <button style={{ padding: '8px 18px', background: '#009fe3', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, marginRight: 12 }}>Download PDF</button>
                <button style={{ padding: '8px 18px', background: '#00c49f', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600 }}>Share Dashboard</button>
            </div>
        </div>
    );
}
export default AnalyticsPage;
