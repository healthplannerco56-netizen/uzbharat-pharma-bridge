-- UzBharat Pharma-Bridge Database Schema
-- Based on Feb 2026 Resolution No. 738

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Manufacturers (Indian Pharma Companies)
CREATE TABLE manufacturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    short_code VARCHAR(20) UNIQUE NOT NULL,
    license_number VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(50) DEFAULT 'India',
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drugs/Products Registry
CREATE TABLE drugs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    manufacturer_id UUID REFERENCES manufacturers(id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    generic_name VARCHAR(255),
    dosage_form VARCHAR(100),
    strength VARCHAR(100),
    registration_number VARCHAR(100),
    local_trademark VARCHAR(255),
    drug_class VARCHAR(100),
    therapeutic_category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7-Stage Registration Pipeline (based on Resolution No. 738)
CREATE TYPE pipeline_stage AS ENUM (
    'dossier_submission',
    'moj_ip_expert_opinion',
    'moh_lab_testing',
    'national_gmp_factory_audit',
    'bioequivalence_review',
    'ar_appointment',
    'final_license'
);

CREATE TYPE stage_status AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'rejected',
    'on_hold'
);

CREATE TABLE registration_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drug_id UUID REFERENCES drugs(id) ON DELETE CASCADE,
    stage pipeline_stage NOT NULL,
    status stage_status DEFAULT 'pending',
    assigned_to VARCHAR(255),
    documents_submitted JSONB DEFAULT '[]',
    notes TEXT,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(drug_id, stage)
);

-- Batch/Serialization Management (xTrace API integration)
CREATE TABLE batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drug_id UUID REFERENCES drugs(id) ON DELETE CASCADE,
    batch_number VARCHAR(100) NOT NULL,
    gs1_datamatrix_code VARCHAR(500),
    manufacturing_date DATE,
    expiry_date DATE,
    quantity INTEGER,
    unit VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    xtrace_request_id VARCHAR(255),
    xtrace_response JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Uzbek Authorized Representatives (AR)
CREATE TABLE authorized_representatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    license_number VARCHAR(100),
    address TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    regions_covered TEXT[],
    appointment_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Drug-AR Relationship
CREATE TABLE drug_ar_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drug_id UUID REFERENCES drugs(id) ON DELETE CASCADE,
    ar_id UUID REFERENCES authorized_representatives(id),
    assigned_date DATE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customs Pre-Clearance Documents
CREATE TABLE customs_declarations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drug_id UUID REFERENCES drugs(id),
    batch_id UUID REFERENCES batches(id),
    declaration_number VARCHAR(100),
    destination_country VARCHAR(50) DEFAULT 'Uzbekistan',
    port_of_entry VARCHAR(100),
    hs_code VARCHAR(20),
    declared_value DECIMAL(15,2),
    customs_discount_eligible BOOLEAN DEFAULT false,
    discount_percentage DECIMAL(5,2),
    status VARCHAR(50) DEFAULT 'draft',
    document_urls JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cold Chain Shipments
CREATE TYPE shipment_status AS ENUM (
    'pending',
    'in_transit',
    'at_customs',
    'cleared',
    'delivered',
    'temperature_alert'
);

CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    batch_id UUID REFERENCES batches(id),
    origin_city VARCHAR(100),
    destination_city VARCHAR(100),
    origin_country VARCHAR(50) DEFAULT 'India',
    destination_country VARCHAR(50) DEFAULT 'Uzbekistan',
    carrier VARCHAR(255),
    tracking_number VARCHAR(255),
    temperature_range VARCHAR(50),
    current_temperature DECIMAL(5,2),
    status shipment_status DEFAULT 'pending',
    departure_date TIMESTAMP,
    estimated_arrival TIMESTAMP,
    actual_arrival TIMESTAMP,
    route_points JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Procurement Tenders (Farma.xarid.uz)
CREATE TABLE tenders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tender_number VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(500),
    description TEXT,
    drug_category VARCHAR(100),
    quantity INTEGER,
    unit VARCHAR(50),
    estimated_value DECIMAL(15,2),
    currency VARCHAR(10) DEFAULT 'UZS',
    deadline TIMESTAMPTZ,
    publication_date TIMESTAMPTZ,
    procuring_entity VARCHAR(255),
    contact_info TEXT,
    status VARCHAR(50) DEFAULT 'active',
    source_url VARCHAR(500),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trademark Scans (MoJ IP Scanner)
CREATE TABLE trademark_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    drug_name VARCHAR(255),
    packaging_text TEXT,
    scan_date TIMESTAMPTZ DEFAULT NOW(),
    conflicts_found JSONB DEFAULT '[]',
    overall_risk VARCHAR(50),
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users/Accounts
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'manufacturer',
    company_id UUID,
    company_type VARCHAR(50),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_manufacturers_updated_at BEFORE UPDATE ON manufacturers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_drugs_updated_at BEFORE UPDATE ON drugs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_registration_milestones_updated_at BEFORE UPDATE ON registration_milestones
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_batches_updated_at BEFORE UPDATE ON batches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_shipments_updated_at BEFORE UPDATE ON shipments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tr_customs_declarations_updated_at BEFORE UPDATE ON customs_declarations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Calculate registration progress
CREATE OR REPLACE FUNCTION calculate_registration_progress(drug_uuid UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    total_stages INTEGER;
    completed_stages INTEGER;
BEGIN
    SELECT COUNT(*) INTO total_stages FROM registration_milestones WHERE drug_id = drug_uuid;
    SELECT COUNT(*) INTO completed_stages FROM registration_milestones 
        WHERE drug_id = drug_uuid AND status = 'completed';
    
    IF total_stages = 0 THEN RETURN 0; END IF;
    RETURN (completed_stages::DECIMAL / total_stages::DECIMAL) * 100;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE drugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE registration_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE customs_declarations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only see their company's data
CREATE POLICY "Users see own company data" ON manufacturers
    FOR ALL USING (true);

CREATE POLICY "Users see own company drugs" ON drugs
    FOR ALL USING (true);

CREATE POLICY "Users manage own milestones" ON registration_milestones
    FOR ALL USING (true);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_drugs_manufacturer ON drugs(manufacturer_id);
CREATE INDEX idx_drugs_status ON drugs(status);
CREATE INDEX idx_milestones_drug ON registration_milestones(drug_id);
CREATE INDEX idx_milestones_stage ON registration_milestones(stage);
CREATE INDEX idx_milestones_status ON registration_milestones(status);
CREATE INDEX idx_batches_drug ON batches(drug_id);
CREATE INDEX idx_batches_status ON batches(status);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_tenders_deadline ON tenders(deadline);
CREATE INDEX idx_tenders_category ON tenders(drug_category);
CREATE INDEX idx_users_email ON users(email);
