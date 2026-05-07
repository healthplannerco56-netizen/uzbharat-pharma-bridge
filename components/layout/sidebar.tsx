'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ShieldCheck,
  Truck,
  BarChart3,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/compliance', label: 'Compliance', icon: ShieldCheck },
  { href: '/logistics', label: 'Logistics', icon: Truck },
  { href: '/market', label: 'Market Trends', icon: BarChart3 },
  { href: '/documents', label: 'Document Vault', icon: FolderOpen },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-slate-900 text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        <div className={cn('flex items-center border-b border-slate-700 px-4 py-5', collapsed ? 'justify-center' : 'justify-between')}>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-emerald-400">UzBharat</h1>
              <p className="text-xs text-slate-400">Pharma-Bridge</p>
            </div>
          )}
          {collapsed && (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-lg font-bold text-white">
              UB
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors',
                  isActive
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-700">
          <div className={cn('flex items-center gap-3 px-4 py-3', collapsed ? 'justify-center' : '')}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700">
              <User className="h-4 w-4" />
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">Raj Kumar</p>
                <p className="text-xs text-slate-400">Manufacturer</p>
              </div>
            )}
          </div>
          <button
            className={cn(
              'flex w-full items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white',
              collapsed && 'justify-center'
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="text-sm">Sign Out</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-white shadow-lg"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </div>
    </aside>
  );
}
