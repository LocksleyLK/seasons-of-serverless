module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const weight = (req.query.weight || (req.body && req.body.weight));
    const responseMessage = weight
        ? `Your turkey weighs ${weight} lbs. 

Brine Instructions:
Salt: ${(0.05 * weight).toFixed(2)} cups
Water: ${(0.66 * weight).toFixed(2)} gallons
Brown Sugar: ${(0.13 * weight).toFixed(2)} cups
Shallots: ${(0.2 * weight).toFixed(2)} 
Cloves of garlic: ${(0.4 * weight).toFixed(2)}
Whole peppercorns: ${(0.13 * weight).toFixed(2)} tablespoons
Dried juniper berries: ${(0.13 * weight).toFixed(2)} tablespoons
Fresh rosemary: ${(0.13 * weight).toFixed(2)} tablespoons
Thyme: ${(0.06 * weight).toFixed(2)} tablespoons

Brine Time: ${(2.4 * weight).toFixed(2)} hours

Roast Time: ${(15 * weight).toFixed(2)} minutes`
        :
        "Please provide a weight for your turkey!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}