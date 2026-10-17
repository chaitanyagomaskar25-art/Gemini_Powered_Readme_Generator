import { User } from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../model/refreshTokenMode.js";

export const singUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
      return res.json({
        message: "All fileds are required.",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message:
          "This email already exists. Please try to login or singup with different email.",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully..!!",
      data: newUser,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Email and password are required.",
      });
    }
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password.",
      });
    }

    const access_token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "15m",
      },
    );

    const refresh_token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    await RefreshToken.deleteMany({ userId: user._id });

    await RefreshToken.create({
      token: refresh_token,
      user: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      message: "User matched with given email",
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "failed",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Unable to retrieve user",
    });
  }
};

export const signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) {
      await RefreshToken.findOneAndUpdate(
        { token: refreshToken },
        { revoked: true },
      );
    }

    res.clearCookie("refresh_token");
    res.clearCookie("access_token")
    res.status(200).json({
      message: "Logout successful",
    });


  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
