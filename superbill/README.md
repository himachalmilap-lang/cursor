# SuperBill Clone - Full-Stack Billing & Invoicing

A modern full-stack web application inspired by SuperBill by DATEV KOINOS SRL. Includes authentication, invoicing, payments, reminders, reports, and admin features.

## Tech Stack
- Frontend: React + TypeScript + Vite + TailwindCSS
- Backend: Node.js + TypeScript + Express
- Database: MongoDB (Mongoose)
- Auth: JWT + OAuth (Google, Microsoft)
- PDF: PDFKit, XML: xmlbuilder2
- Email: Nodemailer (SMTP)
- Storage: AWS S3

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm or npm
- Docker (optional for MongoDB)

### Setup

1. Install dependencies
```bash
cd server && npm install
cd ../client && npm install
```

2. Environment
```bash
cd ../server
cp .env.example .env
# Update values
```

3. Run services
- Start database via Docker (optional)
```bash
docker run -d --name superbill-mongo -p 27017:27017 mongo:7
```

- Start backend
```bash
cd server
npm run dev
```

- Start frontend
```bash
cd ../client
npm run dev
```

Open http://localhost:5173

## Monorepo Structure
```
superbill/
  server/  # Express API (TypeScript)
  client/  # React app (Vite + Tailwind)
```

## Roadmap
- Auth: email/password, Google, Microsoft; roles (Admin, Accountant, Owner, Staff)
- Invoices: CRUD, PDF/XML, email, attachments
- Quotes & Orders: quotes, POs, SOs; convert to invoice
- Payments: record, partial/full, reminders (email/SMS)
- Deadlines & Recurring billing, calendar
- Reports: sales, VAT, export CSV/XLSX/PDF
- Clients & Suppliers
- Multicurrency & i18n
- Admin panel

## License
MIT