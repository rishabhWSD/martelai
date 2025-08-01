# MartelAI - AI-Powered Business Assistant Platform

A comprehensive monorepo containing AI-powered business tools and integrations, built with modern web technologies and designed for scalability.

## 🏗️ Project Architecture

```
martel-ai/
├── apps/
│   └── web/                 # Next.js 15 Web Application
├── packages/
│   ├── api/                 # Shared API utilities
│   └── lib/                 # Shared libraries
├── prisma/                  # Database schema and migrations
├── scripts/                 # Utility scripts
└── generated/               # Generated files (auto-generated)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended package manager)
- PostgreSQL or SQLite for database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rishabhWSD/martelai.git
   cd martel-ai
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment setup:**
   ```bash
   cd apps/web
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Database setup:**
   ```bash
   pnpm db:push
   pnpm db:generate
   ```

5. **Start development:**
   ```bash
   pnpm dev
   ```

## 📦 Applications & Packages

### 🌐 Web Application (`apps/web`)
The main Next.js application featuring:
- AI-powered business assistants
- Real-time data integration
- Meta Business API integration
- Document processing and analysis
- User authentication and management

**Technologies:** Next.js 15, TypeScript, Tailwind CSS, Prisma, NextAuth.js

### 📚 Shared Packages
- `packages/api/` - Shared API utilities and types
- `packages/lib/` - Common libraries and helpers

## 🛠 Development Scripts

### Monorepo Management
```bash
pnpm install              # Install all dependencies
pnpm build                # Build all packages
pnpm dev                  # Start development servers
pnpm lint                 # Lint all packages
pnpm type-check           # TypeScript checking
```

### Database Management
```bash
pnpm db:studio            # Open Prisma Studio
pnpm db:push              # Push schema changes
pnpm db:migrate           # Run migrations
pnpm db:generate          # Generate Prisma client
```

## 🔧 Configuration

### Environment Variables
See `apps/web/.env.example` for required environment variables:

- **OPENAI_API_KEY** - Required for AI functionality
- **DATABASE_URL** - PostgreSQL or SQLite connection
- **NEXTAUTH_SECRET** - Authentication secret
- **META_APP_ID/SECRET** - Meta Business integration

### Database Setup

#### Development (SQLite)
```env
DATABASE_URL="file:./martelai.db"
```

#### Production (PostgreSQL)
```env
DATABASE_URL="postgresql://user:pass@host:port/db"
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set root directory to `apps`
3. Configure environment variables
4. Deploy with `pnpm build --filter=web`

### Environment Variables for Production
- Update `NEXTAUTH_URL` to your domain
- Use cloud database (Vercel Postgres recommended)
- Set secure `NEXTAUTH_SECRET`

## 🧪 Testing & Development

### Available Scripts
- `pnpm test:martel` - Test AI brain functionality
- `pnpm db:check` - Database connectivity test
- `pnpm db:diagnostic` - Database health check

### Development Workflow
1. Create feature branch
2. Make changes in appropriate package
3. Test with provided scripts
4. Submit pull request

## 📖 Documentation

- **[Web App README](apps/web/README.md)** - Detailed web application docs
- **[Database Guide](apps/web/DATABASE_CONNECTION_GUIDE.md)** - Database setup guide
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Production deployment
- **[Agent Training](AGENT_TRAINING_README.md)** - AI agent configuration

## 🔍 Project Features

### AI Business Assistants
- Multiple specialized AI agents
- GPT-4 powered responses
- Context-aware conversations
- Business data integration

### Business Intelligence
- Meta Business API integration
- Real-time analytics
- Document processing (PDF, Word)
- Custom business insights

### Authentication & Security
- NextAuth.js integration
- Multiple OAuth providers
- Secure session management
- Role-based access control

## 🤝 Contributing

1. **Code Standards**
   - TypeScript for type safety
   - ESLint + Prettier for formatting
   - Conventional commit messages

2. **Development Process**
   - Feature branches from `main`
   - Pull requests for all changes
   - Code review required

3. **Testing**
   - Unit tests for utilities
   - Integration tests for APIs
   - Manual testing for UI features

## 📄 License

Private project - All rights reserved

---

## 🛠 Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL/SQLite with Prisma
- **Authentication**: NextAuth.js
- **AI**: OpenAI GPT-4
- **Deployment**: Vercel
- **Package Management**: pnpm workspaces
- **Styling**: Tailwind CSS + Radix UI

## 📞 Support

For issues and questions:
1. Check existing documentation
2. Search GitHub issues
3. Create new issue with details
4. Contact development team

Built with ❤️ by the MartelAI team
