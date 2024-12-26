import { setDefaultTimeout, BeforeAll, AfterAll, Before, After, Status, } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { authConfig } from '../../auth.config';


let browser: Browser;
interface TestContext {
  adminContext: BrowserContext;
  Page: Page;
  adminPage: Page;
}
setDefaultTimeout(60 * 1000);
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
  // console.log("Closing context and page...");
  if (result?.status === Status.FAILED) {
    const sanitizedName = pickle.name.replace(/:/g, ''); // Remove all colons
    await this.Page.screenshot({
      path: `./test-results/screenshots/${sanitizedName}.png`,
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
