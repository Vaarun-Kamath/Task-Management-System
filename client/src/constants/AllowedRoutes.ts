type AllowedRoutesType = {
  [key: string]: { pages: Array<string> };
  userRole: { pages: Array<string> };
};

export const allowedRoutes: AllowedRoutesType = {
  userRole: {
    pages: ["/project", "/projects", "/userstatistics"],
  },
};
