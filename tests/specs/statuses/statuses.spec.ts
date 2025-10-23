import { test, expect } from "../../fixtures/base";

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
  expect(statusesPage.table).toBeVisible();
  expect(statusesPage.headOfTable).toBeVisible();
  expect(statusesPage.bodyOftable).toBeVisible();
  expect(statusesPage.statusRow).toHaveCount(5);
});

test("Создание нового статуса", async ({ mainPage, statusesPage }) => {
  await mainPage.statusesMenuItem.click();
  await statusesPage.createBtn.click();
  await statusesPage.nameInput.fill(testStatus.name);
  await statusesPage.slugInput.fill(testStatus.slug);
  await statusesPage.saveBtn.click();
  await expect(statusesPage.alert).toHaveText("Element created");
  await statusesPage.showBtn.click();
  await statusesPage.checkNewStatus(testStatus);
});

test("Редактирование существующего статуса", async ({
  mainPage,
  statusesPage,
}) => {
  await mainPage.statusesMenuItem.click();
  await statusesPage.statusRow.nth(0).click();
  await statusesPage.nameInput.fill(testStatus.name);
  await statusesPage.slugInput.fill(testStatus.slug);
  await statusesPage.saveBtn.click();
  await expect(statusesPage.elementUpdatedAlert).toBeVisible();
  await statusesPage.checkStatusInTable(testStatus, rowPosition);
});

test("Удаление нескольких статусов", async ({ mainPage, statusesPage }) => {
  await mainPage.statusesMenuItem.click();
  await statusesPage.rowCheckbox.nth(0).check();
  await statusesPage.rowCheckbox.nth(2).check();
  await expect(statusesPage.actionsToolbar).toBeVisible();
  await statusesPage.deleteBtn.click();
  await expect(statusesPage.elementsDeletedAlert).toBeVisible();
  await expect(statusesPage.statusRow).toHaveCount(3);
});

test("Удаление всех статусов", async ({mainPage, statusesPage}) => {
  await mainPage.usersMenuItem.click();
  await statusesPage.selectAllCheckbox.check(); 
  await expect(statusesPage.actionsToolbar).toBeVisible();
  await statusesPage.deleteBtn.click()
  await expect(statusesPage.createBtnOnEmptyScreen).toBeVisible()
})

