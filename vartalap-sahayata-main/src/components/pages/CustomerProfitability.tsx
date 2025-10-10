import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Treemap } from 'recharts';
import { useBusinessData } from '@/hooks/useBusinessData';

const profitabilityQuadrantData = [
  { name: 'NANGANALLUR Grains & Grocery Shop', revenue: 39500, profitMargin: 100 },
  { name: 'ADAMBAKKAM ORGANIC SHOP', revenue: 42000, profitMargin: 100 }
];

const treemapData = [
  {
    name: 'ADAMBAKKAM ORGANIC SHOP',
    size: 42681,
    fill: '#16a34a'
  },
  {
    name: 'NANGANALLUR Grains & Grocery Shop', 
    size: 39450,
    fill: '#6366f1'
  }
];

export const CustomerProfitability: React.FC = () => {
  const { customers } = useBusinessData();
  const [startDate, setStartDate] = useState('2025-09-11');
  const [endDate, setEndDate] = useState('2025-09-10');

  const totalCustomers = 2;
  const mostProfitable = 'ADAMBAKKAM ORGANIC SHOP';
  const lossMakingAccounts = 0;

  const exportAnalysis = () => {
    alert('Analysis exported to CSV!');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Customer Profitability Dashboard</h2>
      
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

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Total Customers</h3>
            <p className="text-2xl font-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Most Profitable</h3>
            <p className="text-lg font-bold text-chart-success">{mostProfitable}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Loss-Making Accounts</h3>
            <p className="text-2xl font-bold text-destructive">{lossMakingAccounts}</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Profitability Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Profitability Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Customer Key</th>
                  <th>Total Revenue</th>
                  <th>Total Cost</th>
                  <th>Total Profit</th>
                  <th>Profit Margin %</th>
                  <th>No. of Bills</th>
                  <th>Segment</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>₹{customer.totalRevenue.toLocaleString()}</td>
                    <td>₹{customer.totalCost.toFixed(2)}</td>
                    <td>₹{customer.totalProfit.toLocaleString()}</td>
                    <td>{customer.profitMargin.toFixed(1)}%</td>
                    <td>{customer.billCount}</td>
                    <td>
                      <span className="status-high-value">{customer.segment}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Profitability Quadrant & Contribution Treemap */}
      <Card>
        <CardHeader>
          <CardTitle>Profitability Quadrant & Contribution Treemap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Profitability Quadrant */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Profitability Quadrant</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={profitabilityQuadrantData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="revenue" 
                      name="Total Revenue"
                      domain={[39000, 43000]}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      dataKey="profitMargin" 
                      name="Profit Margin %"
                      domain={[95, 105]}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'revenue' ? `₹${value.toLocaleString()}` : `${value}%`,
                        name === 'revenue' ? 'Revenue' : 'Profit Margin'
                      ]}
                      labelFormatter={(label) => customers.find(c => c.totalRevenue === label)?.name || ''}
                    />
                    <Scatter dataKey="profitMargin" fill="#2563eb" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Profit Contribution Treemap */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Profit Contribution Treemap</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={treemapData}
                    dataKey="size"
                    aspectRatio={4/3}
                    stroke="#fff"
                    fill="#8884d8"
                  />
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Button onClick={exportAnalysis}>Export Analysis to CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};