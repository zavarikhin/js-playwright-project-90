import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";

test("Приложение успешно рендерится", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("http://localhost:5173");
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInBtn).toBeVisible();
});
