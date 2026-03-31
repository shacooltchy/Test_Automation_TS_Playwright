import { ENV } from "../../../config/env";

export async function closeBoard(boardId: string): Promise<void> {
    const url = `${ENV.apiUrl}/boards/${boardId}?key=${ENV.apiKey}&token=${ENV.apiToken}&closed=true`;
    const response = await fetch(url, {
        method: 'PUT'
    });
    if (!response.ok) {
        throw new Error(`Failed to close board: ${response.status} ${response.statusText}`);
    }
}