// VartalapAI Business Management System Types

// Database types (matching Supabase schema)
export interface CustomerDB {
  id: string;
  name: string;
  total_revenue: number;
  total_cost: number;
  total_profit: number;
  profit_margin: number;
  bill_count: number;
  segment: string;
  last_purchase_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductDB {
  id: string;
  name: string;
  cost_price: number;
  selling_price: number;
  stock: number;
  reorder_threshold: number;
  lead_time: number;
  category: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BillDB {
  id: string;
  bill_number: string;
  customer_id: string | null;
  bill_date: string;
  subtotal: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface BillItemDB {
  id: string;
  bill_id: string;
  product_id: string | null;
  product_name: string;
  quantity: number;
  rate: number;
  amount: number;
  created_at: string;
}

export interface ExpenseDB {
  id: string;
  category: string;
  amount: number;
  description: string | null;
  expense_date: string;
  created_at: string;
  updated_at: string;
}

// Frontend types (for UI components)
export interface Customer {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
  profitMargin: number;
  billCount: number;
  segment: 'High Value' | 'Medium Value' | 'Low Value';
  lastPurchaseDate: Date | null;
}

export interface Product {
  id: string;
  name: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  reorderThreshold: number;
  leadTime: number;
  category: string;
  supplier?: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export interface BillItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Bill {
  id: string;
  billNumber: string;
  customerId: string;
  customerName: string;
  date: Date;
  items: BillItem[];
  subtotal: number;
  tax?: number;
  total: number;
  transactionType: 'Debit' | 'Credit';
  remarks?: string;
}

export interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
}

export interface AnalyticsData {
  revenue: { date: string; value: number }[];
  expenses: { date: string; value: number }[];
  profit: { date: string; value: number }[];
  topProducts: { name: string; revenue: number }[];
  salesByDay: { day: string; amount: number }[];
  customerSegments: { segment: string; percentage: number }[];
}

export interface ChurnedCustomer {
  customerKey: string;
  recency: number;
  frequency: number;
  monetary: number;
}

export interface SalesAnomaly {
  date: string;
  salesAmount: number;
}

export interface ExpenseAnomaly {
  date: string;
  expenseAmount: number;
}

export interface SalesVelocityData {
  week: string;
  actual: number;
  forecast: number;
  uncertainty?: number;
}

export interface SalesForecast {
  date: string;
  actual?: number;
  forecast: number;
  uncertainty?: number;
}