import { deleteBoard } from "../api/boards/deleteBoard";
import { getBoards } from "../api/boards/getBoards";

export async function deleteTestBoard(boardName: string): Promise<void> {
    const boards = await getBoards();
    const board = boards.find((b: any) => b.name === boardName);
    if (board) {
        await deleteBoard(board.id);
    }
}