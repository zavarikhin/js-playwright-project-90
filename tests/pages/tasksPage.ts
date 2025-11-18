import { Page, Locator, expect } from "@playwright/test";
import MainPage from "./basePage";
import FormWidget from "../widgets/FormWidget";
import TaskCardWidget from "../widgets/TaskCardWidget";

export type Task = {
  assignee: string;
  title: string;
  content: string;
  status: string;
  label: string;
};

export default class TasksPages extends MainPage {
  readonly form: FormWidget;
  readonly assigneeSelection: Locator;
  readonly titleInput: Locator;
  readonly contentInput: Locator;
  readonly statusSelection: Locator;
  readonly labelSelection: Locator;
  readonly taskCard: TaskCardWidget;

  constructor(page: Page) {
    super(page);
    this.form = new FormWidget(page, "//form");
    this.taskCard = new TaskCardWidget(page, "loсator");
    this.assigneeSelection = page.getByRole("combobox", { name: "Assignee" });
    this.titleInput = page.getByRole("textbox", { name: "Title" });
    this.contentInput = page.getByRole("textbox", { name: "Content" });
    this.statusSelection = page.getByRole("combobox", { name: "Status" });
    this.labelSelection = page.getByRole("combobox", { name: "Label" });
  }

  async fillTaskForm({ assignee, title, content, status, label }: Task) {
    await this.assigneeSelection.click();
    await this.page.getByRole("option", { name: assignee }).click();
    await this.titleInput.fill(title);
    await this.contentInput.fill(content);
    await this.statusSelection.click();
    await this.page.getByRole("option", { name: status }).click();
    await this.labelSelection.click();
    await this.page.getByRole("option", { name: label }).click();
    await this.page.locator(".MuiBackdrop-root").click();
  }

  async checkNewTask({ assignee, title, content, label }: Task) {
    await expect(this.page.getByRole("link", { name: assignee })).toBeVisible();
    await expect(this.page.getByText(title, { exact: true })).toBeVisible();
    await expect(this.page.getByText(content, { exact: true })).toBeVisible();
    await expect(this.page.getByRole("link", { name: label })).toBeVisible();
  }

  getTaskCardByText(title: string) {
    return new TaskCardWidget(this.page, title);
  }
}
