function layoutButtons() {
    with ($('#globalCanvas')) {
        var thisLayout = data('layouts')['root']['buttons']; 

        thisLayout['about']['x'] = data('canvasWidth')-162;
        thisLayout['about']['y'] = 0;
        thisLayout['about']['width'] = 80;
        thisLayout['about']['height'] = 40;

        thisLayout['help']['x'] = data('canvasWidth')-80;
        thisLayout['help']['y'] = 0;
        thisLayout['help']['width'] = 80;
        thisLayout['help']['height'] = 40;
        
        thisLayout['ascend']['x'] = 0;
        thisLayout['ascend']['y'] = 0;
        thisLayout['ascend']['width'] = 150;
        thisLayout['ascend']['height'] = 150;
        
        thisLayout['descend']['x'] = 0;
        thisLayout['descend']['y'] = data('canvasHeight')-150;
        thisLayout['descend']['width'] = 150;
        thisLayout['descend']['height'] = 150;
        
        thisLayout['signal']['x'] = data('canvasWidth')-150;
        thisLayout['signal']['y'] = data('canvasHeight')-150;
        thisLayout['signal']['width'] = 150;
        thisLayout['signal']['height'] = 150;
    }
}

function layoutNodes() {
    with ($('#globalCanvas')) {
        data('node0Width',data('graphWidth')*0.3);
        data('node0Height',data('graphHeight')*0.3);
        data('mainNode0Width',data('node0Width')*1.0);
        data('mainNode0Height',data('node0Height')*1.0);

        var thisLayout;

        // set 0 thisLayout to left side
        thisLayout = data('layouts')['root']['left'];
        /*
        thisLayout['back']['x'] = data('graphCenterX');
        thisLayout['back']['y'] = data('graphCenterY');
        thisLayout['back']['width'] = data('graphWidth');
        thisLayout['back']['height'] = data('graphHeight');
        */

        thisLayout['main']['x'] = data('graphCenterX');
        thisLayout['main']['y'] = data('graphCenterY');
        thisLayout['main']['width'] = data('mainNode0Width');
        thisLayout['main']['height'] = data('mainNode0Height');

        thisLayout['top']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
        thisLayout['top']['y'] = data('graphCenterY')-(data('graphHeight')*0.32)+(data('node0Height')*0.5);
        thisLayout['top']['width'] = data('node0Width');
        thisLayout['top']['height'] = data('node0Height');

        thisLayout['middle']['x'] = data('graphCenterX')-(data('graphWidth')/2.2)+(data('node0Width')/2);
        thisLayout['middle']['y'] = data('graphCenterY')+(data('graphHeight')*0.32)-(data('node0Height')*0.5);
        thisLayout['middle']['width'] = data('node0Width');
        thisLayout['middle']['height'] = data('node0Height');

        thisLayout['bottom']['x'] = data('graphCenterX');
        thisLayout['bottom']['y'] = data('graphCenterY')+(data('graphHeight')*0.5)-(data('node0Height')*0.5);
        thisLayout['bottom']['width'] = data('node0Width');
        thisLayout['bottom']['height'] = data('node0Height');

        // set 0 thisLayout to right side
        thisLayout = data('layouts')['root']['right'];
        /*
        thisLayout['back']['x'] = data('graphCenterX');
        thisLayout['back']['y'] = data('graphCenterY');
        thisLayout['back']['width'] = data('graphWidth');
        thisLayout['back']['height'] = data('graphHeight');
        */

        thisLayout['main']['x'] = data('graphCenterX');
        thisLayout['main']['y'] = data('graphCenterY');
        thisLayout['main']['width'] = data('mainNode0Width');
        thisLayout['main']['height'] = data('mainNode0Height');

        thisLayout['top']['x'] = data('graphCenterX');
        thisLayout['top']['y'] = data('graphCenterY')-(data('graphHeight')/2)+(data('node0Height')/2);
        thisLayout['top']['width'] = data('node0Width');
        thisLayout['top']['height'] = data('node0Height');

        thisLayout['middle']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
        thisLayout['middle']['y'] = data('graphCenterY')-(data('graphHeight')*0.32)+(data('node0Height')*0.5);
        thisLayout['middle']['width'] = data('node0Width');
        thisLayout['middle']['height'] = data('node0Height');

        thisLayout['bottom']['x'] = data('graphCenterX')+(data('graphWidth')/2.2)-(data('node0Width')/2);
        thisLayout['bottom']['y'] = data('graphCenterY')+(data('graphHeight')*0.32)-(data('node0Height')*0.5);
        thisLayout['bottom']['width'] = data('node0Width');
        thisLayout['bottom']['height'] = data('node0Height');
    }
}
function layoutSmallNodes() {
    with ($('#globalCanvas')) {
        data('node1Width',data('node0Width')*0.3);
        data('node1Height',data('node0Width')*0.3);
        data('mainNode1Width',data('node1Width')*1);
        data('mainNode1Height',data('node1Height')*1);

        var thisNode;
        var thisLayout;
        for (var currentSide in data('layouts')['root']) {
            thisNode = data('nodes')['root'][currentSide];
            thisLayout = data('layouts')['root'][currentSide];
            // skip simple layouts
            if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                continue;
            }
            for(var currentNode in data('layouts')['root'][currentSide]) {
                // set 1 thisLayout
                thisNode = data('nodes')['root'][currentSide][currentNode];
                thisLayout = data('layouts')['root'][currentSide][currentNode];
                // skip simple layouts
                if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                    continue;
                }
                if (currentSide === 'left') {
                /*
                    thisLayout['back']['x'] = thisLayout['x'];
                    thisLayout['back']['y'] = thisLayout['y'];
                    thisLayout['back']['width'] = data('node0Width');
                    thisLayout['back']['height'] = data('node0Height');
                    */

                    thisLayout['main']['x'] = thisLayout['x'];
                    thisLayout['main']['y'] = thisLayout['y'];
                    thisLayout['main']['width'] = data('mainNode1Width');
                    thisLayout['main']['height'] = data('mainNode1Height');

                    thisLayout['top']['x'] =
                    thisLayout['x']-
                    data('node0Width')/2.2+
                        data('node1Width')/2;
                    thisLayout['top']['y'] =
                    thisLayout['y']-
                    data('node0Height')*0.32+
                        data('node1Height')*0.5;
                    thisLayout['top']['width'] = data('node1Width');
                    thisLayout['top']['height'] = data('node1Height');

                    thisLayout['middle']['x'] =
                    thisLayout['x']-
                    data('node0Width')/2.2+
                        data('node1Width')/2;
                    thisLayout['middle']['y'] =
                    thisLayout['y']+
                        data('node0Height')*0.32-
                    data('node1Height')*0.5;
                    thisLayout['middle']['width'] = data('node1Width');
                    thisLayout['middle']['height'] = data('node1Height');

                    thisLayout['bottom']['x'] =
                    thisLayout['x'];
                    thisLayout['bottom']['y'] =
                    thisLayout['y']+
                        data('node0Height')/2-
                    data('node1Height')/2;
                    thisLayout['bottom']['width'] = data('node1Width');
                    thisLayout['bottom']['height'] = data('node1Height');
                } else if (currentSide === 'right') {
                /*
                    thisLayout['back']['x'] = thisLayout['x'];
                    thisLayout['back']['y'] = thisLayout['y'];
                    thisLayout['back']['width'] = data('node0Width');
                    thisLayout['back']['height'] = data('node0Height');
                    */

                    thisLayout['main']['x'] = thisLayout['x'];
                    thisLayout['main']['y'] = thisLayout['y'];
                    thisLayout['main']['width'] = data('mainNode1Width');
                    thisLayout['main']['height'] = data('mainNode1Height');

                    thisLayout['top']['x'] =
                    thisLayout['x'];
                    thisLayout['top']['y'] =
                    thisLayout['y']-
                    data('node0Height')/2+
                        data('node1Height')/2;
                    thisLayout['top']['width'] = data('node1Width');
                    thisLayout['top']['height'] = data('node1Height');

                    thisLayout['middle']['x'] =
                    thisLayout['x']+
                        data('node0Width')/2.2-
                    data('node1Width')/2;
                    thisLayout['middle']['y'] =
                    thisLayout['y']-
                    data('node0Height')*0.32+
                        data('node1Height')*0.5;
                    thisLayout['middle']['width'] = data('node1Width');
                    thisLayout['middle']['height'] = data('node1Height');

                    thisLayout['bottom']['x'] =
                    thisLayout['x']+
                        data('node0Width')/2.2-
                    data('node1Width')/2;
                    thisLayout['bottom']['y'] =
                    thisLayout['y']+
                        data('node0Height')*0.32-
                    data('node1Height')*0.5;
                    thisLayout['bottom']['width'] = data('node1Width');
                    thisLayout['bottom']['height'] = data('node1Height');
                }
            }
        }
    }
}
function layoutSmallerNodes() {
    with ($('#globalCanvas')) {
        data('node2Width',data('node1Width')*0.3);
        data('node2Height',data('node1Width')*0.3);
        data('mainNode2Width',data('node2Width')*1);
        data('mainNode2Height',data('node2Height')*1);

        var thisNode;
        var thisLayout;
        for (var currentSide in data('layouts')['root']) {
            thisNode = data('nodes')['root'][currentSide];
            thisLayout = data('layouts')['root'][currentSide];
            // skip simple layouts
            if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                continue;
            }
            for(var currentBranch in data('layouts')['root'][currentSide]) {
                // set 1 thisLayout
                thisNode = data('nodes')['root'][currentSide][currentBranch];
                thisLayout = data('layouts')['root'][currentSide][currentBranch];
                // skip simple layouts
                if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                    continue;
                }

                for(var currentNode in data('layouts')['root'][currentSide][currentBranch]) {
                    // set 2 thisLayout
                    thisNode = data('nodes')['root'][currentSide][currentBranch][currentNode];
                    thisLayout = data('layouts')['root'][currentSide][currentBranch][currentNode];
                    // skip simple layouts
                    if (thisNode === undefined || thisNode['complex'] === undefined || thisNode['complex'] === false) {
                        continue;
                    }

                    if (currentSide === 'left') {
                    /*
                        thisLayout['back']['x'] = thisLayout['x'];
                        thisLayout['back']['y'] = thisLayout['y'];
                        thisLayout['back']['width'] = data('node1Width');
                        thisLayout['back']['height'] = data('node1Height');
                        */

                        thisLayout['main']['x'] = thisLayout['x'];
                        thisLayout['main']['y'] = thisLayout['y'];
                        thisLayout['main']['width'] = data('mainNode2Width');
                        thisLayout['main']['height'] = data('mainNode2Height');

                        thisLayout['top']['x'] =
                        thisLayout['x']-
                        data('node1Width')/2.2+
                            data('node2Width')/2;
                        thisLayout['top']['y'] =
                        thisLayout['y']-
                        data('node1Height')*0.32+
                            data('node2Height')*0.5;
                        thisLayout['top']['width'] = data('node2Width');
                        thisLayout['top']['height'] = data('node2Height');

                        thisLayout['middle']['x'] =
                        thisLayout['x']-
                        data('node1Width')/2.2+
                            data('node2Width')/2;
                        thisLayout['middle']['y'] =
                        thisLayout['y']+
                            data('node1Height')*0.32-
                        data('node2Height')*0.5;
                        thisLayout['middle']['width'] = data('node2Width');
                        thisLayout['middle']['height'] = data('node2Height');

                        thisLayout['bottom']['x'] =
                        thisLayout['x'];
                        thisLayout['bottom']['y'] =
                        thisLayout['y']+
                            data('node1Height')/2-
                        data('node2Height')/2;
                        thisLayout['bottom']['width'] = data('node2Width');
                        thisLayout['bottom']['height'] = data('node2Height');
                    } else if (currentSide === 'right') {
                    /*
                        thisLayout['back']['x'] = thisLayout['x'];
                        thisLayout['back']['y'] = thisLayout['y'];
                        thisLayout['back']['width'] = data('node1Width');
                        thisLayout['back']['height'] = data('node1Height');
                        */

                        thisLayout['main']['x'] = thisLayout['x'];
                        thisLayout['main']['y'] = thisLayout['y'];
                        thisLayout['main']['width'] = data('mainNode2Width');
                        thisLayout['main']['height'] = data('mainNode2Height');

                        thisLayout['top']['x'] =
                        thisLayout['x'];
                        thisLayout['top']['y'] =
                        thisLayout['y']-
                        data('node1Height')/2+
                            data('node2Height')/2;
                        thisLayout['top']['width'] = data('node2Width');
                        thisLayout['top']['height'] = data('node2Height');

                        thisLayout['middle']['x'] =
                        thisLayout['x']+
                            data('node1Width')/2.2-
                        data('node2Width')/2;
                        thisLayout['middle']['y'] =
                        thisLayout['y']-
                        data('node1Height')*0.32+
                            data('node2Height')*0.5;
                        thisLayout['middle']['width'] = data('node2Width');
                        thisLayout['middle']['height'] = data('node2Height');

                        thisLayout['bottom']['x'] =
                        thisLayout['x']+
                            data('node1Width')/2.2-
                        data('node2Width')/2;
                        thisLayout['bottom']['y'] =
                        thisLayout['y']+
                            data('node1Height')*0.32-
                        data('node2Height')*0.5;
                        thisLayout['bottom']['width'] = data('node2Width');
                        thisLayout['bottom']['height'] = data('node2Height');
                    }
                }
            }
        }
    }
}
