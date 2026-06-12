// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import { loginPage } from '../src/pages/login_page';
import { basepage } from '../src/pages/base_page';
import fs from 'fs'
import path from 'path'
const Credentials = JSON.parse(fs.readFileSync(path.join(process.cwd(),"Data","credentials.json"),'utf-8'))

const adminFile = 'playwright/.auth/admin.json';

// 1. Authenticate as Admin
setup('authenticate as admin', async ({ page }) => {
  const base = new basepage(page)
  const login = new loginPage(page)
  await base.navigate('/')
  await login.click_on_sigin()
  await login.login_with_valid_cred(Credentials.username,Credentials.password)
  await page.context().storageState({ path: adminFile });
});

