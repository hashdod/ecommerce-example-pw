import { test as setup } from "./fixtures";

setup("Login", async ({ loginPage, page }) => {
  process.env.STORAGE_STATE_PATH = "./support/user.json";
  console.log("authenticate");
  await page.goto("/auth_ecommerce");
  await loginPage.login({ email: "admin@admin.com", password: "admin123" });
  await page.context().storageState({ path: process.env.STORAGE_STATE_PATH });
});
