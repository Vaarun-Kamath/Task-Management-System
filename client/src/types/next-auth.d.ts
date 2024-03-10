import { AuthPayload } from ".";

declare module "next-auth" {
  interface Session {
    user: AuthPayload;
    token: any;
  }

  interface User {
    user: AuthPayload;
  }
}
