import arcpy,math,json,urllib
from arcgis.gis import GIS
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET
import numpy as np
raster = r'C:\Users\student\Documents\ArcGIS\Projects\MyProject3\MyProject3.gdb\dybde'
raster_clip = open('C:\\Users\\student\\Documents\\ArcGIS\\Projects\\MyProject3\\MyProject3.gdb\\dybdeClip.tif','w+')

poly =  arcpy.GetParameter(0) # Get polygon from user
user_threshold = arcpy.GetParameter(2) # Get amount of points from user
clip=arcpy.sa.ExtractByMask(raster,poly) # Create raster based on the polygon defined by user
array = arcpy.RasterToNumPyArray(clip) # Convert raster to NumpyArray
depthlist=[]
with np.nditer(array) as it: # Iterate through NumpyArray
    for x in it:
        if x != 0: # Remove values equal to 0
            depthlist.append(x) # Add other values to list

depthlist.sort() # Sor list
new_np = np.array(depthlist).astype(float) # Create new NumPyArray with depth data as floats
raster_threshold = new_np.item(int(user_threshold)) 
#raster_threshold = new_np[int(user_threshold)]
#arcpy.AddMessage(new_np)
filteredRaster = arcpy.sa.ExtractByAttributes(clip,"VALUE < {0}".format(raster_threshold)) # Get values from raster...?
points = arcpy.RasterToPoint_conversion(filteredRaster) # Convert raster to points
arcpy.SetParameter(1,points) # Set points in ArcGis, allows for points to be drawn

previousRowsList=[]
k=0
cursor1 = arcpy.da.SearchCursor(points,["SHAPE@X","SHAPE@Y"])
arcpy.AddMessage(points)
for row1 in cursor1:
    k=k+1
    x=row1[0]
    y=row1[1]
    previousRowsList.append([x,y])
    #arcpy.AddMessage(previousRowsList)
    cursor=arcpy.da.UpdateCursor(points,["SHAPE@X","SHAPE@Y"])
    for row in cursor:
        if (row[0]<(x+50) and row[1]<(y+50)) and (row[0]>(x-50) and row[1]>(y-50)) and ([row1[0],row1[1]] != [row[0],row[1]]) and (row not in previousRowsList):
            arcpy.AddMessage(row)
            cursor.deleteRow()
    del cursor
    #arcpy.AddMessage(row1)
del cursor1
arcpy.AddMessage(k)

my_buff=arcpy.Buffer_analysis(points,'in_memory/myBuffer',25)
arcpy.SetParameter(3,my_buff)

#my_buff=arcpy.Buffer_analysis(points,'in_memory/myBuffer',50)
#arcpy.SetParameter(3,my_buff)




# with arcpy.da.UpdateCursor(points,'*') as cursor:
# my_buff=arcpy.Buffer_analysis(getrow,'in_memory/myBuffer',50)
#    for row in cursor:
#        if row[0]<x+25 or row[1]<y+25:
#            cursor.deleteRow()


#arcpy.Clip_management(raster,"5.5 62.5 5.8 62.8","C:\\Users\\student\\Documents\\ArcGIS\\Projects\\MyProject3\\MyProject3.gdb\\clip.tif")
#newlayer = arcpy.SelectLayerByLocation_management(raster,'INTERSECT',poly)
#newlayer = arcpy.sa.ZonalStatistics(poly,"OBJECTID",raster)
#value=arcpy.GetRasterProperties_management(newlayer)
#new_array = np.delete(array, np.where(array == 0))
#for i in range(array.shape[0]):
    #new_array=np.trim_zeros(array[i],'b')
    #arcpy.AddMessage(new_array)
#arcpy.AddMessage(new_np)
#for i in range(array.shape[0]):
    #for j in range(array.shape[1]):
        #if array[i][j]==0.:
            #np.delete(array,[i,j]
#sort_array=np.sort(new_array,axis=1)
#raster_clip.close()
#mybuff=arcpy.Buffer_Analysis(value,'in_memory/myBuffer',5)
#arcpy.SetParameter(1,mybuff)