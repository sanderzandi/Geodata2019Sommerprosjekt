from arcgis.gis import GIS
from arcgis import features
import random
import time

gis=GIS("https://geodata.maps.arcgis.com","rebekka_student")
search_result= gis.content.search(query="title:Kraftverk Fosnavaag", item_type="Feature Layer")

layertest=search_result[2].layers
layer_fset=layertest[0].query()

features=layer_fset.features
k=0
feilmeldinger=[[f for f in features if f.attributes["Maale_ID"]==1][0].attributes["Turbin"],[f for f in features if f.attributes["Maale_ID"]==2][0].attributes["Turbin"],[f for f in features if f.attributes["Maale_ID"]==3][0].attributes["Turbin"],[f for f in features if f.attributes["Maale_ID"]==4][0].attributes["Turbin"]]
print(feilmeldinger)
k=0
while k<200:
    k+=1
    for i in range(4):
        sfo_features=[f for f in features if f.attributes["Maale_ID"]==i+1][0]
        print(sfo_features.attributes["Turbin"],feilmeldinger[i])
        if feilmeldinger[i]!=0 and sfo_features.attributes["Turbin"]==0:
            sfo_features.attributes["Temperatur"]=20
            print("Temp endret")
            update_tempfix=layertest[0].edit_features(updates=[sfo_features])
            update_tempfix
            feilmeldinger[i]=0
    time.sleep(2)
