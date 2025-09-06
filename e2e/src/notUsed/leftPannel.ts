import { Page } from '@playwright/test';
import { MenuItem } from './menuItem';

export class LeftPanel {
  readonly dashboard: MenuItem;
  readonly pim: MenuItem;
  readonly leave: MenuItem;
  readonly time: MenuItem;
  readonly recruitment: MenuItem;

  constructor(page: Page) {
    this.dashboard = new MenuItem(page, 'a.oxd-main-menu-item:has-text("Dashboard")');
    this.pim = new MenuItem(page, 'a.oxd-main-menu-item:has-text("PIM")');
    this.leave = new MenuItem(page, 'a.oxd-main-menu-item:has-text("Leave")');
    this.time = new MenuItem(page, 'a.oxd-main-menu-item:has-text("Time")');
    this.recruitment = new MenuItem(page, 'a.oxd-main-menu-item:has-text("Recruitment")');
  }
}
