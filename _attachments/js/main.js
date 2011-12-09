// vijay rudraraju

var gP;
$(document).ready(function() {
        //$db = $.couch.db('toiweb');
        //$.couch.urlPrefix = "http://localhost:5984/toiweb/_design/toiweb";
        $.couch.info({
            success: function(data) {
                console.log('info');
                console.log(data);
            }
        });
        $.couch.allDbs({
            success: function(data) {
                console.log('allDbs');
                console.log(data);
            }
        });
        $.couch.login({
            name: 'vijay',
            password: 'vijay',
            success: function(data) {
                console.log('login');
                console.log(data);
            },
            error: function(status) {
                console.log(status);
            }
        });
        $.couch.db('toiweb').allDocs({
            success: function(data) {
                console.log('allDocs');
                console.log(data);
            }
        });

        $(document).evently({
            _init: function() {
                $('#feedback1').text('hello1');
                $('#feedback2').text('hello2');
                $('#feedback3').text('hello3');
            },
            keypress: function(e) {
                //e.preventDefault();
            },
            keydown: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
                } else if(e.which=='13') {
                    //e.preventDefault();
                }
            },
            keyup: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
                } else if(e.which=='13') {
                    //e.preventDefault();
                    //$('#canvas').trigger("enter");
                }
            }
        });

        $('#input').evently({
            _init: function() {
                $(this).data('input',[]);
                $(this).data('wordIndex',{});
                $(this).data('timeIndex',{});
                $(this).data('assocIndex',{});
            },
            keyup: function(e) {
                // start word index
                var lines = $(this).val().split('\n');
                var words = [];
                for (var i=0;i<lines.length;i++) {
                    words = words.concat(lines[i].split(/ +/)); 
                }
                for (var i=0;i<words.length;i++) {
                    for (var j=0;j<words[i].length;j++) {
                        indexWord(words[i].slice(j),$(this).data('wordIndex'));
                    }
                }
                //console.log($(this).data('wordIndex'));
                // end word index
            }
        });
        
        $('#filter').evently({
            keyup: function(e) {
                console.log('keyup');
                var input = $('#input').data('input');
                var results = [];
                //console.log(words);
                for (var i=0;i<input.length;i++) {
                    //console.log(words[i]);
                    for (var j=0;j<input[i][1].length;j++) {
                        for (var k=0;k<input[i][1][j].length;k++) {
                            if (input[i][1][j][k].search($('#filter').val()) != -1) {
                                //console.log($('#filter').val());
                                //console.log(input[i][1][j][k]);
                                results.push(input[i][1][j][k]);
                            }
                        }
                    }
                }
                console.log(results);
            }
        });

/*
        $('#canvas').evently({
            _init: function() {
                $('#canvas').data('toimawbBag',{});
                $('#canvas').data('toimawbBag')['symbiotes'] = {};
                $('#canvas').data('toimawbBag')['symbiotes']['paintSymbiote'] = {
                    
                };
                $('#canvas').data('toimawbBag')['symbiotes']['colorFlipperSymbiote'] = {
                };
                $('#canvas').data('toimawbBag')['seeds'] = {};
                $('#canvas').data('toimawbBag')['seeds']['paintSeed'] = {
                    label:'paint',
                    leaves:{
                        data:{
                            shapeType:0,
                            value:0,
                            x:0,
                            y:0,
                            width:0,
                            height:0,
                            r:0,
                            g:0,
                            b:0
                        },
                        func:{
                            arrange: function(thisX,thisY,thisWidth,thisHeight) {
                            },
                            returnSelf: function() {
                                return this;
                            }
                        }
                    },
                    branches:{
                        one:1,
                        two:1,
                        three:1,
                        four:1,
                    },
                    stems:{
                        one:3,
                        two:3
                    },
                    roots:{
                        data:{
                            mapWidth:640,
                            mapHeight:640,
                            mapCenterX:320,
                            mapCenterY:320,
                            mapR:255,
                            mapG:255,
                            mapB:255,
                        }
                    }
                };

                $('#canvas').data('toimawbBag')['sprouts'] = {};
                $('#canvas').data('toimawbBag')['sprouts']['paintSprout'] = 
                sproutSeed($('#canvas').data('toimawbBag')['seeds']['paintSeed']);
                arrangePaintSprout($('#canvas').data('toimawbBag')['sprouts']['paintSprout']);

                $(this).data('canvasWidth',640);
                $(this).data('canvasHeight',640);
            
                gP = new Processing($('#canvas')[0],gPFunc);
                $(this).trigger('redraw');
                gP.noLoop();
            },
            setup: function() {
            },
            draw: function() {
                gP.textSize(24);
                gP.background(0*16+11,0*16+9,0*16+11);
                drawLogo();
                paintPaintSprout($('#canvas').data('toimawbBag')['sprouts']['paintSprout']);
            },
            mouseclicked: function(thisEvent,thisX,thisY) {
                $('#feedback1').text('touchstart: ' + thisX + ' ' + thisY);
                monitorPaintSprout($('#canvas').data('toimawbBag')['sprouts']['paintSprout'],thisX,thisY);
            },
            updatebackground: function() {
            },
            updategraph: function() {
                //console.log('updategraph triggered');
            },
            redraw: function() {
                gP.redraw();
            },
            tab: function() {
            },
            enter: function() {
            }
        });
        */

        $(this).trigger('redraw');
});
/*
function gPFunc(p) {
	p.mouseClicked = function() {
        $('#canvas').trigger('mouseclicked',[gP.mouseX,gP.mouseY]);
        $('#canvas').trigger('redraw');
	};

    p.touchStart = function(touchEvent) {
        $('#canvas').trigger('mouseclicked',[touchEvent.touches[0].offsetX,touchEvent.touches[0].offsetY]);
        $('#canvas').trigger('redraw');
        //touchEvent.preventDefault();
    }

    p.touchEnd = function(touchEvent) {
        $('#feedback1').text('touchend: ' + touchEvent.changedTouches.length);
    }

	p.setup = function() {
		console.log(p.PFont.list());
		p.size($('#canvas').data('canvasWidth'),$('#canvas').data('canvasHeight'));
		$('#canvas').data('font',p.loadFont('sans-serif'));
        $('#canvas').trigger('setup');
	};

	p.draw = function() {
        $('#canvas').trigger('draw');
	};
}
*/
