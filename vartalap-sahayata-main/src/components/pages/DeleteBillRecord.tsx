import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBusinessData } from '@/hooks/useBusinessData';

export const DeleteBillRecord: React.FC = () => {
  const { bills, deleteBill } = useBusinessData();
  const [selectedBillId, setSelectedBillId] = useState('');
  const [selectedBill, setSelectedBill] = useState<any>(null);

  const selectBill = () => {
    const bill = bills.find(b => b.id === selectedBillId);
    if (bill) {
      setSelectedBill(bill);
    }
  };

  const handleDeleteBill = async () => {
    if (!selectedBill) return;
    
    if (window.confirm(`Are you sure you want to delete bill ${selectedBill.billNumber}?`)) {
      const { error } = await deleteBill(selectedBill.id);
      if (!error) {
        alert(`Bill ${selectedBill.billNumber} has been deleted successfully!`);
        setSelectedBill(null);
        setSelectedBillId('');
      } else {
        alert('Error deleting bill. Please try again.');
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Delete Bill Record</h2>
      
      {/* Bill Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div>
              <Label htmlFor="bill-number">Select Bill Number:</Label>
              <Select value={selectedBillId} onValueChange={setSelectedBillId}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select a bill" />
                </SelectTrigger>
                <SelectContent>
                  {bills.map((bill) => (
                    <SelectItem key={bill.id} value={bill.id}>
                      {bill.billNumber} - {bill.customerName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={selectBill} disabled={!selectedBillId}>Load Bill</Button>
          </div>
        </CardContent>
      </Card>

      {selectedBill && (
        <>
          {/* Bill Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bill Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Bill Number:</Label>
                  <div className="font-medium">{selectedBill.billNumber}</div>
                </div>
                <div>
                  <Label>Customer:</Label>
                  <div className="font-medium">{selectedBill.customerName}</div>
                </div>
                <div>
                  <Label>Date:</Label>
                  <div className="font-medium">{selectedBill.date.toLocaleDateString()}</div>
                </div>
                <div>
                  <Label>Amount:</Label>
                  <div className="font-medium">₹{selectedBill.total.toLocaleString()}</div>
                </div>
                <div>
                  <Label>Transaction Type:</Label>
                  <div className="font-medium">{selectedBill.transactionType}</div>
                </div>
                <div>
                  <Label>Remarks:</Label>
                  <div className="font-medium">{selectedBill.remarks || 'None'}</div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-3xl font-bold">₹{selectedBill.total.toLocaleString()}</p>
                  <p className="text-muted-foreground">Total Amount</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Items Table */}
          <Card>
            <CardHeader>
              <CardTitle>Bill Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="data-table w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.items.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.productName}</td>
                        <td>{item.quantity.toFixed(2)}</td>
                        <td>₹{item.price.toFixed(2)}</td>
                        <td>₹{item.total.toFixed(2)}</td>
                        <td>-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Delete Button */}
          <div className="text-center">
            <Button 
              variant="destructive" 
              onClick={handleDeleteBill}
              className="px-8 py-3"
              size="lg"
            >
              Delete Bill
            </Button>
          </div>
        </>
      )}
    </div>
  );
};