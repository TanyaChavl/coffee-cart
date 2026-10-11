import { test, expect } from '@playwright/test';

test('add a drink to the cart', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('.cup-body[data-test="Cappuccino"]').click();
    await expect(page.locator('li > a[aria-label="Cart page"]')).toContainText('cart (1)');
});

test('total price', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('.cup-body[data-test="Cappuccino"]').click();
    await expect(page.locator('button[aria-label="Proceed to checkout"]')).toContainText('Total: $19.00');
    await page.locator('button[aria-label="Proceed to checkout"]').click();
    await expect(page.locator('div:has(> .unit-desc)')).toHaveText('Cappuccino x 1');
    
});

test('payment form', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('.cup-body[data-test="Flat_White"]').click();
    await page.locator('button[aria-label="Proceed to checkout"]').click();
    await expect(page.locator('h1')).toContainText('Payment details');
    await page.locator('input[name="name"]').fill('Tetiana');
    await page.locator('input[name="email"]').fill('tangella144@gmail.com');
    await page.locator('input[name="promotion"]').check();
    await expect(page.locator('input[name="name"]')).toHaveValue('Tetiana');
    await expect(page.locator('input[name="email"]')).toHaveValue('tangella144@gmail.com');
    await expect(page.locator('input[name="promotion"]')).toBeChecked();
});

test('successful payment', async ({ page }) => { 
    await page.goto('https://coffee-cart.app/');

    await page.locator('.cup-body[data-test="Flat_White"]').click();
    await page.locator('button[aria-label="Proceed to checkout"]').click();
    await expect(page.locator('h1')).toContainText('Payment details');
    await page.locator('input[name="name"]').fill('Tetiana');
    await page.locator('input[name="email"]').fill('tangella144@gmail.com');
    await page.locator('input[name="promotion"]').check();
    await expect(page.locator('input[name="name"]')).toHaveValue('Tetiana');
    await expect(page.locator('input[name="email"]')).toHaveValue('tangella144@gmail.com');
    await expect(page.locator('input[name="promotion"]')).toBeChecked();
    await page.locator('#submit-payment').click();
    await expect(page.locator('.snackbar.success')).toHaveText('Thanks for your purchase. Please check your email for payment.');
});

test('navigation to the cart', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('.cup-body[data-test="Flat_White"]').click();
    await page.locator('li > a[aria-label="Cart page"]').click();
    await expect(page.locator('button[aria-label="Proceed to checkout"]')).toBeVisible();
    await expect(page.locator('li.list-header > div:first-child')).toHaveText('Item');
    await expect(page.locator('ul:not(.cart-preview) > li.list-item > div:nth-child(1)')).toHaveText('Flat White');
    await expect(page.locator('li.list-header > div:nth-child(2)')).toHaveText('Unit');
    await expect(page.locator('ul:not(.cart-preview) > li.list-item > div:nth-child(2)')).toContainText('$18.00 x 1');
    await expect(page.locator('div[class="unit-controller"]').nth(1)).toBeVisible();
    await expect(page.locator('li.list-header > div:nth-child(3)')).toHaveText('Total');
    await expect(page.locator('ul:not(.cart-preview) > li.list-item > div:nth-child(3)')).toHaveText('$18.00');
    await expect(page.locator('button[aria-label="Remove all Flat White"]')).toBeVisible();
});

test('remove a drink from the cart', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');

    await page.locator('.cup-body[data-test="Flat_White"]').click();
    await expect(page.locator('li > a[aria-label="Cart page"]')).toContainText('cart (1)');
    await page.locator('li > a[aria-label="Cart page"]').click();
    await expect(page.locator('ul:not(.cart-preview) > li.list-item > div:nth-child(1)')).toHaveText('Flat White');
    await page.locator('button[aria-label="Remove all Flat White"]').click();
    await expect(page.locator('.list > p')).toContainText('No coffee, go add some.');
    await expect(page.locator('li > a[aria-label="Cart page"]')).toContainText('cart (0)');
});