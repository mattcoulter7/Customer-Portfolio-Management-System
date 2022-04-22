const Polygon = require('./Polygon');
const RequestLooper = require('./RequestLooper');

const apiKey = "O2KxoBKuCXuLpoT0xyv3Rpb2Q1SROZTz";

const stockCodes = require('../assets/supportedStocks.json')

// create the requesters
const stockRequesters = stockCodes.map((code) => new Polygon.PolygonStockRequests(code, apiKey)); // for specific stocks
const requester = new Polygon.PolygonRequests(apiKey); // for all stocks

let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

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
        date: yesterday
    }),
]), (request, value) => {
    console.log(value);
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