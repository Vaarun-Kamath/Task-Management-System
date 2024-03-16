const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA1NTQ2MjguNzg4LCJleHAiOjE3MTMxNDY2MjgsInVzZXIiOnsidXNlcl9pZCI6IjY1ZjQ1OTFmYzdkZDRiMWY1NGEyNmRhYSIsImVtYWlsIjoidmFydW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJ2YXJ1bmMifX0.g92TDncke1lp-UC8BrtFVIRJNDVyCKHle-32DKNxACw";
const secret = "3qtJ/GkIjOy9fUT2qU0LfX0qBL+DmyL6vPlPSQUFP9o=";

try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
} catch (error) {
  console.error("Failed to decode JWT token:", error);
}
