import path from "path";
export const authConfig = {
  admin: {
    username: "buianthai",
    password: "Admin@1234",
    storageState: path.join(process.cwd(), "playwright/.auth/admin.json"),
  },
};
