module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const budget = (req.query.budget || (req.body && req.body.budget));
    const responseMessage = budget
        ? `You have a budget of $${budget}.
        
Number of people you can invite: ${(budget / 22).toFixed()}

BBQ Recipe:
Beef: ${((budget / 22).toFixed() * 0.25).toFixed(2)} kilos
Fillet: ${((budget / 22).toFixed() * 0.2).toFixed(2)} kilos
Sausages: ${((budget / 22).toFixed() * 0.3).toFixed(2)} kilos
Grilled sausage: ${((budget / 22).toFixed() * 2)} pieces
Garlic bread: ${((budget / 22).toFixed() * 2)} pieces
Chicken: ${((budget / 22).toFixed() * 0.25).toFixed(2)} kilos

`

        :
        "Please input the number of people attending your BBQ!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}