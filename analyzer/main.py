import requests
import sys
sys.path.append("./shared")
from capteur import Capteur


API_URL = "http://127.0.0.1:3000/api"

def login(email, password):
    response = requests.post(
        f"{API_URL}/auth/login",
        json={"email":email,"password":password}
    )
    data = response.json()
    return data ["token"]

def get_capteurs(token):
    response = requests.get(
        f"{API_URL}/capteurs",
        headers = {"Authorization": f"Bearer {token}"}
    )
    data = response.json()
    return data ["data"]

def analyser_capteurs(capteurs):
    alertes=[]
    for capteur_data in capteurs:
        capteur =Capteur.from_dict(capteur_data)
        if capteur.danger():
            alertes.append(f"danger:{capteur.id} temperature{capteur.temperature} °C")
        if capteur.clim():
            alertes.append(f"clim coupee:{capteur.id}")
    return alertes 
        
    


    



if __name__ == "__main__":
    token = login("admin@coldchain.com", "password123")
    print(f"Token: {token}")
    capteurs = get_capteurs(token)
    print(f"capteurs: {capteurs}")
    alertes =analyser_capteurs(capteurs)
    print (f"les alertes sont{alertes}")