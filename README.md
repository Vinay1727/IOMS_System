# 🌟 Inventory & Order Management System (IOMS)

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,python,fastapi,postgres,docker,nginx,git,github&perline=9" alt="Tech Stack" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge" />
  <img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white" />
  <img src="https://img.shields.io/badge/Alembic-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

A premium, highly-scalable, full-stack ERP web application engineered for managing products, customers, and orders seamlessly. Built with modern architecture leveraging React, FastAPI, PostgreSQL, and Docker.

---

## ✨ Core Features

- **📦 Advanced Product Management**: Create, update, and delete products with real-time inventory tracking.
- **👥 Customer Relationship Database**: Manage and organize comprehensive customer information and contact details.
- **🛒 Dynamic Order Processing**: Create and track multi-product orders with live status updates and automatic total calculation.
- **📊 Real-time Analytics Dashboard**: Monitor KPIs, utilize interactive Kanban boards, and visualize 30-day revenue trends with charts.
- **⚠️ Automated Stock Alerts**: Intelligent low-stock warnings for items falling below predefined thresholds.
- **🎨 Premium UI/UX**: Professional dark theme aesthetics with teal accents, skeleton loading, toast notifications, and smooth micro-animations.
- **📱 Fully Responsive**: Flawless experience across desktop, tablet, and mobile devices.
- **🚀 Production Ready**: Complete Docker Compose setup for effortless local and cloud deployment.

---

## 🛠️ Technology Stack

### Backend Architecture
- **Framework**: FastAPI (Python 3.11)
- **Database**: PostgreSQL 15
- **ORM**: SQLAlchemy 2.0
- **Migration**: Alembic
- **Deployment**: Docker

### Frontend Architecture
- **Framework**: React 19 + Vite
- **Styling**: Modern CSS Variables + Custom Design System
- **State Management**: React Query (Server State) + Zustand (Client State)
- **Forms & Validation**: React Hook Form
- **UI Components**: Custom Engineered Components + `react-hot-toast`
- **Data Visualization**: Recharts
- **Routing**: React Router v6

### Infrastructure & DevOps
- **Containerization**: Docker & Docker Compose
- **Web Server / Proxy**: Nginx
- **Package Management**: npm & pip

---

## ⚡ Quick Start Guide

### Prerequisites
- Docker & Docker Compose v2 (Highly Recommended)
- *Alternatively*: Node.js 18+, Python 3.11+, PostgreSQL 15

### 🐳 Option 1: Docker Compose (Recommended)

1. **Clone the repository and navigate to the project directory:**
   ```bash
   git clone https://github.com/Vinay1727/IOMS_System.git
   cd IOMS_System
   ```

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```

3. **Deploy with Docker:**
   ```bash
   docker compose up -d
   ```

4. **Access the Application:**
   - **Frontend UI**: `http://localhost` (or `http://localhost:8080`)
   - **Backend API**: `http://localhost:8000`
   - **API Documentation**: `http://localhost:8000/docs`

---

## 👨‍💻 Developer Guide

### Option 2: Local Development Setup

#### Backend Initialization:
```bash
cd backend

# Initialize Virtual Environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Dependencies
pip install -r requirements.txt

# Database Configuration (ensure PostgreSQL is running)
export DATABASE_URL="postgresql://imsuser:changeme_strong_password@localhost:5432/imsdb"

# Execute Migrations
alembic upgrade head

# Boot Server
uvicorn app.main:app --reload
```

#### Frontend Initialization:
```bash
cd frontend

# Install Node Modules
npm install

# Setup Environment Configuration
cp .env.example .env.local

# Launch Development Server
npm run dev
# The app will run on http://localhost:5173
```

---

## 📁 Project Architecture

```plaintext
IOMS_System/
├── backend/                    # FastAPI Microservice Architecture
│   ├── app/
│   │   ├── main.py            # Application Entry Point
│   │   ├── config.py          # Environment Configurations
│   │   ├── database.py        # Database Session Management
│   │   ├── models/            # SQLAlchemy Data Models
│   │   ├── schemas/           # Pydantic Validation Schemas
│   │   ├── crud/              # CRUD Operation Handlers
│   │   └── routers/           # API Endpoints & Routes
│   ├── requirements.txt
│   ├── Dockerfile
│   └── alembic/               # Database Migration Scripts
│
├── frontend/                   # Modern React SPA
│   ├── src/
│   │   ├── pages/             # Route Components
│   │   ├── components/        # Reusable UI Components
│   │   ├── services/          # API Integration Layer
│   │   ├── styles/            # Global & Component CSS
│   │   ├── App.jsx            # Application Root Layout
│   │   └── main.jsx           # React DOM Entry
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
│
├── docker-compose.yml         # Container Orchestration
├── .env.example               # Environment Variables Template
└── README.md                  # Project Documentation
```

---

## 🔒 Security Best Practices Implemented

- ✅ Centralized environment variables for secret management
- ✅ Principle of least privilege for database users
- ✅ Robust CORS origin validation policies
- ✅ Comprehensive input validation on all API endpoints
- 📋 *Upcoming*: JWT Authentication Integration
- 📋 *Upcoming*: API Rate Limiting

---

## 🤝 Contribution

Designed and Developed by [Vinay1727](https://github.com/Vinay1727).

**Built with ❤️ for High-Performance ERP Solutions**
