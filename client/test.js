const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTA0MjYzODUuNDgzLCJleHAiOjE3MTMwMTgzODUsInVzZXIiOnsicm9sZSI6InVzZXIiLCJ1c2VyX2lkIjoxLCJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6ImV4YW1wbGVfdXNlciJ9fQ.Cj1U_Nwa4CTMze6FmyPWz5yrFUHlB2UxLS4WHrLeZZU";
const secret = "3qtJ/GkIjOy9fUT2qU0LfX0qBL+DmyL6vPlPSQUFP9o=";

try {
  const decoded = jwt.verify(token, secret);
  console.log(decoded);
} catch (error) {
  console.error("Failed to decode JWT token:", error);
}
