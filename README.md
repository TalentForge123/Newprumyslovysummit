# Průmyslový Summit - Webová stránka

Toto je minimalistická webová stránka pro Průmyslový Summit, vytvořená podle designu geopaq.com.

## Obsah

Webová stránka obsahuje následující sekce:
- Úvodní stránka s odpočítáváním
- O summitu
- Tematické okruhy
- Řečníci
- Program
- Partneři
- Registrace
- FAQ (Často kladené otázky)
- Kontakt

## Technologie

Stránka je vytvořena pomocí:
- HTML5
- CSS3
- JavaScript (vanilla)

## Struktura souborů

```
prumyslovy-summit-new/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── (zde můžete přidat obrázky)
└── index.html
```

## Jak používat

1. Rozbalte ZIP soubor na váš webový server nebo hosting
2. Upravte obsah v souboru `index.html` podle potřeby
3. Pro změnu barev a stylů upravte soubor `css/style.css`
4. Pro úpravu funkcí (odpočítávání, FAQ, atd.) upravte soubor `js/script.js`

## Přizpůsobení

### Změna data summitu

V souboru `js/script.js` upravte řádek:
```javascript
const summitDate = new Date("Nov 14, 2025 09:00:00").getTime();
```

### Přidání obrázků

1. Nahrajte obrázky do složky `images/`
2. Pro přidání obrázku pozadí upravte v souboru `css/style.css` řádek:
```css
.hero {
    background-image: url('../images/hero-bg.jpg');
}
```

### Přidání řečníků

V souboru `index.html` najděte sekci `speakers-grid` a přidejte nové řečníky podle vzoru:
```html
<div class="speaker-card">
    <div class="speaker-image placeholder"></div>
    <h3>Jméno Řečníka</h3>
    <p>Pozice, Společnost</p>
</div>
```

### Úprava programu

V souboru `index.html` najděte sekci `program-content` a upravte položky programu podle vzoru:
```html
<div class="timeline-item">
    <div class="time">10:00 - 11:00</div>
    <div class="event">
        <h3>Název přednášky</h3>
        <p>Jméno přednášejícího</p>
    </div>
</div>
```

## Kontakt

Pro další úpravy nebo dotazy kontaktujte vývojáře.
