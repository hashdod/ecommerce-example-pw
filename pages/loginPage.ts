import { Locator, Page, expect } from '@playwright/test'
import { HomeLink, User } from '../types'

export class LoginPage {
    readonly page: Page
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly submitButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.emailField = this.page.getByRole('textbox', { name: 'Email' })
        this.passwordField = this.page.getByRole('textbox', {
            name: 'Password',
        })
        this.submitButton = this.page.getByRole('button', { name: 'Submit' })
        this.message = this.page.locator('#message')
    }

    gotoLink = async (link: HomeLink) => {
        const homeLink = this.page.getByRole('link', { name: link })
        await expect(homeLink).toBeVisible()
        return await homeLink.click()
    }

    enterUsername = async (username: string) => {
        const emailField = this.emailField
        await expect(emailField).toBeVisible()
        return await emailField.fill(username)
    }

    enterPassword = async (password: string) => {
        const passwordField = this.passwordField
        await expect(passwordField).toBeVisible()
        return await passwordField.fill(password)
    }

    clickLoginButton = async () => {
        const submitButton = this.submitButton
        await expect(submitButton).toBeVisible()
        return await this.submitButton.click()
    }

    login = async (user: User) => {
        await this.enterUsername(user.email)
        await this.enterPassword(user.password)
        await this.clickLoginButton()
    }

    errorMessage = async (contents: string): Promise<Locator> => {
        const message = this.message.filter({ hasText: contents })
        await expect(message).toBeVisible()
        return message
    }
}
