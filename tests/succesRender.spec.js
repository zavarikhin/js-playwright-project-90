import { test, expect } from '@playwright/test';

test('Приложение успешно рендерится', async ({ page }) => {

  await page.goto('http://localhost:5173'); 
  await expect(page.getByText('Username')).toBeVisible();
  await expect(page.getByText('Password')).toBeVisible();
  await expect(page.getByText('Sign in')).toBeVisible();
});
