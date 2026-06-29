# ⚡ ForgeFlow Enterprise Workflow Platform

**ForgeFlow** is an enterprise-grade Workflow Automation & Business Operating Platform built for high-scale enterprise operations. Designed and developed by **Kushal Pandey** (Full Stack MERN Developer).

---

## 👨‍💻 Developer Profile & Contact

- **Developer**: **Kushal Pandey**
- **Role**: Full Stack MERN & SaaS Engineer
- **GitHub**: [https://github.com](https://github.com)
- **LinkedIn**: [https://linkedin.com](https://linkedin.com)
- **Portfolio Website**: [https://kushalpandey.dev](https://kushalpandey.dev)

---

## 🏗️ Architecture & Technology Stack

### Frontend
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS with custom HSL tokens (`Obsidian Flow`)
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management & Querying**: TanStack Query & React Context
- **Routing**: React Router v6

### Backend API & Execution Engine
- **Runtime**: Node.js & Express (ES Modules)
- **Execution Pipeline**: Custom async graph node runner (`WorkflowExecutor`) supporting Triggers, Conditions, Human Approvals, and Action Dispatches.
- **Database / Auth**: Supabase PostgreSQL + Auth integration ready.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 1. Start Backend Express Server
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 2. Start Frontend Application Client
```bash
cd client
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📡 Core API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/analytics/dashboard` | Aggregated throughput metrics and active workflow counts |
| `GET` | `/api/v1/workflows` | List all organization workflow templates |
| `POST` | `/api/v1/workflows` | Create a new workflow canvas template |
| `POST` | `/api/v1/workflows/:id/execute` | Trigger execution run for a workflow graph |
| `GET` | `/api/v1/executions` | Fetch granular run history and step payloads |
| `GET` | `/api/v1/audit-logs` | Retrieve organization security audit trails |

---

## ⌨️ Platform Keyboard Shortcuts

| Shortcut | Description |
|---|---|
| `Ctrl + K` / `⌘K` | Command Palette overlay search |
| `Ctrl + S` / `⌘S` | Save current workflow canvas |
| `Ctrl + Shift + D` | Hidden Developer Diagnostics Modal |
| `Delete` / `Backspace` | Remove selected node in builder |

---

## 📜 Version & Changelog

- **v1.0.0 Enterprise**: Official enterprise developer branding release by **Kushal Pandey**.

---

## 📄 License & Copyright
Distributed under the MIT License. © 2026 Kushal Pandey. All Rights Reserved.
