import puppeteer from "puppeteer-core";
import {
  generateText,
  createElement,
  validateInput,
  checkAndGenerate,
} from "../util.js";

test("(Unit Test): The output text after the user enters the name and age", () => {
  let output;
  output = generateText("Max", 29);
  expect(output).toBe("Max (29 years old)");

  output = generateText("Mike", 30);
  expect(output).toBe("Mike (30 years old)");
});

test("(Integration Test): When the user gives valid name and age, an output must be generated", () => {
  let output;
  output = checkAndGenerate("Ali", 30);
  expect(output).toBe("Ali (30 years old)");
});

test("(End-to-End Test): The user fill outs the fields and the item will be added to the list", async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    // headless: false,
    // slowMo: 80,
    args: ["--window-size=1920,1080"],
    // ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
  });
  const page = await browser.newPage();
  // await page.goto("http://127.0.0.1:5500/dist/index.html");
  await page.goto(
    "file:///mnt/a4eccd3a-c497-461b-b894-64927bb1df66/mussar/Documents/OnlineCourses/YouTube/Testing/js-testing-introduction/dist/index.html"
  );

  await page.click("input#name");
  await page.type("input#name", "Mike");
  await page.click("input#age");
  await page.type("input#age", "20");
  await page.click("#btnAddUser");

  const addedItem = await page.$eval(".user-item", (el) => el.textContent);
  expect(addedItem).toBe("Mike (20 years old)");

  await browser.close();
});
