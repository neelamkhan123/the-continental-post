import { type RouteConfig } from "@react-router/dev/routes";
import { route, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/discover", "routes/discover.tsx"),
  route("/login", "routes/login.tsx"),
  route("/sign-up", "routes/signUp.tsx"),
  route("/user/:id", "routes/account.tsx"),
] satisfies RouteConfig;
