'use client';

import AppShell from '@/components/layout/AppShell';
import { SerializationTracker } from '@/components/logistics/SerializationTracker';
import { CustomsPreClearance } from '@/components/logistics/CustomsPreClearance';
import { ColdChainMap } from '@/components/logistics/ColdChainMap';
import { cn } from '@/lib/utils';
import { Package, Truck, FileCheck } from 'lucide-react';

const stats = [
  { label: 'Active Shipments', value: '8', icon: Truck, color: 'text-blue-600 bg-blue-50' },
  { label: 'Pending Clearance', value: '3', icon: FileCheck, color: 'text-amber-600 bg-amber-50' },
  { label: 'GS1 Codes', value: '15', icon: Package, color: 'text-emerald-600 bg-emerald-50' },
];

export default function LogisticsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Logistics Hub</h1>
            <p className="text-sm text-slate-500">Asl Belgisi serialization, customs clearance, and cold-chain tracking</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => {
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
          <SerializationTracker />
          <CustomsPreClearance />
          <ColdChainMap />
        </div>
      </div>
    </AppShell>
  );
}
