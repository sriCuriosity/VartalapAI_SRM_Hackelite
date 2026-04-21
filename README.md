# VartalapAI — SRM Hackelite Project Suite

A monorepo containing three production-ready applications built for the SRM Hackelite hackathon. Each application targets a distinct business problem and demonstrates end-to-end software engineering across data science, logistics optimization, and business intelligence.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Demo / Screenshots](#demo--screenshots)
3. [Sub-Projects](#sub-projects)
   - [1. Data Quality Analyzer and Cleaner](#1-data-quality-analyzer-and-cleaner)
   - [2. VartalapAI Digital Twin](#2-vartalapai-digital-twin)
   - [3. Vartalap Sahayata](#3-vartalap-sahayata)
4. [Repository Structure](#repository-structure)
5. [Design Decisions / Architecture](#design-decisions--architecture)
6. [Challenges and Learnings](#challenges-and-learnings)
7. [Future Improvements](#future-improvements)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Author](#author)
11. [License](#license)

---

## Project Overview

| Application | Domain | Primary Tech |
|---|---|---|
| Data Quality Analyzer and Cleaner | Survey data analytics | React, TypeScript, Vite, Perplexity AI |
| VartalapAI Digital Twin | Logistics / supply chain | Python, Streamlit, py3dbp, Plotly |
| Vartalap Sahayata | Business intelligence | React, TypeScript, Supabase, shadcn/ui |

Each application is independently deployable and self-contained within its own sub-directory.

---

## Demo / Screenshots

> [Add screenshots or a screen recording link here]

- **Data Quality Analyzer:** [Add demo link or screenshot]
- **Digital Twin (Container Optimizer):** [Add demo link or screenshot]
- **Vartalap Sahayata (BI Dashboard):** [Add demo link or screenshot]

---

## Sub-Projects

---

### 1. Data Quality Analyzer and Cleaner

**Directory:** `Data-Quality-Analyzer-And-Cleaner-main/`

#### Description

A fully client-side data analysis and cleaning platform designed for survey datasets. All data processing occurs in the browser, ensuring complete data privacy without any server infrastructure. It integrates the Perplexity Sonar API to allow natural language exploration of uploaded datasets.

#### Features

- **Multi-format upload:** CSV, XLSX, and XLS support with drag-and-drop (up to 50 MB)
- **Advanced data profiling:** Column completeness, uniqueness, type inference, outlier detection (IQR and Z-score), correlation analysis, and overall quality scoring
- **Intelligent cleaning engine:** Missing value imputation (mean, median, mode, forward/backward fill), duplicate removal, outlier treatment (capping, winsorization), and text normalization
- **Schema mapping:** Visual drag-and-drop interface with auto-mapping suggestions and confidence scoring; supports JSON schema import/export
- **Survey weighting:** Design weights, post-stratification, and iterative raking with weight validation and normalization
- **Statistical estimation:** Weighted means, totals, and proportions with confidence intervals (90/95/99%), margin of error, design effect, and variance estimation (Taylor linearization, Bootstrap, Jackknife)
- **Rule-based validation:** Custom rule builder, skip-pattern validation, range checks, and format validation (email, phone, regex)
- **AI-powered exploration:** Natural language queries via Perplexity Sonar API with full dataset context
- **Reporting and export:** Quality dashboards, before/after comparisons, cleaning audit logs, and CSV/PDF/HTML export

#### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18, TypeScript 5.5, Vite 5.4 |
| Styling | Tailwind CSS 3.4 |
| Data parsing | Papa Parse 5.5 (CSV), XLSX 0.18 (Excel) |
| Statistics | D3 7.9, Lodash 4.17 |
| UI components | Lucide React, React Beautiful DnD, Recharts |
| Export | html2canvas, jsPDF |
| AI integration | Perplexity Sonar API |
| Linting | ESLint 9.9, TypeScript ESLint |

#### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Perplexity AI API key (required only for the AI chat feature)

#### Installation and Setup

```bash
# 1. Navigate to the project directory
cd Data-Quality-Analyzer-And-Cleaner-main

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp env.example .env
# Edit .env and set your Perplexity API key:
# VITE_PPLX_API_KEY=pplx-your_actual_api_key_here
# VITE_PPLX_MODEL=sonar   # or 'sonar-pro' for deeper reasoning

# 4. Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

#### Usage

1. Upload a CSV, XLSX, or XLS file using the drag-and-drop interface.
2. Review the automatically generated quality report and data profile.
3. Optionally map columns to a schema and apply survey weights.
4. Configure and apply cleaning rules; inspect before/after comparisons.
5. Use the AI chat panel to query the dataset in natural language.
6. Run statistical estimations and export the results.

---

### 2. VartalapAI Digital Twin

**Directory:** `VartalapAI-Digital-Twin-main/`

#### Description

A logistics optimization tool that solves the 3D bin-packing problem for container loading. Given a set of products and a target container, the application computes the most space-efficient loading arrangement and renders an interactive 3D visualization with a downloadable step-by-step loading plan.

#### Features

- **Configurable container dimensions:** Length, width, height, and maximum payload weight
- **CSV product list upload:** Accepts item name, dimensions, weight, and quantity per row
- **Dual solver strategies:**
  - `py3dbp` — constraint-based packer optimized for physical stability
  - Greedy heuristic — volume-sorted pivot-point placement for fast results
- **Key metrics dashboard:** Space utilization percentage, items placed, total weight, and unplaced item count
- **Interactive 3D visualization:** Plotly-rendered container view showing item placement
- **Step-by-step loading plan:** Ordered sequence with positions and dimensions, downloadable as CSV

#### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Python 3, Streamlit |
| Packing algorithm | py3dbp |
| Visualization | Plotly |
| Data handling | Pandas |

#### Prerequisites

- Python 3.8 or higher
- pip

#### Installation and Setup

```bash
# 1. Navigate to the project directory
cd VartalapAI-Digital-Twin-main

# 2. Install dependencies
pip install streamlit pandas py3dbp plotly

# 3. Start the application
streamlit run app.py
```

The application will open automatically in your default browser.

#### Usage

1. Set container dimensions and maximum payload in the sidebar.
2. Upload a CSV file with columns: `name`, `length`, `width`, `height`, `weight`, `quantity`.
3. Select a packing algorithm (`py3dbp` for stability, greedy for speed).
4. Click **Generate Loading Plan**.
5. Review the 3D visualization, loading sequence table, and any unplaced items.
6. Download the loading plan as a CSV for operational use.

A sample product file (`products_to_load.csv`) is included in the project directory.

---

### 3. Vartalap Sahayata

**Directory:** `vartalap-sahayata-main/`

#### Description

A full-stack business intelligence dashboard for small and medium enterprises. It provides integrated tools for billing, inventory tracking, expense management, customer analysis, and sales forecasting, backed by a Supabase (PostgreSQL) database.

#### Features

- **Bill and statement generation:** Create, manage, and export customer invoices and account statements
- **Product master management:** Maintain a catalogue of products with pricing and metadata
- **Inventory intelligence:** Track stock levels and receive inventory alerts
- **Expense tracking:** Categorize and monitor business expenditures over time
- **Customer profitability analysis:** Segment and rank customers by revenue contribution
- **Sales forecasting:** Trend-based predictions for future revenue planning
- **Business overview dashboard:** Consolidated KPI view across all modules
- **Advanced analytics:** Deep-dive reporting with interactive charts

#### Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18, TypeScript 5.8, Vite 5.4 |
| Styling | Tailwind CSS 3.4, tailwindcss-animate |
| UI components | shadcn/ui (Radix UI primitives), Lucide React, Recharts |
| Routing | React Router DOM 6 |
| Forms | React Hook Form, Zod |
| Data fetching | TanStack Query (React Query) 5 |
| Backend / database | Supabase (PostgreSQL, Auth, Storage) |
| Date handling | date-fns |

#### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Supabase project (free tier is sufficient)

#### Installation and Setup

```bash
# 1. Navigate to the project directory
cd vartalap-sahayata-main

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env   # or create .env manually
# Add the following variables:
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key

# 4. Apply database migrations
# Run the SQL files in supabase/migrations/ against your Supabase project
# via the Supabase dashboard SQL editor or the Supabase CLI

# 5. Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

#### Usage

1. Navigate to the dashboard for a business overview.
2. Use the **Bill Generator** to create customer invoices.
3. Manage products and monitor stock via **Product Master** and **Inventory Intelligence**.
4. Record and categorize costs in **Expense Tracking**.
5. Analyze revenue contribution per customer in **Customer Profitability**.
6. View trend-based revenue projections in **Sales Forecasting**.

---

## Repository Structure

```
VartalapAI_SRM_Hackelite/
├── Data-Quality-Analyzer-And-Cleaner-main/   # Survey data analysis platform (React/TS)
│   ├── src/
│   │   ├── components/                       # UI components (upload, profiler, cleaner, etc.)
│   │   ├── utils/                            # Core processing engines
│   │   │   ├── DataParser.ts
│   │   │   ├── DataProfiler.ts
│   │   │   ├── DataCleaner.ts
│   │   │   ├── SchemaMapper.ts
│   │   │   ├── SurveyEstimator.ts
│   │   │   └── SurveyValidator.ts
│   │   └── types/                            # Shared TypeScript types
│   ├── env.example
│   └── package.json
│
├── VartalapAI-Digital-Twin-main/             # Container loading optimizer (Python/Streamlit)
│   ├── app.py                                # Streamlit UI and application entry point
│   ├── solver.py                             # py3dbp and greedy heuristic solvers
│   ├── visualizer.py                         # Plotly 3D rendering
│   └── products_to_load.csv                  # Sample product input file
│
├── vartalap-sahayata-main/                   # Business intelligence dashboard (React/TS/Supabase)
│   ├── src/
│   │   ├── components/
│   │   │   └── pages/                        # Feature modules (billing, inventory, forecasting, etc.)
│   │   ├── integrations/supabase/            # Supabase client and generated types
│   │   ├── hooks/                            # Custom React hooks
│   │   └── pages/                            # Route-level page components
│   ├── supabase/migrations/                  # Database schema migrations
│   └── package.json
│
└── LICENSE
```

---

## Design Decisions / Architecture

### Client-Side-First Data Processing (Data Quality Analyzer)

All data profiling and cleaning operations execute entirely in the browser using Web APIs and pure TypeScript. This design eliminates server infrastructure costs, removes data privacy concerns (no data leaves the user's device), and delivers sub-second feedback for most operations. The trade-off is a ceiling on dataset size, addressed by chunked processing and Web Worker-compatible async patterns.

### Dual-Solver Strategy (Digital Twin)

Two solver strategies were provided to expose an explicit speed-vs-quality trade-off to the end user. `py3dbp` applies constraint-based packing suitable for physical stability requirements (e.g., heavier items at the base). The greedy heuristic uses a pivot-point algorithm for fast, single-pass placement when exact optimality is not required. Both solvers share the same input/output contract, making them interchangeable.

### Supabase as Backend-as-a-Service (Vartalap Sahayata)

Supabase was chosen to deliver a full relational database (PostgreSQL), authentication, and storage without managing server infrastructure. Database migrations are version-controlled in `supabase/migrations/`, enabling reproducible schema deployments. TanStack Query handles server state, caching, and background refetching, keeping component logic focused on presentation.

### Modular Monorepo Layout

Each project is a fully independent application with its own `package.json`, environment configuration, and dependency tree. This structure keeps concerns separated while sharing the same repository for unified review and submission.

---

## Challenges and Learnings

- **3D bin-packing is NP-hard.** The greedy heuristic was implemented as a practical alternative when `py3dbp` runtimes become unacceptable for large item sets. Proper collision detection and pivot-point management required careful geometric reasoning.
- **Client-side statistical computation.** Implementing survey-grade variance estimation (Taylor linearization, Jackknife) without a server required porting statistical theory directly into TypeScript. Extensive type safety helped prevent numeric edge-case bugs.
- **Real-time UI responsiveness.** Profiling large datasets (100k+ rows) on the main browser thread caused frame drops. Batching operations and using `requestIdleCallback` patterns maintained a responsive UI.
- **Supabase schema design.** Normalizing billing, inventory, and expense data into a relational schema that supports complex aggregations (customer profitability, forecasting) required careful upfront migration planning.

---

## Future Improvements

- **Data Quality Analyzer:** Add support for SPSS/SAV file formats; implement streaming processing via Web Workers for datasets exceeding 100 MB.
- **Digital Twin:** Incorporate item rotation optimization and weight distribution validation (center-of-gravity constraints); expose a REST API for integration with warehouse management systems.
- **Vartalap Sahayata:** Add role-based access control (RBAC) for multi-user organizations; integrate a machine learning forecasting model (e.g., Prophet) via a serverless function; add PDF invoice generation.
- **Cross-cutting:** Add end-to-end tests with Playwright; set up a CI/CD pipeline with GitHub Actions for automated linting and deployment.

---

## Testing

No automated test suite has been added at this stage. Manual testing was performed against sample datasets throughout development.

**Planned testing approach:**

- **Data Quality Analyzer:** Unit tests for each processing engine (`DataProfiler`, `DataCleaner`, `SurveyEstimator`) using Vitest; component integration tests with React Testing Library.
- **Digital Twin:** Unit tests for `solver.py` using pytest, covering edge cases (empty product list, single oversized item, max payload exceeded).
- **Vartalap Sahayata:** Component tests with React Testing Library; database integration tests against a local Supabase instance using the Supabase CLI.

---

## Deployment

### Data Quality Analyzer and Cleaner

```bash
cd Data-Quality-Analyzer-And-Cleaner-main
npm run build
# Deploy the generated dist/ folder to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages)
```

### VartalapAI Digital Twin

Deploy to [Streamlit Community Cloud](https://streamlit.io/cloud) by connecting the repository. Set `app.py` as the entry point and install dependencies from the environment configuration.

### Vartalap Sahayata

```bash
cd vartalap-sahayata-main
npm run build
# Deploy dist/ to Vercel, Netlify, or any static host
# Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set as environment variables in the hosting platform
```

---

## Author

**SRI NITHILAN R**

- GitHub: [sriCuriosity](https://github.com/sriCuriosity)
- LinkedIn: [Add LinkedIn profile URL here]
- Email: [Add contact email here]

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.