import { useState, useEffect } from 'react';
import { Customer, Product, Bill, Expense, AnalyticsData, CustomerDB, ProductDB, BillDB, ExpenseDB } from '@/types';
import { supabase } from '@/integrations/supabase/client';

export const useBusinessData = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Transform database types to frontend types
  const transformCustomer = (c: CustomerDB): Customer => ({
    id: c.id,
    name: c.name,
    totalRevenue: c.total_revenue,
    totalCost: c.total_cost,
    totalProfit: c.total_profit,
    profitMargin: c.profit_margin,
    billCount: c.bill_count,
    segment: c.segment as 'High Value' | 'Medium Value' | 'Low Value',
    lastPurchaseDate: c.last_purchase_date ? new Date(c.last_purchase_date) : null,
  });

  const transformProduct = (p: ProductDB): Product => ({
    id: p.id,
    name: p.name,
    costPrice: p.cost_price,
    sellingPrice: p.selling_price,
    stock: p.stock,
    reorderThreshold: p.reorder_threshold,
    leadTime: p.lead_time,
    category: p.category,
    status: p.status as 'In Stock' | 'Low Stock' | 'Out of Stock',
  });

  const transformBill = (b: any): Bill => ({
    id: b.id,
    billNumber: b.bill_number,
    customerId: b.customer_id || '',
    customerName: b.customers?.name || '',
    date: new Date(b.bill_date),
    items: (b.bill_items || []).map((item: any) => ({
      productId: item.product_id || '',
      productName: item.product_name,
      quantity: item.quantity,
      price: item.rate,
      total: item.amount,
    })),
    subtotal: b.subtotal,
    tax: b.tax_amount,
    total: b.total_amount,
    transactionType: 'Credit' as 'Debit' | 'Credit', // Default value
    remarks: '',
  });

  const transformExpense = (e: ExpenseDB): Expense => ({
    id: e.id,
    date: new Date(e.expense_date),
    amount: e.amount,
    category: e.category,
    description: e.description || '',
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load customers
        const { data: customersData } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });
        
        // Load products
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        // Load bills with items and customer info
        const { data: billsData } = await supabase
          .from('bills')
          .select(`
            *,
            bill_items (*),
            customers (name)
          `)
          .order('created_at', { ascending: false });
        
        // Load expenses
        const { data: expensesData } = await supabase
          .from('expenses')
          .select('*')
          .order('created_at', { ascending: false });

        // Transform data to match frontend interface requirements
        const transformedCustomers: Customer[] = (customersData || []).map(transformCustomer);
        const transformedProducts: Product[] = (productsData || []).map(transformProduct);
        const transformedBills: Bill[] = (billsData || []).map(transformBill);
        const transformedExpenses: Expense[] = (expensesData || []).map(transformExpense);

        // Mock analytics data for now - can be calculated from real data later
        const mockAnalytics: AnalyticsData = {
          revenue: [
            { date: '2025-08-09', value: 70000 },
            { date: '2025-08-13', value: 60000 },
            { date: '2025-08-17', value: 8000 }
          ],
          expenses: [],
          profit: [
            { date: '2025-08-09', value: 70000 },
            { date: '2025-08-13', value: 60000 },
            { date: '2025-08-17', value: 8000 }
          ],
          topProducts: [
            { name: 'சிவப்பு அரிசி கருப்பு உளுந்து', revenue: 60000 }
          ],
          salesByDay: [
            { day: 'Monday', amount: 10000 },
            { day: 'Tuesday', amount: 70000 },
            { day: 'Wednesday', amount: 15000 }
          ],
          customerSegments: [
            { segment: 'Other', percentage: 100.0 }
          ]
        };

        setCustomers(transformedCustomers);
        setProducts(transformedProducts);
        setBills(transformedBills);
        setExpenses(transformedExpenses);
        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Error loading business data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addCustomer = async (customer: Omit<Customer, 'id'>) => {
    // Transform frontend type to database type
    const customerData = {
      name: customer.name,
      total_revenue: customer.totalRevenue,
      total_cost: customer.totalCost,
      total_profit: customer.totalProfit,
      profit_margin: customer.profitMargin,
      bill_count: customer.billCount,
      segment: customer.segment,
      last_purchase_date: customer.lastPurchaseDate?.toISOString() || null,
    };
    
    const { data, error } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
      .single();
    
    if (!error && data) {
      const transformedCustomer = transformCustomer(data as CustomerDB);
      setCustomers(prev => [...prev, transformedCustomer]);
    }
    return { data, error };
  };

  const addProduct = async (product: Omit<Product, 'id'>) => {
    // Transform frontend type to database type
    const productData = {
      name: product.name,
      cost_price: product.costPrice,
      selling_price: product.sellingPrice,
      stock: product.stock,
      reorder_threshold: product.reorderThreshold,
      lead_time: product.leadTime,
      category: product.category,
      status: product.status,
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (!error && data) {
      const transformedProduct = transformProduct(data as ProductDB);
      setProducts(prev => [...prev, transformedProduct]);
    }
    return { data, error };
  };

  const addBill = async (bill: Omit<Bill, 'id' | 'billNumber'>) => {
    const billNumber = `B${Date.now()}`;
    // Transform frontend type to database type
    const billData = {
      bill_number: billNumber,
      customer_id: bill.customerId || null,
      bill_date: bill.date.toISOString().split('T')[0], // Convert to date string
      subtotal: bill.subtotal,
      tax_amount: bill.tax || 0,
      discount_amount: 0,
      total_amount: bill.total,
      status: 'Paid',
    };
    
    const { data: billResult, error: billError } = await supabase
      .from('bills')
      .insert([billData])
      .select()
      .single();
    
    if (billError || !billResult) {
      return { data: null, error: billError };
    }

    // Save bill items
    const billItemsData = bill.items.map(item => ({
      bill_id: billResult.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      rate: item.price,
      amount: item.total,
    }));

    const { error: itemsError } = await supabase
      .from('bill_items')
      .insert(billItemsData);

    if (itemsError) {
      // If items failed to save, delete the bill
      await supabase.from('bills').delete().eq('id', billResult.id);
      return { data: null, error: itemsError };
    }

    // Transform and add to state
    const transformedBill = transformBill(billResult as BillDB);
    transformedBill.billNumber = billNumber;
    transformedBill.customerName = bill.customerName;
    transformedBill.items = bill.items;
    transformedBill.transactionType = bill.transactionType;
    transformedBill.remarks = bill.remarks;
    
    setBills(prev => [...prev, transformedBill]);
    return { data: billResult, error: null };
  };

  const deleteBill = async (billId: string) => {
    // Delete bill items first (due to foreign key constraint)
    const { error: itemsError } = await supabase
      .from('bill_items')
      .delete()
      .eq('bill_id', billId);
    
    if (itemsError) {
      return { error: itemsError };
    }

    // Then delete the bill
    const { error } = await supabase
      .from('bills')
      .delete()
      .eq('id', billId);
    
    if (!error) {
      setBills(prev => prev.filter(bill => bill.id !== billId));
    }
    return { error };
  };

  return {
    customers,
    products,
    bills,
    expenses,
    analytics,
    loading,
    addCustomer,
    addProduct,
    addBill,
    deleteBill
  };
};