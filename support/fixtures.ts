import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/loginPage'
import { ShopPage } from '../pages/shopPage'
import { CheckoutPage } from '../pages/checkoutPage'

type MyFixtures = {
    loginPage: LoginPage
    shopPage: ShopPage
    checkoutPage: CheckoutPage
}

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },
    shopPage: async ({ page }, use) => {
        const shopPage = new ShopPage(page)
        await use(shopPage)
    },
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page)
        await use(checkoutPage)
    },
})

export { expect } from '@playwright/test'
