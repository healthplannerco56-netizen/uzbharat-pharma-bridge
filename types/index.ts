export type PipelineStage = 
  | 'dossier_submission'
  | 'moj_ip_expert_opinion'
  | 'moh_lab_testing'
  | 'national_gmp_factory_audit'
  | 'bioequivalence_review'
  | 'ar_appointment'
  | 'final_license';

export type StageStatus = 'pending' | 'in_progress' | 'completed' | 'rejected' | 'on_hold';

export type ShipmentStatus = 'pending' | 'in_transit' | 'at_customs' | 'cleared' | 'delivered' | 'temperature_alert';

export interface Manufacturer {
  id: string;
  name: string;
  short_code: string;
  license_number?: string;
  city?: string;
  state?: string;
  is_verified: boolean;
}

export interface Drug {
  id: string;
  manufacturer_id: string;
  manufacturer?: Manufacturer;
  brand_name: string;
  generic_name?: string;
  dosage_form?: string;
  strength?: string;
  registration_number?: string;
  drug_class?: string;
  therapeutic_category?: string;
  status: string;
  registration_progress?: number;
}

export interface RegistrationMilestone {
  id: string;
  drug_id: string;
  stage: PipelineStage;
  status: StageStatus;
  assigned_to?: string;
  started_at?: string;
  completed_at?: string;
  deadline?: string;
}

export interface Batch {
  id: string;
  drug_id: string;
  batch_number: string;
  gs1_datamatrix_code?: string;
  manufacturing_date?: string;
  expiry_date?: string;
  quantity: number;
  status: string;
}

export interface Shipment {
  id: string;
  batch_id: string;
  origin_city: string;
  destination_city: string;
  carrier?: string;
  tracking_number?: string;
  temperature_range?: string;
  current_temperature?: number;
  status: ShipmentStatus;
  departure_date?: string;
  estimated_arrival?: string;
}

export interface Tender {
  id: string;
  tender_number: string;
  title: string;
  drug_category: string;
  quantity: number;
  unit: string;
  estimated_value: number;
  currency: string;
  deadline: string;
  procuring_entity: string;
  status: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  company_type?: string;
}

export interface TrademarkScan {
  drug_name: string;
  conflicts_found: Array<{ name: string; risk: string }>;
  overall_risk: 'low' | 'medium' | 'high';
}

export interface ProfitabilityCalc {
  fob_price_inr: number;
  uzbek_vat_percent: number;
  logistics_percent: number;
  registration_amortized: number;
  net_margin_uzs: number;
}

export const PIPELINE_STAGES: { key: PipelineStage; label: string; duration_days: number }[] = [
  { key: 'dossier_submission', label: 'Dossier Submission', duration_days: 30 },
  { key: 'moj_ip_expert_opinion', label: 'MoJ IP Expert Opinion', duration_days: 45 },
  { key: 'moh_lab_testing', label: 'MoH Lab Testing', duration_days: 60 },
  { key: 'national_gmp_factory_audit', label: 'National GMP Factory Audit', duration_days: 30 },
  { key: 'bioequivalence_review', label: 'Bioequivalence Review', duration_days: 45 },
  { key: 'ar_appointment', label: 'AR Appointment', duration_days: 14 },
  { key: 'final_license', label: 'Final License', duration_days: 21 },
];

