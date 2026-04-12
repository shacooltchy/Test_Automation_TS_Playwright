import { ENV } from "../../../config/env";

export async function archiveUnarchiveCard(cardId: string, archived: boolean) {
    const url = `${ENV.apiUrl}/cards/${cardId}?closed=${archived}&key=${ENV.apiKey}&token=${ENV.apiToken}`

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!(response).ok) {
        if(archived) {
            throw new Error(`Failed to archive the card: ${response.status} ${response.statusText}`);
        } else {
            throw new Error(`Failed to unarchive the card: ${response.status} ${response.statusText}`);
        }
    }
}