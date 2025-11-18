import { Page, Locator } from "@playwright/test";

export default class TaskCardWidget {
  readonly itself: Locator;
  readonly editBtn: Locator;
  readonly showBtn: Locator; 

  constructor(page: Page, title: string) {
    this.itself = page.getByRole('button', { name: `${title}` });
    this.editBtn = this.itself.getByLabel('Edit');
    this.showBtn = this.itself.getByLabel('Show')
  }
}
