// Funkcja do ładowania treści z pliku JSON
function loadContent(page) {
    let content = document.getElementById('content');
    let diagram = document.getElementById('raid-diagram');
    let comparisonTable = document.getElementById('comparison-table');

    // Wyczyść zawartość przed załadowaniem nowej
    content.innerHTML = '<p>Ładowanie...</p>';
    diagram.innerHTML = '';
    comparisonTable.style.display = 'none'; // Ukryj tabelę porównawczą domyślnie

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            let pageData = data[page];
            if (pageData) {
                content.innerHTML = `
                    <h1>${pageData.title}</h1>
                    ${pageData.content}
                `;
                if (page === 'comparison') {
                    comparisonTable.style.display = 'block'; // Pokaż tabelę porównawczą
                }
                loadRaidDiagram(page);
            } else {
                content.innerHTML = "<p>Brak danych do wyświetlenia.</p>";
            }
        })
        .catch(err => {
            console.error('Błąd ładowania treści:', err);
            content.innerHTML = "<p>Wystąpił błąd podczas ładowania treści.</p>";
        });
}

// Funkcja do animowania diagramów RAID
function loadRaidDiagram(page) {
    let diagram = document.getElementById('raid-diagram');
    diagram.innerHTML = '';

    if (page === 'raid1') {
        diagram.innerHTML = `<div class="raid-diagram">RAID 1: Mirror</div>`;
    } else if (page === 'raid5') {
        diagram.innerHTML = `<div class="raid-diagram">RAID 5: Striping + Parity</div>`;
    } else if (page === 'raid10') {
        diagram.innerHTML = `<div class="raid-diagram">RAID 10: Mirror + Striping</div>`;
    } else if (page === 'comparison') {
        diagram.innerHTML = `<div class="raid-diagram">Porównanie RAID - Tabela</div>`;
    } else {
        diagram.innerHTML = `<div class="raid-diagram">Brak wizualizacji</div>`;
    }
}

// Funkcja do rozwijania odpowiedzi w FAQ
function toggleFAQ(id) {
    let faqAnswer = document.getElementById(id);
    faqAnswer.style.display = (faqAnswer.style.display === 'block') ? 'none' : 'block';
}

// Funkcja wyszukiwania treści
function searchContent() {
    let searchInput = document.getElementById('search-input').value.toLowerCase();
    let content = document.getElementById('content');
    if (content.innerText.toLowerCase().includes(searchInput)) {
        content.style.backgroundColor = '#FFFF99'; // Zmieniamy kolor tła, gdy znaleziono
    } else {
        content.style.backgroundColor = 'white'; // Przywróć tło
    }
}

// Funkcja sortowania tabeli po kliknięciu nagłówków
function sortTable(columnIndex) {
    let table = document.getElementById("raid-comparison-table");
    let rows = Array.from(table.rows).slice(1);
    let isAscending = table.rows[0].cells[columnIndex].classList.toggle("ascending");

    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].innerText;
        let cellB = rowB.cells[columnIndex].innerText;

        if (isNaN(cellA) || isNaN(cellB)) {
            return cellA.localeCompare(cellB);
        }
        return cellA - cellB;
    });

    rows.forEach(row => table.appendChild(row));
}

// Funkcja do przełączania trybu ciemnego
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
}
