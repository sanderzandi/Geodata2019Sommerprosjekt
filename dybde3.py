import arcpy
raster = r'C:\Users\student\Documents\ArcGIS\Projects\MyProject3\MyProject3.gdb\c6871_raste1'
poly =  arcpy.GetParameter(0) # Get polygon from user
user_threshold = arcpy.GetParameter(1) # Get amount of points from user

def findBestPoints(polygon,user_threshold,raster):
    clip=arcpy.sa.ExtractByMask(raster,polygon)
    filteredRaster = arcpy.sa.ExtractByAttributes(clip,"VALUE > 0")
    points = arcpy.RasterToPoint_conversion(filteredRaster)

    k=0
    cursor1 = arcpy.da.SearchCursor(points,["SHAPE@X","SHAPE@Y"])
    arcpy.AddMessage(points)
    for row1 in cursor1:
        x=row1[0]
        y=row1[1]
        #arcpy.AddMessage(previousRowsList)
        cursor=arcpy.da.UpdateCursor(points,["SHAPE@X","SHAPE@Y"])
        for row in cursor:
            if ((row[0]<(x+50) and row[1]<(y+50)) and (row[0]>(x-50) and row[1]>(y-50)) and ([row1[0],row1[1]] != [row[0],row[1]])):
                cursor.deleteRow()
        del cursor
    del cursor1
    sort_points = arcpy.Sort_management(points,'in_memory/mypoints',[["grid_code","DESCENDING"]])

    cursor2 = arcpy.da.UpdateCursor(sort_points,["SHAPE@X","SHAPE@Y"])
    for row2 in cursor2:
        k=k+1
        if k>int(user_threshold):
            cursor2.deleteRow()
    my_buff=arcpy.Buffer_analysis(sort_points,'in_memory/myBuffer',25)
    return my_buff

def stat(polygon,raster):
    avg=arcpy.sa.ZonalStatisticsAsTable(polygon,"OBJECTID",raster,'in_memory/zonalStat')
    flist = arcpy.ListFields("in_memory/zonalStat")
    #arcpy.AddMessage(",".join(f.name for f in flist))
    cursor = arcpy.da.SearchCursor(avg,["MEAN","MAX","RANGE"])
    for row in cursor:
        maximum=row[1]
        average=row[0]
        wave_range=row[2]
        break
    return [maximum,average,wave_range]


#clip=arcpy.sa.ExtractByMask(raster,polygon)

arcpy.management.AddFields(poly,[["max_wavepotential","DOUBLE"],["avg_wavepotential","DOUBLE"],["range_wavepotential","DOUBLE"]])
cursor = arcpy.da.UpdateCursor(poly,["max_wavepotential","avg_wavepotential","range_wavepotential"])
for row in cursor:
    row[0]=stat(poly,raster)[0]
    row[1]=stat(poly,raster)[1]
    row[2]=stat(poly,raster)[2]
    cursor.updateRow(row)
    arcpy.AddMessage(row)

#arcpy.AddMessage(str(stat(poly,raster)))
#arcpy.AddMessage(str(maxWaveHeight(poly,raster)))

my_buff=findBestPoints(poly,user_threshold,raster)
arcpy.SetParameter(2,my_buff)

