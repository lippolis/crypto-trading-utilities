let container = [];
let resultsLength = 0;

let getData = async function(botId = 0, page = 1, perPage = 100) {
    console.log(`Fetching page n. ${page}...`)
    await fetch(`https://3commas.io/marketplace/${botId}/signals?page=${page}&per_page=${perPage}&order_by=&order_direction=desc`)
        .then(response => response.json())
        .then(data => { 
            resultsLength = data.total;
            container = container.concat(data.items)
        });
}

let firstCatch = async function(botId) {
   await getData(botId);
   return resultsLength;
}

let convertToCSV = function(itemsArray) {
    return [
        [
            "min",
            "avg",
            "max",
            "pair",
            "signal_type",
            "exchange",
            "date",
        ],
            ...itemsArray.map(item => [
            parseFloat(item.min).toFixed(3),
            parseFloat(item.avg).toFixed(3),
            parseFloat(item.max).toFixed(3),
            item.pair,
            item.signal_type,
            item.exchange,
            item.date,
        ])
    ]
   .map(e => e.join(",")) 
   .join("\n");
   
}

let init = async function(botId) {
    
    let length = await firstCatch(botId);
    let pages = length / 100
    
    if(length % 100 > 0)
        pages += 1;
    
    for (i = 2; i <= pages; i++)
        await getData(botId, i)
}

let result = await init(119);

console.log(convertToCSV(container))