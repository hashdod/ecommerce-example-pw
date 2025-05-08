import { Locator } from '@playwright/test'

export type ShopItem = {
    locator: Locator
    price: number
}

export type User = {
    email: string
    password: string
}

export type ShippingDetails = {
    phoneNumber: string
    street: string
    city: string
    country: string
}

export type HomeLink = 'Home' | 'Contact' | 'Logout'
