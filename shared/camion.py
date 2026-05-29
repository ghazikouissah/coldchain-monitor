from capteur import Capteur
from storage import sauvegarder, charger

class camion:
    def __init__(self,id,chauffeur):
        self.id=id
        self.chauffeur=chauffeur
        self.capteurs=[]
    
    def to_dict(self):
        return{
            "id":self.id,
            "chauffeur":self.chauffeur,
            "capteurs": [c.to_dict() for c in self.capteurs]

        }
    
    def ajouter_capteur(self,capteur):
        try:
            self.capteurs.append(capteur)
            print(f"capteur{capteur.id} ajoute")
        except Exception as e:
            print(f"Erreur ajout capteur : {e}")

    def afficher_camion(self):
        print(f"le chauffeur {self.chauffeur} de  {self.id} ")
        for capteur in self.capteurs:
            capteur.afficher()
    def verifier_alerts(self):
        for capteur in self.capteurs:
            if capteur.danger():
                print(f"ALERTE camion {self.id} : température {capteur.temperature}°C")
            if capteur.clim():
                print(f"ALERTE camion {self.id} : clim coupée")
    @staticmethod
    def from_dict(data):
        c= camion(data["id"],data["chauffeur"])
        for capteur_data in data["capteurs"]:
            c.capteurs.append(Capteur.from_dict(capteur_data))
        return c
        

if __name__ == "__main__":
    cam1 = camion("CAM-01", "aziz")
    cam2 = camion("CAM-02", "ahmed")
 
    try:
        cam1.ajouter_capteur(Capteur("ESP32-01", 67.8, 45.2, False, "CAM-01"))
    except ValueError as e:
        print(f"Capteur invalide : {e}")
    
    
    try:
        cam1.ajouter_capteur(Capteur("ESP32-03", "invalide", 45.2, False, "CAM-01"))
    except ValueError as e:
        print(f"Capteur invalide : {e}")
    
    cam1.afficher_camion()
    cam1.verifier_alerts()
    
    try:
        cam2.ajouter_capteur(Capteur("ESP32-02", -20.0, 60.0, True, "CAM-02"))
    except ValueError as e:
        print(f"Capteur invalide : {e}")
    
    cam2.afficher_camion()
    cam2.verifier_alerts()


    sauvegarder([cam1, cam2], "camions.json")
    print("sauvegarde")
    data =charger("camions.json")
    camions_chargers = [camion.from_dict(c) for c in data]
    for c in camions_chargers:
        c.afficher_camion()

