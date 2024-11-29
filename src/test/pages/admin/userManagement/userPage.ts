import { Page, Locator, expect } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();
const axios = require('axios');

export default class AdminMenuPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly passWord: Locator;
    readonly loginBtn: Locator;
    readonly adminMenu: Locator;
    readonly addBtn: Locator;
    readonly userRole: Locator;
    readonly status: Locator;
    readonly employeeName: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly confirmPassword: Locator;
    readonly submitBtn: Locator;
    readonly userRoleOption: Locator;
    readonly statusOption: Locator;
    readonly employeeOption: Locator;
    readonly newEssUser: Locator;
    readonly messageSuccess: Locator;
    readonly userManagement: Locator;
    readonly titlePage: Locator;
    readonly usernameLabel: Locator;
    readonly resetBtn: Locator;
    readonly searchBtn: Locator;
    readonly addUserBtn: Locator;
    readonly usernameColumn: Locator;
    readonly userRoleColumn: Locator;
    readonly employeeNameColumn: Locator;
    readonly statusColumn: Locator;
    readonly actionColumn: Locator;
    readonly checkBox: Locator;
    readonly userRoleLabel: Locator;
    readonly employeeNameLabel: Locator;
    readonly statusLabel: Locator;
    readonly adminRoleOption: Locator;
    readonly newAdminUser: Locator;
    readonly userResult: Locator;
    readonly editIcon: Locator;
    readonly updatedAccount : Locator;
    readonly deleteIcon: Locator;
    readonly confirmDeleteBtn: Locator;
    readonly checkbox1: Locator;
    readonly checkbox2: Locator;
    readonly deleteMultiBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('//input[@placeholder="Username"]');
        this.passWord = page.locator('//input[@placeholder="Password"]');
        this.loginBtn = page.locator('//button[@type="submit"]');
        this.adminMenu = page.locator('//span[text()="Admin"]');
        this.addBtn = page.locator('//button[normalize-space()="Add"]');
        this.userRole = page.locator('//label[text()="User Role"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::div[@class="oxd-select-wrapper"]')
        this.status = page.locator('//label[text()="Status"]//ancestor::div[contains(@class,"oxd-grid-item--gutters")]//descendant::div[@class="oxd-select-wrapper"]')
        this.employeeName = page.locator('//input[@placeholder="Type for hints..."]')
        // this.usernameField = page.locator('//label[normalize-space()="Username"]//ancestor::div[@class="oxd-grid-item oxd-grid-item--gutters"]//descendant::input[@class="oxd-input oxd-input--active"]')
        this.usernameField =  page.getByRole('textbox').nth(2)
        this.passwordField = page.locator('//div[contains(@class,"user-password-cell")]//descendant::input[@type="password"]')
        this.confirmPassword = page.locator('//label[normalize-space()="Confirm Password"]//ancestor::div[@class="oxd-grid-item oxd-grid-item--gutters"]//descendant::input[@type="password"]')
        this.submitBtn = page.locator('//button[@type="submit"]')
        this.userRoleOption = page.getByRole('option', { name: 'ESS' })
        this.adminRoleOption = page.getByRole('option', { name: 'Admin' })
        this.statusOption = page.getByRole('option', { name: 'Enabled' })
        const employeeNamevalue = 'Timothy Lewis Amiano'; // Giá trị bạn muốn thay thế
        this.employeeOption = page.getByRole('option', { name: employeeNamevalue })
        this.newEssUser = page.locator('//div[text()="usernamenttheu"]')
        this.newAdminUser = page.locator('//div[text()="usernamenttheuAdmin"]')
        this.messageSuccess = page.locator('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]')
        this.userManagement = page.locator('//span[normalize-space()="User Management"]')
        this.titlePage = page.locator('//h5[text()="System Users"]')
        this.usernameLabel = page.locator('//label[text()="Username"]')
        this.userRoleLabel = page.locator('//label[text()="User Role"]')
        this.employeeNameLabel = page.locator('//label[text()="Employee Name"]')
        this.statusLabel = page.locator('//label[text()="Status"]')
        this.resetBtn = page.locator('//button[normalize-space()="Reset"]')
        this.searchBtn = page.locator('//button[@type="submit"]')
        this.addUserBtn = page.locator('//button[normalize-space()="Add"]')
        this.checkBox = page.locator('//div[text()="Username"]//parent::div//descendant::input[@type="checkbox"]')
        this.userRoleColumn = page.locator('//div[text()="Username"]')
        this.usernameColumn = page.locator('//div[text()="User Role"]')
        this.employeeNameColumn = page.locator('//div[text()="Employee Name"]')
        this.statusColumn = page.locator('//div[text()="Status"]')
        this.actionColumn = page.locator('//div[text()="Actions"]')
        this.userResult = page.locator("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']")
        this.editIcon = page.locator('//div[text()="usernamenttheu"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-pencil-fill"]')
        this.updatedAccount = page.locator('//div[text()="usernamenttheuEdit"]')
        this.deleteIcon = page.locator('//div[text()="usernamenttheuEdit"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-trash"]')
        this.confirmDeleteBtn = page.locator("//button[normalize-space()='Yes, Delete']")
        this.checkbox1  = page.locator('//div[text()="usernamenttheuAdmin"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]')
        this.checkbox2  = page.locator('//div[text()="usernamenttheu"]//ancestor::div[@role="row"]//descendant::i[@class="oxd-icon bi-check oxd-checkbox-input-icon"]')
        this.deleteMultiBtn = page.locator("//button[normalize-space()='Delete Selected']")
    }

    async visit() {
        await this.page.goto(`${process.env.WEB_URL}`);
    }
    async login() {
        await this.userName.fill("Admin");
        await this.passWord.fill("admin123");
        await this.loginBtn.click();
    }
    async accessUserPage() {
        await this.adminMenu.click();
        await this.userManagement.click();
    }
    async afterAccessUserPage() {
        await expect(this.titlePage).toBeVisible();
        await expect(this.usernameLabel).toBeVisible();
        await expect(this.usernameField).toBeEditable();
        await expect(this.userRoleLabel).toBeVisible();
        await expect(this.userRole).toBeVisible();
        await expect(this.employeeNameLabel).toBeVisible();
        await expect(this.employeeName).toBeEditable()
        await expect(this.statusLabel).toBeVisible();
        await expect(this.status).toBeVisible();
        await expect(this.resetBtn).toBeVisible();
        await expect(this.searchBtn).toBeVisible();
        await expect(this.addUserBtn).toBeVisible();
        await expect(this.checkBox).toBeVisible();
        await expect(this.usernameColumn).toBeVisible();
        await expect(this.userRoleColumn).toBeVisible();
        await expect(this.employeeNameColumn).toBeVisible();
        await expect(this.statusColumn).toBeVisible();
        await expect(this.actionColumn).toBeVisible();
    }

    async createEssUser() {
        //employee: string, username: string, pass: string, confirm: string
        await this.adminMenu.click();
        await this.addBtn.click();
        await this.userRole.click();
        await this.userRoleOption.click();
        await this.status.click();
        await this.statusOption.click();
        await this.employeeName.fill("t");
        await this.employeeOption.click();
        await this.usernameField.fill("usernamenttheu");
        await this.passwordField.fill("admin123");
        await this.confirmPassword.fill("admin123");
        await this.submitBtn.click();

    }
    async afterCreateEssUser() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.newEssUser).toBeVisible();
    }
    async createAdminUser() {
        //employee: string, username: string, pass: string, confirm: string
        await this.adminMenu.click();
        await this.addBtn.click();
        await this.userRole.click();
        await this.adminRoleOption.click();
        await this.status.click();
        await this.statusOption.click();
        await this.employeeName.fill("t");
        await this.employeeOption.click();
        await this.usernameField.fill("usernamenttheuAdmin");
        await this.passwordField.fill("admin123");
        await this.confirmPassword.fill("admin123");
        await this.submitBtn.click();

    }
    async afterCreateAdminUser() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.newAdminUser).toBeVisible();
    }

    async searchUserName() {
        await this.adminMenu.click();
        await this.usernameField.fill("usernamenttheu");
        await this.searchBtn.click();


    }
    async afterSearchUserName() {
        try {
            const response = await axios.get('https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users?');
            expect(response.status).toBe(200);
        } catch (error) {
            console.error('Error:', error);
        }
        await expect(this.newEssUser).toBeVisible();
        await expect(this.userResult).toHaveCount(1);
    }
    async searchUserRole() {
        await this.adminMenu.click();
        await this.userRole.click();
        await this.adminRoleOption.click();
        await this.searchBtn.click();


    }
    async afterSearchUserRole() {
        // Lấy danh sách kết quả
        const results = await this.page.$$("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']"); // Thay thế '.user-item' bằng selector phù hợp

        // Kiểm tra tất cả các kết quả có role = admin
        await Promise.all(results.map(async (result) => {
            const roleElement = await result.$("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][3]"); // Thay thế '.user-role' bằng selector phù hợp
            const roleText = await roleElement.textContent();
            expect(roleText).toBe('Admin');
        }))
    }
    async searchEmployeeName() {
        await this.adminMenu.click();
        await this.employeeName.fill("t");
        await this.employeeOption.click();
        await this.searchBtn.click();

    }
    async afterSearchEmployeeName() {
        // Lấy danh sách kết quả
        const userRoleLocator = '//div[@class="oxd-table-row oxd-table-row--with-border"]//parent::div[@class="oxd-table-card"]';

        const results = await this.page.$$(userRoleLocator);

        await Promise.all(results.map(async (result) => {
            const roleElement = await result.$("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][4]");
            const roleText = await roleElement.textContent();
            const employeeNamevalue = 'Timothy Lewis Amiano';
            expect(roleText).toContain(employeeNamevalue);
        }))
    }

    async searchStatus() {
        await this.adminMenu.click();
        await this.status.click();
        await this.statusOption.click();
        await this.searchBtn.click();
    }

    async afterSearchStatus() {
        // Lấy danh sách kết quả
        const userRoleLocator = '//div[@class="oxd-table-row oxd-table-row--with-border"]//parent::div[@class="oxd-table-card"]';

        const results = await this.page.$$(userRoleLocator);

        await Promise.all(results.map(async (result) => {
            const roleElement = await result.$("//div[@class='oxd-table-row oxd-table-row--with-border']//parent::div[@class='oxd-table-card']//child::div[@class='oxd-table-cell oxd-padding-cell'][5]");
            const roleText = await roleElement.textContent();
            const status = 'Enable';
            expect(roleText).toContain(status);

        }))

    }

    async inputDataForFields() {
        await this.adminMenu.click();
        await this.usernameField.fill("usernamenttheu");
        await this.userRole.click();
        await this.adminRoleOption.click();
        await this.employeeName.fill("t");
        await this.employeeOption.click();
        await this.status.click();
        await this.statusOption.click();

    }

    async pressReset() {
        await this.resetBtn.click();
    }

    async afterReset() {
        const usernameValue = await this.usernameField.textContent();
        expect(usernameValue).toBe('');
        const role = await this.userRole.textContent();
        expect(role).toBe('-- Select --');
        const employee = await this.employeeName.textContent();
        expect(employee).toBe('');
        const status = await this.status.textContent();
        expect(status).toBe('-- Select --');
    }
    async updateAccount() {
        await this.adminMenu.click();
        await this.editIcon.click();
        await this.usernameField.click();
        await this.usernameField.fill('usernamenttheuEdit');
        await this.submitBtn.click();
    }

    async afterUpdateAccount() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.updatedAccount).toBeVisible();
    }

    async removeAccount() {
        await this.adminMenu.click();
        await this.deleteIcon.click();
        await this.confirmDeleteBtn.click();
    }

    async afterRemoveAccount() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.updatedAccount).toBeHidden();
    }

    async removeMultiAccount() {
        await this.adminMenu.click();
        await this.checkbox1.click();
        await this.checkbox2.click();
        await this.deleteMultiBtn.click();
        await this.confirmDeleteBtn.click();

    }

    async afterRemoveMultiAccount() {
        await this.page.waitForSelector('//div[@class="oxd-toast-container oxd-toast-container--bottom"]//p[text()="Success"]');
        await expect(this.newEssUser).toBeHidden();
        await expect(this.newAdminUser).toBeHidden();
    }
    
    
}