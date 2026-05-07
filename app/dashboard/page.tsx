'use client';

import AppShell from '@/components/layout/AppShell';
import { RegistrationPipeline } from '@/components/compliance/RegistrationPipeline';
import { RegistrationForm } from '@/components/compliance/RegistrationForm';
import { cn, getStatusBadgeColor } from '@/lib/utils';
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Package,
  Truck,
} from 'lucide-react';
import { PIPELINE_STAGES, Drug } from '@/types';

const mockDrugs: Drug[] = [
  { id: '1', manufacturer_id: 'm1', brand_name: 'CIPROZEN-500', generic_name: 'Ciprofloxacin', dosage_form: 'Tablet', strength: '500mg', status: 'active', registration_progress: 71 },
  { id: '2', manufacturer_id: 'm1', brand_name: 'METFORMAX', generic_name: 'Metformin', dosage_form: 'Tablet', strength: '1000mg', status: 'active', registration_progress: 42 },
  { id: '3', manufacturer_id: 'm2', brand_name: 'ATENSERA-20', generic_name: 'Atorvastatin', dosage_form: 'Tablet', strength: '20mg', status: 'draft', registration_progress: 14 },
];

const mockPipelineSteps = [
  { stage: 'dossier_submission' as const, label: 'Dossier Submission', status: 'completed' as const, completedAt: '2026-02-15' },
  { stage: 'moj_ip_expert_opinion' as const, label: 'MoJ IP Expert Opinion', status: 'in_progress' as const, deadline: '2026-04-01' },
  { stage: 'moh_lab_testing' as const, label: 'MoH Lab Testing', status: 'pending' as const },
  { stage: 'national_gmp_factory_audit' as const, label: 'National GMP Factory Audit', status: 'pending' as const },
  { stage: 'bioequivalence_review' as const, label: 'Bioequivalence Review', status: 'pending' as const },
  { stage: 'ar_appointment' as const, label: 'AR Appointment', status: 'pending' as const },
  { stage: 'final_license' as const, label: 'Final License', status: 'pending' as const },
];

const stats = [
  { label: 'Active Registrations', value: '12', icon: FileText, color: 'text-blue-600 bg-blue-50' },
  { label: 'Completed', value: '8', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'In Review', value: '4', icon: Clock, color: 'text-amber-600 bg-amber-50' },
  { label: 'Alerts', value: '2', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Compliance Dashboard</h1>
            <p className="text-sm text-slate-500">Monitor drug registration pipeline per Resolution No. 738</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-100 px-4 py-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">+23% YoY approvals</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
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
          <div className="col-span-2 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">Registration Pipeline - CIPROZEN-500</h2>
            <RegistrationPipeline steps={mockPipelineSteps} />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">Drug Portfolio</h3>
              <div className="space-y-3">
                {mockDrugs.map((drug) => (
                  <div key={drug.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                        <Package className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{drug.brand_name}</p>
                        <p className="text-xs text-slate-500">{drug.generic_name} {drug.strength}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', getStatusBadgeColor(drug.status))}>
                        {drug.status}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">{drug.registration_progress}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">Recent Shipments</h3>
              <div className="space-y-3">
                {[
                  { id: 'SH001', batch: 'CIPROZEN-500', status: 'in_transit', temp: 4.2 },
                  { id: 'SH002', batch: 'METFORMAX', status: 'at_customs', temp: 3.8 },
                ].map((shipment) => (
                  <div key={shipment.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                        <Truck className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{shipment.batch}</p>
                        <p className="text-xs text-slate-500">ID: {shipment.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', getStatusBadgeColor(shipment.status))}>
                        {shipment.status.replace('_', ' ')}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">{shipment.temp}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

