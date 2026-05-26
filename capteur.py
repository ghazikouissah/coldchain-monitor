class Capteur:
    def __init__(self, id, temperature, humidite, statut_clim, id_camion):
        if not isinstance(temperature, (int, float)):
             raise ValueError(f"Température invalide : {temperature}")
        if not isinstance(humidite, (int, float)):
             raise ValueError(f"Humidité invalide : {humidite}")
             
        self.id = id
        self.temperature =temperature
        self.humidite =humidite
        self.statut_clim=statut_clim
        self.id_camion=id_camion

    def   afficher(self):
          print(f"ID: {self.id}, Température: {self.temperature}°C")
          print(f"ID: {self.id}, Humidite: {self.humidite}%")
          print(f"ID: {self.id}, statut_clim: {self.statut_clim}")
    
    def danger(self):
         if (self.temperature >4 or self.temperature< -18) :
            return True
         else :
              return False
    def clim(self):
         return self.statut_clim == False
    
if __name__ == "__main__":
    c1 = Capteur("ESP32-01", 67.8, 45.2, False, "CAM-01")
    c2 = Capteur("ESP32-02", -20.0, 60.0, True, "CAM-02")
    c1.afficher()
    print(f"Danger: {c1.danger()}")
    print(f"Clim coupée: {c1.clim()}")
    c2.afficher()
    print(f"Danger: {c2.danger()}")
    print(f"Clim coupée: {c2.clim()}")
               