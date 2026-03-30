import { ENV } from "../../../config/env";

export async function createBoard(boardName: string): Promise<any> {
    const url = `${ENV.apiUrl}/boards?key=${ENV.apiKey}&token=${ENV.apiToken}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: boardName })
    })

    if (!response.ok) {
        throw new Error(`Failed to create board: ${response.status} ${response.statusText}`);
    }
    return response.json();
}