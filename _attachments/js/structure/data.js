// toimawb properties
// _toi_functions:
//  _toi_type:
//      bag
//      seed
//      sprout
//      branch
//      root
// _toi_properties:
//  _toi_type:
//      bag
//      seed
//      sprout
//      branch
//      root
//  _toi_nominal:
//      (trace)
//  _toi_ordinal:
//      (level)
//      (inter-level)
//  _toi_cardinal:
//      (branch distribution per level)
//      (leaf distribution per level)
// instance
// data('toimawbBag')['preludeSeed']
// data('toimawbBag')['preludeSeed']['_toi_propertyBranch']
// data('toimawbBag')['preludeSeed']['_toi_functionBranch']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['_toi_propertyBranch']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['_toi_functionBranch']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['leaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['touchBranch']['_toi_propertyBranch']['_toi_typeLeaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['paintBranch']['_toi_propertyBranch']['_toi_nominalLeaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['soundBranch']['_toi_propertyBranch']['_toi_ordinalLeaf']
// data('toimawbBag')['preludeSeed']['oneSprout']['dataRoot']['oneTip']
// model
// data('bag')['seed']['sprout']['branch']
// data('bag')['seed']['sprout']['branch']['leaf']
// data('bag')['seed']['sprout']['root']
// data('bag')['seed']['sprout']['root']['tip']

// what defines a tree?
// words that are simultaneously nouns and verbs
//           
//                      branches -> branches...
//                      branches -> leafs
// seeds -> sprouts ->
//                      roots -> tips
//                      roots -> roots... 

function sproutSeed(seedSchema) {
    var newSprout = {};

    newSprout = stemSeed([seedSchema['label']],seedSchema);
    return newSprout;
}
function stemSeed(trace,seedSchema) {
    var newStems = {};
    var newTrace = [];

    newStems['_trace'] = trace.slice(0);
    newStems['_stems'] = {};
    newStems['_roots'] = seedSchema['roots'].clone();

    for (var thisStemKey in seedSchema['stems']) {
        if (seedSchema['stems'].hasOwnProperty(thisStemKey)) {
            newTrace = trace.slice(0);

            newStems['_stems'][thisStemKey] = {};

            newTrace.push(thisStemKey);
            newStems['_stems'][thisStemKey]['_trace'] = newTrace.slice(0);
            newStems['_stems'][thisStemKey]['_leaves'] = leafBranch(seedSchema['leaves']);
            newStems['_stems'][thisStemKey]['_branches'] = 
            branchStem(
                newTrace,
                seedSchema['stems'][thisStemKey],
                seedSchema['stems'],
                seedSchema['branches'],
                seedSchema['leaves']
            );
        }
    }
    return newStems;
}
function branchStem(trace,count,stemSchema,branchSchema,leafSchema) {
    var newBranches = {};
    var newTrace = [];

    for (var thisBranchKey in branchSchema) {
        if (branchSchema.hasOwnProperty(thisBranchKey)) {
            newTrace = trace.slice(0);
            if (count > 0) {
                newBranches[thisBranchKey] = {};

                newTrace.push(thisBranchKey);
                newBranches[thisBranchKey]['_trace'] = newTrace.slice(0);
                newBranches[thisBranchKey]['_leaves'] = leafBranch(leafSchema);
                newBranches[thisBranchKey]['_branches'] = branchStem(newTrace,count-1,stemSchema,branchSchema,leafSchema);
            }
        }
    }
    return newBranches;
}
function leafBranch(leafSchema) {
    return leafSchema.clone();
}

