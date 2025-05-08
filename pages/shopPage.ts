import { Locator, Page, expect } from "@playwright/test";
import { ShopItem } from "../types";

export class ShopPage {
  readonly page: Page;
  readonly homeNav: Locator;
  readonly checkoutButton: Locator;
  readonly addToCartButton: Locator;
  readonly itemTitle: Locator;
  readonly itemPrice: string;
  readonly cartTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeNav = this.page.getByRole("button");
    this.checkoutButton = this.page
      .getByRole("button")
      .filter({ hasText: "PROCEED TO CHECKOUT" });
    this.itemTitle = this.page.locator(".shop-item-title");
    this.cartTotal = this.page.locator(".cart-total-price");
    this.itemPrice = ".shop-item-price";
  }

  getItem = async (itemName: string): Promise<ShopItem> => {
    // return the price and locator of the item
    const item = this.itemTitle.filter({ hasText: itemName }).locator("..");
    const price = (await item.locator(this.itemPrice).textContent()) as string;
    return {
      locator: item,
      price: Number(price.replace("$", "")),
    };
  };

  addItemToCart = async (item: Locator) => {
    const addItemToCartButton = item
      .getByRole("button")
      .filter({ hasText: "ADD TO CART" });
    return await addItemToCartButton.click();
  };

  getItemTitle = async (): Promise<string> => {
    const itemTitle = this.itemTitle;
    await expect(itemTitle).toBeVisible();
    return (await itemTitle.textContent()) as string;
  };

  getTotalCartPrice = async (): Promise<number> => {
    const cartTotal = (await this.cartTotal.textContent()) as string;
    return Number(cartTotal.replace("$", ""));
  };

  gotoCheckout = async () => {
    const checkoutButton = this.checkoutButton;
    await expect(this.checkoutButton).toBeVisible();
    return checkoutButton.click();
  };
}
