import { ENV } from "../../../config/env";

export async function createNewCard(cardTitle: string, idList: string) {
    const url = `${ENV.apiUrl}/cards?idList=${idList}&name=${cardTitle}&key=${ENV.apiKey}&token=${ENV.apiToken}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
        
    if (!response.ok) {
        throw new Error(`Failed to create card: ${response.status} ${response.statusText}`);
    }
    return response.json();
}