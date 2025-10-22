import { test, expect } from "../../fixtures/base";

const testUser = {
  email: "test@test.com",
  firstName: "Christopher",
  lastName: "Johnson",
};

test("Cоздание нового пользователя", async ({ mainPage, usersPage }) => {
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

test("Просмотр списка пользователей", async ({ mainPage, usersPage }) => {
  await mainPage.usersMenuItem.click();
  await expect(usersPage.createBtn).toBeVisible();
  await expect(usersPage.exportBtn).toBeVisible();
  await expect(usersPage.headOfTable).toBeVisible();
  await expect(usersPage.bodyOftable).toBeVisible();
  await expect(usersPage.userRow).toHaveCount(8);
});

test("Удаление пользователя", async ({mainPage, usersPage}) => {
  await mainPage.usersMenuItem.click();
  await usersPage.rowCheckbox.last().check(); 
  await expect(usersPage.actionsToolbar).toBeVisible();
  await usersPage.deleteBtn.click()
  await expect(usersPage.userRow).toHaveCount(7);
})

test("Массовое удаление пользователей", async ({mainPage, usersPage}) => {
  await mainPage.usersMenuItem.click();
  await usersPage.selectAllCheckbox.check(); 
  await expect(usersPage.actionsToolbar).toBeVisible();
  await usersPage.deleteBtn.click()
  await expect(usersPage.createBtnOnEmptyScreen).toBeVisible
})
