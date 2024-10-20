const jsonWebToken = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorisation.split(" ")[1];
    const decodedToken = jsonWebToken.verify(token, "RANDOM_SECRET_TOKEN");
    const userId = decodedToken.userId;
    req.auth = { userId: userId };
  } catch (error) {
    res.status(401).json({ error });
  }
};
