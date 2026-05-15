import { ENV } from "../../../config/env";

export async function createCheckitemOnChecklist(checkItemName: string, checklistId: string) {
    const url = `${ENV.apiUrl}/checklists/${checklistId}/checkItems?&name=${checkItemName}&key=${ENV.apiKey}&token=${ENV.apiToken}`;
    const response = await fetch(url, {
        method: 'POST'
    });

    if (!response.ok) {
        throw new Error(`Failed to create checklist item: ${response.status} ${response.statusText}`);
    }

    return response.json();
}