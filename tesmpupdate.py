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
while k<100:
    k+=1
    for i in range(4):
        r=random.choice([-1,-2,0,0,1,2])
        sfo_features=[f for f in features if f.attributes["Maale_ID"]==i+1][0]
        sfo_features.attributes["Temperatur"]=sfo_features.attributes["Temperatur"]+r
        update_temp=layertest[0].edit_features(updates=[sfo_features])
        update_temp
        
        if sfo_features.attributes["Temperatur"]<2:
            sfo_features.attributes["Turbin"]=3
            update_warning_low=layertest[0].edit_features(updates=[sfo_features])
            update_warning_low
        elif sfo_features.attributes["Temperatur"]>30:
            sfo_features.attributes["Turbin"]=2
            update_warning_high=layertest[0].edit_features(updates=[sfo_features])
            update_warning_high
        else:
            sfo_features.attributes["Turbin"]=0
            update_zero=layertest[0].edit_features(updates=[sfo_features])
            update_zero
        if sfo_features.attributes["Temperatur"]>40 or sfo_features.attributes["Temperatur"]<-5:
            sfo_features.attributes["Temperatur"]=20
            sfo_features.attributes["Turbin"]=0
            update_treshold=layertest[0].edit_features(updates=[sfo_features])
            update_treshold
    time.sleep(5)
