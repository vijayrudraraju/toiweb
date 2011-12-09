function drawLogo() {
    with ($('#canvas')) {
        var x = data('canvasWidth')-45;
        var y = 60;

        var width = 70;
        var smallWidth = 13;

        gP.fill(102,85,119);
        gP.noStroke();
        gP.ellipse(x,y,width,width);

        // eyes
        gP.fill(0,0,0);
        gP.ellipse(x-16,y-12,smallWidth,smallWidth);
        gP.ellipse(x+16,y-12,smallWidth,smallWidth);

        gP.fill(102,85,119);
        gP.ellipse(x-16,y-8,smallWidth-3,smallWidth-3);
        gP.ellipse(x+16,y-8,smallWidth-3,smallWidth-3);

        // third eye
        gP.fill(0,0,0);
        gP.ellipse(x,y-21,smallWidth,smallWidth);

        gP.fill(102,85,119);
        gP.ellipse(x,y-25,smallWidth-3,smallWidth-3);

        // mouth
        gP.fill(0,0,0);
        gP.arc(x,y,width-20,width-20,0,gP.PI);
        gP.fill(102,85,119);
        gP.arc(x,y,width-20,width-40,0,gP.PI);
    }
}



function drawAboutButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['about'];

        gP.textFont(data('font'),24);

        gP.noStroke();
        gP.fill(255,255,255);
        gP.rect(pointer['x'],pointer['y'],
        pointer['width'],pointer['height']);

        gP.fill(0);
        gP.text('about',pointer['x']+10,pointer['y']+28);
    }
}
function drawHelpButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['help'];

        gP.textFont(data('font'),24);

        gP.noStroke();
        gP.fill(255,255,255);
        gP.rect(pointer['x'],pointer['y'],
        pointer['width'],pointer['height']);

        gP.fill(0);
        gP.text('help',pointer['x']+18,pointer['y']+28);
    }
}



function drawAscendButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['ascend'];

        gP.noStroke();
        gP.fill(255,255,255);
        gP.triangle(pointer['x'],pointer['y'],
            pointer['x']+pointer['width'],pointer['y'],
        pointer['x'],pointer['y']+pointer['height']);

        gP.strokeWeight(3);
        gP.stroke(0,0,0);
        gP.line(pointer['x']+50,pointer['y']+10,
        pointer['x']+50,pointer['y']+60);
        gP.line(pointer['x']+50,pointer['y']+10,pointer['x']+60,pointer['y']+20);
        gP.line(pointer['x']+50,pointer['y']+10,pointer['x']+40,pointer['y']+20);

        gP.textFont(data('font'),24);

        gP.fill(0);
        if (data('views')['root']['side'] === 'left') {
            gP.fill(255,0,0);
        } 
        if (data('views')['root']['left']['level'] > 1) {
            gP.text(data('views')['root']['left']['level']-1,pointer['x']+20,pointer['y']+50);
        }

        gP.fill(0);
        if (data('views')['root']['side'] === 'right') {
            gP.fill(255,0,0);
        }
        if (data('views')['root']['right']['level'] > 1) {
            gP.text(data('views')['root']['right']['level']-1,pointer['x']+70,pointer['y']+50);
        }
    }
}
function drawDescendButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['descend'];

        gP.noStroke();
        gP.fill(255,255,255);
        gP.triangle(pointer['x'],pointer['y']+pointer['height'],
        pointer['x'],pointer['y'],
        pointer['x']+pointer['width'],pointer['y']+pointer['height']);

        gP.strokeWeight(3);
        gP.stroke(0,0,0);
        gP.line(pointer['x']+50,pointer['y']+140,
        pointer['x']+50,pointer['y']+90);
        gP.line(pointer['x']+50,pointer['y']+140,
        pointer['x']+60,pointer['y']+130);
        gP.line(pointer['x']+50,pointer['y']+140,
        pointer['x']+40,pointer['y']+130);

        gP.textFont(data('font'),24);

        gP.fill(0);
        if (data('views')['root']['side'] === 'left') {
            gP.fill(255,0,0);
        } 
        if (data('views')['root']['left']['level'] < 3) {
            gP.text(data('views')['root']['left']['level']+1,pointer['x']+20,pointer['y']+pointer['height']-30);
        }

        gP.fill(0);
        if (data('views')['root']['side'] === 'right') {
            gP.fill(255,0,0);
        }
        if (data('views')['root']['right']['level'] < 3) {
            gP.text(data('views')['root']['right']['level']+1,pointer['x']+70,pointer['y']+pointer['height']-30);
        }
    }
}
function drawSignalButton() {
    with ($('#globalCanvas')) {
        // set pointer
        var pointer = data('layouts')['root']['buttons']['signal'];

        gP.noStroke();
        gP.fill(255,255,255);
        gP.triangle(pointer['x']+pointer['width'],pointer['y']+pointer['height'],
        pointer['x'],pointer['y']+pointer['height'],
        pointer['x']+pointer['width'],pointer['y']);

        gP.fill(0,0,0);
        gP.arc(pointer['x']+110,pointer['y']+110,
        60,60,0,2*2*Math.PI/3);
    }
}



