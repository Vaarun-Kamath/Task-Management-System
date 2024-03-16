const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA1MTUwOTAuMTk2LCJleHAiOjE3MTMxMDcwOTAsInVzZXIiOnsidXNlcl9pZCI6IjY1ZjQ1OTFmYzdkZDRiMWY1NGEyNmRhYSIsImVtYWlsIjoidmFydW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2YXJ1bmMifX0.z9JI8JZljy4AzxxuMoqbknhjaaVobZNAVXO4ePuH3Sc";
const secret = "3qtJ/GkIjOy9fUT2qU0LfX0qBL+DmyL6vPlPSQUFP9o=";

try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
} catch (error) {
  console.error("Failed to decode JWT token:", error);
}
