import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('search', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('button', { name: 'Search (Meta+k)' }).click();
  await page.getByRole('searchbox', { name: 'Search' }).fill('locator');
  await expect(page.getByRole('link', { name: 'Locators', exact: true })).toBeVisible();
});

test('change theme', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.locator('//button[contains(@aria-label, "Switch between dark and light mode")]')).toHaveAttribute('title', 'light mode');
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.locator('//button[contains(@aria-label, "Switch between dark and light mode")]')).toHaveAttribute('title', 'dark mode');
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.locator('//button[contains(@aria-label, "Switch between dark and light mode")]')).toHaveAttribute('title', 'system mode');
});

test('link navigation', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  await page.getByRole('link', { name: 'MCP' }).click();
  await expect(page.getByRole('heading', { name: 'Playwright MCP', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'CLI', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Playwright CLI', exact: true })).toBeVisible();
  await page.getByRole('link', { name: 'API' }).click();
  await expect(page.getByRole('heading', { name: 'Playwright Library' })).toBeVisible();
  await page.getByRole('button', { name: 'Node.js' }).hover();
  await page.getByRole('link', { name: 'Python' }).click();
  await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
});


test('documentation navigation', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Docs' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  await page.getByRole('link', { name: 'Writing tests', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Writing tests' })).toBeVisible();
  await page.getByRole('link', { name: 'Generating tests', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Generating tests' })).toBeVisible();
  await page.getByRole('link', { name: 'Running and debugging tests', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Running and debugging tests' })).toBeVisible();
  await page.getByRole('link', { name: 'Trace viewer' }).first().click();
  await expect(page.getByRole('heading', { name: 'Trace viewer' })).toBeVisible();
  await page.getByRole('link', { name: 'Setting up CI', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Setting up CI' })).toBeVisible();
});