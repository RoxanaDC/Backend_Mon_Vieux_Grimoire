const jsonWebToken = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_TOKEN } = process.env;
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    next();
  } catch (error) {
    res.status(401).json({ error: "requête non authorisé" });
  }
};
