require([
  "esri/Map",
  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",
  "esri/views/MapView",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/tasks/Geoprocessor",
  "esri/tasks/support/FeatureSet",
  "esri/layers/ImageryLayer"
], function(
  Map,
  Sketch,
  GraphicsLayer,
  MapView,
  LayerList,
  Search,
  Geoprocessor,
  FeatureSet,
  ImageryLayer
) {
  /*var locatorTask = new Locator({
      url:
        "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    }); */
  const layer = new GraphicsLayer();

  var map = new Map({
    basemap: "oceans"
  });

  //*** ADD ***//
  var view = new MapView({
    container: "content",
    map: map
  });

  var layer2 = new ImageryLayer({
    url:
      "https://student2019.geodata.no/arcgis/rest/services/ImageServices/Bolge_mosaic_WRO_2/ImageServer",
    format: "jpgpng", // server exports in either jpg or png format,
    renderingRule: {
      rasterFunction: "Colormap",
      rasterFunctionArguments: {
        Raster: {
          rasterFunction: "Local",
          rasterFunctionArguments: {
            Operation: 49,
            ExtentType: 0,
            CellsizeType: 1,
            Rasters: [
              {
                rasterFunction: "Local",
                rasterFunctionArguments: {
                  Operation: 55,
                  ExtentType: 0,
                  CellsizeType: 1,
                  Rasters: [
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$8",
                              UseTable: false,
                              InputRanges: [0, 2.5, 2.5, 5, 5, 7.5, 7.5, 10.1],
                              OutputValues: [1, 1, 3, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.2
                        ]
                      }
                    },
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$1",
                              UseTable: false,
                              InputRanges: [0, 2.5, 2.5, 5, 5, 7.5, 7.5, 10.1],
                              OutputValues: [1, 4, 6, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.4
                        ]
                      }
                    },
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$6",
                              UseTable: false,
                              InputRanges: [0, 1, 1, 2],
                              OutputValues: [1, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.01
                        ]
                      }
                    },
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$5",
                              UseTable: false,
                              InputRanges: [0, 1, 1, 4, 4, 7, 7, 10, 10, 11],
                              OutputValues: [1, 2, 3, 9, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.01
                        ]
                      }
                    },
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$7",
                              UseTable: false,
                              InputRanges: [0, 2.5, 2.5, 5, 5, 7.5, 7.5, 10.1],
                              OutputValues: [1, 1, 9, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.16
                        ]
                      }
                    },
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$3",
                              UseTable: false,
                              InputRanges: [0, 1, 1, 2],
                              OutputValues: [1, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.01
                        ]
                      }
                    },
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$4",
                              UseTable: false,
                              InputRanges: [0, 1, 1, 2],
                              OutputValues: [1, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.2
                        ]
                      }
                    },
                    {
                      rasterFunction: "Local",
                      rasterFunctionArguments: {
                        Operation: 3,
                        ExtentType: 0,
                        CellsizeType: 1,
                        Rasters: [
                          {
                            rasterFunction: "Remap",
                            rasterFunctionArguments: {
                              Raster: "$2",
                              UseTable: false,
                              InputRanges: [0, 1, 1, 1.1],
                              OutputValues: [1, 9],
                              NoDataRanges: [],
                              AllowUnmatched: true
                            }
                          },
                          0.01
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          },
          outputPixelType: "U8"
        },
        Colormap: [
          [1, 230, 0, 0],
          [2, 242, 85, 0],
          [3, 250, 142, 0],
          [4, 255, 195, 0],
          [5, 255, 255, 0],
          [6, 197, 219, 0],
          [7, 39, 181, 0],
          [8, 86, 148, 0],
          [9, 38, 115, 0]
        ]
      }
    }
  });

  view.when(function() {
    var layerList = new LayerList({
      view: view
    });

    // Add widget to the top right corner of the view
    view.ui.add(layerList, "top-right");
  });

  view.when(function() {
    var searchWidget = new Search({ view: view });

    view.ui.add(searchWidget, "top-left");
  });

  view.when(function() {
    var sketch = new Sketch({
      layer: layer,
      view: view
    });

    view.ui.add(sketch, "bottom-right");
    map.add(layer);
    console.log(layer);
  });

  document.getElementById("gpTool").onclick = function() {
    console.log(document.getElementById("range1").value);

    var radio = document.getElementById("exampleRadios1");
    if (radio.checked) {
      console.log(radio.value);
    }

    console.log(document.getElementById("range1").value);

    var gpURL =
      "https://student2019.geodata.no/arcgis/rest/services/GPTools/GPTest/GPServer/GPTest";
    console.log(gpURL);

    var gp = new Geoprocessor(gpURL);
    var fSet = new FeatureSet();
    fSet.features = layer.graphics.items[0];
    fSet.spatialreference = console.log(fSet);

    var params = {
      Polygon: fSet,
      Navn: "Jacob",
      Prop: "features"
    };
    console.log("hei");
    gp.execute(params).then(function(valReturn) {
      console.log(valReturn);
    });
  };

  document.getElementById("analyze").onclick = function() {
    map.layers.add(layer2);
    console.log("sukess");
  };
});
