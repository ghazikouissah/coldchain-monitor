const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");


describe("Capteur API", () => {
    
    test("GET /api/capteurs retourne 401 sans token", async () => {
        const response = await request(app)
            .get("/api/capteurs");
        
        expect(response.status).toBe(401);
    });
    test("GET /api/capteurs/ESP32-999 retourne 401 sans token", async () => {
        const response = await request(app)
            .get("/api/capteurs/ESP32-999");
        
        expect(response.status).toBe(401);
    });
    test("POST /api/capteurs retourne 401 sans token", async () => {
    const response = await request(app)
        .post("/api/capteurs")
        .send({ id: "ESP32-999", temperature: 25.0, humidite: 45.0, id_camion: "CAM-01" });
    
    expect(response.status).toBe(401);
});
    

});


afterAll(async () => {
    await mongoose.connection.close();
});