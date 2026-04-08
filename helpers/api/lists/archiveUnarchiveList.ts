import { ENV } from "../../../config/env";

export async function archiveUnarchiveList (listId: string, archived: boolean): Promise<void> {
    const url = `https://api.trello.com/1/lists/${listId}/closed?value=${archived}&key=${ENV.apiKey}&token=${ENV.apiToken}`

    const response = await fetch(url, {
        method: 'PUT'
    })
    
    if (!response.ok) {
        throw new Error(`Failed to archive the list: ${response.status} ${response.statusText}`);
    }
}