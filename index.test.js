const request = require("supertest");
const app = require("./src/app");
const seed = require("./seed");
const { seedUsers } = require("./seedData");

describe("/users tests", () => {
    beforeEach(async () => {
        await seed();
    });

    test("can get all users", async () => {
        const response = await request(app).get("/users");
        expect(response.body).toMatchObject(seedUsers);
    });

    test("can get user", async () => {
        const response = await request(app).get("/users/2");
        expect(response.body).toMatchObject(seedUsers[1]);
    });

    test("can create user", async () => {
        const send_data = { name: "Zachary", age: 18 };

        const response = await request(app)
            .post("/users")
            .send(send_data);
    
        expect(response.body).toMatchObject(send_data);
        
        const get_response = await request(app).get("/users/" + response.body.id.toString());
        expect(get_response.body).toMatchObject(send_data);
    });

    test("can update user", async () => {
        const send_data = { name: "Zachary" };

        const response = await request(app)
            .put("/users/3")
            .send(send_data);
    
        expect(response.body).toMatchObject(send_data);
        
        const get_response = await request(app).get("/users/3");
        expect(get_response.body).toMatchObject({ ...seedUsers[2], ...send_data });
    });

    test("can update user", async () => {
        const response = await request(app)
            .delete("/users/1");
    
        expect(response.body).toMatchObject(seedUsers[0]);
        
        const get_response = await request(app).get("/users/1").expect(404);
    });
});
