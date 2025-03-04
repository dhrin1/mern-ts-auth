import bcrypt from "bcrypt";

export const hashValue = async (val: string, saltRounds?: number) =>
  bcrypt.hash(val, saltRounds || 10);

export const comparedValue = async (val: string, hashedValue: string) =>
  bcrypt.compare(val, hashedValue).catch(() => false);
