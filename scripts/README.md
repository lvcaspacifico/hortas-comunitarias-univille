# Scripts

Utility scripts for database management and development workflows.

## Database Seeding Script

### `seed-database.sh`

Automates the setup of the full database schema and test data for the Hortas Comunitárias project.

**Usage:**

```bash
# Make it executable (first time only)
chmod +x scripts/seed-database.sh

# Basic usage with defaults
./scripts/seed-database.sh

# With custom database configuration
DB_HOST=localhost \
DB_PORT=3306 \
DB_USER=root \
DB_PASS=mypassword \
DB_NAME=hortas_dev_db \
./scripts/seed-database.sh
```

**Prerequisites:**
- MySQL client installed
- Database container running (`docker-compose up` or manual MySQL setup)

## What Gets Seeded

The scripts execute three SQL files in order:

1. **`00_SQL_criar_banco.sql`** - Creates the complete database schema with 20+ tables
2. **`01_SQL_seed_dados_iniciais.sql`** - Seeds initial data:
   - User roles (cargos)
   - Permissions (permissões)
   - Admin user
   - Subscription plans (planos)
3. **`02_SQL_seed_dados_teste.sql`** - Seeds test data:
   - Test users for each role
   - Sample associations
   - Sample hortas (community gardens)
   - Sample addresses

## Test Credentials

After seeding, you can use these credentials:

### Admin Platform User
- **Email:** `hortas_comunitarias@univille.br`
- **Password:** `senha12345`
- **Role:** Admin with full permissions

### Dummy Test User
- **Email:** `dummy@example.com`
- **Password:** `senha12345`
- **Role:** Dummy admin (for testing)

### Other Test Users
See `backend/src/Utils/SQL/02_SQL_seed_dados_teste.sql` for the complete list of test users.

## Configuration Options

Both scripts support the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `127.0.0.1` | MySQL host address |
| `DB_PORT` | `3306` | MySQL port |
| `DB_USER` | `root` | MySQL username |
| `DB_PASS` | `root_password` | MySQL password |
| `DB_NAME` | `hortas_dev_db` | Database name |

## Troubleshooting

### "MySQL client not found"
- **Linux/Mac:** Install via `apt install mysql-client` or `brew install mysql-client`
- **Windows:** Add MySQL bin directory to PATH or run from Git Bash

### "Connection timeout"
- Ensure Docker containers are running: `docker ps`
- Check if MySQL is healthy: `docker logs hortas_mysql`
- Verify port 3306 is not blocked by firewall

### "Failed to execute SQL file"
- Check if database exists: `mysql -u root -p -e "SHOW DATABASES;"`
- Review SQL file for syntax errors
- Ensure you have sufficient privileges

## CI/CD Usage

These scripts are used in the GitHub Actions workflow (`.github/workflows/api-tests.yml`) to automatically set up the test database before running Postman/Newman tests.

## Related Documentation

- [Backend README](../backend/README.md) - Backend setup instructions
- [Database Documentation](../docs/db/README.md) - Database schema documentation
- [API Documentation](../docs/api/README.md) - API endpoints documentation
