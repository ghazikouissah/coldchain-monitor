from capteur import Capteur

class camion:
    def __init__(self,id,chauffeur):
        self.id=id
        self.chauffeur=chauffeur
        self.capteurs=[]
    
    def ajouter_capteur(self,capteur):
        self.capteurs.append(capteur)
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

if __name__ == "__main__":
    cam1= camion("camion 01","aziz") 
    cam2= camion("camion 02","ahmed") 
    cam1.ajouter_capteur(Capteur("ESP32-01", 67.8, 45.2, False, "CAM-01"))
    cam1.afficher_camion()
    cam1.verifier_alerts()
    cam2.ajouter_capteur(Capteur("ESP32-02", -20.0, 60.0, True, "CAM-02"))
    cam2.afficher_camion()
    cam2.verifier_alerts()

