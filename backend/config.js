import dotenv from "dotenv";
dotenv.config();

const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;
const STRIPE_SECRET_KEY =
  "sk_test_51Qs5utJufWeMIcTVd4D4VhIOlce8LBX4ngNkd85Q3FJuzhbDOtsN5ZyWWp4PKVe4oWoFN0Rax2kq4vgUpV18cWem00yZhcXSrp";

export default {
  JWT_USER_PASSWORD,
  JWT_ADMIN_PASSWORD,
  STRIPE_SECRET_KEY
};
