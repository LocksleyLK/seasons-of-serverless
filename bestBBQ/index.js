module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const budget = (req.query.budget || (req.body && req.body.budget));

    const beefKilos = parseFloat(req.query.beefKilos || (req.body && req.body.beefKilos));
    const filletKilos = parseFloat(req.query.filletKilos || (req.body && req.body.filletKilos));
    const sausagesKilos = parseFloat(req.query.sausagesKilos || (req.body && req.body.sausagesKilos));
    const grilledCheesePieces = parseFloat(req.query.grilledCheesePieces || (req.body && req.body.grilledCheesePieces));
    const garlicBreadPieces = parseFloat(req.query.garlicBreadPieces || (req.body && req.body.garlicBreadPieces));
    const chickenKilos = parseFloat(req.query.chickenKilos || (req.body && req.body.chickenKilos));

    const beefPrice = parseFloat(req.query.beefPrice || (req.body && req.body.beefPrice));
    const filletPrice = parseFloat(req.query.filletPrice || (req.body && req.body.filletPrice));
    const sausagesPrice = parseFloat(req.query.sausagesPrice || (req.body && req.body.sausagesPrice));
    const grilledCheesePrice = parseFloat(req.query.grilledCheesePrice || (req.body && req.body.grilledCheesePrice));
    const garlicBreadPrice = parseFloat(req.query.garlicBreadPrice || (req.body && req.body.garlicBreadPrice));
    const chickenPrice = parseFloat(req.query.chickenPrice || (req.body && req.body.chickenPrice));


    if (!budget) {
        context.res = {
            status: 400,
            body: "Parameter budget is required."
        };

        return;
    }

    // We are assuming the average guest will consume 1 kilo of meet and 0.65 peices of grilled cheese and garlic bread

    totalFood = beefKilos + filletKilos + sausagesKilos + grilledCheesePieces + garlicBreadPieces + chickenKilos;

    const budgetReport = beefPrice + filletPrice + sausagesPrice + grilledCheesePrice + garlicBreadPrice + chickenPrice;

    const responseMessage = budget

        ? `You have a budget of $${budget}.

Amount of food:
Beef: ${(beefKilos)} kilos - $${(beefPrice)}
Fillet: ${(filletKilos)} kilos - $${(filletPrice)}
Sausages: ${(sausagesKilos)} kilos - $${(sausagesPrice)}
Grilled cheese: ${(grilledCheesePieces)} pieces - $${(grilledCheesePrice)}
Garlic bread: ${(garlicBreadPieces)} pieces - $${(garlicBreadPrice)}
Chicken: ${(chickenKilos)} kilos - $${(chickenPrice)}

You could serve ${(totalFood / 1.65).toFixed()} people

Budget left over: ${(budget - budgetReport)} dollars
`

        :
        "Please input your BBQ budget!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}