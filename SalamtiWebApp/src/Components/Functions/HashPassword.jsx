import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
};
