import { ENV } from "../../../config/env";

export async function createChecklist(checklistTitle: string, idCard: string) {
    const url = `${ENV.apiUrl}/checklists?idCard=${idCard}&name=${checklistTitle}&key=${ENV.apiKey}&token=${ENV.apiToken}`;
    const response = await fetch(url, {
        method: 'POST'
    })
        
    if (!response.ok) {
        throw new Error(`Failed to create checklist: ${response.status} ${response.statusText}`);
    }
    return response.json();
}