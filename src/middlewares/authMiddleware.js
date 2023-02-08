import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const customAuth = token.length < 500;

  let decodedData;

  if (token && customAuth) {
    decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedData._id;
  }
  next();
};

export default auth;
