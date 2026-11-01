import jwt from "jsonwebtoken";
import { RefreshToken } from "../model/refreshTokenMode.js";

export const refreshTokenAccess = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({
        status: "failed",
        message: "Refresh token missing. Please log in again.",
      });
    }

    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
    );

    const userRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
      user: decode.userId,
      expiresAt: { $gt: new Date() },
    });

    if (!userRefreshToken) {
      return res.status(401).json({
        status: "failed",
        message: "Refresh token is invalid or revoked. Please log in again.",
      });
    }

    const newAccessToken = jwt.sign(
      { userId: decode.userId },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "15m" },
    );
    
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      status: "success",
      message: "Access token refreshed successfully.",
    });
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      message: "Refresh token is invalid or expired. Please log in again.",
    });
  }
};
