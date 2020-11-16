const note_routes = require("./task1route");

const task1Route = require('./task1route');
const task2Route = require('./task2route');
const task3Route = require('./task3route');

module.exports = function(app){
    task1Route(app);
    task2Route(app);
    task3Route(app);
}