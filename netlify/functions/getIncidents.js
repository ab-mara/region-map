// getIncidents.js

const { Pool } = require("pg");

exports.handler = async (event, context) => {
  try {
    // Initialize a connection pool to your PostgreSQL database
    const pool = new Pool({
      connectionString:
        "postgresql://postgres:exj-KWQ0kzh2etj*tdq@db.txtsljlkvthdlxjesaam.supabase.co:5432/postgres",
    });

    // Query the database for incident data
    const query = "SELECT * FROM your_incidents_table";
    const client = await pool.connect();
    const result = await client.query(query);

    // Release the database connection
    client.release();

    // Prepare the data for JSON response
    const features = result.rows.map((row) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [row.longitude, row.latitude],
      },
      properties: {
        ID: row.id,
        Header: row.header,
        // Add more properties as needed
      },
    }));

    // Return the data as JSON response
    return {
      statusCode: 200,
      body: JSON.stringify({ type: "FeatureCollection", features }),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
