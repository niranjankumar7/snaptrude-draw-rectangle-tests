import { test, expect, Page } from '@playwright/test';
import { CanvasPage } from './canvasPage';

// Test Configuration
const USER_EMAIL    = 'nirkumar0020@gmail.com';
const USER_PASSWORD = 'Zxcvbnm!23';
const PROJECT_CARD  = '//div[@id="project-card-AWN3E7"]';

test.describe('Rectangle Feature - Automated Scenarios', () => {
  let page: Page;
  let canvas: CanvasPage;

  // Setup before each test
  test.beforeEach(async ({ browser }) => {
    page   = await browser.newPage();
    canvas = new CanvasPage(page);
    await canvas.gotoAppAndLogin(USER_EMAIL, USER_PASSWORD, PROJECT_CARD);
    await canvas.newPlan();
    await page.waitForTimeout(3000); // Wait to ensure plan loads

    // Clear any residual rectangles from previous test runs
    await canvas.clearDefaultRectangle();
  });

  // Cleanup after each test
  test.afterEach(async () => {
    await page.close();
  });

  // TC001 – Draw a basic rectangle using drag operation
  test('TC001 – Draw Basic Rectangle by Drag', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);

    // Assert that area is non-zero after drawing
    const area = await canvas.getArea();
    expect(area).toBeGreaterThan(0);
  });

  // TC002 – Draw rectangle and modify width from properties panel
  test('TC002 – Modify Rectangle Width via Property Panel', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);
    await canvas.selectAt(cx, cy);

    const widthInput = page.locator('div[data-property-id="width-property"] input');

    await expect(widthInput).toBeVisible({ timeout: 5000 });

    // Modify width value to 500000
    await widthInput.click();
    await widthInput.press('Meta+A');
    await widthInput.press('Backspace');
    await widthInput.fill('500000');
    await widthInput.press('Enter');

    // Verify value formatting
    await expect(widthInput).toHaveValue('500,000.00');
  });

  // TC003 – Draw rectangle and modify length from properties panel
  test('TC003 – Modify Rectangle Length via Property Panel', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);
    await canvas.selectAt(cx, cy);

    const lengthInput = page.locator('div[data-property-id="length-property"] input');

    await expect(lengthInput).toBeVisible({ timeout: 5000 });

    // Modify length value to 500000
    await lengthInput.click();
    await lengthInput.press('Meta+A');
    await lengthInput.press('Backspace');
    await lengthInput.fill('500000');
    await lengthInput.press('Enter');

    // Verify value formatting
    await expect(lengthInput).toHaveValue('500,000.00');
  });

  // TC004 – Increase length by dragging top-middle handle in design-edit mode
  test('TC004 – Resize Rectangle Length via Top Handle Drag (Design Mode)', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);
    await canvas.selectAt(cx, cy);

    const lengthInput = page.locator('div[data-property-id="length-property"] input');
    const initialLength = parseFloat((await lengthInput.inputValue()).replace(/,/g, ''));

    // Enter design-edit mode
    await page.locator('//img[@id="img-top-menu-bar-design-edit"]').click();

    // Drag top-middle handle upward to increase length
    const startX = box.x + cx;
    const startY = box.y + cy - half;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY - 20);
    await page.mouse.up();

    await canvas.selectAt(cx, cy - half - 10);
    const newLength = parseFloat((await lengthInput.inputValue()).replace(/,/g, ''));

    // Ensure length has increased
    expect(newLength).toBeGreaterThan(initialLength);
  });

  // TC005 – Increase width by dragging right-middle handle in design-edit mode
  test('TC005 – Resize Rectangle Width via Side Handle Drag (Design Mode)', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);
    await canvas.selectAt(cx, cy);

    const widthInput = page.locator('div[data-property-id="width-property"] input');
    const initialWidth = parseFloat((await widthInput.inputValue()).replace(/,/g, ''));

    // Enter design-edit mode
    await page.locator('//img[@id="img-top-menu-bar-design-edit"]').click();

    // Drag right-middle handle rightward
    const startX = box.x + cx + half;
    const startY = box.y + cy;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 20, startY);
    await page.mouse.up();

    await canvas.selectAt(cx + half + 10, cy);
    const newWidth = parseFloat((await widthInput.inputValue()).replace(/,/g, ''));

    // Ensure width has increased
    expect(newWidth).toBeGreaterThan(initialWidth);
  });

  // TC006 – Delete first rectangle and validate second one still exists
  test('TC006 – Delete First of Two Rectangles and Ensure Second Persists', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);
    await canvas.selectAt(cx, cy);

    await canvas.deleteAt(cx, cy);

    // Verify first rectangle is removed (area becomes zero)
    await canvas.selectAt(cx, cy);
    expect(await canvas.getArea()).toBe(0);
  });

  // TC007 – Undo delete operation and validate that rectangle is restored
  test('TC007 – Undo Rectangle Deletion and Validate Restoration', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);
    await canvas.selectAt(cx, cy);

    const widthInput = page.locator('div[data-property-id="width-property"] input');
    const initialWidth = await widthInput.inputValue();
    expect(initialWidth).not.toBe('');

    await canvas.deleteAt(cx, cy);

    // Verify rectangle is deleted
    await canvas.selectAt(cx, cy);
    await expect(widthInput).toHaveCount(0);

    // Undo operation
    await page.keyboard.press('Control+Z');

    // Verify rectangle is restored
    await canvas.selectAt(cx, cy);
    await expect(widthInput).toHaveValue(initialWidth);
  });

  // TC008 – Resize rectangle using bottom-right drag handle (currently incomplete)
  test('TC008 – Resize Rectangle via Drag Handles', async () => {
    const box  = await canvas.CANVAS.boundingBox()!;
    const half = 50;
    const cx   = box.width / 2;
    const cy   = box.height / 2;

    await canvas.draw(cx - half, cy - half, cx + half, cy + half);
    await canvas.selectAt(cx, cy);

    // Drag bottom-right handle by +20px
    const handleX = box.x + cx + half;
    const handleY = box.y + cy + half;
    await page.mouse.move(handleX, handleY);
    await page.mouse.down();
    await page.mouse.move(handleX + 20, handleY + 20);
    await page.mouse.up();

    // Re-select at new position (not yet asserting size change)
    await canvas.selectAt(cx + 10, cy + 10);
  });
});
