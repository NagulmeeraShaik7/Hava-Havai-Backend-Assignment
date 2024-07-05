# Airport API

This is an API for retrieving airport information based on IATA code.

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `node server.js` to start the server.

## Endpoints

- `GET /airport/:iata_code` - Retrieves airport information based on the IATA code.

## Example

```GET
url http://localhost:3000/airport/AGR
```
