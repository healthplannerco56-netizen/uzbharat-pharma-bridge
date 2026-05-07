'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import { cn, formatDate } from '@/lib/utils';
import { FileText, Folder, Upload, Download, Search, Filter, MoreVertical } from 'lucide-react';

const documents = [
  { id: '1', name: 'CIPROZEN-500 Dossier.pdf', type: 'dossier', date: '2026-03-15', size: '2.4 MB', status: 'verified' },
  { id: '2', name: 'GMP Certificate - Sun Pharma.pdf', type: 'certificate', date: '2026-02-20', size: '1.8 MB', status: 'verified' },
  { id: '3', name: 'MoJ IP Report - CIPROZEN.pdf', type: 'report', date: '2026-04-01', size: '950 KB', status: 'pending' },
  { id: '4', name: 'Lab Testing Results.pdf', type: 'report', date: '2026-03-28', size: '1.2 MB', status: 'verified' },
  { id: '5', name: 'AR Appointment Letter.pdf', type: 'contract', date: '2026-01-15', size: '540 KB', status: 'verified' },
];

const folders = [
  { name: 'Dossiers', count: 8 },
  { name: 'Certificates', count: 12 },
  { name: 'Reports', count: 15 },
  { name: 'Contracts', count: 5 },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Document Vault</h1>
            <p className="text-sm text-slate-500">Centralized storage for all regulatory and compliance documents</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            <Upload className="h-4 w-4" />
            Upload Document
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1 space-y-4">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Folders</h3>
              <div className="space-y-2">
                {folders.map((folder) => (
                  <button
                    key={folder.name}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{folder.name}</span>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{folder.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="mb-4 flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>

            <div className="rounded-lg border bg-white shadow-sm">
              <div className="border-b px-6 py-4">
                <h3 className="font-semibold text-slate-900">All Documents ({documents.length})</h3>
              </div>
              <div className="divide-y">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                        <FileText className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{doc.name}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{formatDate(doc.date)}</span>
                          <span>•</span>
                          <span className={cn(
                            'rounded-full px-2 py-0.5 font-medium',
                            doc.status === 'verified' && 'bg-emerald-100 text-emerald-700',
                            doc.status === 'pending' && 'bg-amber-100 text-amber-700'
                          )}>
                            {doc.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
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
