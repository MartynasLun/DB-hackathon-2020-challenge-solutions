import { Element } from "test-juggler";
const SudokuSolver = require("sudoku-solver-js");

var solver = new SudokuSolver();

export default class gamePage {
    constructor() {
        this.puzzleGrid = new Element("#puzzle_grid");
        this.checkResult = new Element("input[value='How am I doing?']");
        this.cell = new Element("#puzzle_grid tr input");
        this.cheat = new Element("#cheat");
        this.message = new Element("#message");
    }

    async visit() {
        await page.goto("http://nine.websudoku.com/");
        await this.puzzleGrid.waitUntilVisible();
    }

    async getPuzzle() {
        const puzzleArray = await page.evaluate(() =>
            Array.from(document.querySelectorAll("#puzzle_grid tr input"), (e) => e.value)
        );
        for (var i = 0; i < puzzleArray.length; i++) {
            if (puzzleArray[i] == "") puzzleArray[i] = ".";
        }
        return puzzleArray.join("");
    }

    async resolvePuzzle() {
        const puzzleArray = await page.evaluate(() =>
            Array.from(document.querySelectorAll("#puzzle_grid tr input"), (e) => e.value)
        );
        for (var i = 0; i < puzzleArray.length; i++) {
            if (puzzleArray[i] == "") puzzleArray[i] = ".";
        }
        const solvedPuzzle = await solver.solve(puzzleArray.join(""), { result: "array" });
        console.log(`Unresolved Puzzle: ${puzzleArray}`);
        console.log(`Solved Puzzle: ${solvedPuzzle}`);

        for (i = 0; i < puzzleArray.length; i++) {
            if (puzzleArray[i] == ".") {
                //await page.evaluate((i) => document.querySelectorAll("#puzzle_grid tr input")[i].click(), i);
                // those ugly ifs are workaraound of line above as it si not working as expected.
                if (i >= 0 && i <= 8) {
                    var tr = 1;
                    var td = i + 1;
                }
                if (i >= 9 && i <= 17) {
                    tr = 2;
                    td = i - 8;
                }
                if (i >= 18 && i <= 26) {
                    tr = 3;
                    td = i - 17;
                }
                if (i >= 27 && i <= 35) {
                    tr = 4;
                    td = i - 26;
                }
                if (i >= 36 && i <= 44) {
                    tr = 5;
                    td = i - 35;
                }
                if (i >= 45 && i <= 53) {
                    tr = 6;
                    td = i - 44;
                }
                if (i >= 54 && i <= 62) {
                    tr = 7;
                    td = i - 53;
                }
                if (i >= 63 && i <= 71) {
                    tr = 8;
                    td = i - 62;
                }
                if (i >= 72 && i <= 80) {
                    tr = 9;
                    td = i - 71;
                }
                var selector = `#puzzle_grid tr:nth-child(${tr}) > td:nth-child(${td}) > input`;
                await page.click(selector);
                await page.keyboard.type(`${solvedPuzzle[i]}`, { delay: 100 });
                console.log(`Type solved number: ${solvedPuzzle[i]} into selector ${selector}`);
            }
        }
    }
}
