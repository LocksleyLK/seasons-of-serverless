/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

const df = require("durable-functions");

const ChocolateBox = [
    "Dark Sea Salt Caramel",
    "Milk Sea Salt Caramel",
    "Apple Cider Caramel",
    "Almond Butter Crunch",
    "Cherry Codial",
    "Coconut Delight",
    "Dipped Pineapple",
    "Dipped Apricot",
    "Dipped Orange Peel",
    "Espresso Shot",
    "Peanut Butter Chocolate",
    "Raspberry Vienna",
    "Almond Caramel Cluster",
    "Macadamia Caramel Cluster",
    "Pecan Caramel Cluster",
    "Pretzel Caramel Cluster"
];

let Chocolates = {
    available: ChocolateBox,
    reserved: {}
};

module.exports = df.entity(function(context) {
    const currentValue = context.df.getState(() => 0);
    switch (context.df.operationName) {
        case "add":
            const {name, item} = context.df.getInput();
            if(currentValue.available.includes(item)) {
                currentValue.available.splice(currentValue.available.indexOf(item), 1);
                if (currentValue.reserved[name]) {
                    currentValue.reserved[name].push(item);
                } else {
                    currentValue.reserved[name] = [ item ];
                }
            }
            context.df.setState(currentValue);
            break;
        case "reset":
            context.df.setState(Chocolates);
            break;
        case "get":
            context.df.return(currentValue);
            break;
    }
});