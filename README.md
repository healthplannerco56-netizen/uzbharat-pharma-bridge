# uzbharat-pharma-bridge

uzbharat-pharma-bridge/
├── app/
│   ├── dashboard/page.tsx          (main dashboard)
│   ├── compliance/                 (registration pipeline)
│   ├── logistics/                  (serialization, customs, cold-chain)
│   ├── market/                     (tenders, profitability)
│   └── documents/                  (document vault)
├── components/
│   ├── layout/                     (Sidebar, AppShell)
│   ├── compliance/                 (RegistrationPipeline, IPScanner, RegistrationForm)
│   ├── logistics/                  (SerializationTracker, CustomsPreClearance, ColdChainMap)
│   └── market/                     (TenderFeed, ProfitabilityCalculator)
├── supabase/schema.sql             (full database schema)
├── types/index.ts                  (TypeScript types)
└── lib/utils.ts, lib/supabase.ts   (helpers)
