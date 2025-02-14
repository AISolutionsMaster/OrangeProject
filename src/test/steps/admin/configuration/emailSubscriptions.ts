import { When, Then } from "@cucumber/cucumber";
import EmailConfigPage from "../../../pages/admin/configuration/emailSubscriptions";
import { pageFixture } from "../../../../hooks/pageFixture";

When("User access Email subscription page", async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.navigateToEmailSubscription();
});
Then("Email subscription page has displayed as expected", async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.verifyPageUI();
});
When("User turns on Toggle", async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.navigateToEmailSubscription();
    await emailConfigPage.toggleOnStatus();
});
Then("Toggle has displayed in on status as expected", async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.verifyToggleOnStatus();
});
When("User turns off Toggle", async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.navigateToEmailSubscription();
    await emailConfigPage.toggleOffStatus();
});
Then("Toggle has displayed in off status as expected", async () => {
    const emailConfigPage = new EmailConfigPage(pageFixture.adminPage);
    await emailConfigPage.verifyToggleOffStatus();
}); 
