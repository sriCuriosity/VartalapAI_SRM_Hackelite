import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigation } from '@/components/Navigation';
import {
  BillGenerator,
  StatementGenerator,
  ProductMaster,
  DeleteBillRecord,
  InventoryIntelligence,
  CustomerProfitability,
  ExpenseTracking,
  BusinessOverview,
  SalesForecasting,
  AdvancedAnalytics
} from '@/components/pages';

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('bill-generator');

  const renderPage = () => {
    switch (activeTab) {
      case 'bill-generator':
        return <BillGenerator />;
      case 'statement-generator':
        return <StatementGenerator />;
      case 'product-master':
        return <ProductMaster />;
      case 'delete-bill':
        return <DeleteBillRecord />;
      case 'inventory-intelligence':
        return <InventoryIntelligence />;
      case 'customer-profitability':
        return <CustomerProfitability />;
      case 'expense-tracking':
        return <ExpenseTracking />;
      case 'product-analysis':
        return <BusinessOverview />; // Using BusinessOverview for product analysis
      case 'customer-behaviour':
        return <CustomerProfitability />; // Using CustomerProfitability for customer behaviour
      case 'business-overview':
        return <BusinessOverview />;
      case 'sales-forecast':
        return <SalesForecasting />;
      case 'advanced-analytics':
        return <AdvancedAnalytics />;
      default:
        return <BillGenerator />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen bg-background">
          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          <main>
            {renderPage()}
          </main>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
