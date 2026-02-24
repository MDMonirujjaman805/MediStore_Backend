export type TJwtPayload = {
  userId: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
};
