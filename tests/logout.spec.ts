import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import MainPage from "../pages/mainPage";

test("Разлогин", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  await loginPage.goto();
  await loginPage.login();
  await expect(mainPage.profileBtn).toBeVisible();
  await mainPage.logout();
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
  await expect(loginPage.signInBtn).toBeVisible();
});
