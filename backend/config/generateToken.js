const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id },"7b2a8d3f8a6d4e5f9b7c6d8e3f2a1b0c9d8e7f6a5b4c3d2e1f0", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
