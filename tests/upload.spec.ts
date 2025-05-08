import path from "path";
import { test, expect } from "../support/fixtures";
import { step, feature } from "allure-js-commons";
import fs from "fs";

test.beforeEach(async ({ page, loginPage }) => {
  await feature("File Upload");
  await page.goto("/file-upload");
});

const uploadDir = path.resolve("./img");
const files = fs.readdirSync(uploadDir);

for (const file of files) {
  test(`Upload ${file} to the website`, async ({ page }) => {
    //for the sake of brevity, we won't be using the Page Object Model as with other tests in the repo.
    const fileChooserPromise = page.waitForEvent("filechooser");
    const fileUploadButton = page.locator("#file_upload");
    const submitButton = page.getByRole("button", { name: "Submit" });
    await expect(fileUploadButton).toBeVisible();
    await fileUploadButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(uploadDir, file));
    await submitButton.click();
    await expect(page.locator("#file_upload_response")).toContainText(
      `You have successfully uploaded "${file}"`,
    );
  });
}
