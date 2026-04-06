import { getBoards } from "../api/boards/getBoards";
import { createList } from "../api/lists/createList";

export async function addListToBoard(newListName: string, boardName: string) {
    const boards = await getBoards();
    const board = boards.find((b: any) => b.name === boardName);
    if (board) {
        await createList(newListName, board.id);
    }
}