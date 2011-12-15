function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
    return 'AssertException: ' + this.message;
}
function assert(exp, message) {
    if (!exp) {
        throw new AssertException(message);
    }
}

/* Make an asynchronous HTTP request to the browser. */
function http_request(path, args, ok_responder, error_responder) {
  var client = new XMLHttpRequest();
  client.onreadystatechange = function() {
    if(this.readyState == 4)
      ok_responder(this.responseText);
    else if (error_responder)
      error_responder(this.responseText);
  }
  a='';
  n=0;
  for (i in args) {
    if (n==0)
      a+='?';
    else
      a+='&';
    a += i + '=' + args[i];
    n++;
  }
  client.open("GET", path+a);
  client.send("");
}

/* A simple object class to represent a bucket of things that can be
 * put in or taken out. */
function Bucket() {
    this.contents = [];
    this.put = function(a) {
        this.contents.push(a);
    }
    this.take = function(a) {
        for (i in this.contents) {
            if (this.contents[i]==a) {
                this.contents.splice(i,1);
                return;
            }
        }
    }
}

/* Helper function to trace debug output. */
function trace(text) {
    var out = document.getElementById('output');
    if (out)
        out.innerHTML += '<p>'+text+'</p>\n'
}

/* Class to wrap an association list. */
function Assoc() {
    this.contents = {};
    this.add = function(key, value) {
        this.contents[key] = value;
    },
    this.remove = function(name) {
        delete this.contents[name];
    },
    this.get = function(name) {
        return this.contents[name];
    },
    this.keys = function() {
        var keys = [];
        for (k in this.contents)
            keys.push(k);
        return keys;
    }
    this.length = function() {
        return this.keys().length;
    }
}

/* Split a full signal name into device and signal parts. */
function splitSigName(signame)
{
    var i = signame.indexOf("/", 1);
    if (i<0)
        return null;

    return [signame.substring(0, i),
            signame.substring(i)];
}

/* Get the full offset and size of an element. */
function fullOffset(e)
{
    var o = {left:0,top:0,width:0,height:0};
    if (e.offsetParent)
        o = fullOffset(e.offsetParent);
    return {left:e.offsetLeft - e.scrollLeft + o.left,
            top:e.offsetTop - e.scrollTop + o.top,
            width:e.offsetWidth,
            height:e.offsetHeight};
}

// Return new array with duplicate values removed
/*
Array.prototype.uniquePairs =
function() {
    var a = [];
    var l = this.length;
    for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++) {
            // If this[i] is found later in the array
            if (this[i][0] === this[j][0] && this[i][1] === this[j][1])
                j = ++i;
        }
        a.push(this[i]);
    }
    return a;
};
*/
/*
Object.prototype.clone = function() {
    var newObj = (this instanceof Array) ? [] : {};
    for (i in this) {
        if (i == 'clone') continue;
        if (this[i] && typeof this[i] == "object") {
            newObj[i] = this[i].clone();
        } else newObj[i] = this[i]
    } 
    return newObj;
};
*/
/*
Object.prototype.nodeCount = function() {
    var count = 0;
    for (i in this) {
        if (this.hasOwnProperty(i)) {
            count++;
        }
    } 
    return count;
};
*/

function indexPhrase(phrase,index) {
    console.log('indexPhrase');
    console.log(phrase);
    for (var i=0;i<phrase.length;i++) {
        //console.log(phrase.slice(i));
        indexPhraseHelper(phrase.slice(i),index,phrase.slice(0,i)); 
    }
}
function indexPhraseHelper(phrase,index,buffer) {
    if (phrase != '') {
        var foundIndex = index.indexOf(phrase[0]);
        if (foundIndex === -1) {
            index.push(phrase[0]);
            index.push(0);
            index.push(['',0,[],[]]);
            index.push(buffer.slice());
            foundIndex = index.indexOf(phrase[0]);
        } else {
            index[foundIndex+1]++;
        }

        if (phrase[1] !== undefined) {
            //console.log(buffer);
            buffer.push(phrase[0]);
            indexPhraseHelper(phrase.slice(1),index[foundIndex+2],buffer.slice());
        } else {
            var terminalIndex = index[foundIndex+2].indexOf('');
            index[foundIndex+2][terminalIndex+1]++;
        }
    }
}
function retrievePhraseQueryTree(word,index,result,buffer) {
    return 'ping';
}

