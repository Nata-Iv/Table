const users = [
   {
       "name": 'Kolya',
       "email": 'nickolay',
       "balance": 345.23,
   },
   {
        "name": 'Polya',
        "email": 'polina',
        "balance": 3452,
        "company": 'VHFJ',
    },
    {
        "name": 'Olya',
        "email": 'olay',
        "balance": 3451,
        "company": 'VHFJ',
        "age": 12,
    },
]

const tableSchema = {
    index: '#',
    name: 'Name',
    email: 'Email',
    age: 'Age',
    company: 'Company',
    balance: 'Balance',
}

function generateThead(tableSchema) {
    const thead = document.createElement('thead');
    const tr = generateTr(tableSchema, 'th');
    thead.appendChild(tr);
    return thead;
}

function generateTr(tableSchema, tagName = 'td') {
    const tr = document.createElement('tr');
    Object.values(tableSchema).forEach(val => {
        const td = document.createElement(tagName);
        td.textContent = val;
        tr.appendChild(td);
    })
    return tr;
}

function generateTbody(tableSchema, items) {
    const tbody = document.createElement('tbody');
    items.forEach((item, index) => {
        item.index = index + 1;
        const itemSchema = generateItemsScheme(tableSchema, item);
        const tr = generateTr(itemSchema, 'td');
        tbody.appendChild(tr);
    })
    return tbody;
}

function generateItemsScheme(tableSchema, item) {
    const itemSchema = Object.keys(tableSchema).reduce((acc, key) => {
        if ( key in item) {
            acc[key] = item[key];
        } else {
            acc[key] = "-";
        }
        return acc;
    }, {})
    return itemSchema;
}

function generateTableTamplate() {
    const table = document.createElement('table');
    table.classList.add('table');
    return table;
}

function generateTotalBalance(tableSchema, items) {
    const total = items.reduce((acc, item) => acc + parseFloat(item.balance), 0);
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const columnCounts = Object.keys(tableSchema).length;
    td.insertAdjacentHTML('beforeend', `Total balance: <b>${total}</b>`);
    td.setAttribute('colspan', columnCounts);
    td.setAttribute('align', 'right');
    tr.appendChild(td);
    return tr;
}

function initTable(tableSchema, items) {
    const container = document.querySelector('.table-container');
    const table = generateTableTamplate();
    const header = generateThead(tableSchema);
    const body = generateTbody(tableSchema, items);
    const balance = generateTotalBalance(tableSchema, items);
    table.appendChild(header);
    table.appendChild(body);
    table.appendChild(balance);
    container.appendChild(table);
}

initTable(tableSchema, users);