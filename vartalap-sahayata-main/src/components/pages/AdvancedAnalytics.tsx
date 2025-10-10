import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChurnedCustomer, SalesAnomaly, ExpenseAnomaly } from '@/types';

const mockChurnedCustomers: ChurnedCustomer[] = [
  // Empty as shown in screenshot
];

const mockSalesAnomalies: SalesAnomaly[] = [
  // Empty as shown in screenshot
];

const mockExpenseAnomalies: ExpenseAnomaly[] = [
  // Empty as shown in screenshot
];

export const AdvancedAnalytics: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-09-10');
  const [endDate, setEndDate] = useState('2025-09-10');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const refreshData = () => {
    alert('Analytics data refreshed!');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Advanced Analytics Dashboard</h2>
      
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
            <Button onClick={refreshData}>Refresh</Button>
          </div>
        </CardContent>
      </Card>

      {/* Churned Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Churned Customers (No Purchase &gt; 60 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Customer Key</th>
                  <th>Recency (days)</th>
                  <th>Frequency</th>
                  <th>Monetary</th>
                </tr>
              </thead>
              <tbody>
                {mockChurnedCustomers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted-foreground py-8">
                      No churned customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Selection and Product Recommendations */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div>
              <Label htmlFor="select-customer">Select Customer:</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer1">Customer 1</SelectItem>
                  <SelectItem value="customer2">Customer 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Recommend Products</Label>
              <div className="text-sm text-muted-foreground">
                Select a customer to see product recommendations
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anomaly Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Anomalies */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Anomalies (Unusual Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Sales Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSalesAnomalies.length === 0 && (
                    <tr>
                      <td colSpan={2} className="text-center text-muted-foreground py-8">
                        No sales anomalies detected
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Expense Anomalies */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Anomalies (Unusual Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table w-full">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Expense Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mockExpenseAnomalies.length === 0 && (
                    <tr>
                      <td colSpan={2} className="text-center text-muted-foreground py-8">
                        No expense anomalies detected
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};