// initial shot of an arrange function for the paint sprout with a specific arrangement system
function arrangePaintSprout(sproutSchema) {
    var thisX = sproutSchema['_roots']['data']['mapCenterX'];
    var thisY = sproutSchema['_roots']['data']['mapCenterY'];
    var thisWidth = sproutSchema['_roots']['data']['mapWidth'];
    var thisHeight = sproutSchema['_roots']['data']['mapHeight'];
    var thisR = sproutSchema['_roots']['data']['mapR'];
    var thisG = sproutSchema['_roots']['data']['mapG'];
    var thisB = sproutSchema['_roots']['data']['mapB'];

    for (var thisStemKey in sproutSchema['_stems']) {
        if (sproutSchema['_stems'].hasOwnProperty(thisStemKey)) {
            switch (thisStemKey) {
                case 'one':
                    sproutSchema['_stems'][thisStemKey]['_leaves']['data']['shapeType'] = 0;
                    break;
                case 'two':
                    sproutSchema['_stems'][thisStemKey]['_leaves']['data']['shapeType'] = 1;
                    break;
            }
            sproutSchema['_stems'][thisStemKey]['_leaves']['data']['x'] = thisX;
            sproutSchema['_stems'][thisStemKey]['_leaves']['data']['y'] = thisY;
            sproutSchema['_stems'][thisStemKey]['_leaves']['data']['width'] = thisWidth;
            sproutSchema['_stems'][thisStemKey]['_leaves']['data']['height'] = thisHeight;
            sproutSchema['_stems'][thisStemKey]['_leaves']['data']['r'] = thisR;
            sproutSchema['_stems'][thisStemKey]['_leaves']['data']['g'] = thisG;
            sproutSchema['_stems'][thisStemKey]['_leaves']['data']['b'] = thisB;

            arrangeSprout(sproutSchema['_stems'][thisStemKey],
                thisX,thisY,thisWidth,thisHeight,thisR,thisG,thisB
            );
        }
    }
}
function arrangeSprout(sproutSchema,lastX,lastY,lastWidth,lastHeight,lastR,lastG,lastB) {
    var newTrace = [];
    for (var thisBranchKey in sproutSchema['_branches']) {
        if (sproutSchema['_branches'].hasOwnProperty(thisBranchKey)) {
            var newX = lastX;
            var newY = lastY;
            var newR = lastR-30;
            var newG = lastG-30;
            var newB = lastB-30;
            var newWidth = lastWidth*0.25;
            var newHeight = lastHeight*0.25;
            var newShapeType = 0;
            switch (sproutSchema['_branches'][thisBranchKey]['_trace'][1]) {
                case 'one':
                    newShapeType = 0;
                    switch (thisBranchKey) {
                        case 'one':
                            newX = lastX - Math.cos(Math.PI/2)*newWidth*1.25;
                            newY = lastY - Math.sin(Math.PI/2)*newHeight*1.25;
                            break;
                        case 'two':
                            newX = lastX - Math.cos(Math.PI/2)*newWidth*1.25;
                            newY = lastY + Math.sin(Math.PI/2)*newHeight*1.25;
                            break;
                        case 'three':
                            newX = lastX - Math.cos(Math.PI/3)*newWidth*1.25;
                            newY = lastY - Math.sin(Math.PI/3)*newHeight*1.25;
                            break;
                        case 'four':
                            newX = lastX - Math.cos(Math.PI/3)*newWidth*1.25;
                            newY = lastY + Math.sin(Math.PI/3)*newHeight*1.25;
                            break;
                    }
                    break;
                case 'two':
                    newShapeType = 1;
                    switch (thisBranchKey) {
                        case 'one':
                            newX = lastX + Math.cos(Math.PI/2)*newWidth*1.25;
                            newY = lastY - Math.sin(Math.PI/2)*newHeight*1.25;
                            break;
                        case 'two':
                            newX = lastX + Math.cos(Math.PI/2)*newWidth;
                            newY = lastY + Math.sin(Math.PI/2)*newHeight;
                            break;
                        case 'three':
                            newX = lastX + Math.cos(Math.PI/3)*newWidth;
                            newY = lastY + Math.sin(Math.PI/3)*newHeight;
                            break;
                        case 'four':
                            newX = lastX + Math.cos(Math.PI/3)*newWidth;
                            newY = lastY + Math.sin(Math.PI/3)*newHeight;
                            break;
                    }
                    break;
            }
            
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['x'] = newX;
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['y'] = newY;
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['width'] = newWidth;
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['height'] = newHeight;
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['r'] = newR;
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['g'] = newG;
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['b'] = newB;
            sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['shapeType'] = newShapeType;

            if (sproutSchema['_branches'][thisBranchKey]['_trace'].length < 6) {
                arrangeSprout(
                    sproutSchema['_branches'][thisBranchKey],
                    newX,newY,newWidth,newHeight,newR,newG,newB
                );
            }
        }
    }
}

