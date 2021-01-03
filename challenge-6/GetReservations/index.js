const df = require("durable-functions");

module.exports = async function (context) {
    const client = df.getClient(context);
    const entityId = new df.EntityId("Chocolate", "myChocolate");
    const stateResponse = await client.readEntityState(entityId);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: stateResponse.entityState
    };
};
