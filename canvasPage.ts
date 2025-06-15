import { expect, Locator, Page } from '@playwright/test';

export class CanvasPage {
  readonly page: Page;
  readonly RECT_TOOL: Locator;
  readonly SELECT_TOOL: Locator;
  readonly CANVAS: Locator;
  readonly DELETE_BTN: Locator;
  readonly AREA_TEXT: Locator;
  readonly plansSection: Locator;
  readonly newPlanBtn: Locator;
  readonly SAFE_Y_OFFSET = 150;

  constructor(page: Page) {
    this.page        = page;
    this.RECT_TOOL   = page.locator('//div[@id="div-top-menu-bar-rectangle"]');
    this.SELECT_TOOL = page.locator('//img[@alt="pointer"]');
    this.CANVAS      = page.locator('canvas');
    this.DELETE_BTN  = page.locator('//img[@alt="new delete"]');
    this.AREA_TEXT   = page.locator('#insideTextMiddle');

    this.plansSection = page
      .locator('div.flex.items-center.justify-between')
      .filter({ has: page.locator('h5', { hasText: 'Plans' }) });
    this.newPlanBtn = this.plansSection.locator('button#save-view-button');
  }

  async gotoAppAndLogin(email: string, password: string, projectLocator: string) {
    await this.page.goto('https://app.snaptrude.com');
    await this.page.locator('//input[@type="email"]').fill(email);
    await this.page.locator('//input[@type="password"]').fill(password);
    await this.page.locator('//button[@type="submit"]').click();
    await this.page.waitForSelector(projectLocator);
    await this.page.locator(projectLocator).click();
    await this.CANVAS.waitFor({ state: 'visible' });
  }

  async newPlan() {
    await expect(this.newPlanBtn).toHaveCount(1);
    await this.CANVAS.waitFor({ state: 'visible' });
    await this.newPlanBtn.click();
    //await this.CANVAS.waitFor({ state: 'detached' });
    //await this.CANVAS.waitFor({ state: 'visible' });
  }

  async clearDefaultRectangle() {
    const box = await this.CANVAS.boundingBox();
    if (!box) return;
    const cx = box.width / 2;
    const cy = box.height / 2;
    await this.SELECT_TOOL.click();
    await this.page.mouse.click(box.x + cx, box.y + cy, { button: 'right' });
    if (await this.DELETE_BTN.isVisible()) {
      await this.DELETE_BTN.click();
      await this.page.waitForSelector('text=Site');
    }
  }

  async draw(x1: number, y1: number, x2: number, y2: number) {
    const box = await this.CANVAS.boundingBox();
    if (!box) throw new Error('Canvas not ready');
    await this.RECT_TOOL.click();
    await this.page.mouse.click(box.x + x1, box.y + y1);
    await this.page.mouse.click(box.x + x2, box.y + y2);
  }

  async getArea(): Promise<number> {
    await this.page.waitForSelector('#insideTextMiddle');
    const t = await this.AREA_TEXT.textContent() ?? '';
    return Number(t.replace(/,/g, '').replace('m²','').trim()) || 0;
  }

  async selectAt(cx: number, cy: number) {
    const box = await this.CANVAS.boundingBox();
    if (!box) throw new Error('Canvas not ready');
    await this.SELECT_TOOL.click();
    await this.page.mouse.click(box.x + cx, box.y + cy);
  }

  async deleteAt(cx: number, cy: number) {
    const box = await this.CANVAS.boundingBox();
    if (!box) throw new Error('Canvas not ready');
    await this.SELECT_TOOL.click();
    await this.page.mouse.click(box.x + cx, box.y + cy, { button: 'right' });
    await this.DELETE_BTN.click();
    await this.page.waitForSelector('text=Site');
  }
}
