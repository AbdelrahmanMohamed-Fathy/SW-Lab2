var items = [], transactions = [], categories = [], fields = {};

function isLowQuantity(item) {
    if (item.quantity < 10)
        return true;
    return false;
}

function alertLowQuantity(item) {
    console.log("ALERT: Item " + item.name + " is below 10 units! Current quantity: " + item.quantity)
}

function addItem(item) {
    var newItem = { name: item[0], category: item[1], quantity: item[2], price: item[3], unit: item[4], added: new Date(), customField: item[5] || {} };
    items.push(newItem);

    if (!categories.includes(newItem.category))
        categories.push(newItem.category);

    transactions.push({ type: "add", item: newItem });
    printDashboard();
}

function editItem(newItemData, oldItemIndex) {
    items[oldItemIndex] = { ...items[oldItemIndex], name: newItemData[0], category: newItemData[1], quantity: newItemData[2], price: newItemData[3], unit: newItemData[4], customField: newItemData[5] || {} };

    transactions.push({ type: "edit", old: items[oldItemIndex], new: newItemData.slice(1) });
    printDashboard();
}

function removeItem(index) {
    items.splice(index, 1);

    transactions.push({ type: "delete", item: items[index] });
    printDashboard();

    if (isLowQuantity(items[index]))
        alertLowQuantity();
}

function printDashboard() {
    console.log("=== Dashboard ===\n",
        "Items: " + items.length + "\n",
        "Total: $" + items.reduce((total, x) => total + x.quantity * x.price, 0).toFixed(2) + "\n",
        "Categories: " + categories.join(', '));

}

function sellItem(itemName, quantityToSell) {
    for (let item of items) {
        if (item.name === itemName) {
            if (item.quantity >= quantityToSell) {
                item.quantity -= quantityToSell;

                transactions.push({ type: "sale", item: item, quantitySold: quantityToSell, date: new Date() });
                console.log(`Sold ${quantityToSell} ${item.unit} of ${item.name}`);

                if (isLowQuantity(items[index]))
                    alertLowQuantity();
                break;
            }
        }
    }
}

function restockItem(itemName, quantityToRestock) {
    for (let item of items) {
        if (item.name === itemName) {
            if (item.quantity >= quantityToRestock) {
                item.quantity += quantityToRestock;
                transactions.push({ type: "restock", item: item, qunatityRestocked: item[1], date: new Date() });
                console.log(`Restocked ${quantityToRestock} ${item.unit} of ${item.name}`);
                break;
            }
        }
    }
}



function chooseFunction(item, operation, operationParameter = 0) {
    /*
    item: [0:name 1:category 2:qunatity 3:price 4:unit 5:customField]

    operationParamters for each operation:
    add: no paramater
    edit: index to edit
    remove: index to remove
    sale: amount to sell
    restock: amount to restock
    search: no paramater
    viewInventory: no paramater
    exportAll: no parameter
    viewTransactions: no parameter
    viewInventoryAge: no parameter
    import: no parameter
    addField: field name
    updateCustomField: no paramter
    */

    switch (operation) {
        case "add":
            addItem(item);
            break;
        case "edit":
            editItem(item, operationParameter);
            break;
        case "remove":
            removeItem(operationParameter);
            break;
        case "sale":
            sellItem(item[0], operationParameter);
            break;
        case "restock":
            restockItem(item[0], operationParameter);
            break;
        case "search":
            console.log(items.filter(x => [x.name, x.category, x.price].some(v => v.toString().toLowerCase().includes(item[0].toLowerCase()))));
            break;
        case "viewInventory":
            console.log("=== Inv ===", items);
            break;
        case "exportAll":
            console.log("CSV:\n" + ["Name,Category,Quantity,Price,Unit,AddedAt"].concat(items.map(x => Object.values(x).join(','))).join('\n'));
            break;
        case "viewTransactions":
            console.log("Transactions:\n", transactions);
            break;
        case "viewInventoryAge":
            console.log(items.map(x => `${x.n}: ${Math.floor((new Date() - new Date(x.added)) / (1000 * 60 * 60 * 24))}d`).join('\n'));
            break;
        case "import":
            item[0].forEach(x => doStuff("add", [x.name, x.category, x.quantity, x.price, x.unit]));
            break;
        case "addField":
            if (!fields[operationParameter])
                fields[operationParameter] = null;
            break;
        case "updateCustomField":
            items.find(x => x.name === item[0])?.customField[item[1]] = item[2];
            break;
        default:
            return;
    }
}