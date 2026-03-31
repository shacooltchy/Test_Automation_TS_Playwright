import { closeBoard } from "../api/boards/closeBoard";
import { getBoards } from "../api/boards/getBoards";

export async function closeTestBoard(boardName: string): Promise<void> {
    const boards = await getBoards();
    const board = boards.find((b: any) => b.name === boardName);
    if (board) {
        await closeBoard(board.id);
    }
}