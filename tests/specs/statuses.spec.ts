import { test, expect } from "../fixtures/base";

const testStatus = {
  name: "Testing",
  slug: "testing",
};

const rowPosition = 0;

test("Отображение формы создания статуса", async ({
  mainPage,
  statusesPage,
}) => {
  await mainPage.statusesMenuItem.click();
  expect(statusesPage.createBtn).toBeVisible();
  expect(statusesPage.exportBtn).toBeVisible();
  expect(statusesPage.table.headOfTable).toBeVisible();
  expect(statusesPage.table.bodyOftable).toBeVisible();
  expect(statusesPage.table.row).toHaveCount(5);
});

test("Создание нового статуса", async ({ mainPage, statusesPage }) => {
  await mainPage.statusesMenuItem.click();
  await statusesPage.createBtn.click();
  await statusesPage.form.statusNameInput.fill(testStatus.name);
  await statusesPage.form.statusSlugInput.fill(testStatus.slug);
  await statusesPage.form.saveBtn.click();
  await expect(statusesPage.alert).toHaveText("Element created");
  await statusesPage.form.showBtn.click();
  await statusesPage.checkNewStatus(testStatus);
});

test("Редактирование существующего статуса", async ({
  mainPage,
  statusesPage,
}) => {
  await mainPage.statusesMenuItem.click();
  await statusesPage.table.row.nth(0).click();
  await statusesPage.form.statusNameInput.fill(testStatus.name);
  await statusesPage.form.statusSlugInput.fill(testStatus.slug);
  await statusesPage.form.saveBtn.click();
  await expect(statusesPage.elementUpdatedAlert).toBeVisible();
  await statusesPage.checkStatusInTable(testStatus, rowPosition);
});

test("Удаление нескольких статусов", async ({ mainPage, statusesPage }) => {
  await mainPage.statusesMenuItem.click();
  await statusesPage.table.rowCheckbox.nth(0).check();
  await statusesPage.table.rowCheckbox.nth(2).check();
  await expect(statusesPage.table.actionsToolbar.itself).toBeVisible();
  await statusesPage.table.actionsToolbar.deleteBtn.click();
  await expect(statusesPage.elementsDeletedAlert).toBeVisible();
  await expect(statusesPage.table.row).toHaveCount(3);
});

test("Удаление всех статусов", async ({mainPage, statusesPage}) => {
  await mainPage.usersMenuItem.click();
  await statusesPage.table.selectAllCheckbox.check(); 
  await expect(statusesPage.table.actionsToolbar.itself).toBeVisible();
  await statusesPage.table.actionsToolbar.deleteBtn.click()
  await expect(statusesPage.createBtnOnEmptyScreen).toBeVisible()
})