// concatenated triplets
// key
// strength
// down
function indexWord(word,newTime,oldTime,index) {
    if (word != '') {
        var foundIndex = index.indexOf(word[0]);
        if (foundIndex === -1) {
            index.push(word[0]);
            index.push(0);
            index.push(['',0,[]]);
            foundIndex = index.indexOf(word[0]);
        } else {
            index[foundIndex+1]++;
        }

        if (word[1] !== undefined) {
            indexWord(word.slice(1),newTime,oldTime,index[foundIndex+2]);
        } else {
            var terminalIndex = index[foundIndex+2].indexOf('');
            index[foundIndex+2][terminalIndex+1]++;
        }
    }
}

function retrieveWordQueryTree(word,index,result,buffer) {
    if (word != '') {
        var foundIndex = index.indexOf(word[0]);
        // if the letter is not found return nothing
        if (foundIndex === -1) {
            return '';     
        }

        buffer += word[0];
        if (word[1] !== undefined) {
            result = retrieveWordQueryTree(word.slice(1),index[foundIndex+2],result,buffer);
        } else {
            result = subTreeToText(retrieveSubTree(index[foundIndex+2],[]),'',buffer);
        }
    } 

    return result;
}
function retrieveSubTree(index,result) {
    for (var i=0;i<index.length;i+=3) {
        result.push(index[i]); 
        result.push(retrieveSubTree(index[i+2],[])); 
    }
    return result;
}
function subTreeToText(subtree,result,buffer) {
    for (var i=0;i<subtree.length;i+=2) {
        if (subtree[i] !== '') {
            buffer += subtree[i];
            result = subTreeToText(subtree[i+1],result,buffer);
            buffer = buffer.substring(0,buffer.length-1);
        }
    }
    result += '<br/>'+buffer; 
    return result;
}

/*
function indexWord(word,newTime,oldTime,index) {
    if (word != '') {
        if (index[word[0]] === undefined) {
            index[word[0]] = {};
            //index[word[0]]['_timeStamp'] = newTime;
            //index[word[0]]['_hitCount'] = 1;
        } else if (oldTime == index[word[0]]['_timeStamp']) {
            //index[word[0]]['_timeStamp'] = newTime;
            //index[word[0]]['_hitCount']++;
        }

        if (word[1] !== undefined) {
            indexWord(word.slice(1),newTime,oldTime,index[word[0]]);
        }
    }
}
*/

/*
function indexPhrase(phrase,time,index) {
    if (phrase != '') {
        if (index[phrase[0]] === undefined) {
            index[phrase[0]] = {};
            index[phrase[0]]['_timestamp'] = [time];
        } else {
            index[phrase[0]]['_timestamp'].push(time);
        }

        if (phrase[1] !== undefined) {
            indexPhrase(phrase.slice(1),time,index[phrase[0]]);
        }
    }
}
*/
function indexParagraph(paragraph,time,index) {
    if (paragraph != '') {
        if (index[paragraph[0]] === undefined) {
            index[paragraph[0]] = {};
            index[paragraph[0]]['_timestamp'] = [time];
        } else {
            index[paragraph[0]]['_timestamp'].push(time);
        }

        if (paragraph[1] !== undefined) {
            indexParagraph(paragraph.slice(1),time,index[paragraph[0]]);
        }
    }
}

function calcLevenshteinDistance(firstWord,secondWord) {
    var matrixWidth = firstWord.length+1;
    var matrixHeight = secondWord.length+1;
    var distMatrix = new Array(matrixWidth);
    for(var j=0;j<matrixWidth;j++) {
        distMatrix[j] = new Array(matrixHeight);
    }

    for (var i=0;i<matrixWidth;i++) {
        distMatrix[i][0] = i;
    }
    for (var j=0;j<matrixHeight;j++) {
        distMatrix[0][j] = j;
    }

    for (var j=1;j<matrixHeight;j++) {
        for (var i=1;i<matrixWidth;i++) {
            var firstWordIndex = i-1;
            var secondWordIndex = j-1;

            if (firstWord[firstWordIndex] == secondWord[secondWordIndex]) {
                distMatrix[i][j] = distMatrix[i-1][j-1];
            } else {
                // find best operation
                var minValue = distMatrix[i-1][j]+1; // deletion
                if (distMatrix[i][j-1]+1 < minValue) {
                    minValue = distMatrix[i][j-1]+1; // insertion
                }
                if (distMatrix[i-1][j-1] < minValue) {
                    minValue = distMatrix[i-1][j-1]+1; // substitution 
                }

                distMatrix[i][j] = minValue;
            }
        }
    }

    return distMatrix[matrixWidth-1][matrixHeight-1];
}
