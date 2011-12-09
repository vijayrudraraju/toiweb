var levels = [[[]],[[]]];
function updateLevelStructure() {
    levels = [[[]],[[]]];

	//outputs
	filterMatches[0].sort();
	for (var i=0;i<filterMatches[0].length;i++) {
        levels[0].push([filterMatches[0][i][0]]);  

		var splitArray = filterMatches[0][i][1].split("/");
        if (splitArray.length == 1) { 
            levels[0][levels[0].length-1].push(splitArray[0]);
        } else {
            for (var j=1;j<splitArray.length;j++) {
                levels[0][levels[0].length-1].push(splitArray[j]);
            }
        }
	}
    levels[0] = clusterSignals(levels[0], 0);


	//inputs
	filterMatches[1].sort();
	for (var i=0;i<filterMatches[1].length;i++) {
        levels[1].push([filterMatches[1][i][0]]);

		var splitArray = filterMatches[1][i][1].split("/");
        if (splitArray.length == 1) { 
            levels[1][levels[1].length-1].push(splitArray[0]);
        } else {
            for (var j=1;j<splitArray.length;j++) {
                levels[1][levels[1].length-1].push(splitArray[j]);
            }
        }
	}
    levels[1] = clusterSignals(levels[1], 0);
}

function clusterSignals(list,depth) {
	var labels = new Array();
    var clusters = new Array();

    o: for (var i=0,n=list.length;i<n;i++) {
		for (var j=0,y=labels.length;j<y;j++) {
			if (labels[j]==list[i][depth]) {
                clusters[j].push(list[i]);
				continue o;
			}
        }

        if (list[i].length > depth) {
            labels[labels.length] = list[i][depth];
            clusters[clusters.length] = [list[i]];
        }
    }

    for (var i=0;i<clusters.length;i++) {
        clusters[i] = clusterSignals(clusters[i],depth+1); 
        if (clusters[i][0].length==0) {
            clusters[i] = 0; 
        }
    }

    return [labels,clusters];
}