/*
function drawBigNode() {
    with ($('#globalCanvas')) {

        // choose fill
        gP.fill(255,255,255);

        // choose left stroke
        gP.strokeWeight(6);
        if (data('views')['root']['side'] === 'left') {
            gP.stroke(127,0,0);
        } else {
            gP.noStroke();
        }

        // paint left arc
        gP.arc(data('graphCenterX'),
        data('graphCenterY'),
        data('graphWidth'),
        data('graphHeight'),
        2*Math.PI/3-Math.PI/3,
        2*2*Math.PI/3);

        // choose right stroke
        if (data('views')['root']['side'] === 'right') {
            gP.stroke(127,0,0);
        } else {
            gP.noStroke();
        }

        // paint right arc
        gP.arc(data('graphCenterX'),
        data('graphCenterY'),
        data('graphWidth'),
        data('graphHeight'),
        -Math.PI/2-Math.PI/6,
        Math.PI-2*Math.PI/3);
    }
}
function drawBigBisect() {
    with ($('#globalCanvas')) {
        //paint bisecting line
        gP.strokeWeight(1);
        gP.stroke(0,0,0);
        gP.line(data('graphCenterX')-(data('graphWidth')/2/2),
        data('graphCenterY')-(data('graphHeight')/2*Math.sqrt(3)/2), 
        data('graphCenterX')+(data('graphWidth')/2/2),
        data('graphCenterY')+(data('graphHeight')/2*Math.sqrt(3)/2));
    }
}
*/



