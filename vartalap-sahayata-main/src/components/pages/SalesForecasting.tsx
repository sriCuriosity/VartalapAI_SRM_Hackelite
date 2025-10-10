import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const forecastData = [
  { date: '2025-08-15', actual: 0.1, forecast: 0.1, uncertainty: 0.05 },
  { date: '2025-08-22', actual: 0.4, forecast: 0.4, uncertainty: 0.1 },
  { date: '2025-09-01', actual: 1.0, forecast: 0.9, uncertainty: 0.15 },
  { date: '2025-09-08', actual: 1.2, forecast: 1.1, uncertainty: 0.2 },
  { date: '2025-09-15', actual: null, forecast: 1.3, uncertainty: 0.25 },
  { date: '2025-09-22', actual: null, forecast: 1.0, uncertainty: 0.3 },
  { date: '2025-09-29', actual: null, forecast: 0.4, uncertainty: 0.35 },
  { date: '2025-10-06', actual: null, forecast: 0.2, uncertainty: 0.4 },
  { date: '2025-10-13', actual: null, forecast: 1.4, uncertainty: 0.4 }
];

export const SalesForecasting: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-09-10');
  const [endDate, setEndDate] = useState('2025-09-10');
  const [forecastDays, setForecastDays] = useState('30');

  const runForecast = () => {
    alert('Sales forecast updated!');
  };

  const exportForecast = () => {
    alert('Forecast exported to CSV!');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Sales Forecasting Dashboard</h2>
      
      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
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
            <div>
              <Label htmlFor="forecast-days">Forecast Days:</Label>
              <Select value={forecastDays} onValueChange={setForecastDays}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                  <SelectItem value="60">60</SelectItem>
                  <SelectItem value="90">90</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={runForecast}>Run Forecast</Button>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Forecast (Prophet)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  label={{ value: 'Revenue', angle: -90, position: 'insideLeft' }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  labelFormatter={(value) => `Date: ${value}`}
                  formatter={(value, name) => [
                    `${(value as number).toFixed(2)}M`,
                    name === 'actual' ? 'Actual Sales' : name === 'forecast' ? 'Forecast' : 'Uncertainty'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#2563eb" 
                  strokeWidth={3}
                  name="Actual Sales"
                  connectNulls={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#ca8a04" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Forecast"
                />
                <Line 
                  type="monotone" 
                  dataKey="uncertainty" 
                  stroke="#dc2626" 
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  name="Uncertainty"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4">
            <Button onClick={exportForecast}>Export Forecast to CSV</Button>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Next 7 Days</h3>
            <p className="text-2xl font-bold text-chart-primary">₹1.2M</p>
            <p className="text-sm text-muted-foreground">Forecasted Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Next 30 Days</h3>
            <p className="text-2xl font-bold text-chart-success">₹4.8M</p>
            <p className="text-sm text-muted-foreground">Forecasted Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Confidence Level</h3>
            <p className="text-2xl font-bold text-chart-tertiary">78%</p>
            <p className="text-sm text-muted-foreground">Model Accuracy</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};