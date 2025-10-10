import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBusinessData } from '@/hooks/useBusinessData';
import { Product } from '@/types';

export const ProductMaster: React.FC = () => {
  const { products, addProduct } = useBusinessData();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    costPrice: 0,
    sellingPrice: 0,
    stock: 0,
    reorderThreshold: 0,
    leadTime: 0,
    category: 'Uncategorized'
  });

  const handleAddProduct = () => {
    if (!newProduct.name) return;

    const productToAdd: Omit<Product, 'id'> = {
      ...newProduct,
      status: newProduct.stock > 0 
        ? (newProduct.stock <= newProduct.reorderThreshold ? 'Low Stock' : 'In Stock')
        : 'Out of Stock'
    };

    addProduct(productToAdd);
    setNewProduct({
      name: '',
      costPrice: 0,
      sellingPrice: 0,
      stock: 0,
      reorderThreshold: 0,
      leadTime: 0,
      category: 'Uncategorized'
    });
    setIsAddingProduct(false);
  };

  const getStatusBadge = (status: Product['status']) => {
    switch (status) {
      case 'In Stock':
        return <span className="status-high-value">In Stock</span>;
      case 'Low Stock':
        return <span className="status-low-stock">Low Stock</span>;
      case 'Out of Stock':
        return <span className="status-out-of-stock">Out of Stock</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Product Master List</h2>
          <Button onClick={() => window.open('https://huggingface.co/spaces/srinithilanr/Vartalap-Digital-Twin', '_blank')}>
            Inventory
          </Button>
        </div>
        <Button onClick={() => setIsAddingProduct(true)}>
          Add / Edit Product
        </Button>
      </div>

      {/* Product List Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Cost Price</th>
                  <th>Stock</th>
                  <th>Reorder Threshold</th>
                  <th>Lead Time (d)</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>₹{product.costPrice.toFixed(2)}</td>
                    <td>{product.stock}</td>
                    <td>{product.reorderThreshold}</td>
                    <td>{product.leadTime} days</td>
                    <td>{product.category}</td>
                    <td>{getStatusBadge(product.status)}</td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center text-muted-foreground py-8">
                      No products available. Add your first product to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      {isAddingProduct && (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Add / Edit Product</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-name">Name:</Label>
              <Input
                id="product-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Product name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cost-price">Cost Price:</Label>
                <Input
                  id="cost-price"
                  type="number"
                  step="0.01"
                  value={newProduct.costPrice}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, costPrice: parseFloat(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="selling-price">Selling Price:</Label>
                <Input
                  id="selling-price"
                  type="number"
                  step="0.01"
                  value={newProduct.sellingPrice}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, sellingPrice: parseFloat(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="stock-quantity">Stock Quantity:</Label>
                <Input
                  id="stock-quantity"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="reorder-threshold">Reorder Threshold:</Label>
                <Input
                  id="reorder-threshold"
                  type="number"
                  value={newProduct.reorderThreshold}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, reorderThreshold: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="lead-time">Supplier Lead Time (Days):</Label>
                <Input
                  id="lead-time"
                  type="number"
                  value={newProduct.leadTime}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, leadTime: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category:</Label>
              <Select 
                value={newProduct.category} 
                onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Uncategorized">Uncategorized</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Pulses">Pulses</SelectItem>
                  <SelectItem value="Spices">Spices</SelectItem>
                  <SelectItem value="Rice Products">Rice Products</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 justify-end">
              <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};