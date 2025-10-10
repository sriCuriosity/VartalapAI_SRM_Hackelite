import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const topProductsData = [
  { name: 'சிவப்பு அரிசி கருப்பு உளுந்து', revenue: 60000 },
  { name: 'பிகிசில் கிழாலি', revenue: 23000 },
  { name: 'கப்பா மாலை', revenue: 20000 },
  { name: 'இருவிதி ராவு', revenue: 15000 },
  { name: 'ர 200 | 1', revenue: 14000 },
  { name: 'இலி.அரிகु అalि', revenue: 12000 },
  { name: 'इललسना मانग', revenue: 11000 },
  { name: 'करगु नाइस әulि', revenue: 10000 }
];

const salesByDayData = [
  { day: 'Monday', amount: 10000 },
  { day: 'Tuesday', amount: 70000 },
  { day: 'Wednesday', amount: 15000 }
];

const customerSegmentData = [
  { name: 'Other', value: 100, color: '#2563eb' }
];

const heatmapData = [
  { day: 'Monday', hour: 0, value: 20000 },
  { day: 'Tuesday', hour: 12, value: 60000 },
  { day: 'Wednesday', hour: 6, value: 30000 },
  { day: 'Wednesday', hour: 18, value: 40000 }
];

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04'];

export const BusinessOverview: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-09-10');
  const [endDate, setEndDate] = useState('2025-09-10');

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Business Overview & Analytics Dashboard</h2>
      
      {/* Date Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div>
              <Label htmlFor="start-date">Start Date:</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-auto"
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date:</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-auto"
              />
            </div>
            <Button>Apply Date Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Products by Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Products by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProductsData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 10 }} 
                    width={120}
                  />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales by Day of Week */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Day of Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByDayData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#ca8a04" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Customer Segment */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Customer Segment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {customerSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Activity Heatmap (Hour x Day)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <div className="grid grid-cols-24 gap-1 h-full">
                {/* Simplified heatmap representation */}
                <div className="bg-chart-primary/20 rounded flex items-center justify-center text-xs">
                  Mon
                </div>
                <div className="col-span-23"></div>
                <div className="bg-chart-primary rounded flex items-center justify-center text-xs text-white">
                  Tue 12
                </div>
                <div className="col-span-23"></div>
                <div className="bg-chart-primary/60 rounded flex items-center justify-center text-xs">
                  Wed 6
                </div>
                <div className="col-span-11"></div>
                <div className="bg-chart-primary/80 rounded flex items-center justify-center text-xs">
                  Wed 18
                </div>
                <div className="col-span-11"></div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-chart-primary/20 rounded"></div>
                <span>10000</span>
                <div className="w-4 h-4 bg-chart-primary/60 rounded"></div>
                <span>30000</span>
                <div className="w-4 h-4 bg-chart-primary rounded"></div>
                <span>60000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};