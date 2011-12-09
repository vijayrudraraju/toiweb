var edgeGlyphMap = [];
var nodeGlyphMap = {outputs:new Assoc(),inputs:new Assoc()};

function updateNodeGlyphMap(signalsOnly) {
    nodeGlyphMap = {outputs:new Assoc(), inputs:new Assoc()};

    var outputSet = getCurrentOutputLevelSet();
    var inputSet = getCurrentInputLevelSet();

    var outputChildSet = getSubnodesForOutputLevel();
    var inputChildSet = getSubnodesForInputLevel();

    // outputs
    var count = outputSet.length;

    var separationAngle;
    if (count > 1) {
        separationAngle = Math.PI/(count-1);
    } else {
        separationAngle = Math.PI/(count);
    }

    var layoutAngle;

    var layoutX;
    var layoutY;
    var symbolWidth;
    if (count <= 5) {
        symbolWidth = (700*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
    } else {
        symbolWidth = (700*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count-1))) + (Math.PI/2) ));
    }
    var layoutRadius = (700/2)-(symbolWidth/2);

    for (var i=0;i<count;i++) {
        layoutAngle = (3*Math.PI/2) - i*separationAngle;

        layoutX = $('#globalCanvas').data('centerX1') + (layoutRadius*Math.cos(layoutAngle));
        layoutY = $('#globalCanvas').data('centerY1') + (layoutRadius*Math.sin(layoutAngle));

        var count2 = outputChildSet[i].length;

        var separationAngle2;
        if (count2 > 1) {
            separationAngle2 = Math.PI/(count2-1);
        } else {
            separationAngle2 = Math.PI/(count2);
        }

        var layoutAngle2;

        var layoutX2;
        var layoutY2;
        var symbolWidth2;
        if (count2 <= 5) {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
        } else {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count2-1))) + (Math.PI/2) ));
        }
        var layoutRadius2 = (symbolWidth/2)-(symbolWidth2/2);

        var subNodes = new Assoc();
        for (var j=0;j<count2;j++) {
            layoutAngle2 = (3*Math.PI/2) - j*separationAngle2;
            layoutX2 = layoutX + (layoutRadius2*Math.cos(layoutAngle2));
            layoutY2 = layoutY + (layoutRadius2*Math.sin(layoutAngle2));
            subNodes.add(outputChildSet[i][j].name,{layoutX:layoutX2,layoutY:layoutY2,symbolWidth:symbolWidth2,isSignal:outputChildSet[i][j].isSignal});
        }

        if (!signalsOnly || subNodes.length() == 0) {
            nodeGlyphMap.outputs.add(outputSet[i], {layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:true});
        } else {
            nodeGlyphMap.outputs.add(outputSet[i], {layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:false});
        }
    }

    // inputs
    count = inputSet.length;

    if (count > 1) {
        separationAngle = Math.PI/(count-1);
    } else {
        separationAngle = Math.PI/(count);
    }

    if (count <= 5) {
        symbolWidth = (700*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
    } else {
        symbolWidth = (700*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count-1))) + (Math.PI/2) ));
    }
    layoutRadius = (700/2)-(symbolWidth/2);

    for (var i=0;i<count;i++) {
        layoutAngle = i*separationAngle + (3*Math.PI/2);

        layoutX = $('#globalCanvas').data('centerX2') + (layoutRadius*Math.cos(layoutAngle));
        layoutY = $('#globalCanvas').data('centerY2') + (layoutRadius*Math.sin(layoutAngle));

        var count2 = inputChildSet[i].length;

        var separationAngle2;
        if (count2 > 1) {
            separationAngle2 = Math.PI/(count2-1);
        } else {
            separationAngle2 = Math.PI/(count2);
        }

        var layoutAngle2;

        var layoutX2;
        var layoutY2;
        var symbolWidth2;
        if (count2 <= 5) {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(6-1))) + (Math.PI/2) ));
        } else {
            symbolWidth2 = (symbolWidth*Math.PI)/(2*( (Math.PI/Math.sin(Math.PI/(count2-1))) + (Math.PI/2) ));
        }
        var layoutRadius2 = (symbolWidth/2)-(symbolWidth2/2);

        var subNodes = new Assoc();
        for (var j=0;j<count2;j++) {
            layoutAngle2 = j*separationAngle2 + (3*Math.PI/2);
            layoutX2 = layoutX + (layoutRadius2*Math.cos(layoutAngle2));
            layoutY2 = layoutY + (layoutRadius2*Math.sin(layoutAngle2));
            subNodes.add(inputChildSet[i][j].name,{layoutX:layoutX2,layoutY:layoutY2,symbolWidth:symbolWidth2,isSignal:inputChildSet[i][j].isSignal});
        }

        if (!signalsOnly || subNodes.length() == 0) {
            nodeGlyphMap.inputs.add(inputSet[i], {layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:true});
        } else {
            nodeGlyphMap.inputs.add(inputSet[i], {layoutX:layoutX,layoutY:layoutY,symbolWidth:symbolWidth,mouseOver:false,subNodes:subNodes,selected:false,visible:false});
        }
    }

}

