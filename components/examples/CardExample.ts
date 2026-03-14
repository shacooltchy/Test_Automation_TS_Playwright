import { Locator } from "@playwright/test";

export class Card {
    constructor(private readonly root: Locator) {}

    get title() {
        return this.root.locator('.title');
    }

    get openButton() {
       return this.root.locator('.open');
    }

    async open() {
        await this.openButton.click();
    }
}

/*
Dlaczego root‑based komponenty są tak dobre
Nie zależą od struktury całej strony  
→ tylko od swojego fragmentu.

Można je wielokrotnie używać  
→ np. lista kart, lista produktów, lista użytkowników.

Można je zagnieżdżać  
→ komponent w komponencie.

Są odporne na zmiany UI  
→ zmienia się tylko root lub wewnętrzne selektory.

Testy są czyste i opisują zachowanie, nie DOM.
*/