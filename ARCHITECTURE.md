# GoalSync AI - System Architecture

This diagram illustrates the high-level architecture and technology choices for GoalSync AI. We have prioritized a highly scalable, serverless-ready architecture optimized for low-latency web interactions and seamless organizational scalability.

```mermaid
graph TD
    %% User Interfaces
    subgraph "Frontend Layer (Next.js & React)"
        UI_EMP["Employee Dashboard"]
        UI_MGR["Manager (L1) Approvals"]
        UI_ADM["Admin & HR Analytics"]
    end

    %% Client State & Utilities
    subgraph "Client Logic & Design"
        TW["Tailwind CSS + Glassmorphism"]
        FM["Framer Motion Animations"]
        RC["Role Context / Switcher (Demo)"]
        
        UI_EMP --> TW
        UI_MGR --> TW
        UI_ADM --> TW
        UI_EMP --> FM
    end

    %% Edge / Backend
    subgraph "Backend Services (Next.js API Routes)"
        AUTH["NextAuth (JWT)"]
        ENTRA["Microsoft Entra ID (SSO)"]
        API_GOALS["Goal Management API"]
        ENG_ACHV["Achievement Tracking Engine"]
        ENG_SCHD["Schedule Rules Engine"]
        ENG_ESC["Escalation Engine (Bonus)"]
        NOTIF["Teams / Email Mocks (Bonus)"]
    end

    %% Database Layer
    subgraph "Data Persistence"
        PRISMA["Prisma ORM"]
        DB[(PostgreSQL Database)]
    end

    %% Connections
    RC --> AUTH
    AUTH --> ENTRA
    
    UI_EMP <--> API_GOALS
    UI_MGR <--> API_GOALS
    UI_ADM <--> API_GOALS
    
    API_GOALS --> ENG_ACHV
    API_GOALS --> ENG_SCHD
    API_GOALS --> ENG_ESC
    
    ENG_ESC --> NOTIF
    
    API_GOALS --> PRISMA
    AUTH --> PRISMA
    PRISMA --> DB
```

### Justification of Technology Stack & Hosting (Cost Optimisation)

1. **Next.js (App Router) + Vercel**: By using a unified full-stack framework, we eliminate the need to run and maintain a separate Node.js server. Next.js API routes run as serverless functions, meaning we only pay for exact compute time, heavily reducing idle hosting costs.
2. **PostgreSQL + Prisma**: PostgreSQL offers enterprise-grade relational integrity. Paired with Prisma ORM, we achieve type-safe database queries. A managed DB (e.g., Supabase) perfectly compliments this setup with a generous free tier for scaling up to the first 10,000 employees.
3. **Microsoft Entra ID**: Leveraging NextAuth with Azure AD provides Fortune 500-level security (SSO, MFA) without the overhead of building a custom identity provider.
4. **Tailwind CSS & Framer Motion**: Delivers a rich, "Glassmorphic" premium aesthetic with zero-configuration CSS bloat, guaranteeing extremely fast client-side rendering times.
