import { test, expect } from "../fixtures/base";

const testLabel = {
  name: "Test",
};

const rowPosition = 0;

test("Отображение списка всех лейблов", async ({
  mainPage,
  labelsPage,
}) => {
  await mainPage.labelsMenuItem.click();
  expect(labelsPage.createBtn).toBeVisible();
  expect(labelsPage.exportBtn).toBeVisible();
  expect(labelsPage.table.itself).toBeVisible();
  expect(labelsPage.table.headOfTable).toBeVisible();
  expect(labelsPage.table.bodyOftable).toBeVisible();
  expect(labelsPage.table.row).toHaveCount(5);
});

test("Создание нового статуса", async ({ mainPage, labelsPage }) => {
  await mainPage.labelsMenuItem.click();
  await labelsPage.createBtn.click();
  await labelsPage.form.labelNameInput.fill(testLabel.name);
  await labelsPage.form.saveBtn.click();
  await expect(labelsPage.alert).toHaveText("Element created");
  await labelsPage.form.showBtn.click();
  await labelsPage.checkLabelInTable(testLabel);
});

test("Редактирование существующего статуса", async ({
  mainPage,
  labelsPage,
}) => {
  await mainPage.labelsMenuItem.click();
  await labelsPage.table.row.nth(0).click();
  await labelsPage.form.statusNameInput.fill(testLabel.name);
  await labelsPage.form.saveBtn.click();
  await expect(labelsPage.elementUpdatedAlert).toBeVisible();
  await labelsPage.checkLabelInTable(testLabel, rowPosition);
});

test("Удаление нескольких статусов", async ({ mainPage, labelsPage }) => {
  await mainPage.labelsMenuItem.click();
  await labelsPage.table.rowCheckbox.nth(0).check();
  await labelsPage.table.rowCheckbox.nth(2).check();
  await expect(labelsPage.table.actionsToolbar.itself).toBeVisible();
  await labelsPage.table.actionsToolbar.deleteBtn.click();
  await expect(labelsPage.elementsDeletedAlert).toBeVisible();
  await expect(labelsPage.table.row).toHaveCount(3);
});

test("Удаление всех статусов", async ({mainPage, labelsPage}) => {
  await mainPage.usersMenuItem.click();
  await labelsPage.table.selectAllCheckbox.check(); 
  await expect(labelsPage.table.actionsToolbar.itself).toBeVisible();
  await labelsPage.table.actionsToolbar.deleteBtn.click()
  await expect(labelsPage.createBtnOnEmptyScreen).toBeVisible()
})

