import { test, expect } from "../../fixtures/base";

const testUser = {
  email: "test@test.com",
  firstName: "Christopher",
  lastName: "Johnson",
};

test("Cоздание нового пользователя", async ({ mainPage, usersPage }) => {
  await mainPage.usersMenuItem.click();
  await usersPage.createBtn.click();
  await usersPage.form.emailInput.fill(testUser.email);
  await usersPage.form.firstNameInput.fill(testUser.firstName);
  await usersPage.form.lastNameInput.fill(testUser.lastName);
  await usersPage.form.saveBtn.click();
  await expect(usersPage.alert).toHaveText("Element created");
  await usersPage.form.showBtn.click();
  await usersPage.checkNewUser(testUser);
});

test("Просмотр списка пользователей", async ({ mainPage, usersPage }) => {
  await mainPage.usersMenuItem.click();
  await expect(usersPage.createBtn).toBeVisible();
  await expect(usersPage.exportBtn).toBeVisible();
  await expect(usersPage.table.headOfTable).toBeVisible();
  await expect(usersPage.table.bodyOftable).toBeVisible();
  await expect(usersPage.table.row).toHaveCount(8);
});

test("Удаление пользователя", async ({mainPage, usersPage}) => {
  await mainPage.usersMenuItem.click();
  await usersPage.table.rowCheckbox.last().check(); 
  await expect(usersPage.table.actionsToolbar.itself).toBeVisible();
  await usersPage.table.actionsToolbar.deleteBtn.click()
  await expect(usersPage.table.row).toHaveCount(7);
})

test("Массовое удаление пользователей", async ({mainPage, usersPage}) => {
  await mainPage.usersMenuItem.click();
  await usersPage.table.selectAllCheckbox.check(); 
  await expect(usersPage.table.actionsToolbar.itself).toBeVisible();
  await usersPage.table.actionsToolbar.deleteBtn.click()
  await expect(usersPage.createBtnOnEmptyScreen).toBeVisible()
})
