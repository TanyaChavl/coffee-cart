import { test, expect } from '@playwright/test';

test('add a drink to the cart', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Cappuccino"]').click();
    await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (1)');
});

test('total price', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Cappuccino"]').click();
    await expect(page.locator('#app')).toContainText('Cappuccino $19.00');
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $19.00');
});

test('payment form', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('h1')).toContainText('Payment details');
    await page.getByRole('textbox', { name: 'Name' }).fill('Tetiana');
    await page.getByRole('textbox', { name: 'Email' }).fill('tangella144@gmail.com');
    await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
    expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Tetiana');
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('tangella144@gmail.com');
    await expect(page.getByRole('checkbox', { name: 'Promotion checkbox' })).toBeChecked();
});

test('successful payment', async ({ page }) => { 
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('h1')).toContainText('Payment details');
    await page.getByRole('textbox', { name: 'Name' }).fill('Tetiana');
    await page.getByRole('textbox', { name: 'Email' }).fill('tangella144@gmail.com');
    await page.getByRole('checkbox', { name: 'Promotion checkbox' }).check();
    expect(page.getByRole('textbox', { name: 'Name' })).toHaveValue('Tetiana');
    await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue('tangella144@gmail.com');
    await expect(page.getByRole('checkbox', { name: 'Promotion checkbox' })).toBeChecked();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#app')).toContainText('Thanks for your purchase. Please check your email for payment.');
});

test('navigation to the cart', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Flat_White"]').click();
    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.getByText('Item')).toBeVisible();
    await expect(page.locator('div').filter({ hasText: /^Flat White$/ })).toBeVisible();
    await expect(page.getByText('Unit')).toBeVisible();
    await expect(page.getByText('$18.00 x')).toBeVisible();
    await expect(page.getByText('+-').nth(1)).toBeVisible();
    await expect(page.getByText('Total', { exact: true })).toBeVisible();
    await expect(page.getByText('$18.00', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove all Flat White' })).toBeVisible();
});

test('remove a drink from the cart', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('[data-test="Flat_White"]').click();
    await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (1)');
    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.locator('div').filter({ hasText: /^Flat White$/ })).toBeVisible();
    await page.getByRole('button', { name: 'Remove one Flat White' }).click();
    await expect(page.getByText('No coffee, go add some.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart page' })).toContainText('cart (0)');
});