// schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(4, { message: "Şifre en az 4 karakter olmalı." })
      .regex(/[A-Z]/, { message: "Şifre en az bir büyük harf içermeli." })
      .regex(/[a-z]/, { message: "Şifre en az bir küçük harf içermeli." })
      .regex(/[0-9]/, { message: "Şifre en az bir rakam içermeli." })
      .regex(/[^A-Za-z0-9]/, {
        message: "Şifre en az bir özel karakter içermeli.",
      }),
    confirmPassword: z.string(),
    username: z
      .string()
      .min(3, "Kullanici ismi en az 3 karakter olmalidir")
      .max(63, "Kullanici ismi en fazla 63 karakter olmalidir.")
      .regex(
        /^[a-z0-9][a-z0-9]*[a-z0-9]$/,
        "Kullanici adi sadece kucuk harf ve sayi icermelidir. Bir harf veya sayi ile baslayip bitmelidir."
      )
      .refine((val) => !val.includes("--"), {
        message: "Kullanici adiniz -- icermemelidir.",
        path: ["username"],
      })
      .transform((val) => val.toLowerCase()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Parolalar eşleşmiyor.",
    path: ["confirmPassword"],
  });
