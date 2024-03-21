type AllowedRoutesType = {
  [key: string]: { pages: Array<string> };
  userRole: { pages: Array<string> };
};

export const allowedRoutes: AllowedRoutesType = {
  userRole: {
    pages: ["/home", "/project", "/projects", "/userstatistics"],
  },
};
