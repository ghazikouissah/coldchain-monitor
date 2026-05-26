import json

def sauvegarder(camions, fichier):
    data = [c.to_dict() for c in camions]
    with open(fichier, "w") as f:
        json.dump(data, f, indent=2)

def charger(fichier):
    with open(fichier, "r") as f:
        return json.load(f)  