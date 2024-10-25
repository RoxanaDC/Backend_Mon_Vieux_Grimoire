const jsonWebToken = require("jsonwebtoken");
console.log("execut autentificare");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, "RANDOM_SECRET_TOKEN");
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
    next();
  } catch (error) {
    console.log("eroare eutentificare");
    res.status(401).json({ error: "requête non authorisé" });
  }
};
