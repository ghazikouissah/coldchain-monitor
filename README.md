# ColdChain Monitor

Real-time IoT monitoring system for refrigerated trucks — built to solve a real problem I noticed: drivers turning off the cooling system to save fuel, risking entire shipments of food.

## The Problem

Cold chain violations cost the food industry billions every year. The root cause is simple — there's no real-time visibility into what happens inside refrigerated trucks during transport.

Drivers sometimes turn off the AC to save fuel. By the time the temperature alert triggers at the warehouse, it's too late. The food is spoiled, the shipment is lost.

**ColdChain Monitor solves this by detecting the anomaly before it becomes critical** — using a TinyML model running directly on the ESP32, before the data even leaves the device.

## How It Works

ESP32 reads temperature & humidity every 2 seconds

↓

TinyML model detects anomaly on-device (no cloud needed)

↓

Data published via MQTT to HiveMQ Cloud (TLS encrypted)

↓

Node.js API stores data → MongoDB Atlas

↓

Python analyzer subscribes directly to MQTT → instant alerts

↓

Fleet manager sees live dashboard with maps & charts


## What I Built

- **ESP32 firmware** with FreeRTOS (multi-core tasks, queues, mutex) + TinyML anomaly detection
- **WiFiManager** captive portal — plug in a new device, configure WiFi from your phone, done
- **OTA firmware updates** — push new firmware to all trucks over WiFi, no physical access needed
- **Secured REST API** — JWT auth, rate limiting, input validation, unit tests with Jest
- **Python real-time analyzer** — subscribes directly to MQTT broker, no polling
- **React dashboard** — live temperature charts, Leaflet maps showing truck positions, instant alerts
- **Fully dockerized** — one command to run everything

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Firmware | ESP32, FreeRTOS, C++, TensorFlow Lite |
| Broker | HiveMQ Cloud (MQTT over TLS) |
| Backend | Node.js, Express, MongoDB Atlas |
| Analyzer | Python, paho-mqtt |
| Frontend | React, Tailwind CSS, Recharts, Leaflet |
| DevOps | Docker, docker-compose |
| ML | TensorFlow, TFLite — 97.75% accuracy on simulated data |

## Project Structure

coldchain_monitor/

├── firmware/     # ESP32 firmware — FreeRTOS + TinyML

├── api/          # Node.js REST API

├── analyzer/     # Python MQTT real-time analyzer

├── dashboard/    # React admin dashboard

├── tinyml/       # Model training notebooks (Google Colab)

└── shared/       # Shared Python classes

## Run It Locally

```bash
git clone https://github.com/ghazikouissah/coldchain-monitor
cd coldchain_monitor
cp .env.example .env   # add your HiveMQ and MongoDB credentials
docker compose up
```

- Dashboard → `http://localhost:5173`
- API → `http://localhost:3000`

> Note: For the ESP32 firmware, copy `firmware/include/config.h.example` to `config.h` and fill in your credentials.

## About

Built by **Ghazi Kouissah** — 4th year IoT & Robotics Engineering student at EPI Digital School, Sousse.

Open to IoT Engineer internship / junior positions .

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/ghazi-kouissah-292a42250/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/ghazikouissah)

