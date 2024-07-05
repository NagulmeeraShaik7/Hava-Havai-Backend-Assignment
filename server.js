const express = require("express");
const db = require("./db/database");
const app = express();
const port = 3000;

app.get("/airport/:iata_code", (req, res) => {
  const iataCode = req.params.iata_code.toUpperCase();

  const query = `
        SELECT
            a.id AS airport_id,
            a.icao_code,
            a.iata_code,
            a.name AS airport_name,
            a.type AS airport_type,
            a.latitude_deg,
            a.longitude_deg,
            a.elevation_ft,
            c.id AS city_id,
            c.name AS city_name,
            c.countryId AS city_country_id,
            c.is_active AS city_is_active,
            c.lat AS city_lat,
            c.long AS city_long,
            co.id AS country_id,
            co.name AS country_name,
            co.country_code_two,
            co.country_code_three,
            co.mobile_code,
            co.continent_id
        FROM
            Airport a
        LEFT JOIN
            City c ON a.cityId = c.id
        LEFT JOIN
            Country co ON c.countryId = co.id
        WHERE
            a.iata_code = ${iataCode}`;

  console.log("Executing SQL query:", query);
  console.log("With parameter iata_code:", iataCode);

  db.get(query, [iataCode], (err, row) => {
    if (err) {
      console.error("SQL error:", err.message);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    } else if (row) {
      const response = {
        airport: {
          id: row.airport_id,
          icao_code: row.icao_code,
          iata_code: row.iata_code,
          name: row.airport_name,
          type: row.airport_type,
          latitude_deg: row.latitude_deg,
          longitude_deg: row.longitude_deg,
          elevation_ft: row.elevation_ft,
          address: {
            city: row.city_id
              ? {
                  id: row.city_id,
                  name: row.city_name,
                  country_id: row.city_country_id,
                  is_active: row.city_is_active,
                  lat: row.city_lat,
                  long: row.city_long,
                }
              : null,
            country: row.country_id
              ? {
                  id: row.country_id,
                  name: row.country_name,
                  country_code_two: row.country_code_two,
                  country_code_three: row.country_code_three,
                  mobile_code: row.mobile_code,
                  continent_id: row.continent_id,
                }
              : null,
          },
        },
      };
      res.json(response);
    } else {
      res.status(404).json({ error: "Airport not found" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
