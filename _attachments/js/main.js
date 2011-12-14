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

        $('#textarea1').evently({
            _init: function() {
                $(this).data('oldTime','');
                $(this).data('wordIndex',['',0,[]]);
                $(this).data('phraseIndex',{});
                $(this).data('paragraphIndex',{});
                $(this).data('timeIndex',{});
                $(this).data('assocIndex',{});

                $(this).val('apple apartment application apart');
                $(this).trigger('keyup');
            },
            keyup: function(e) {
                var newTime = $.now();
                var oldTime = $(this).data('oldTime');

                // start word index
                var lines = $(this).val().split('\n');
                var words = [];
                for (var i=0;i<lines.length;i++) {
                    //indexParagraph(lines.slice(i),time,$(this).data('paragraphIndex'));
                    words = words.concat(lines[i].split(/ +/)); 
                }
                for (var i=0;i<words.length;i++) {
                    //for (var j=0;j<words[i].length;j++) {
                    console.log('indexing...'+words[i]);
                    indexWord(words[i],newTime,oldTime,$(this).data('wordIndex'));
                    //}
                    //indexPhrase(words.slice(i),time,$(this).data('phraseIndex'));
                }
                //console.log($(this).data('wordIndex'));
                // end word index

                $(this).data('oldTime',newTime);
            }
        });

        $('#textarea2').evently({
            _init: function() {

            },
            keyup: function(e) {
                var text = $(this).val();
                var retrievalResult = retrieveQueryTree(text,$('#textarea1').data('wordIndex'),'','');
                //console.log('retrievalResult: '+retrievalResult);
                $('#feedback1').html(retrievalResult);
            }
        });
});
