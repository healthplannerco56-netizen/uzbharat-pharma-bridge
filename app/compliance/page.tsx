'use client';

import AppShell from '@/components/layout/AppShell';
import { RegistrationForm } from '@/components/compliance/RegistrationForm';
import { RegistrationPipeline } from '@/components/compliance/RegistrationPipeline';
import { cn, getStatusBadgeColor } from '@/lib/utils';
import { Plus, Filter, Download, Eye } from 'lucide-react';

const registrations = [
  { id: 'REG001', drug: 'CIPROZEN-500', stage: 2, status: 'in_progress', deadline: '2026-04-01', ar: 'Tashkent Pharma LLC' },
  { id: 'REG002', drug: 'METFORMAX-1000', stage: 4, status: 'pending', deadline: '2026-05-15', ar: 'Uzb Healthcare Co.' },
  { id: 'REG003', drug: 'ATENSERA-20', stage: 1, status: 'pending', deadline: '2026-06-01', ar: 'Pending' },
  { id: 'REG004', drug: 'OMEDAC-20', stage: 7, status: 'completed', deadline: '2026-02-28', ar: 'Tashkent Pharma LLC' },
];

const pipelineSteps = [
  { stage: 'dossier_submission' as const, label: 'Dossier Submission', status: 'completed' as const },
  { stage: 'moj_ip_expert_opinion' as const, label: 'MoJ IP Expert Opinion', status: 'in_progress' as const },
  { stage: 'moh_lab_testing' as const, label: 'MoH Lab Testing', status: 'pending' as const },
  { stage: 'national_gmp_factory_audit' as const, label: 'National GMP Factory Audit', status: 'pending' as const },
  { stage: 'bioequivalence_review' as const, label: 'Bioequivalence Review', status: 'pending' as const },
  { stage: 'ar_appointment' as const, label: 'AR Appointment', status: 'pending' as const },
  { stage: 'final_license' as const, label: 'Final License', status: 'pending' as const },
];

export default function CompliancePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Compliance Management</h1>
            <p className="text-sm text-slate-500">7-Stage Registration Pipeline based on Resolution No. 738</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Download className="h-4 w-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              <Plus className="h-4 w-4" />
              New Registration
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="font-semibold text-slate-900">Active Registrations</h2>
                <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
              <div className="divide-y">
                {registrations.map((reg) => (
                  <div key={reg.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                        <span className="text-sm font-bold text-slate-600">{reg.stage}/7</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{reg.drug}</p>
                        <p className="text-sm text-slate-500">ID: {reg.id} • AR: {reg.ar}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={cn('rounded-full px-2.5 py-1 text-xs font-medium', getStatusBadgeColor(reg.status))}>
                          {reg.status.replace('_', ' ')}
                        </span>
                        <p className="mt-1 text-xs text-slate-500">Deadline: {reg.deadline}</p>
                      </div>
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">Pipeline Overview</h3>
              <RegistrationPipeline steps={pipelineSteps} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
UzBharat Pharma-Bridge
SaaS MVP for Indian pharmaceutical exporters and Uzbek Authorized Representatives

## Tech Stack
- Frontend: Next.js 14 (App Router) + Tailwind CSS + Lucide Icons
- Backend: Supabase (Auth, PostgreSQL, Real-time)
- Design: Slate #0F172A / Emerald #10B981

## App Structure
```
app/
  dashboard/      - Main compliance dashboard
  compliance/     - Registration pipeline (7 stages)
  logistics/      - Serialization, customs, cold-chain
  market/         - Tenders, profitability calculator
  documents/      - Document vault
  auth/           - Auth pages
components/
  layout/         - Sidebar, AppShell
  compliance/     - RegistrationPipeline, IPScanner, RegistrationForm
  logistics/      - SerializationTracker, CustomsPreClearance, ColdChainMap
  market/         - TenderFeed, ProfitabilityCalculator
lib/
  utils.ts        - Helper functions
  supabase.ts     - Supabase client
types/
  index.ts        - TypeScript types
supabase/
  schema.sql      - Complete database schema
```

## Key Features
1. 7-Stage Registration Pipeline (Resolution No. 738)
2. MoJ IP Scanner for trademark conflict detection
3. GS1 DataMatrix serialization (xTrace API)
4. 20% customs discount eligibility tracker
5. Cold-chain logistics map (Mumbai/Delhi → Tashkent)
6. Farma.xarid.uz tender feed
7. Profitability calculator with VAT, logistics, amortized costs

## Setup
```bash
npm install
npm run dev
```

## Supabase Setup
1. Create Supabase project
2. Run supabase/schema.sql
3. Copy .env.local.example to .env.local
4. Add your Supabase credentials
