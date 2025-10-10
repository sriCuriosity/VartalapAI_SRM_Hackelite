import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Customer, Product, BillItem } from '@/types';
import { useBusinessData } from '@/hooks/useBusinessData';

export const BillGenerator: React.FC = () => {
  const { customers, products, addBill } = useBusinessData();
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [transactionType, setTransactionType] = useState<'Debit' | 'Credit'>('Debit');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [remarks, setRemarks] = useState('');
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('1.00');
  const [price, setPrice] = useState('0.00');

  const addItem = () => {
    if (!selectedProduct) return;
    
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem: BillItem = {
      productId: product.id,
      productName: product.name,
      quantity: parseFloat(quantity),
      price: parseFloat(price),
      total: parseFloat(quantity) * parseFloat(price)
    };

    setBillItems([...billItems, newItem]);
    setSelectedProduct('');
    setQuantity('1.00');
    setPrice('0.00');
  };

  const removeItem = (index: number) => {
    setBillItems(billItems.filter((_, i) => i !== index));
  };

  const total = billItems.reduce((sum, item) => sum + item.total, 0);

  const generateBill = async () => {
    if (!selectedCustomer || billItems.length === 0) return;

    const customer = customers.find(c => c.id === selectedCustomer);
    if (!customer) return;

    const { error } = await addBill({
      customerId: selectedCustomer,
      customerName: customer.name,
      date: new Date(date),
      items: billItems,
      subtotal: total,
      total: total,
      transactionType,
      remarks
    });

    if (!error) {
      // Reset form
      setBillItems([]);
      setRemarks('');
      alert('Bill generated successfully!');
    } else {
      alert('Error generating bill. Please try again.');
    }
  };

  const clearForm = () => {
    setBillItems([]);
    setSelectedProduct('');
    setQuantity('1.00');
    setPrice('0.00');
    setRemarks('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Bill Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bill Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date:</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date:</Label>
                <Input
                  id="end-date"
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="customer">Customer:</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="transaction-type">Transaction Type:</Label>
              <Select value={transactionType} onValueChange={(value: 'Debit' | 'Credit') => setTransactionType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Debit">Debit</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="remarks">Remarks:</Label>
              <Textarea
                id="remarks"
                placeholder="none"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Item Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Add Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="item-name">Item Name:</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity:</Label>
                <Input
                  id="quantity"
                  type="number"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="price">Price:</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={addItem} className="w-full">
              Add Item
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Items Table */}
      {billItems.length > 0 && (
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.productName}</td>
                      <td>{item.quantity.toFixed(2)}</td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>₹{item.total.toFixed(2)}</td>
                      <td>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <h3 className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</h3>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={clearForm}>
          Clear
        </Button>
        <Button onClick={generateBill} disabled={!selectedCustomer || billItems.length === 0}>
          Generate Bill
        </Button>
      </div>
    </div>
  );
};