var connectionOutputMatches = [];
var connectionInputMatches = [];

function updateEdgeGlyphMap(signalsOnly) {

    edgeGlyphMap = new Assoc();

    var outputSet = getCurrentOutputPathsFromNodes();
    var inputSet = getCurrentInputPathsFromNodes();

    var outputChildren = getSubnodesForOutputLevel();
    var inputChildren = getSubnodesForInputLevel();
    var outputLevel = getCurrentOutputLevelSet();
    var inputLevel = getCurrentInputLevelSet();

    connectionOutputMatches = [];
    connectionInputMatches = [];
    var connectionKeys = connections.keys();
    var onceFilteredConnectionKeys = [];
    var twiceFilteredConnectionKeys = [];

    // fix for bug involving top level view when the filter match happens at lower levels
    // very likely performs redundant computations that are done latter in this function
    for (var i=0;i<connectionKeys.length;i++) {
        for (var j=0;j<filterMatches[0].length;j++) {
            var exp1 = new RegExp(filterMatches[0][j][0]+filterMatches[0][j][1]+">");
            if (connectionKeys[i].match(exp1)) {
                onceFilteredConnectionKeys.push(connectionKeys[i]);
            }
        }
    }
  
    for (var i=0;i<onceFilteredConnectionKeys.length;i++) {
        for (var j=0;j<filterMatches[1].length;j++) {
            var exp2 = new RegExp(">"+filterMatches[1][j][0]+filterMatches[1][j][1]);
            if (onceFilteredConnectionKeys[i].match(exp2)) {
                twiceFilteredConnectionKeys.push(onceFilteredConnectionKeys[i]);
            }
        }
    }

    for (var i=0;i<twiceFilteredConnectionKeys.length;i++) {
        for (var j=0;j<outputSet.length;j++) {

            var exp1 = new RegExp(outputSet[j]+">");
            var exp2 = new RegExp(outputSet[j]+".*>");
            if (twiceFilteredConnectionKeys[i].match(exp1)) {
                connectionOutputMatches.push(twiceFilteredConnectionKeys[i]); 
                edgeGlyphMap.add(twiceFilteredConnectionKeys[i], {output:outputLevel[j],outputChild:outputSet[j],isOutputSubnode:false});
            } else if (twiceFilteredConnectionKeys[i].match(exp2) && !signalsOnly) {
                connectionOutputMatches.push(twiceFilteredConnectionKeys[i]); 
                for (var k=0;k<outputChildren[j].length;k++) {
                    var exp3 = new RegExp(outputChildren[j][k].name+".*>");
                    if (twiceFilteredConnectionKeys[i].match(exp3)) {
                        edgeGlyphMap.add(twiceFilteredConnectionKeys[i], {output:outputLevel[j],outputChild:outputChildren[j][k].name,isOutputSubnode:true});
                    }
                }
            }
        }
    }

    for (var i=0;i<connectionOutputMatches.length;i++) {
        for (var j=0;j<inputSet.length;j++) {
            var exp1 = new RegExp(">"+inputSet[j]+".+");
            var exp2 = new RegExp(">"+inputSet[j]+".*");
            if (connectionOutputMatches[i].match(exp1) && !signalsOnly) {
                connectionInputMatches.push(connectionKeys[i]); 
                for (var k=0;k<inputChildren[j].length;k++) {
                    var exp3 = new RegExp(">"+inputChildren[j][k].name+".*");
                    if (connectionOutputMatches[i].match(exp3)) {
                        edgeGlyphMap.get(connectionOutputMatches[i]).input = inputLevel[j];
                        edgeGlyphMap.get(connectionOutputMatches[i]).inputChild = inputChildren[j][k].name;
                        edgeGlyphMap.get(connectionOutputMatches[i]).isInputSubnode = true;
                    }
                }
            } else if (connectionOutputMatches[i].match(exp2)) {
                connectionInputMatches.push(connectionOutputMatches[i]); 
                edgeGlyphMap.get(connectionOutputMatches[i]).input = inputLevel[j];
                edgeGlyphMap.get(connectionOutputMatches[i]).inputChild = inputSet[j];
                edgeGlyphMap.get(connectionOutputMatches[i]).isInputSubnode = false;
            }
        }
    }

    var keys = edgeGlyphMap.keys();
    var x1, y1, x2, y2;
    var cx1, cy1, cx2, cy2;
    for (var i=0;i<keys.length;i++) {
        if (edgeGlyphMap.get(keys[i]).input != undefined) {

            if (edgeGlyphMap.get(keys[i]).isOutputSubnode) {
                x1 = nodeGlyphMap.outputs.get(edgeGlyphMap.get(keys[i]).output).subNodes.get(edgeGlyphMap.get(keys[i]).outputChild).layoutX;
                y1 = nodeGlyphMap.outputs.get(edgeGlyphMap.get(keys[i]).output).subNodes.get(edgeGlyphMap.get(keys[i]).outputChild).layoutY;
            } else {
                x1 = nodeGlyphMap.outputs.get(edgeGlyphMap.get(keys[i]).output).layoutX;
                y1 = nodeGlyphMap.outputs.get(edgeGlyphMap.get(keys[i]).output).layoutY;
            }
            if (edgeGlyphMap.get(keys[i]).isInputSubnode) {
                x2 = nodeGlyphMap.inputs.get(edgeGlyphMap.get(keys[i]).input).subNodes.get(edgeGlyphMap.get(keys[i]).inputChild).layoutX;
                y2 = nodeGlyphMap.inputs.get(edgeGlyphMap.get(keys[i]).input).subNodes.get(edgeGlyphMap.get(keys[i]).inputChild).layoutY;
            } else {
                x2 = nodeGlyphMap.inputs.get(edgeGlyphMap.get(keys[i]).input).layoutX;
                y2 = nodeGlyphMap.inputs.get(edgeGlyphMap.get(keys[i]).input).layoutY;
            }
            edgeGlyphMap.get(keys[i]).x1 = x1;
            edgeGlyphMap.get(keys[i]).y1 = y1;
            edgeGlyphMap.get(keys[i]).x2 = x2;
            edgeGlyphMap.get(keys[i]).y2 = y2;

            if (y1 < $('#globalCanvas').data('centerY1')) {
                if (y2 < $('#globalCanvas').data('centerY2')) {
                    cx1 = x1+50;
                    cy1 = y1+80;
                    cx2 = x2-50;
                    cy2 = y2+80;
                } else {
                    cx1 = x1+50;
                    cy1 = y1-80;
                    cx2 = x2-50;
                    cy2 = y2+80;
                }
            } else {
                if (y2 < $('#globalCanvas').data('centerY2')) {
                    cx1 = x1+50;
                    cy1 = y1+80;
                    cx2 = x2-50;
                    cy2 = y2-80;
                } else {
                    cx1 = x1+50;
                    cy1 = y1-80;
                    cx2 = x2-50;
                    cy2 = y2-80;
                }
            }
            edgeGlyphMap.get(keys[i]).cx1 = cx1;
            edgeGlyphMap.get(keys[i]).cy1 = cy1;
            edgeGlyphMap.get(keys[i]).cx2 = cx2;
            edgeGlyphMap.get(keys[i]).cy2 = cy2;
            edgeGlyphMap.get(keys[i]).mouseOver = false;
            edgeGlyphMap.get(keys[i]).selected = false;
        }
    }

}