// initial shot of an arrange function for the paint sprout with a specific arrangement system
function paintPaintSprout(sproutSchema) {
    for (var thisStemKey in sproutSchema['_stems']) {
        if (sproutSchema['_stems'].hasOwnProperty(thisStemKey)) {
            //console.log(sproutSchema['_stems'][thisStemKey]['_trace']);

            // start painting
            var thisR = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['r'];
            var thisG = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['g'];
            var thisB = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['b'];
            var thisX = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['x'];
            var thisY = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['y'];
            var thisWidth = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['width'];
            var thisHeight = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['height'];
            var thisValue = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['value'];

            if (thisValue == 0) {
                gP.fill(thisR,thisG,thisB);
            } else {
                gP.fill(thisR,0,0);
            }
            switch (sproutSchema['_stems'][thisStemKey]['_leaves']['data']['shapeType']) {
                case 0:
                    gP.arc(thisX,thisY,thisWidth,thisHeight,gP.PI/2,3*gP.PI/2);
                    break;
                case 1:
                    gP.arc(thisX,thisY,thisWidth,thisHeight,-gP.PI/2,gP.PI/2);
                    break;
            }
            // stop painting

            paintSprout(sproutSchema['_stems'][thisStemKey]);
        }
    }
}
function paintSprout(sproutSchema) {
    for (var thisBranchKey in sproutSchema['_branches']) {
        if (sproutSchema['_branches'].hasOwnProperty(thisBranchKey)) {
            // start painting
            var thisR = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['r'];
            var thisG = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['g'];
            var thisB = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['b'];
            var thisX = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['x'];
            var thisY = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['y'];
            var thisWidth = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['width'];
            var thisHeight = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['height'];

            gP.fill(thisR,thisG,thisB);
            switch (sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['shapeType']) {
                case 0:
                    gP.arc(thisX,thisY,thisWidth,thisHeight,gP.PI/2,3*gP.PI/2);
                    break;
                case 1:
                    gP.arc(thisX,thisY,thisWidth,thisHeight,-gP.PI/2,gP.PI/2);
                    break;
            }
            // stop painting

            if (sproutSchema['_branches'][thisBranchKey]['_trace'].length < 3) {
                paintSprout(sproutSchema['_branches'][thisBranchKey]);
            }
        }
    }
}

function monitorPaintSprout(sproutSchema,lastInputX,lastInputY) {
    for (var thisStemKey in sproutSchema['_stems']) {
        if (sproutSchema['_stems'].hasOwnProperty(thisStemKey)) {
            // start monitoring 
            var thisX = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['x'];
            var thisY = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['y'];
            var thisWidth = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['width'];
            var thisHeight = sproutSchema['_stems'][thisStemKey]['_leaves']['data']['height'];
            var thisContinue = false;

            switch (sproutSchema['_stems'][thisStemKey]['_leaves']['data']['shapeType']) {
                case 0:
                    if (lastInputX < thisX) {
                        thisContinue = true;
                        sproutSchema['_stems'][thisStemKey]['_leaves']['data']['value'] = 1;
                        $('#feedback2').text('left');
                    } else {
                        sproutSchema['_stems'][thisStemKey]['_leaves']['data']['value'] = 0;
                    }
                    break;
                case 1:
                    if (lastInputX > thisX) {
                        thisContinue = true;
                        sproutSchema['_stems'][thisStemKey]['_leaves']['data']['value'] = 1;
                        $('#feedback2').text('right');
                    } else {
                        sproutSchema['_stems'][thisStemKey]['_leaves']['data']['value'] = 0;
                    }
                    break;
            }
            // stop monitoring

            //monitorSprout(sproutSchema['_stems'][thisStemKey],lastInputX,lastInputY);
        }
    }
}
function monitorSprout(sproutSchema,lastInputX,lastInputY) {
    for (var thisBranchKey in sproutSchema['_branches']) {
        if (sproutSchema['_branches'].hasOwnProperty(thisBranchKey)) {
            // start monitoring
            var thisX = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['x'];
            var thisY = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['y'];
            var thisWidth = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['width'];
            var thisHeight = sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['height'];
            var thisContinue = false;

            switch (sproutSchema['_branches'][thisBranchKey]['_leaves']['data']['shapeType']) {
                case 0:
                    break;
                case 1:
                    break;
            }
            // stop monitoring 

            if (sproutSchema['_branches'][thisBranchKey]['_trace'].length < 6) {
                monitorSprout(sproutSchema['_branches'][thisBranchKey],lastInputX,lastInputY);
            }
        }
    }
}
