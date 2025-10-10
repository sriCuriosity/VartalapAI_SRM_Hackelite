import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useBusinessData } from '@/hooks/useBusinessData';

const revenueExpenseData = [
  { date: '2025-08-09', Revenue: 70000, Expenses: 0, Profit: 70000 },
  { date: '2025-08-13', Revenue: 60000, Expenses: 0, Profit: 60000 },
  { date: '2025-08-17', Revenue: 8000, Expenses: 0, Profit: 8000 },
  { date: '2025-08-21', Revenue: 0, Expenses: 0, Profit: 0 },
  { date: '2025-08-25', Revenue: 0, Expenses: 0, Profit: 0 },
  { date: '2025-09-01', Revenue: 0, Expenses: 0, Profit: 0 },
  { date: '2025-09-05', Revenue: 0, Expenses: 0, Profit: 0 },
  { date: '2025-09-09', Revenue: 8000, Expenses: 0, Profit: 8000 }
];

const mockExpenses = [
  // Empty for now as shown in screenshot
];

export const ExpenseTracking: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-09-10');
  const [endDate, setEndDate] = useState('2025-09-10');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  const totalRevenue = 82131.00;
  const totalExpenses = 0.00;
  const netProfit = 82131.00;

  const addExpense = () => {
    if (!expenseAmount || !expenseCategory) return;
    // Add expense logic here
    alert('Expense added successfully!');
    setExpenseAmount('');
    setExpenseCategory('');
    setExpenseDescription('');
  };

  const exportToCsv = () => {
    alert('Expenses exported to CSV!');
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Expense Tracking & Profit/Loss Dashboard</h2>
      
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
            <h3 className="text-sm text-muted-foreground">Total Revenue</h3>
            <p className="text-2xl font-bold text-chart-success">₹{totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Total Expenses</h3>
            <p className="text-2xl font-bold text-chart-danger">₹{totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-sm text-muted-foreground">Net Profit</h3>
            <p className="text-2xl font-bold text-chart-primary">₹{netProfit.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue, Expenses, Profit Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue, Expenses, Profit Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Revenue" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="Expenses" stroke="#dc2626" strokeWidth={2} />
                  <Line type="monotone" dataKey="Profit" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown (Empty as per screenshot) */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">No expenses</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {mockExpenses.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted-foreground py-8">
                      No expenses recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 mt-4">
            <Button onClick={addExpense}>Add Expense</Button>
            <Button variant="outline" onClick={exportToCsv}>Export Expenses to CSV</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};