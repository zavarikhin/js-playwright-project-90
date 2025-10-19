import { test, expect } from "@playwright/test";
import LoginPage from "../pages/loginPage";
import MainPage from "../pages/mainPage";

test("Авторизация", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  await loginPage.goto();
  await loginPage.login();
  await expect(mainPage.profileBtn).toBeVisible();
});
