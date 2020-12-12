const { PredictionAPIClient } = require("@azure/cognitiveservices-customvision-prediction");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const imageUrl = (req.query.url || (req.body && req.body.url));

    if (!imageUrl) {
        context.res = {
            status: 400,
            body: 'Image url is required'
        };
        return;
    }

    const projectId = '4043b065-8fd5-4dca-82b2-ca7dcb695093';
    const customVisionPredictionKey = '7645e19da1874fd5a68700b810ae5376';
    const customVisionPredictionEndPoint = 'https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/4043b065-8fd5-4dca-82b2-ca7dcb695093/classify/iterations/Iteration4/url'
    if (!customVisionPredictionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }
    
    const credentials = new ApiKeyCredentials({ inHeader: {"Prediction-key": customVisionPredictionKey } });
    const client = new PredictionAPIClient(credentials, customVisionPredictionEndPoint);

    await client
        .classifyImageUrl(projectId, "bird-vision", { url: imageUrl })
        .then(result => {
            let message = "";
            if (result.predictions[0].tagName === "anna") {
                message = "🌼 This is an Anna's Hummingbird.";
            }
            else if (result.predictions[0].tagName === "black-chinned") {
                message = "💐 This is a Black-chinned Hummingbird.";
            }
            else if (result.predictions[0].tagName === "calliope") {
                message = "🌻 This is a Calliope Hummingbird.";
            }
            else if (result.predictions[0].tagName === "rufous") {
                message = "🌺 This is a Rufous Hummingbird.";
            }   
            else {
                message = "🐦 This is not a hummingbird :(";
            }         

            context.res = {
                body: message
            };
        })
        .catch(err => {
            console.log("An error occurred:");
            console.error(err);

            context.res = {
                status: 502,
                body: err
            };
        });    
}