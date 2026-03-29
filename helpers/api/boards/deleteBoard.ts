import { ENV } from "../../../config/env";

export async function deleteBoard(boardId: string): Promise<void> {
    const url = `${ENV.apiUrl}/boards/${boardId}?key=${ENV.apiKey}&token=${ENV.apiToken}`;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error(`Failed to delete board: ${response.status} ${response.statusText}`);
    }

}