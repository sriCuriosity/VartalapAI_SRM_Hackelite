import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useBusinessData } from '@/hooks/useBusinessData';

const inventoryData = [
  { name: 'છิ ११ ॐ 1', stock: 0, status: 'Out of Stock', leadTime: '0 days' },
  { name: 'અસ્મર વિકલ્પ 2', stock: 0, status: 'Out of Stock', leadTime: '0 days' },
  { name: 'સ્વિગ અભિરીજ', stock: 0, status: 'Out of Stock', leadTime: '0 days' },
  { name: 'ते कद्दू छे ध મિત्र भागु', stock: 0, status: 'Out of Stock', leadTime: '0 days' }
];

const salesVelocityData = [
  { week: 'Jul', actual: 120, forecast: 110 },
  { week: 'Aug', actual: 80, forecast: 85 },
  { week: 'Sep', actual: 60, forecast: 65 },
  { week: 'Oct', actual: 50, forecast: 55 },
  { week: 'Nov', actual: 40, forecast: 45 },
  { week: 'Dec', actual: 20, forecast: 15 }
];

const forecastData = [
  { week: '2025-07-24+2025+01-07+2075-46+2075-56-26+2075-07-07', forecast: 124 },
  { week: '2025-08-07', forecast: 120 }
];

export const InventoryIntelligence: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-09-11');
  const [endDate, setEndDate] = useState('2025-09-10');
  const [selectedProduct, setSelectedProduct] = useState('');
  const { products } = useBusinessData();

  const totalInventoryValue = 0.00;
  const lowStockItems = 0;
  const outOfStockItems = 50;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Inventory Intelligence Dashboard</h2>
      
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
            <h3 className="text-sm text-muted-foreground">Total Inventory Value</h3>
            <p className="text-2xl font-bold">₹{totalInventoryValue.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Low Stock Items</h3>
            <p className="text-2xl font-bold text-warning">{lowStockItems}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Out of Stock Items</h3>
            <p className="text-2xl font-bold text-destructive">{outOfStockItems}</p>
          </CardContent>
        </Card>
      </div>

      {/* Smart Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Inventory Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Current Stock</th>
                  <th>Cost Price</th>
                  <th>Reorder Threshold</th>
                  <th>Lead Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item, index) => (
                  <tr key={index} className="bg-destructive/10">
                    <td>{item.name}</td>
                    <td>₹{item.stock.toFixed(2)}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{item.leadTime}</td>
                    <td>
                      <span className="status-out-of-stock">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Sales Velocity & Demand Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Velocity & Demand Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Velocity Chart */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Sales Velocity (Units/Week)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesVelocityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="actual" fill="#16a34a" name="Actual Sales" />
                    <Bar dataKey="forecast" fill="#ca8a04" name="4-week Moving Avg" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Forecast Chart */}
            <div>
              <h4 className="text-lg font-semibold mb-4">
                Forecast: સ્વિગ મિત્ર કીશિ (32|Fine red rice flakes|Sivagu Rice Avul)
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="forecast" stroke="#2563eb" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Product Selection */}
          <div className="mt-6">
            <Label htmlFor="product-select">Select Product:</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select a product for analysis" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4">
            <Button>Export Analysis to CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};