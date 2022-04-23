const Polygon = require('./Polygon');
const fetch = require('node-fetch')
const RequestLooper = require('./RequestLooper');

const apiKey = "O2KxoBKuCXuLpoT0xyv3Rpb2Q1SROZTz";

const stockCodes = require('../assets/supportedStocks.json')

// create the requesters
const stockRequesters = stockCodes.map((code) => new Polygon.PolygonStockRequests(code, apiKey)); // for specific stocks
const requester = new Polygon.PolygonRequests(apiKey); // for all stocks

// create the request loopers for each type of request
const aggregatesRequestLooper = new RequestLooper(
    stockRequesters.flatMap(requester => [
        requester.Aggregates
    ]), (request, value) => {
        console.log(value);
    });

const previousCloseRequestLooper = new RequestLooper(
    stockRequesters.flatMap(requester => [
        requester.PreviousClose
    ]), (request, value) => {
        console.log(value);
    });

const dailyOpenCloseRequestLooper = new RequestLooper(stockRequesters.flatMap(requester => [
    () => requester.DailyOpenClose({
        get date(){
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday;
        }
    }),
]), (request, value) => {
    console.log(value);
    
    delete value.status;

    fetch("http://localhost:3001/query/stockopenclose",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value)
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
});

const dailyOpenCloseAllRequestLooper = new RequestLooper([
    () => requester.GroupedDaily({
        date: yesterday
    })
], (request, value) => {
    console.log(value);
});

// export all of the 
module.exports = {
    aggregates: aggregatesRequestLooper,
    previousClose: previousCloseRequestLooper,
    dailyOpenClose: dailyOpenCloseRequestLooper,
    dailyOpenCloseAll: dailyOpenCloseAllRequestLooper
}