import { ENV } from "../../../config/env";

export async function deleteBoard(boardId: string): Promise<void> {
    const url = `${ENV.apiUrl}/boards/${boardId}?key=${ENV.apiKey}&token=${ENV.apiToken}`;
    await fetch(url, {method: 'DELETE'});
}