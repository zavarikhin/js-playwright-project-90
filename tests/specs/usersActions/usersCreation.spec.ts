import { test, expect } from "../../fixtures/base";

const testUser = {
  email: "test@test.com",
  firstName: "Christopher",
  lastName: "Johnson",
};

test("Cоздание нового пользователя", async ({ loginPage, mainPage, usersPage }) => {
  await mainPage.usersMenuItem.click();
  await usersPage.createBtn.click();
  await usersPage.emailInput.fill(testUser.email);
  await usersPage.firstNameInput.fill(testUser.firstName);
  await usersPage.lastNameInput.fill(testUser.lastName);
  await usersPage.saveBtn.click();
  await expect(usersPage.alert).toHaveText("Element created");
  await usersPage.showBtn.click();
  await usersPage.checkNewUser(testUser);
});
