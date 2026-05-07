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


