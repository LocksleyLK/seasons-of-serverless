// const axios = require('axios');
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

    const projectId = '0f5a01c9-c091-457a-b01a-a8212c34baf5';
    const customVisionPredictionKey = '2d39aa87defa49a38107e4ed12c85b8b';
    const customVisionPredictionEndPoint = 'https://westus2.api.cognitive.microsoft.com/customvision/v3.0/Prediction/0f5a01c9-c091-457a-b01a-a8212c34baf5/classify/iterations/Iteration1/url'
    if (!customVisionPredictionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }
    
    const credentials = new ApiKeyCredentials({ inHeader: {"Prediction-key": customVisionPredictionKey } });
    const client = new PredictionAPIClient(credentials, customVisionPredictionEndPoint);

    await client
        .classifyImageUrl(projectId, "Iteration1", { url: imageUrl })
        .then(result => {
            let message = "This is not a ladoo :(.";
            if (result.predictions[0].tagName === "ladoo") {
                message = "This is a ladoo :).";
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