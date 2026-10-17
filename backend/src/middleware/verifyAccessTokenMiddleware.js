import jwt from "jsonwebtoken";

export const verifyAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.access_token;

    if (!accessToken) {
      return res.status(401).json({
        status: "failed",
        message: "Not authenticated",
      });
    }

    const decode = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.userId = decode.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid or expired access token",
    });
  }
};
