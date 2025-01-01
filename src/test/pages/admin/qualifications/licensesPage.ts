import { Locator, Page, expect } from "@playwright/test";

export class QualificationsLicensesPage {
    readonly page: Page
    readonly licenseNamePrefix: string
    readonly licenseNameUpdateSuffix: string

    constructor(page: Page) {
        this.page = page
        this.licenseNamePrefix = 'Demo License '
        this.licenseNameUpdateSuffix = ' Update'
    }

    elements = {
        adminSection: () => this.page.locator('//span[text()="Admin"]'),
        qualificationsItem: () => this.page.locator('//span[text()="Qualifications"]'),
        qualificationsLicensesItem: () => this.page.locator('a', { hasText: 'Licenses' }),
        addBtn: () => this.page.locator('button', { hasText: 'Add' }),
        licenseTitle: () => this.page.locator('//h6[text()="Licenses"]'),
        addLicenseTitle: () => this.page.locator('//h6[text()="Add License"]'),
        licenseNameInput: () => this.page.locator('//label[text()="Name"]/following::input'),
        cancelBtn: () => this.page.locator('button', { hasText: 'Cancel' }),
        saveBtn: () => this.page.locator('button[type="submit"]'),
        errorRequired: () => this.page.locator('span', { hasText: 'Required' }),
        deleteBtn: () => this.page.locator('(//div[@role="row"])[last()]/descendant::button[1]'),
        editBtn: () => this.page.locator('(//div[@role="row"])[last()]/descendant::button[2]'),
        recordItemNameLast: () => this.page.locator('(//div[@role="row"])[last()]/div[2]'),
        dialog: () => this.page.locator('//div[@role="document"]'),
        dialogTitle: () => this.page.locator('//div[@role="document"]/descendant::p[1]'),
        dialogMsg: () => this.page.locator('//div[@role="document"]/descendant::p[2]'),
        dialogDismissBtn: () => this.page.locator('button', { hasText: 'x' }),
        dialogCancelBtn: () => this.page.locator('//div[@role="document"]/descendant::button[2]'),
        dialogYesBtn: () => this.page.locator('//div[@role="document"]/descendant::button[3]'),
        randomNum: () => this.generateRandomNumber(5),
        licenseName: () => this.generateLicenseName(),
        recordNumText: () => this.page.locator('//hr[@role="separator"]/following-sibling::div/span'),
        licenseNameUpdate: () => this.generateLicenseNameUpdate(),
        recordItems: () => this.page.locator('(//div[@role="rowgroup"])[2]/div'),
    }

    generateRandomNumber(length: number): string {
        const digits = "0123456789"; // Only contains number is 0-9
        let randomNum = ""
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * digits.length)
          randomNum += digits[randomIndex]
        }
        return randomNum
    }

    generateLicenseName() {
        let licenseName = this.licenseNamePrefix + this.elements.randomNum()
        return licenseName
    }

    generateLicenseNameUpdate() {
        let licenseNameUpdate = this.elements.licenseName() + this.licenseNameUpdateSuffix
        return licenseNameUpdate
    }

    getRecordNumText() {
        const text = this.elements.recordNumText().innerText()
        return text
    }

    async accessLicenses(){
        await this.page.goto(`${process.env.WEB_URL}`);
        await this.elements.qualificationsItem().click()
        await this.elements.qualificationsLicensesItem().click()
    }

    async visitQualificationsLicenses() {
        await this.elements.qualificationsItem().click()
        await this.elements.qualificationsLicensesItem().click()
    }

    async clickAddBtn() {
        await this.elements.addBtn().click()
    }

    async clickCancelBtn() {
        await this.elements.cancelBtn().click()
    }

    async clickSaveBtn() {
        await this.elements.saveBtn().click()
    }

    async verifyLicensesPage() {
        await expect(this.elements.licenseTitle()).toBeVisible()
        await expect(this.elements.addBtn()).toBeVisible()
    }

    async verifyAddLicensePage() {
        await expect(this.elements.licenseNameInput()).toBeVisible()
        await expect(this.elements.cancelBtn()).toBeVisible()
        await expect(this.elements.saveBtn()).toBeVisible()
    }

    async addLicense() {
        await this.elements.licenseNameInput().fill(this.elements.licenseName())
    }

    async updateLicense() {
        await this.elements.licenseNameInput().clear()
        await this.elements.licenseNameInput().fill(this.elements.licenseNameUpdate())
    }

    async verifyErrorRequired() {
        await expect(this.elements.errorRequired()).toBeVisible()
    }

    async verifyRecordAdded() {
        await expect(this.elements.recordItemNameLast()).toHaveText(this.elements.licenseName())
    }

    async verifyRecordUpdated() {
        await expect(this.elements.recordItemNameLast()).toHaveText(this.elements.licenseNameUpdate())
    }

    async verifyRecordDeleted() {
        await expect(this.page.locator(`//div[text()="${this.elements.licenseNameUpdate}"]`)).toBeHidden()
    }

    async verifyActionsBtn() {
        await expect(this.elements.deleteBtn()).toBeVisible()
        await expect(this.elements.editBtn()).toBeVisible()
    }

    async clickDeleteBtn() {
        await this.elements.deleteBtn().click()
    }

    async clickEditBtn() {
        await this.elements.editBtn().click()
    }

    async dimissDialog() {
        await this.elements.dialogDismissBtn().click()
    }

    async verifyDialogDismissed() {
        await expect(this.elements.dialog()).toBeHidden()
    }

    async verifyDialog() {
        await expect(this.elements.dialogTitle()).toHaveText('Are you Sure?')
        await expect(this.elements.dialogMsg()).toHaveText('The selected record will be permanently deleted. Are you sure you want to continue?')
        await expect(this.elements.dialogCancelBtn()).toContainText('No, Cancel')
        await expect(this.elements.dialogYesBtn()).toContainText('Yes, Delete')
    }

    async clickDialogCancelBtn() {
        await this.elements.dialogCancelBtn().click()
    }

    async clickDialogDeleteBtn() {
        await this.elements.dialogYesBtn().click()
    }
}