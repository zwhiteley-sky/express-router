const request = require("supertest");
const app = require("./src/app");
const seed = require("./seed");
const { seedUsers, seedFruits } = require("./seedData");

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

    test("cannot create user with whitespace name", async () => {
        const send_data = { name: "     ", age: 18 };

        const response = await request(app)
            .post("/users")
            .send(send_data)
            .expect(400);
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

describe("/fruits tests", () => {
    beforeEach(async () => {
        await seed();
    });

    test("can get all fruits", async () => {
        const response = await request(app).get("/fruits");
        expect(response.body).toMatchObject(seedFruits);
    });

    test("can get fruit", async () => {
        const response = await request(app).get("/fruits/2");
        expect(response.body).toMatchObject(seedFruits[1]);
    });

    test("can create fruit", async () => {
        const send_data = { name: "Zach-Fruit", color: "Rainbow" };

        const response = await request(app)
            .post("/fruits")
            .send(send_data);
    
        expect(response.body).toMatchObject(send_data);
        
        const get_response = await request(app).get("/fruits/" + response.body.id.toString());
        expect(get_response.body).toMatchObject(send_data);
    });

    test("cannot create fruit", async () => {
        const send_data = { name: "D", color: "   " };

        const response = await request(app)
            .post("/fruits")
            .send(send_data)
            .expect(400);
    });

    test("can update fruit", async () => {
        const send_data = { name: "Zach-Fruit" };

        const response = await request(app)
            .put("/fruits/3")
            .send(send_data);
    
        expect(response.body).toMatchObject(send_data);
        
        const get_response = await request(app).get("/fruits/3");
        expect(get_response.body).toMatchObject({ ...seedFruits[2], ...send_data });
    });

    test("can update fruit", async () => {
        const response = await request(app)
            .delete("/fruits/1");
    
        expect(response.body).toMatchObject(seedFruits[0]);
        
        const get_response = await request(app).get("/fruits/1").expect(404);
    });
});