function drawBack(nodePointer,layoutPointer,viewPointer) {
    with ($('#globalCanvas')) {
        // choose fill
        var fillValue = 0;
        switch (nodePointer['level']) {
            case 0:
                fillValue = 100;
                break;
            case 1:
                fillValue = 150;
                break;
            case 2:
                fillValue = 200;
                break;
            case 3:
                fillValue = 255;
                break;
        }
        switch (nodePointer['color']) {
            case 'none':
                if (viewPointer['even']) {
                    gP.fill(0);
                } else {
                    gP.fill(255);
                }
                break;
            case 'red':
                gP.fill(fillValue,0,0);
                break;
            case 'green':
                gP.fill(0,fillValue,0);
                break;
            case 'blue':
                gP.fill(0,0,fillValue);
                break;
        }

        gP.strokeWeight(3);
        if (nodePointer['side'] === 'left') { 
            // choose left stroke
            if (data('views')['root']['side'] === 'left') {
                gP.stroke(127,0,0);
            } else {
                gP.noStroke();
            }

            // paint left arc
            gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            2*Math.PI/3-Math.PI/3,
            2*2*Math.PI/3);
        } else if (nodePointer['side'] === 'right') {
            // choose right stroke
            if (data('views')['root']['side'] === 'right') {
                gP.stroke(127,0,0);
            } else {
                gP.noStroke();
            }

            // paint right arc
            gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            -Math.PI/2-Math.PI/6,
            Math.PI-2*Math.PI/3);
        }
    }
}
function drawMain(nodePointer,layoutPointer,viewPointer) {
    // choose stroke
    gP.strokeWeight(6);
    if ($('#globalCanvas').data('views')['root'][nodePointer['side']]['position'] === nodePointer['position']) {
        gP.stroke(127,0,0);
    } else if (layoutPointer['moused']) {
        gP.stroke(127,127,127);
    } else {
        gP.noStroke();
    }

    // choose fill
    var fillValue = 0;
    switch (nodePointer['level']) {
        case 1:
            fillValue = 150;
            break;
        case 2:
            fillValue = 200;
            break;
        case 3:
            fillValue = 255;
            break;
    }
    switch (nodePointer['color']) {
        case 'none':
            if (viewPointer['even']) {
                gP.fill(0);
            } else {
                gP.fill(255);
            }
            break;
        case 'red':
            gP.fill(fillValue,0,0);
            break;
        case 'green':
            gP.fill(0,fillValue,0);
            break;
        case 'blue':
            gP.fill(0,0,fillValue);
            break;
    }

    // point main 
    if (nodePointer['side'] === 'left') {
        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            (Math.PI/3)+(Math.PI/3/4),
            (2*Math.PI/3)-(Math.PI/3/4)
        );
        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            (2*Math.PI/3)+(Math.PI/3/4),
            (3*Math.PI/3)-(Math.PI/3/4)
        );
        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            (3*Math.PI/3)+(Math.PI/3/4),
            (4*Math.PI/3)-(Math.PI/3/4)
        );

        gP.noStroke();
        // choose fill
        var fillValue = 0;
        switch (nodePointer['level']) {
            case 1:
                fillValue = 150;
                break;
            case 2:
                fillValue = 200;
                break;
            case 3:
                fillValue = 255;
                break;
        }
        switch (nodePointer['color']) {
            case 'none':
                if (viewPointer['even']) {
                    gP.fill(255);
                } else {
                    gP.fill(0);
                }
                break;
            case 'red':
                gP.fill(fillValue,0,0);
                break;
            case 'green':
                gP.fill(0,fillValue,0);
                break;
            case 'blue':
                gP.fill(0,0,fillValue);
                break;
        }

        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width']/2,
            layoutPointer['height']/2,
            2*Math.PI/3-Math.PI/3,
            2*2*Math.PI/3
        );
    } else if (nodePointer['side'] === 'right') {
        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            (4*Math.PI/3)+(Math.PI/3/4),
            (5*Math.PI/3)-(Math.PI/3/4)
        );
        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            (5*Math.PI/3)+(Math.PI/3/4),
            (6*Math.PI/3)-(Math.PI/3/4)
        );
        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width'],
            layoutPointer['height'],
            (6*Math.PI/3)+(Math.PI/3/4),
            (7*Math.PI/3)-(Math.PI/3/4)
        );

        gP.noStroke();
        var fillValue = 0;
        switch (nodePointer['level']) {
            case 1:
                fillValue = 150;
                break;
            case 2:
                fillValue = 200;
                break;
            case 3:
                fillValue = 255;
                break;
        }
        switch (nodePointer['color']) {
            case 'none':
                if (viewPointer['even']) {
                    gP.fill(255);
                } else {
                    gP.fill(0);
                }
                break;
            case 'red':
                gP.fill(fillValue,0,0);
                break;
            case 'green':
                gP.fill(0,fillValue,0);
                break;
            case 'blue':
                gP.fill(0,0,fillValue);
                break;
        }
        gP.arc(layoutPointer['x'],
            layoutPointer['y'],
            layoutPointer['width']/2,
            layoutPointer['height']/2,
            -Math.PI/2-Math.PI/6,
            Math.PI-2*Math.PI/3
        );
    }
}
function drawSatellite(nodePointer,layoutPointer,viewPointer) {
    /*
    // choose stroke
    gP.strokeWeight(6);
    if ($('#globalCanvas').data('views')['root'][nodePointer['side']]['position'] === nodePointer['position']) {
        gP.stroke(127,127,0);
    } else if (layoutPointer['moused']) {
        gP.stroke(127,127,127);
    } else {
        gP.noStroke();
    }


    // choose fill
    var fillValue = 0;
    switch (nodePointer['level']) {
        case 1:
            fillValue = 150;
            break;
        case 2:
            fillValue = 200;
            break;
        case 3:
            fillValue = 255;
            break;
    }
    switch (nodePointer['color']) {
        case 'none':
            if (viewPointer['even']) {
                gP.fill(0);
            } else {
                gP.fill(255);
            }
            break;
        case 'red':
            gP.fill(fillValue,0,0);
            break;
        case 'green':
            gP.fill(0,fillValue,0);
            break;
        case 'blue':
            gP.fill(0,0,fillValue);
            break;
    }
    */

    // paint node
    //console.log('paint node ' + viewPointer['even'] + ' ' + layoutPointer['x'] + ' ' + layoutPointer['y'] + ' ' + layoutPointer['width'] + ' ' + layoutPointer['height']);
    /*
    gP.ellipse(layoutPointer['x'],
        layoutPointer['y'],
        layoutPointer['width'],
        layoutPointer['height']
    );
    */

    /*
    // hollow half
    if (!nodePointer['terminal']) {
        if (nodePointer['side'] == 'left') {
            if (viewPointer['even']) {
                gP.fill(255);
            } else {
                gP.fill(0);
            }
            gP.arc(layoutPointer['x'],
                layoutPointer['y'],
                9*layoutPointer['width']/10,
                9*layoutPointer['height']/10,
                -Math.PI/2-Math.PI/6,
                Math.PI-2*Math.PI/3
            );
        } else if (nodePointer['side'] == 'right') {
            if (viewPointer['even']) {
                gP.fill(255);
            } else {
                gP.fill(0);
            }
            gP.arc(layoutPointer['x'],
                layoutPointer['y'],
                9*layoutPointer['width']/10,
                9*layoutPointer['height']/10,
                Math.PI/2-Math.PI/6,
                Math.PI+Math.PI/3
            );
        }
    }
    */

    /*
    gP.strokeWeight(1);
    if (viewPointer['even']) {
        gP.stroke(255);
    } else {
        gP.stroke(0);
    }
    // paint bisector
    gP.line(layoutPointer['x']-(layoutPointer['width']/2/2),
    layoutPointer['y']-(layoutPointer['height']/2*Math.sqrt(3)/2), 
    layoutPointer['x']+(layoutPointer['width']/2/2),
    layoutPointer['y']+(layoutPointer['height']/2*Math.sqrt(3)/2)
    );
    */

}
function drawNode(nodePointer,layoutPointer,viewPointer) {
    if (nodePointer['complex']) {
        //drawSatellite(nodePointer,layoutPointer,viewPointer);
        drawBack(nodePointer,layoutPointer,viewPointer);
    } else if (nodePointer['position'] === 0) {
        //drawMain(nodePointer,layoutPointer,viewPointer);
    } else if (nodePointer['position'] === -1) {
        //drawBack(nodePointer,layoutPointer,viewPointer);
    }
}

function drawNodes(side,trace) {
    with ($('#globalCanvas')) {
        var thisNode = data('nodes')['root'][side];
        var thisLayout = data('layouts')['root'][side];
        var thisView = data('views')['root'][side];

        applyFunctionToStructure(thisNode,thisLayout,thisView,trace,drawNode);
    }
}
