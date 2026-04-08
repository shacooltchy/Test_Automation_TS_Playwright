import { ENV } from "../../../config/env";

export async function createList(listName: string, idBoard: string): Promise<any> {
    const url = `${ENV.apiUrl}/lists?key=${ENV.apiKey}&token=${ENV.apiToken}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: listName, idBoard: idBoard })
    })
    
    if (!response.ok) {
        throw new Error(`Failed to create list: ${response.status} ${response.statusText}`);
    }
    return response.json();
}