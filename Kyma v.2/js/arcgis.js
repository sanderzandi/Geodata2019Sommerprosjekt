require([
  "esri/Map",
  "esri/widgets/Sketch",
  "esri/layers/GraphicsLayer",
  "esri/views/MapView",
  "esri/widgets/LayerList",
  "esri/widgets/Search",
  "esri/tasks/Geoprocessor",
  "esri/tasks/support/FeatureSet",
  "esri/layers/ImageryLayer",
  "esri/layers/FeatureLayer",
  "esri/Graphic",
  "esri/WebMap",
  "esri/widgets/Print"
], function(
  Map,
  Sketch,
  GraphicsLayer,
  MapView,
  LayerList,
  Search,
  Geoprocessor,
  FeatureSet,
  ImageryLayer,
  FeatureLayer,
  Graphic,
  WebMap,
  Print
) {
  /*var locatorTask = new Locator({
      url:
        "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
    }); */
  const layer = new GraphicsLayer();

  layer.listMode = "hide";

  /* var map = new Map({
    basemap: "oceans"
  });
 */
  var map = new WebMap({
    portalItem: {
      // autocasts as new PortalItem()
      id: "f151d93a53984c30aeaa816a5018a772"
    }
  });

  map.visible = false;

  //*** ADD ***//
  var view = new MapView({
    container: "content",
    map: map,
    zoom: 8,
    center: [6, 62]
  });

  document.getElementById("analyze").onclick = function() {
    openTab(event, "analyse-fane");

    var sumValue;

    var value1 = parseInt(document.getElementById("range1").value);
    var value2 = parseInt(document.getElementById("range2").value);
    var value3 = parseInt(document.getElementById("range3").value);
    var value4 = parseInt(document.getElementById("range4").value);
    var value5 = parseInt(document.getElementById("range5").value);
    var value6 = parseInt(document.getElementById("range6").value);
    var value8 = parseInt(document.getElementById("range8").value);

    sumValue = value1 + value2 + value3 + value4 + value5 + value6 + value8;

    console.log(sumValue);
    console.log(value1 / sumValue);

    map.layers.remove(map.findLayerById("unik"));

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
                                InputRanges: [
                                  0,
                                  2.5,
                                  2.5,
                                  5,
                                  5,
                                  7.5,
                                  7.5,
                                  10.1
                                ],
                                OutputValues: [1, 1, 2, 6],
                                NoDataRanges: [],
                                AllowUnmatched: true
                              }
                            },
                            0.11
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
                                InputRanges: [
                                  0,
                                  2.5,
                                  2.5,
                                  5,
                                  5,
                                  7.5,
                                  7.5,
                                  10.1
                                ],
                                OutputValues: [1, 1, 4, 9],
                                NoDataRanges: [],
                                AllowUnmatched: true
                              }
                            },
                            0.45
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
                                OutputValues: [1, 5],
                                NoDataRanges: [],
                                AllowUnmatched: true
                              }
                            },
                            0.04
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
                                OutputValues: [1, 1, 1, 2, 5],
                                NoDataRanges: [],
                                AllowUnmatched: true
                              }
                            },
                            0.07
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
                                InputRanges: [
                                  0,
                                  2.5,
                                  2.5,
                                  5,
                                  5,
                                  7.5,
                                  7.5,
                                  10.1
                                ],
                                OutputValues: [1, 1, 9, 9],
                                NoDataRanges: [],
                                AllowUnmatched: true
                              }
                            },
                            0.21
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
                                InputRanges: [1, 2],
                                OutputValues: [9],
                                NoDataRanges: [0, 1],
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
                                Raster: "$2",
                                UseTable: false,
                                InputRanges: [0, 1, 1, 1.1],
                                OutputValues: [1, 9],
                                NoDataRanges: [],
                                AllowUnmatched: true
                              }
                            },
                            0.1
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
            [2, 230, 0, 0],
            [3, 242, 85, 0],
            [4, 250, 142, 0],
            [5, 255, 195, 0],
            [6, 255, 255, 0],
            [7, 197, 219, 0],
            [8, 39, 181, 0],
            [9, 38, 115, 0]
          ]
        }
      }
    });

    layer2.title = "Analyse";
    layer2.id = "unik";
    map.layers.add(layer2);
    console.log("sukess");
  };

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

  const fl = new FeatureLayer({
    portalItem: {
      // Fiskeri
      id: "cad012d413c94466bc9d90845229caec"
    }
  });
  map.add(fl);
  fl.visible = false;

  const fl2 = new FeatureLayer({
    portalItem: {
      // Verneområder
      id: "3f0164b46ecf40639c95dc9e7125ddb1"
    }
  });
  map.add(fl2);
  fl2.visible = false;

  const fl3 = new FeatureLayer({
    portalItem: {
      // BBunnsedimenter
      id: "99a17d56b12b414cb00ff7b0a30ed471"
    }
  });
  map.add(fl3);
  fl3.visible = false;

  function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  document.getElementById("gpTool").onclick = function() {
    sleep(6000).then(() => {
      openTab(event, "resultat-fane");
    });

    var gpURL =
      "https://student2019.geodata.no/arcgis/rest/services/GPTools/FinnOptimalePlasseringBolger/GPServer/Finn%20optimale%20plasseringer%20for%20bølgekraftanlegg";
    console.log(gpURL);

    var gp = new Geoprocessor(gpURL);
    var fSet = new FeatureSet();
    fSet.features = layer.graphics.items[0];
    fSet.spatialreference = console.log(fSet);

    var params = {
      Interesseomrade: fSet,
      Antall_plasseringer: 4
    };

    gp.execute(params).then(function(valReturn) {
      console.log("syksess");

      var ftLayer = new FeatureLayer({
        source: valReturn.results[0].value.features,
        fields: valReturn.results[0].value.fields,
        objectIdField: "FID",
        geometryType: "polygon"
      });

      ftLayer.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        size: 2,
        symbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          //size: 6,
          color: [255, 100, 0],
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.1,
            color: "white"
          }
        }
      };

      var ftLayer2 = new FeatureLayer({
        source: valReturn.results[1].value.features,
        fields: valReturn.results[1].value.fields,
        objectIdField: "OBJECTID",
        geometryType: "polygon"
      });

      ftLayer2.renderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: {
          type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
          style: "solid",
          color: [255, 140, 0, 0.5],
          outline: {
            // autocasts as new SimpleLineSymbol()
            width: 0.1,
            color: [255, 140, 0.4]
          }
        }
      };

      ftLayer.title = "Aktuelle punkter";
      ftLayer2.title = "Interesseområde";
      ftLayer.id = "unik1";
      ftLayer2.id = "unik2";

      var template = {
        title: "Informasjon om polygonet",
        content: [
          {
            type: "text",
            text:
              "Gjennomnittlig bølgehøyde: " +
              String(
                valReturn.results[1].value.features[0].attributes.avg_wavepotential.toFixed(
                  2
                )
              )
          },
          {
            type: "text",
            text:
              "Maks bølgehøyde: " +
              String(
                valReturn.results[1].value.features[0].attributes.max_wavepotential.toFixed(
                  2
                )
              )
          },
          {
            type: "text",
            text:
              "Bølgehøyde max-min: " +
              String(
                valReturn.results[1].value.features[0].attributes.range_wavepotential.toFixed(
                  2
                )
              )
          }
        ]
      };

      view.on("click", function(event) {
        view.hitTest(event).then(function(response) {
          if (response.results.length) {
            var graphic = response.results.filter(function(result) {
              return result.graphic.layer === ftLayer;
            })[0].graphic;
            var boyenr = graphic.attributes.FID;
            var bolgepot = graphic.attributes.grid_code;

            //popup
            var xcord = event.x;
            var ycord = event.y;
            //popup
            var template2 = {
              title: "Bøyenummer",
              content: [
                {
                  type: "text",
                  text: "Bølgenummer " + String(boyenr)
                },
                {
                  type: "text",
                  text:
                    "Lokasjon: x: " + String(xcord) + "  y: " + String(ycord)
                }
              ]
            };
            ftLayer.popupTemplate = template2;
          }
        });
      });

      console.log(
        valReturn.results[1].value.features[0].attributes.avg_wavepotential
      );
      console.log(valReturn);
      map.layers.add(ftLayer2);
      map.layers.add(ftLayer);
      ftLayer2.popupTemplate = template;
      console.log("funker");

      var print = new Print({
        view: view,
        // specify your own print service
        printServiceUrl:
          "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
      });

      // Add widget to the top right corner of the view
      view.ui.add(print, "bottom-left");
    });
  };

  document.getElementById("exit").onclick = function() {
    openTab(event, "defaultTab");
    console.log("funker");
    view.ui.empty("bottom-left");
    map.layers.remove(map.findLayerById("unik"));
    map.layers.remove(map.findLayerById("unik1"));
    map.layers.remove(map.findLayerById("unik2"));
  };
});
