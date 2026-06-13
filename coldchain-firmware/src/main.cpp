#include <Arduino.h>
#include <DHT.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include "config.h"
#include <WiFiManager.h>

#define DHTPIN 4
#define DHTTYPE DHT22


DHT dht(DHTPIN, DHTTYPE);
WiFiClientSecure espClient;
PubSubClient mqttClient(espClient);
QueueHandle_t queueData;
SemaphoreHandle_t mqttMutex;


struct SensorData {
    float temperature;
    float humidity;
};



void connectWiFi() {
    WiFiManager wifiManager;
    
    // Si pas de WiFi configuré → crée un AP "ColdChain-Setup"
    if (!wifiManager.autoConnect("ColdChain-Setup", "coldchain123")) {
        Serial.println("Échec connexion WiFi - redémarrage");
        ESP.restart();
    }
    
    Serial.println("WiFi connecté");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
}

void connectMQTT() {
    espClient.setInsecure();
    mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
    while (!mqttClient.connected()) {
        Serial.print("Connexion MQTT...");
        if(xSemaphoreTake(mqttMutex, portMAX_DELAY)) {
            if (mqttClient.connect("ESP32-ColdChain", MQTT_USER, MQTT_PASSWORD)) {
                Serial.println("connecté");
            } else {
                Serial.print("Erreur: ");
                Serial.println(mqttClient.state());
            }
            xSemaphoreGive(mqttMutex);
        }
        if(!mqttClient.connected()) {
            vTaskDelay(2000 / portTICK_PERIOD_MS);
        }
    }
}


void taskLireCapteurs(void *pvParameters) {
    while(1) {
        SensorData data;
        data.temperature = dht.readTemperature();
        data.humidity = dht.readHumidity();
        
        if (!isnan(data.temperature) && !isnan(data.humidity)) {
            xQueueSend(queueData, &data, portMAX_DELAY);
            Serial.print("Temp: ");
            Serial.print(data.temperature);
            Serial.print("°C | Hum: ");
            Serial.println(data.humidity);
        }
        vTaskDelay(2000 / portTICK_PERIOD_MS);
    }
}

void taskEnvoyerMQTT(void *pvParameters) {
    SensorData data;
    char topic[50];
    char payload[100];
    
    snprintf(topic, sizeof(topic), "coldchain/%s/%s/data", CAMION_ID, CAPTEUR_ID);
    
    while(1) {
        if (!mqttClient.connected()) {
            connectMQTT();
        }
        mqttClient.loop();
        
        if(xQueueReceive(queueData, &data, 100 / portTICK_PERIOD_MS)) {
            JsonDocument doc;
            doc["temperature"] = data.temperature;
            doc["humidity"] = data.humidity;
            doc["statut_clim"] = true;
            doc["id_camion"] = CAMION_ID;
            doc["id"] = CAPTEUR_ID;
            
            serializeJson(doc, payload);
            if(xSemaphoreTake(mqttMutex, portMAX_DELAY)) {
            mqttClient.publish(topic, payload);
              Serial.print("MQTT publié sur: ");
            Serial.println(topic);
            xSemaphoreGive(mqttMutex);
        }
      }
    }
}

void setup() {
    Serial.begin(115200);
    dht.begin();
    mqttMutex = xSemaphoreCreateMutex();
    
    connectWiFi();
    connectMQTT();
    
    queueData = xQueueCreate(10, sizeof(SensorData));
    
    xTaskCreatePinnedToCore(taskLireCapteurs, "Capteurs", 10000, NULL, 1, NULL, 1);
    xTaskCreatePinnedToCore(taskEnvoyerMQTT, "MQTT", 10000, NULL, 1, NULL, 0);
}

void loop() {}