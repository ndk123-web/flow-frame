# Microservices Architecture

Splits backend logic into distinct services aligned with specific domains.

## Components
- **API Gateway**: Entry point routing routes to individual services.
- **User Service / Order Service**: Decoupled server blocks.
- **Database-per-Service**: Services have their own databases to prevent coupling.