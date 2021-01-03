const df = require("durable-functions");

module.exports = async function (context, req) {
    try {
        const name = (req.query.name || (req.body && req.body.name));
        const item = (req.query.item || (req.body && req.body.item));
        const reset = (req.query.reset || (req.body && req.body.reset));

        const client = df.getClient(context);
        const entityId = new df.EntityId("Chocolate", "myChocolate");
        let responseMessage = "";

        if (req.method === "DELETE" || reset) {
            await client.signalEntity(entityId, "reset")
            responseMessage = "All reservations have been cleared.";
        } else {
            if (!name || !item) {
                context.res = {
                    status: 400,
                    body: "name and item parameters are required"
                };
                return;
            }
            await client.signalEntity(entityId, "add", {name, item});
            responseMessage = "Updated reservations";
        }

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { message:"error", error }
        };
    }
};
