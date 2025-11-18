import { test, expect } from "../fixtures/base";

const task = {
  assignee: "peter@outlook.com",
  title: "Test task",
  content: "Hello, I'm Test task!",
  status: "Draft",
  label: "task",
};

test.describe("Задачи", () => {

  test("Отображение формы создания задачи", async ({ mainPage, tasksPage }) => {
    await mainPage.tasksMenuItem.click();
    await tasksPage.createBtn.click();
    await expect(tasksPage.assigneeSelection).toBeVisible();
    await expect(tasksPage.titleInput).toBeVisible();
    await expect(tasksPage.contentInput).toBeVisible();
    await expect(tasksPage.statusSelection).toBeVisible();
    await expect(tasksPage.labelSelection).toBeVisible();
    await expect(tasksPage.form.saveBtn).toBeVisible();
  });

  test("Создание задачи", async ({ mainPage, tasksPage }) => {
    await mainPage.tasksMenuItem.click();
    await tasksPage.createBtn.click();
    await tasksPage.fillTaskForm(task);
    await tasksPage.form.saveBtn.click();
    await expect(tasksPage.alert).toHaveText("Element created");
    await tasksPage.form.showBtn.click();
    await tasksPage.checkNewTask(task);
    await tasksPage.tasksMenuItem.click();
    const card = tasksPage.getTaskCardByText(task.title);
    await card.showBtn.click();
    await tasksPage.checkNewTask(task);
  });

  test("Редактирование задачи", async ({ mainPage, tasksPage }) => {
    await mainPage.tasksMenuItem.click();
    const card = tasksPage.getTaskCardByText("Task 13");
    await card.editBtn.click
    await tasksPage.fillTaskForm(task);
    await tasksPage.form.saveBtn.click();
    await expect(tasksPage.elementUpdatedAlert).toBeVisible();
    const editedCard = tasksPage.getTaskCardByText(task.title);
    await editedCard.showBtn.click();
    await tasksPage.checkNewTask(task);
  });

  test("Удаление нескольких статусов", async ({ mainPage, labelsPage }) => {
    await mainPage.labelsMenuItem.click();
  });

  test("Удаление всех статусов", async ({ mainPage, labelsPage }) => {
    await mainPage.usersMenuItem.click();
  });
});
