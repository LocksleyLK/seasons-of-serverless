// My solution assumes 1 pound of ground lamb can create 4 kebabs each with a length 
// of 6 inches. Two kilograms of lamb equates to 4.4 pounds which could create a 105 
// inch kebab.

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const kilos = (req.query.kilos || (req.body && req.body.kilos));
    const responseMessage = kilos
        ? `You have ${kilos} kilos of ground lamb. 

Kebab Recipe:
Ground lamb: ${(kilos)} kilos
Small onions: ${(kilos / 2).toFixed(2)}
Cloves of garlic: ${((kilos * 4) / 2).toFixed(2)}
Ground cumin (divided): ${((kilos * 1.5) / 2).toFixed(2)} teaspoons
Ground sumac: ${((kilos * 1.5) / 2).toFixed(2)} teaspoons
Salt: ${((kilos * .5) / 2).toFixed(2)} teaspoons
Ground black pepper: ${((kilos * .25) / 2).toFixed(2)} teaspoons
Red pepper flakes: ${((kilos * .25) / 2).toFixed(2)} teaspoons

With this recipe, you could create a kebab that is:
${((kilos * 105) / 2).toFixed(2)} inches
or
${(((kilos * 105) / 2) / 12 ).toFixed(2)} feet`

        :
        "Please input your amount of ground lamb in kilograms!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}



