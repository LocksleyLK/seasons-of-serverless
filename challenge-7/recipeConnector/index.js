var accountSid = "ACd37b5f8a97b37ca49255e52c3d59d4c9"; // Your Account SID from www.twilio.com/console
var authToken = "83228eb6237021380bce3f365002adca";   // Your Auth Token from www.twilio.com/console

const twilioClient = require('twilio')(accountSid, authToken);

const jollof = `Authentic Jollof Recipe

Ingredients
- 5 medium sized Roma tomatoes, roughly chopped
- 1 red bell pepper, roughly chopped
- 1 medium sized onion, roughly chopped, set aside
- 2 scotch bonnet peppers (habanero peppers as they are sometimes called)
- 1/4 cup of groundnut oil
- 3 tbsp tomato paste
- 2 cups of parboiled rice
- 2 1/2 cups of chicken stock
- 1 tsp salt to taste
- 1/2 tsp curry powder
- 1/2 tsp thyme
- 1 tsp All purpose seasoning
- 1 Knorr stock cube
- 3 bay leaves
- Water, as needed

Instructions
Blend your tomatoes, red pepper, scotch bonnet peppers in a food processor or blender for about 45 seconds, make sure that everything is blended well.
In a medium sized pot, heat your oil on medium-high heat. Once the oil is heated add the onions you set aside and fry just until they turn golden brown. Once the onions, have turned brown in color add the tomato paste and fry for 2-3 minutes. Then add the blended tomato mixture (reserve about 1/4 cup and set aside) and fry the mixture with the onions and tomato paste for about 30 minutes. Make sure you stir consistently so that the tomato mixture does not burn.
After 30 minutes, turn the heat down to medium, and add the chicken stock. Mix and add your seasonings (salt, curry powder, thyme, all purpose seasoning, and the Knorr stock cube). Continue to boil for 10 minutes.
Add the parboiled rice** to the pot. Mix it very well with the tomato stew. At this point if you need to add water so that the rice is level with the tomato mixture/chicken stock go ahead and do so. Add the bay leaves, cover the pot, and cook on medium to low heat for 15-30 minutes.
When the liquid has almost dried up add the remaining tomato stew**, cover, and let it cook for another 5-10 minutes heat until the liquid has completely dried up. Turn off the heat, mix thoroughly, and your Jollof Rice is ready to be eaten!`


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const phoneNumber = (req.query.phoneNumber || (req.body && req.body.phoneNumber));
    const recipeName = (req.query.recipeName || (req.body && req.body.recipeName));
    
    var msg = "Please enter a recipeName to get an authentic recipe!"
    
    if (recipeName) {
        msg = jollof;
    }

    let messageSegments = msg.match(/(.|[\r\n]){1,1200}/g);

    for (let i = 0; i < messageSegments.length; i++) {
        const segment = messageSegments[i];
        await twilioClient.messages.create({
            from: "+12015142368",
            to: phoneNumber,
            body: segment
          });      
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Watch your text messages for the recipe :)"
    };
};