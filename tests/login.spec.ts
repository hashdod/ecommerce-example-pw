import { test, expect } from "../support/fixtures";
import { step, feature } from "allure-js-commons";

test.beforeEach(async ({ page }) => {
  await feature("Login");
  await page.goto("/auth_ecommerce");
});

test.describe("Login", async () => {
  test("Input fields have correct placeholder text", async ({ loginPage }) => {
    await step("Email field has correct attribute", async () => {
      await expect(loginPage.emailField).toHaveAttribute(
        "placeholder",
        "Enter email - insert admin@admin.com",
      );
    });
    await step("Password field has correct attribute", async () => {
      await expect(loginPage.passwordField).toHaveAttribute(
        "placeholder",
        "Enter Password - insert admin123",
      );
    });
  });

  [
    {
      testName: "bad username",
      user: { email: "bad123@mail.com", password: "bad-password123" },
      expectedMsg:
        "Bad credentials! Please try again! Make sure that you've registered.",
    },
    {
      testName: "missing email address",
      user: { email: "", password: "bad-password123" },
      expectedMsg:
        "Bad credentials! Please try again! Make sure that you've registered.",
    },
    {
      testName: "missing password",
      user: { email: "nopassword@mail.com", password: "" },
      expectedMsg:
        "Bad credentials! Please try again! Make sure that you've registered.",
    },
  ].forEach(({ testName, user, expectedMsg }) => {
    test(`Error message with ${testName}`, async ({ loginPage }) => {
      await step("attempt to log in", async () => {
        await loginPage.login(user);
      });
      await step("The error message", async () => {
        await expect(await loginPage.errorMessage(expectedMsg)).toBeVisible();
      });
    });
  });

  [
    { link: "Contact" as const, expectedPath: "/contact-us" },
    { link: "Home" as const, expectedPath: "/" },
  ].forEach(({ link, expectedPath }) => {
    test(`Go to ${link}`, async ({ page, loginPage }) => {
      await step(`Navigate to ${link} via the top bar`, async () => {
        await loginPage.gotoLink(link);
      });
      await step("The browser lands on the", async () => {
        await page.waitForURL(expectedPath);
      });
    });
  });
});
