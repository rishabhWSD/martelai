@echo off
REM Setup script for MartelAI development on Windows

echo Setting up MartelAI development environment...

REM Navigate to project root
cd /d "%~dp0"

REM Generate Prisma client
echo Generating Prisma client...
call npx prisma generate

REM Create SQLite database
echo Setting up SQLite database...
call npx prisma db push

echo Setup complete! You can now run 'npm run dev' or 'pnpm dev'
pause
