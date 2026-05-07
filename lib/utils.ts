import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function calculateDaysRemaining(deadline: string): number {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function calculateProfitability(
  fobPriceINR: number,
  exchangeRate: number = 1,
  uzbekVatPercent: number = 12,
  logisticsPercent: number = 2.5,
  registrationCostINR: number = 0,
  batchQuantity: number = 1
): {
  fobPriceUZS: number;
  uzbekVat: number;
  logistics: number;
  registrationAmortized: number;
  totalCostUZS: number;
  suggestedSellingPrice: number;
  netMargin: number;
  marginPercent: number;
} {
  const fobPriceUZS = fobPriceINR * exchangeRate;
  const uzbekVat = fobPriceUZS * (uzbekVatPercent / 100);
  const logistics = fobPriceUZS * (logisticsPercent / 100);
  const registrationAmortized = registrationCostINR * exchangeRate / batchQuantity;
  const totalCostUZS = fobPriceUZS + uzbekVat + logistics + registrationAmortized;
  const suggestedSellingPrice = totalCostUZS * 1.15;
  const netMargin = suggestedSellingPrice - totalCostUZS;
  const marginPercent = (netMargin / totalCostUZS) * 100;

  return {
    fobPriceUZS,
    uzbekVat,
    logistics,
    registrationAmortized,
    totalCostUZS,
    suggestedSellingPrice,
    netMargin,
    marginPercent,
  };
}

export function getStageColor(status: string): string {
  switch (status) {
    case 'completed':
      return 'text-emerald-600 bg-emerald-50';
    case 'in_progress':
      return 'text-amber-600 bg-amber-50';
    case 'rejected':
      return 'text-red-600 bg-red-50';
    case 'on_hold':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-slate-600 bg-slate-50';
  }
}

export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'active':
    case 'completed':
    case 'cleared':
    case 'delivered':
      return 'bg-emerald-100 text-emerald-700';
    case 'in_progress':
    case 'in_transit':
      return 'bg-blue-100 text-blue-700';
    case 'pending':
    case 'draft':
      return 'bg-slate-100 text-slate-700';
    case 'rejected':
    case 'temperature_alert':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

