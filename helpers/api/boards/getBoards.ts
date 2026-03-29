import { ENV } from "../../../config/env";

export async function getBoards(): Promise<any[]> {
    const url = `${ENV.apiUrl}/members/me/boards?key=${ENV.apiKey}&token=${ENV.apiToken}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch boards: ${response.status} ${response.statusText}`);
    }
    return response.json();
}