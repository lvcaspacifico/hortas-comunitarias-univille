#!/bin/bash

# ========================================
# Database Seeding Script
# ========================================
# This script seeds the database with the full schema and test data.
# Can be used for local development or CI/CD environments.
#
# Usage:
#   ./scripts/seed-database.sh
#
# With custom connection:
#   DB_HOST=localhost DB_PORT=3306 DB_USER=root DB_PASS=password ./scripts/seed-database.sh
#
# ========================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration with defaults
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-root}"
DB_PASS="${DB_PASS:-root_password}"
DB_NAME="${DB_NAME:-hortas_dev_db}"

# Paths
SQL_DIR="backend/src/Utils/SQL"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Change to project root
cd "$PROJECT_ROOT"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Database Seeding Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Configuration:${NC}"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  User: $DB_USER"
echo "  Database: $DB_NAME"
echo ""

# Function to execute SQL file
execute_sql() {
    local sql_file="$1"
    local description="$2"

    echo -e "${BLUE}→${NC} $description"

    if [ ! -f "$sql_file" ]; then
        echo -e "${RED}✗ File not found: $sql_file${NC}"
        exit 1
    fi

    if mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$sql_file" 2>/dev/null; then
        echo -e "${GREEN}✓ Success${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to execute $sql_file${NC}"
        exit 1
    fi
}

# Wait for MySQL to be ready
echo -e "${YELLOW}Checking MySQL connection...${NC}"
MAX_RETRIES=30
RETRY_COUNT=0

until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" --silent 2>/dev/null; do
    RETRY_COUNT=$((RETRY_COUNT + 1))

    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo -e "${RED}✗ MySQL connection timeout after ${MAX_RETRIES} attempts${NC}"
        echo -e "${YELLOW}Please check:${NC}"
        echo "  - MySQL is running"
        echo "  - Connection details are correct"
        echo "  - Port $DB_PORT is accessible"
        exit 1
    fi

    echo -e "${YELLOW}MySQL not ready, waiting... (attempt $RETRY_COUNT/$MAX_RETRIES)${NC}"
    sleep 2
done

echo -e "${GREEN}✓ MySQL is ready!${NC}"
echo ""

# Execute SQL files in order
echo -e "${YELLOW}Executing SQL scripts...${NC}"
echo ""

execute_sql "$SQL_DIR/00_SQL_criar_banco.sql" "Creating database schema and tables"
echo ""

execute_sql "$SQL_DIR/01_SQL_seed_dados_iniciais.sql" "Seeding initial data (cargos, permissões, admin user, planos)"
echo ""

execute_sql "$SQL_DIR/02_SQL_seed_dados_teste.sql" "Seeding test data (users, hortas, associações)"
echo ""

# Verify seeding
echo -e "${YELLOW}Verifying database setup...${NC}"

TABLE_COUNT=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" \
    -sN -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB_NAME';" 2>/dev/null)

USER_COUNT=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" \
    -sN -e "SELECT COUNT(*) FROM usuarios;" 2>/dev/null)

CARGO_COUNT=$(mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" \
    -sN -e "SELECT COUNT(*) FROM cargos;" 2>/dev/null)

echo -e "${GREEN}✓ Tables created: $TABLE_COUNT${NC}"
echo -e "${GREEN}✓ Users seeded: $USER_COUNT${NC}"
echo -e "${GREEN}✓ Cargos seeded: $CARGO_COUNT${NC}"
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ Database seeding completed successfully!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}Test credentials:${NC}"
echo "  Admin Platform:"
echo "    Email: hortas_comunitarias@univille.br"
echo "    Senha: senha12345"
echo ""
echo "  Dummy User (for testing):"
echo "    Email: dummy@example.com"
echo "    Senha: senha12345"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Start the PHP server: cd backend && php -S localhost:8000 -t public public/index.php"
echo "  2. Import Postman collection: backend/Hortas_Comunitarias_Univille.postman_collection.json"
echo "  3. Access phpMyAdmin: http://localhost:8080"
echo ""
