const prices = [
    { effectiveDate: new Date(2021, 8, 1, 5, 0, 0), price: 35464.53 },
    { effectiveDate: new Date(2021, 8, 2, 5, 0, 0), price: 35658.76 },
    { effectiveDate: new Date(2021, 8, 3, 5, 0, 0), price: 36080.06 },
    { effectiveDate: new Date(2021, 8, 3, 13, 0, 0), price: 37111.11 },
    { effectiveDate: new Date(2021, 8, 6, 5, 0, 0), price: 38041.47 },
    { effectiveDate: new Date(2021, 8, 7, 5, 0, 0), price: 34029.61 },
];

const transactions = [
    { effectiveDate: new Date(2021, 8, 1, 9, 0, 0), value: 0.012 },
    { effectiveDate: new Date(2021, 8, 1, 15, 0, 0), value: -0.007 },
    { effectiveDate: new Date(2021, 8, 4, 9, 0, 0), value: 0.017 },
    { effectiveDate: new Date(2021, 8, 5, 9, 0, 0), value: -0.01 },
    { effectiveDate: new Date(2021, 8, 7, 9, 0, 0), value: 0.1 },
];

export function getDailyPortfolioValues() {

    const startReport = new Date(2021, 8, 1, 1);
    const endReport = new Date(2021, 8, 7, 1);
    let dateCounter = new Date(startReport);
    let currentValue = 0;
    let dailyValues = [];

    while (dateCounter <= endReport){

        let obj = {};
        let unitTransactionList = [];
        let nextDay = new Date(dateCounter);
        nextDay.setDate(dateCounter.getDate() + 1);

        transactions.forEach(transactionItem => {
            if (transactionItem.effectiveDate < nextDay){
                unitTransactionList.push(transactionItem.value);
            }
        });

        const unitsHeld = unitTransactionList.reduce((total, amount) => total + amount);
        const filterPrices = prices.filter(x => x.effectiveDate < nextDay).map(x => x.price);
        const currentPrice = filterPrices[filterPrices.length-1];
        
        currentValue = unitsHeld * currentPrice;
        obj["effectiveDate"] = dateCounter;
        obj["value"] = parseFloat(currentValue.toFixed(5));
        dailyValues.push(obj);
        dateCounter = new Date(nextDay);
    }

    return dailyValues;
}
