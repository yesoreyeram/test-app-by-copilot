import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display welcome message', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Welcome to Test App')).toBeVisible();
  });

  test('should have feature links', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Text Conversion' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Math Operations' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Temperature Converter' })).toBeVisible();
  });
});

test.describe('Text Conversion', () => {
  test('should convert text to lowercase', async ({ page }) => {
    await page.goto('/convert/lower');
    await page.fill('textarea[placeholder="Enter text here..."]', 'HELLO WORLD');
    await page.click('button:has-text("Convert")');
    await expect(page.locator('textarea[readonly]')).toHaveValue('hello world');
  });
});

test.describe('Authentication', () => {
  test('should show login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
