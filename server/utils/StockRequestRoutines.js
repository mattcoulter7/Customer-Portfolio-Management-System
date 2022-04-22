const StockRequestLoopers = require('./StockRequestLoopers');
const RoutineTimer = require('./RoutineTimer');

const routines = [
    new RoutineTimer(
        () => StockRequestLoopers.aggregates.OnCycle(),
        () => new Date(new Date().getTime() + 15000)
    ),
    new RoutineTimer(
        () => StockRequestLoopers.dailyOpenCloseAll.OnCycle(),
        () => {
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            return tomorrow;
        }
    )
]

module.exports = {
    startAll: () => {
        routines.forEach(r => r.Start());
    }
}