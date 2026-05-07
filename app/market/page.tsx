'use client';

import AppShell from '@/components/layout/AppShell';
import { TenderFeed } from '@/components/market/TenderFeed';
import { ProfitabilityCalculator } from '@/components/market/ProfitabilityCalculator';
import { cn } from '@/lib/utils';
import { TrendingUp, Eye, DollarSign, BarChart3 } from 'lucide-react';

const categories = [
  { name: 'Antibiotics', value: 35, growth: '+12%' },
  { name: 'Cardiovascular', value: 28, growth: '+8%' },
  { name: 'Oncology', value: 18, growth: '+15%' },
  { name: 'Antidiabetic', value: 12, growth: '+5%' },
  { name: 'Others', value: 7, growth: '+3%' },
];

const marketStats = [
  { label: 'Active Tenders', value: '24', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Total Value', value: '₹45.2 Cr', icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
  { label: 'Win Rate', value: '68%', icon: BarChart3, color: 'text-purple-600 bg-purple-50' },
];

export default function MarketPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Market Intelligence</h1>
            <p className="text-sm text-slate-500">Procurement tenders and profitability analysis</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">+15% market growth this quarter</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {marketStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-lg border bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', stat.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <TenderFeed />
            
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-900">Category Distribution</h3>
              <div className="space-y-4">
                {categories.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-slate-600">{cat.name}</span>
                    <div className="flex-1 rounded-full bg-slate-100">
                      <div
                        className="rounded-full bg-emerald-500 py-2 text-center text-xs font-medium text-white"
                        style={{ width: `${cat.value}%` }}
                      >
                        {cat.value}%
                      </div>
                    </div>
                    <span className="text-sm font-medium text-emerald-600">{cat.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProfitabilityCalculator />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
