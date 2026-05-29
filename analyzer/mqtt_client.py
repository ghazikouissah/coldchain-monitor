import paho.mqtt.client as mqtt
import json
import sys
sys.path.append("./shared")
from capteur import Capteur

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connecté au broker")
        client.subscribe("coldchain/#")
    else:
        print(f"Connexion échouée : {rc}")


def on_message(client, userdata, msg):
    payload = json.loads(msg.payload.decode("utf-8"))
    capteur = Capteur.from_dict(payload)
    if capteur.danger():
        print(f"ALERTE DANGER: {capteur.id} température {capteur.temperature}°C")
    if capteur.clim():
        print(f"ALERTE CLIM COUPÉE: {capteur.id}")





client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)
client.tls_set()
client.username_pw_set("esp32_ghazi", "Esp32@2026")
client.on_connect = on_connect
client.on_message = on_message
client.connect("1170aa9c834f4884b1e0681f69fec1cc.s1.eu.hivemq.cloud",  8883)
client.loop_forever()