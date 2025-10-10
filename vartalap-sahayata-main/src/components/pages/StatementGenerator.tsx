import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBusinessData } from '@/hooks/useBusinessData';

export const StatementGenerator: React.FC = () => {
  const { customers } = useBusinessData();
  const [startDate, setStartDate] = useState('2025-09-10');
  const [endDate, setEndDate] = useState('2025-09-10');
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const generateStatement = () => {
    if (!selectedCustomer) {
      alert('Please select a customer first!');
      return;
    }
    
    if (selectedCustomer === 'all') {
      // Generate statement logic for all customers here
      alert(`Statement generated for all customers from ${startDate} to ${endDate}!`);
      return;
    }
    
    const customer = customers.find(c => c.id === selectedCustomer);
    if (!customer) return;

    // Generate statement logic here
    alert(`Statement generated for ${customer.name} from ${startDate} to ${endDate}!`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Statement Generator</h2>
      
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date:</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date:</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* Customer Selection */}
          <div>
            <Label htmlFor="customer">Customer:</Label>
            <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Select Customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Customers</SelectItem>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <div className="text-center pt-4">
            <Button 
              onClick={generateStatement}
              className="w-full md:w-auto px-8 py-3"
              size="lg"
            >
              Generate Statement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statement Preview Area */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Statement Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-12">
            <p>Select a date range and customer, then click "Generate Statement" to preview the statement here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};