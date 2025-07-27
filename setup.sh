#!/bin/bash
# Setup script for MartelAI development

echo "Setting up MartelAI development environment..."

# Navigate to project root
cd "$(dirname "$0")"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Create SQLite database
echo "Setting up SQLite database..."
npx prisma db push

echo "Setup complete! You can now run 'npm run dev' or 'pnpm dev'"
