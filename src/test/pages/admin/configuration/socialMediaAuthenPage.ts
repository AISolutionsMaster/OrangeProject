import { Page, Locator, expect } from "@playwright/test";

export default class SocialMediaPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    elements = {
        adminMenu: () => this.page.locator('//span[text()="Admin"]'),
        addBtn: () => this.page.locator('//button[normalize-space()="Add"]'),
        configurationSubMenu: () => this.page.locator('//span[normalize-space()="Configuration"]'),
        socialMediaAuthenSubMenu: () => this.page.locator('//a[normalize-space()="Social Media Authentication"]'),
        pageTitle: () => this.page.locator('//h6[text()="Provider List"]'),
        checkBoxColumn: () => this.page.locator('//div[text()="Name"]//parent::div//descendant::input[@type="checkbox"]'),
        nameColumn: () => this.page.locator('//div[text()="Name"]'),
        actionColumn: () => this.page.locator('//div[text()="Actions"]'),
        nameTextBox: () => this.page.locator('//label[normalize-space()="Name"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        providerUrl: () => this.page.locator('//label[normalize-space()="Provider URL"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        clientID: () => this.page.locator('//label[normalize-space()="Client ID"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        clientSecret: () => this.page.locator('//label[normalize-space()="Client Secret"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input'),
        saveBtn: () => this.page.locator('//button[@type="submit"]'),
        successToast: () => this.page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]'),
        newProvider: (text: string) => this.page.locator(`//div[text()="${text}"]`),
        editIcon: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]`),
        updatedProvider: (text: string) => this.page.locator(`//div[contains(text(),"${text}")]`), 
        deleteIcon: (text: string) => this.page.locator(`//div[text()="${text}"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]`),
        confirmDeleteBtn: () => this.page.locator("//button[normalize-space()='Yes, Delete']"),
        checkbox: (text: string) => this.page.locator(`//div[contains(text(), "${text}")]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]`),
        deleteMultiBtn: () => this.page.locator("//button[normalize-space()='Delete Selected']"),
        inputField: (field: string) => this.page.locator(`//label[normalize-space()="${field}"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::input`),
        validationMessage: (field: string) => this.page.locator(`//label[text()="${field}"]//ancestor::div[@class="oxd-input-group oxd-input-field-bottom-space"]//descendant::span`),
    }
    async accessSocialMediaAuthPage() {
        await this.elements.adminMenu().click();
        await this.elements.configurationSubMenu().click();
        await this.elements.socialMediaAuthenSubMenu().click();
    }
    async verifyPageUI() {
        await expect(this.elements.pageTitle()).toBeVisible();
        await expect(this.elements.addBtn()).toBeEnabled();
        await expect(this.elements.checkBoxColumn()).toBeVisible();
        await expect(this.elements.nameColumn()).toBeVisible();
        await expect(this.elements.actionColumn()).toBeVisible();
    }
    async createProvider(name: string, url: string, id: string, secret: string) {
        await this.elements.addBtn().waitFor({ state: 'visible', timeout: 10000 });
        await this.elements.addBtn().click();
        await this.elements.nameTextBox().fill(name);
        await this.elements.providerUrl().fill(url);
        await this.elements.clientID().fill(id);
        await this.elements.clientSecret().fill(secret);
        await this.elements.saveBtn().click();
        // await this.page.waitForTimeout(2000);
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 3000 });
    }
    async verifyCreateProvider(text: string) {
        await expect(this.elements.newProvider(text)).toBeVisible({ timeout: 10000 });
    }
    async updateProvider(text: string, name: string, url: string, id: string, secret: string) {
        await this.elements.editIcon(text).click();
        await this.elements.nameTextBox().click();
        await this.elements.nameTextBox().fill(name);
        await this.elements.providerUrl().click();
        await this.elements.providerUrl().fill(url);
        await this.elements.clientID().click();
        await this.elements.clientID().fill(id);
        await this.elements.clientSecret().click();
        await this.elements.clientSecret().fill(secret);
        await this.elements.saveBtn().click();
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 4000 });
        await this.page.waitForLoadState('load');
    }
    async verifyUpdateProvider(text: string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 20000 });
        await this.page.waitForTimeout(5000);
        await expect(this.elements.actionColumn()).toBeVisible();
        await expect(this.elements.updatedProvider(text)).toBeVisible();
    }
    async deleteProvider(text: string) {
        await this.elements.deleteIcon(text).click();
        await this.elements.confirmDeleteBtn().click();
    }
    async verifyDeleteProvider(text: string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 20000 });
        await this.page.waitForTimeout(10000);
        await expect(this.elements.updatedProvider(text)).toBeHidden();
    }
    async deleteMultiProvider(text: string) {
        const checkboxes = this.elements.checkbox(text);
        // Click each checkbox
        await checkboxes.first().click(); // or .nth(0)
        await checkboxes.last().click();  // or .nth(1)
        await this.elements.deleteMultiBtn().click();
        await this.elements.confirmDeleteBtn().click();
    }
    async verifyDeleteMultiProvider(text: string) {
        await this.elements.successToast().waitFor({ state: 'visible', timeout: 20000 });
        await expect(this.elements.newProvider(text)).toBeHidden();
    }
    async inputDataOnCreateForm(field: string, value: string) {
        await this.elements.addBtn().waitFor({ state: 'visible', timeout: 20000 });
        await this.elements.addBtn().click();
        await this.elements.inputField(field).fill(value);
        await this.elements.saveBtn().click();
    }
    async verifyValidationMessage(field: string, text: string) {
        await expect(this.elements.validationMessage(field)).toHaveText(text);
    }
}
