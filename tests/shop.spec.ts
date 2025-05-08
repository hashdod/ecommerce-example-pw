import { test, expect } from '../support/fixtures'
import { step, feature } from 'allure-js-commons'

test.beforeEach(async ({ page, loginPage }) => {
    await feature('Shop')
    await page.goto('/auth_ecommerce')
    await loginPage.login({ email: 'admin@admin.com', password: 'admin123' })
})

test.describe('Shop tests', async () => {
    // test.use({ storageState: process.env.STORAGE_STATE_PATH });
    test('cart totals are correct', async ({ shopPage }) => {
        const phones = [
            'Apple iPhone 12, 128GB, Black',
            'Huawei Mate 20 Lite, 64GB, Black',
            'Apple iPhone 13, 128GB, Blue',
        ]
        let subtotal = 0
        for (const phone of phones) {
            await step(`Add ${phone} to cart`, async () => {
                const item = await shopPage.getItem(phone)
                const price = item.price
                subtotal += price
                await shopPage.addItemToCart(item.locator)
            })
        }
        subtotal = parseFloat(subtotal.toFixed(2))
        await step(
            'The total of the cart contents is equal to the value of items added',
            async () => {
                const totalCartPrice = await shopPage.getTotalCartPrice()
                expect(subtotal).toEqual(totalCartPrice)
            }
        )
    })

    test('purchase a phone', async ({ shopPage, checkoutPage }) => {
        const phones = [
            'Apple iPhone 12, 128GB, Black',
            'Huawei Mate 20 Lite, 64GB, Black',
        ]

        const shipping = {
            phoneNumber: '07123443210',
            street: '1 Regent Street',
            city: 'Cambridge',
            country: 'United Kingdom',
        }
        let subtotal = 0
        for (const phone of phones) {
            await step(`Add ${phone} to cart`, async () => {
                const item = await shopPage.getItem(phone)
                const price = item.price
                subtotal += price
                await shopPage.addItemToCart(item.locator)
            })
        }
        subtotal = parseFloat(subtotal.toFixed(2))
        await step(`Navigate the to checkout`, async () => {
            shopPage.gotoCheckout()
        })
        await step('Complete the message', async () => {
            await checkoutPage.completeOrder(shipping)
        })
        await step('The correct order message is displayed', async () => {
            const orderConfirmedMsg =
                await checkoutPage.getConfirmationMessage()
            expect(orderConfirmedMsg).toBe(
                `Congrats! Your order of  $${subtotal}  has been registered and will be shipped to ${shipping.street}, ${shipping.city} - ${shipping.country}.`
            )
        })
    })

    test('Logout', async ({ shopPage, loginPage }) => {
        await step('Click logout link', async () => {
            await loginPage.gotoLink('Logout')
        })
        await step('Expect to see login page elements', async () => {
            await expect(loginPage.emailField).toBeVisible()
            await expect(loginPage.passwordField).toBeVisible()
        })
    })
})
