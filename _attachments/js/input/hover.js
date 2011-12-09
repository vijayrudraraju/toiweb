function updateAboutButtonMouseState() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['about'];

        if (gP.mouseX > pointer['x'] &&
            gP.mouseX < pointer['x']+pointer['width'] &&
        gP.mouseY < pointer['y']+pointer['height']) {
            pointer['moused'] = true;
        } else {
            pointer['moused'] = false;
        }
    }
}
function updateHelpButtonMouseState() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['help'];

        if (gP.mouseX > pointer['x'] &&
            gP.mouseX < pointer['x']+pointer['width'] &&
        gP.mouseY < pointer['y']+pointer['height']) {
            pointer['moused'] = true;
        } else {
            pointer['moused'] = false;
        }
    }
}
function updateAscendButtonMouseState() {
    with ($('#globalCanvas')) {
        var pointer = data('layouts')['root']['buttons']['ascend'];
        var canonX = gP.mouseX-pointer['x'];
        var canonY = pointer['y']+pointer['height']-gP.mouseY;

        if (canonY < canonX) {
            pointer['moused'] = false;
        } else {
            pointer['moused'] = true;
        }
    }
}
function updateDescendButtonMouseState() {
    with ($('#globalCanvas')) {
        var pointer = data('layouts')['root']['buttons']['descend'];
        var canonX = gP.mouseX-pointer['x'];
        var canonY = pointer['y']-gP.mouseY;

        if (canonY > canonX*-1) {
            pointer['moused'] = false;
        } else {
            pointer['moused'] = true;
        }
    }
}



function updateNodeMouseStates() {
    with ($('#globalCanvas')) {
        var thisNode;
        var thisLayout;

        var canonX;
        var canonY;
        for (var currentSide in data('layouts')['root']) {
            canonX = gP.mouseX-data('graphCenterX');
            canonY = data('graphCenterY')-gP.mouseY;

            // set 0 thisLayout
            thisNode = data('nodes')['root'][currentSide];
            thisLayout = data('layouts')['root'][currentSide];
            if (thisNode === undefined) {
                continue;
            }
            if (currentSide === 'left') {
                if (canonY > canonX*-1*Math.sqrt(3)) {
                    thisLayout['moused'] = false;
                } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('graphWidth')/2,2)) {
                    thisLayout['moused'] = false;
                } else {
                    thisLayout['moused'] = true;
                }
            } else if (currentSide === 'right') {
                if (canonY < canonX*-1*Math.sqrt(3)) {
                    thisLayout['moused'] = false;
                } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('graphWidth')/2,2)) {
                    thisLayout['moused'] = false;
                } else {
                    thisLayout['moused'] = true;
                }
            }

            for(var currentNode in data('layouts')['root'][currentSide]) {
                // set 1 thisLayout
                thisNode = data('nodes')['root'][currentSide][currentNode];
                thisLayout = data('layouts')['root'][currentSide][currentNode];
                // skip simple nodes
                if (thisNode === undefined || thisNode['complex'] === undefined) {
                    continue;
                }

                canonX = gP.mouseX-thisLayout['x'];
                canonY = thisLayout['y']-gP.mouseY;
                if (currentNode === 'main') {
                    if (currentSide === 'left') {
                        if (canonY > canonX*-1*Math.sqrt(3)) {
                            thisLayout['moused'] = false;
                        } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('mainNode0Width')/2,2)) {
                            thisLayout['moused'] = false;
                        } else {
                            thisLayout['moused'] = true;
                        }
                    } else if (currentSide === 'right') {
                        if (canonY < canonX*-1*Math.sqrt(3)) {
                            thisLayout['moused'] = false;
                        } else if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('mainNode0Width')/2,2)) {
                            thisLayout['moused'] = false;
                        } else {
                            thisLayout['moused'] = true;
                        }
                    }
                } else {
                    if (Math.pow(canonX,2)+Math.pow(canonY,2) > Math.pow(data('node0Width')/2,2)) {
                        thisLayout['moused'] = false;
                    } else {
                        thisLayout['moused'] = true;
                    }
                }
            }
        }
    }
}
