# Enterprise ERP System

A comprehensive, modular Enterprise Resource Planning (ERP) system built with Next.js, TypeScript, and modern web technologies.

## 🚀 Features

### Core Modules
- **User Management** - RBAC, multi-factor authentication, session management
- **Multi-Tenant Support** - Complete tenant isolation with scoped data access
- **Inventory Management** - Stock tracking, low stock alerts, product management
- **Settings Management** - Global configuration, security settings, backup management
- **Audit Logging** - Complete activity tracking and compliance

### Technical Features
- **Modern Stack** - Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Enterprise Security** - JWT authentication, RBAC, audit trails
- **Responsive Design** - Mobile-first design with dark mode support
- **Modular Architecture** - Plugin-based module system for easy extensibility
- **Database Ready** - PostgreSQL schema with proper indexing and relationships

## 🏗️ Architecture

### Modular Design
Each business module is self-contained with:
- UI components in `/components/[module]/`
- Business logic in `/lib/[module]/`
- API routes in `/app/api/[module]/`
- Database schemas in `/scripts/`

### Security Features
- Role-based access control (RBAC)
- Multi-factor authentication support
- Session management with configurable timeouts
- IP whitelisting capabilities
- Comprehensive audit logging

### Multi-Tenancy
- Complete data isolation between tenants
- Tenant-scoped permissions and settings
- Configurable tenant features and limits

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd enterprise-erp
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Configure your database and authentication settings:
   \`\`\`env
   DATABASE_URL="postgresql://user:password@localhost:5432/erp_db"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   \`\`\`

4. **Initialize the database**
   \`\`\`bash
   # Run the initialization script
   psql -d your_database -f scripts/init-database.sql
   
   # Seed with sample data (optional)
   psql -d your_database -f scripts/seed-data.sql
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Login with: `admin@acme.com` / `password` (if using seed data)

## 📁 Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Main application routes
│   ├── api/              # API endpoints
│   └── login/            # Authentication pages
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── inventory/       # Inventory module components
│   └── settings/        # Settings module components
├── lib/                 # Utility libraries
│   ├── permissions.ts   # RBAC utilities
│   ├── audit.ts        # Audit logging
│   └── multi-tenant.ts # Multi-tenancy utilities
├── types/              # TypeScript type definitions
├── middleware.ts       # Next.js middleware for auth
└── scripts/           # Database scripts
\`\`\`

## 🔧 Adding New Modules

The ERP system is designed for easy module addition:

1. **Create module structure**
   \`\`\`
   components/[module-name]/
   ├── [module]-list.tsx
   ├── [module]-form.tsx
   └── [module]-stats.tsx
   \`\`\`

2. **Add database schema**
   \`\`\`sql
   -- scripts/[module]-schema.sql
   CREATE TABLE [module_table] (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     tenant_id UUID NOT NULL REFERENCES tenants(id),
     -- module-specific fields
   );
   \`\`\`

3. **Create API routes**
   \`\`\`
   app/api/[module]/
   ├── route.ts
   └── [id]/route.ts
   \`\`\`

4. **Add navigation**
   Update `components/dashboard-sidebar.tsx` with new module link.

5. **Configure permissions**
   Add module permissions to `lib/permissions.ts`.

## 🔐 Security

### Authentication
- JWT-based authentication with NextAuth.js
- Support for multiple providers (email/password, OAuth)
- Session management with configurable timeouts
- Multi-factor authentication ready

### Authorization
- Role-based access control (RBAC)
- Granular permissions per module and action
- Tenant-scoped data access
- Middleware-based route protection

### Audit & Compliance
- Complete audit trail for all actions
- IP address and user agent tracking
- Configurable retention policies
- Export capabilities for compliance

## 🚀 Deployment

### Environment Setup
\`\`\`env
# Production environment variables
NODE_ENV=production
DATABASE_URL="your-production-db-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
\`\`\`

### Docker Deployment
\`\`\`dockerfile
# Dockerfile included for containerized deployment
docker build -t enterprise-erp .
docker run -p 3000:3000 enterprise-erp
\`\`\`

### Vercel Deployment
\`\`\`bash
# Deploy to Vercel
vercel --prod
\`\`\`

## 📊 Monitoring & Maintenance

### Health Checks
- Built-in health check endpoints
- Database connection monitoring
- Performance metrics tracking

### Backup & Recovery
- Automated backup scheduling
- Manual backup triggers
- Point-in-time recovery support
- Multi-format export (JSON, CSV, SQL)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in `/docs`
- Review the example implementations in `/examples`

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
