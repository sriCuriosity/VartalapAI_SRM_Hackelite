-- Create customers table
CREATE TABLE public.customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    total_cost DECIMAL(12,2) DEFAULT 0,
    total_profit DECIMAL(12,2) DEFAULT 0,
    profit_margin DECIMAL(5,2) DEFAULT 0,
    bill_count INTEGER DEFAULT 0,
    segment TEXT DEFAULT 'Other',
    last_purchase_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table  
CREATE TABLE public.products (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    cost_price DECIMAL(10,2) DEFAULT 0,
    selling_price DECIMAL(10,2) DEFAULT 0,
    stock INTEGER DEFAULT 0,
    reorder_threshold INTEGER DEFAULT 0,
    lead_time INTEGER DEFAULT 0,
    category TEXT DEFAULT 'Uncategorized',
    status TEXT DEFAULT 'In Stock',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bills table
CREATE TABLE public.bills (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    bill_number TEXT NOT NULL UNIQUE,
    customer_id UUID REFERENCES public.customers(id),
    bill_date DATE NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    discount_amount DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL,
    status TEXT DEFAULT 'Paid',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bill_items table
CREATE TABLE public.bill_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    bill_id UUID NOT NULL REFERENCES public.bills(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id),
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expenses table
CREATE TABLE public.expenses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (allow public access for now since no auth)
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (no authentication required)
CREATE POLICY "Public access for customers" ON public.customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access for products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access for bills" ON public.bills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access for bill_items" ON public.bill_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public access for expenses" ON public.expenses FOR ALL USING (true) WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON public.customers
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bills_updated_at
    BEFORE UPDATE ON public.bills
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expenses_updated_at
    BEFORE UPDATE ON public.expenses
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.customers (name, total_revenue, total_cost, total_profit, profit_margin, bill_count, segment, last_purchase_date) VALUES
('NANGANALLUR Grains & Grocery Shop', 39450.00, 0, 39450.00, 100.0, 2, 'High Value', '2025-09-10'),
('ADAMBAKKAM ORGANIC SHOP', 42681.00, 0, 42681.00, 100.0, 2, 'High Value', '2025-09-10');

INSERT INTO public.products (name, cost_price, selling_price, stock, category, status) VALUES
('சிவப்பு அரிசி கருப்பு உளுந்து (23 Fine red rice flakes)', 0, 50.0, 0, 'Grains', 'Out of Stock'),
('உரிட் டல் பொரிச் ரை மாவு (45 Urad dal porridge flour)', 0, 40.0, 0, 'Flour', 'Out of Stock');

INSERT INTO public.expenses (category, amount, description, expense_date) VALUES
('Transportation', 500.00, 'Delivery charges', '2025-09-10'),
('Utilities', 1200.00, 'Electricity bill', '2025-09-09');