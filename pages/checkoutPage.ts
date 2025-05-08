import { Locator, Page, expect } from '@playwright/test'
import { stringify } from 'node:querystring'
import { ShippingDetails } from '../types'

export class CheckoutPage {
    readonly page: Page
    readonly phoneNoField: Locator
    readonly streetField: Locator
    readonly cityField: Locator
    readonly countryDropdown: Locator
    readonly submitOrderButton: Locator
    readonly confirmationMessage: Locator

    constructor(page: Page) {
        this.page = page
        this.phoneNoField = this.page.getByRole('textbox', { name: 'phone' })
        this.streetField = this.page.getByRole('textbox', { name: 'street' })
        this.cityField = this.page.locator('input[name="city"]')
        this.countryDropdown = this.page.locator('#countries_dropdown_menu')
        this.submitOrderButton = this.page.locator('#submitOrderBtn')
        this.confirmationMessage = this.page.locator('#message')
    }

    enterPhoneNumber = async (phoneNo: string) => {
        const phoneNoField = this.phoneNoField
        await expect(phoneNoField).toBeVisible()
        return await phoneNoField.fill(phoneNo)
    }

    enterStreet = async (street: string) => {
        const streetField = this.streetField
        await expect(streetField).toBeVisible()
        return await streetField.fill(street)
    }

    enterCity = async (city: string) => {
        const cityField = this.cityField
        await expect(cityField).toBeVisible()
        return await cityField.fill(city)
    }

    selectCountry = async (country: string) => {
        const countryDropdown = this.countryDropdown
        await expect(countryDropdown).toBeVisible()
        return await countryDropdown.selectOption(country)
    }

    submitOrder = async () => {
        const submitOrderButton = this.submitOrderButton
        await expect(submitOrderButton).toBeVisible()
        return await submitOrderButton.click()
    }

    completeOrder = async (shipping: ShippingDetails) => {
        await this.enterPhoneNumber(shipping.phoneNumber)
        await this.enterStreet(shipping.street)
        await this.enterCity(shipping.city)
        await this.selectCountry(shipping.country)
        await this.submitOrder()
    }

    getConfirmationMessage = async (): Promise<string> => {
        const confirmationMessage = this.confirmationMessage
        await expect(confirmationMessage).toBeVisible()
        return (await confirmationMessage.textContent()) as string
    }
}
