import { Element, Helpers } from "test-juggler";

//helper for getting element text as numeric value
const get = async (element) => {
    const text = await element.text();
    return parseInt(text.replace(/,/g, ""));
};

describe("Element Actions", () => {

    it("basic bussinesman", async () => {
        //Arrange
        await page.goto("https://www.decisionproblem.com/paperclips/index2.html");

        const makeClipButton = new Element("#btnMakePaperclip");
        const availableFunds = new Element("#funds");
        const unsoldClips = new Element("#unsoldClips");
        const lowerPriceButton = new Element("#btnLowerPrice");
        const raisePriceButton = new Element("#btnRaisePrice");
        const buyWireButton = new Element("#btnBuyWire");
        const availableWire = new Element("#wire");
        const makeAutoClipperButton = new Element("#btnMakeClipper");
        const autoClipperCost = new Element("#clipperCost");

        const totalIterations = 10000;

        //Act
        for (let i = 1; i <= totalIterations; i++) {
            //take screenshot every 1000th iteration. Automatic screenshots are disabled for performance
            if ((i % 1000) == 0) {
                await Helpers.takeScreenshot();
            }

            //Start iteration by making some clips
            for (let j = 1; j <= 10; j++) {
                await makeClipButton.click();
            }

            const availableWireNumber = await get(availableWire);

            //Optimize price by storage
            const unsoldClipsNumber = await get(unsoldClips);
            if (unsoldClipsNumber <= 10 && availableWireNumber > 0) {
                await raisePriceButton.click();
            }
            if (unsoldClipsNumber > 100) {
                await lowerPriceButton.click();
            }

            //Buy wire when in need
            if (availableWireNumber < 500) {
                await buyWireButton.click();
            }

            //Invest in autoclipper when we have spare money (always save 20 bucks for The Wire)
            if (await get(availableFunds) > await get(autoClipperCost) + 20) {
                await makeAutoClipperButton.click();
            }
        }

        await Helpers.takeScreenshot();
    });
});