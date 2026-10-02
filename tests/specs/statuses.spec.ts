import { test, expect } from "../fixtures/base";

const testStatus = {
  name: "Testing",
  slug: "testing",
};

const rowPosition = 0;

test("Отображение списка всех статусов", async ({
  basePage,
  statusesPage,
}) => {
  await basePage.statusesMenuItem.click();
  await expect(statusesPage.createBtn).toBeVisible();
  await expect(statusesPage.exportBtn).toBeVisible();
  await expect(statusesPage.table.headOfTable).toBeVisible();
  await expect(statusesPage.table.bodyOftable).toBeVisible();
  await expect(statusesPage.table.row).toHaveCount(5);
});

test("Создание нового статуса", async ({ basePage, statusesPage }) => {
  await basePage.statusesMenuItem.click();
  await statusesPage.createBtn.click();
  await statusesPage.form.statusNameInput.fill(testStatus.name);
  await statusesPage.form.statusSlugInput.fill(testStatus.slug);
  await statusesPage.form.saveBtn.click();
  await expect(statusesPage.alert).toHaveText("Element created");
  await statusesPage.form.showBtn.click();
  await statusesPage.checkNewStatus(testStatus);
});

test("Редактирование существующего статуса", async ({
  basePage,
  statusesPage,
}) => {
  await basePage.statusesMenuItem.click();
  await statusesPage.table.row.nth(0).click();
  await statusesPage.form.statusNameInput.fill(testStatus.name);
  await statusesPage.form.statusSlugInput.fill(testStatus.slug);
  await statusesPage.form.saveBtn.click();
  await expect(statusesPage.elementUpdatedAlert).toBeVisible();
  await statusesPage.checkStatusInTable(testStatus, rowPosition);
});

test("Удаление нескольких статусов", async ({ basePage, statusesPage }) => {
  await basePage.statusesMenuItem.click();
  await statusesPage.table.rowCheckbox.nth(0).check();
  await statusesPage.table.rowCheckbox.nth(2).check();
  await expect(statusesPage.table.actionsToolbar.itself).toBeVisible();
  await statusesPage.table.actionsToolbar.deleteBtn.click();
  await expect(statusesPage.elementsDeletedAlert).toBeVisible();
  await expect(statusesPage.table.row).toHaveCount(3);
});

test("Удаление всех статусов", async ({basePage, statusesPage}) => {
  await basePage.usersMenuItem.click();
  await statusesPage.table.selectAllCheckbox.check(); 
  await expect(statusesPage.table.actionsToolbar.itself).toBeVisible();
  await statusesPage.table.actionsToolbar.deleteBtn.click()
  await expect(statusesPage.createBtnOnEmptyScreen).toBeVisible()
})

