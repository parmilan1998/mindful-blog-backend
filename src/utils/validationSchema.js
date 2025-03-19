import Joi from "joi";

export const signUpSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
  fullName: Joi.string().max(50).required(),
  profilePicture: Joi.string().optional(),
  bio: Joi.string().max(500).optional(),
  phoneNumber: Joi.string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().label("Refresh Token"),
});
