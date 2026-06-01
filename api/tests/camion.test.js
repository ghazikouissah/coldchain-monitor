const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");


describe("Camion API", () => {
    
    test("GET /api/camions retourne 401 sans token", async () => {
        const response = await request(app)
            .get("/api/camions");
        
        expect(response.status).toBe(401);
    });
    test("GET /api/camions/CAM-999 retourne 401 sans token", async () => {
        const response = await request(app)
            .get("/api/camions/CAM-999");
        
        expect(response.status).toBe(401);
    });
    test("POST /api/camions retourne 401 sans token", async () => {
    const response = await request(app)
        .post("/api/camions")
        .send({ id: "CAM-999", chauffeur: "Test" });
    
    expect(response.status).toBe(401);
});
    

});


afterAll(async () => {
    await mongoose.connection.close();
});