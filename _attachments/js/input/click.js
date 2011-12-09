function detectAboutButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['about']['moused']) {
        if ($('#aboutSwitch').data('isAbouting')) {
            console.log('aboutSwitch deactivated');
            $('#aboutSwitch').trigger('deactivateabout');
        } else {
            $('#aboutSwitch').trigger('activateabout');
        }
    }
}
function detectHelpButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['help']['moused']) {
        if ($('#helpSwitch').data('isHelping')) {
            $('#helpSwitch').trigger('deactivatehelp');
        } else {
            $('#helpSwitch').trigger('activatehelp');
        }
    }
}
function detectAscendButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['ascend']['moused']) {
        $('#globalCanvas').trigger('ascend');
    }
}
function detectDescendButtonClick() {
    if ($('#globalCanvas').data('layouts')['root']['buttons']['descend']['moused']) {
        $('#globalCanvas').trigger('descend');
    }
}

function detectNodesClick() {
    with ($('#globalCanvas')) {
        var thisNode;
        var thisLayout;
        var thisView;
        for (var currentSide in data('nodes')['root']) {
            // pointers
            thisNode = data('nodes')['root'][currentSide];
            thisLayout = data('layouts')['root'][currentSide];
            thisView = data('views')['root'][currentSide];

            // skip property nodes
            if (thisNode['complex'] === undefined || thisNode['complex'] === false) {
                continue;
            }

            if (currentSide === 'left') {
                if (thisLayout['moused']) {
                    data('views')['root']['side'] = 'left';
                    if (!(thisLayout['top']['moused'] || thisLayout['middle']['moused'] || thisLayout['bottom']['moused'] || thisLayout['main']['moused'])) {
                        if (data('views')['root'][currentSide]['position'] == thisNode['position']) {
                            flipNodeColor(thisNode['back']);
                        }
                        data('views')['root'][currentSide]['position'] = thisNode['position'];
                    }
                } 
            } else if (currentSide === 'right') {
                if (thisLayout['moused']) {
                    data('views')['root']['side'] = 'right';
                    if (!(thisLayout['top']['moused'] || thisLayout['middle']['moused'] || thisLayout['bottom']['moused'] || thisLayout['main']['moused'])) {
                        if (data('views')['root'][currentSide]['position'] == thisNode['position']) {
                            flipNodeColor(thisNode['back']);
                        }
                        data('views')['root'][currentSide]['position'] = thisNode['position'];
                    }
                }
            }

            for(var currentNode in data('nodes')['root'][currentSide]) {
                // pointers
                thisNode = data('nodes')['root'][currentSide][currentNode];
                thisLayout = data('layouts')['root'][currentSide][currentNode];
                thisView = data('views')['root'][currentSide][currentNode];

                // skip property nodes
                if (thisNode['complex'] === undefined || thisNode['position'] === -1) {
                    continue;
                }
                if (thisLayout['moused']) {
                    if (data('views')['root'][currentSide]['position'] === thisNode['position']) {
                        flipNodeColor(thisNode);
                    }
                    data('views')['root'][currentSide]['position'] = thisNode['position'];
                }
            }
        }
    }
}
