const request = require('request');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const imageUrl = (req.query.url || (req.body && req.body.url));
    const responseMessage = imageUrl
        ? "Hello, " + imageUrl + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        // If you have an image URL:
        // https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/0f5a01c9-c091-457a-b01a-a8212c34baf5/classify/iterations/Iteration1/url
        // Set Prediction-Key Header to : 2d39aa87defa49a38107e4ed12c85b8b
        // Set Content-Type Header to : application/json
        // Set Body to : {"Url": "https://example.com/image.png"}
        // If you have an image file:
        // https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/0f5a01c9-c091-457a-b01a-a8212c34baf5/classify/iterations/Iteration1/image
        // Set Prediction-Key Header to : 2d39aa87defa49a38107e4ed12c85b8b
        // Set Content-Type Header to : application/octet-stream
        // Set Body to : <image file>

        // let subscriptionKey = process.env['COMPUTER_VISION_SUBSCRIPTION_KEY'];
        let subscriptionKey = '2d39aa87defa49a38107e4ed12c85b8b';
        let endpoint = 'https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/0f5a01c9-c091-457a-b01a-a8212c34baf5/classify/iterations/Iteration1/url'
        if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }

        var uriBase = endpoint + 'vision/v3.1/analyze';

        const imageUrl =
            'https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg';


        const options = {
            uri: uriBase,
            body: '{"Url": ' + '"' + imageUrl + '"}',
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key' : subscriptionKey
            }
        };

        request.post(options, (error, response, body) => {
        if (error) {
            console.log('Error: ', error);
            return;
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
        });

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}



    // module.exports = async function (context, req) {
    //     context.log('JavaScript HTTP trigger function processed a request.');

    //     const weight = (req.query.weight || (req.body && req.body.weight));
    //     const responseMessage = weight
    //         ? `Your turkey weighs ${weight} lbs. 

    // Brine Instructions:
    // Salt: ${(0.05 * weight).toFixed(2)} cups
    // Water: ${(0.66 * weight).toFixed(2)} gallons
    // Brown Sugar: ${(0.13 * weight).toFixed(2)} cups
    // Shallots: ${(0.2 * weight).toFixed(2)} 
    // Cloves of garlic: ${(0.4 * weight).toFixed(2)}
    // Whole peppercorns: ${(0.13 * weight).toFixed(2)} tablespoons
    // Dried juniper berries: ${(0.13 * weight).toFixed(2)} tablespoons
    // Fresh rosemary: ${(0.13 * weight).toFixed(2)} tablespoons
    // Thyme: ${(0.06 * weight).toFixed(2)} tablespoons

    // Brine Time: ${(2.4 * weight).toFixed(2)} hours

    // Roast Time: ${(15 * weight).toFixed(2)} minutes`
    //         :
    //         "Please provide a weight for your turkey!";

    //     context.res = {
    //         // status: 200, /* Defaults to 200 */
    //         body: responseMessage
    //     };
    // }