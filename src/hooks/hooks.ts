import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '../../auth.config';


let browser: Browser;
interface TestContext {
  adminContext: BrowserContext;
  Page: Page;
  adminPage: Page;
}

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

AfterAll(async function () {
  await browser.close(); 
});

Before(async function (this: TestContext) {
  // Create context with stored credentials for admin
  this.adminContext = await browser.newContext({
    storageState: authConfig.admin.storageState
  });
  const adminPage = await this.adminContext.newPage();
  pageFixture.adminPage = adminPage;
  this.Page = adminPage; // Default to admin page
});

After(async function (this: TestContext, { pickle, result }) {
  console.log("Closing context and page...");
  if (result?.status === Status.FAILED) {
    await this.Page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
  }
  await this.Page.close();

});
//   if (pickle.tags.some((tag) => tag.name === "@guest")) {
//     await adminContext?.close();
//   } else {
//     await adminContext?.close();
//   }
// });
