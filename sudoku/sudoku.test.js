import SudokuPage from "./sudokuPage";
const SudokuSolver = require("sudoku-solver-js");

describe("Sudoku", () => {
    let sudokuPage = new SudokuPage();
    var solver = new SudokuSolver();

    beforeEach(async () => {
        console.log("Running test: " + jasmine["currentTest"].fullName);
    });

    it("resolve", async () => {
        await sudokuPage.visit();
        const puzzle = await sudokuPage.getPuzzle();
        const solvedPuzzle = await solver.solve(puzzle);
        const cheat = await sudokuPage.cheat.value();
        expect(solvedPuzzle).toEqual(cheat);
        console.log(`Solved answer: ${solvedPuzzle}`);
        console.log(`Cheat answer: ${cheat}`);
    });

    it("resolve and input", async () => {
        await sudokuPage.visit();
        await sudokuPage.resolvePuzzle();
        await sudokuPage.checkResult.click();
        await page.waitFor(500);
        expect(await sudokuPage.message.text()).toEqual("Congratulations! You solved this Sudoku!");
    });
});
