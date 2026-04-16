export function randomName(prefix: string): string {
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    const rand = Math.random().toString(36).substring(2, 6);
    return `${prefix} ${timeStamp}-${rand}`;
}