/*
var gCircleVel0 = 0.2;
var osc0a = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
var osc0b = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
var osc0c = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
var signal0a = osc0a.signal;
var signal0b = osc0b.signal;
var signal0c = osc0c.signal;
var env0a = new ADSR(0.05, 0.1, 0.6, 0.1, 0.1, 44100);
var env0b = new ADSR(0.05, 0.1, 0.3, 0.1, 0.1, 44100);
var env0c = new ADSR(0.05, 0.1, 1, 0.1, 0.1, 44100);
osc0a.addEnvelope(env0a);
osc0b.addEnvelope(env0b);
osc0c.addEnvelope(env0c);
*/

var EquationBank = function(list) {
    var myself = this;

    this.user = list;

    this.equationBank= [];
    this.size = function() {
        return this.equationBank.length;
    };

};

var WaveBank = function(context,list) {
    var myself = this;

    this.context = context;
    this.user = list;

    this.sampleRate = this.context.sampleRate;

    this.waveBank = [];
    this.signalBank = [];
    this.size = function() {
        return this.waveBank.length;
    };

    this.node = context.createJavaScriptNode(2048,1,1);
    this.node.onaudioprocess = function(e) { 
        myself.process(e)
    };

    this.setBankSize = function(num) {
        if(num > myself.waveBank.size) {
            for(var i=myself.waveBank.size;i<num;i++) {
                myself.waveBank[i] = new Oscillator(DSP.SINE, 220, 0.1, 2048, 44100);
                myself.signalBank[i] = myself.waveBank[i].signal;
            }
        } else if(num < myself.waveBank.size) {
            for(var i=num;i<myself.waveBank.size;i++) {
                myself.waveBank.pop(); 
                myself.signalBank.pop();
            }
        }
    };

    this.setFreq = function() {
        assert(myself.length == myself.user.length(),
        "more waves in bank than audio nodes in system");

        var keys = myself.user.keys();

        for(var i=0;i<keys.length;i++) {
            myself.waveBank[i].setFreq(myself.user.get(keys[i]).freq); 
        }
    };

    this.setAmp = function() {
        assert(myself.size == myself.user.length(),
        "more waves in bank than audio nodes in system");

        var keys = myself.user.keys();

        for(var i=0;i<keys.length;i++) {
            myself.waveBank[i].setAmp(myself.user.get(keys[i]).amp); 
        }
    };

    this.generate = function() {
        for(var i=0;i<myself.waveBank.size;i++) {
            myself.waveBank[i].generate();
        }
    };

    this.process = function(e) {
        var data0 = e.outputBuffer.getChannelData(0);
        var data1 = e.outputBuffer.getChannelData(1);

        assert(myself.size == myself.user.length(),
        "more waves in bank than audio nodes in system");

        for(var i=0;i<myself.signalBank.size;i++) {
            for(var j=0;j<data0.length;j++) {
                if(i==0) {
                    data0[j] = 0;
                }
                data0[j] += myself.signalBank[i][j];
            }
        }

        for(var j=0;j<data1.length;j++) {
            data1[j] = data0[j];
        }
    };

    this.play = function() {
        myself.node.connect(myself.context.destination);
    };

    this.pause = function() {
        myself.node.disconnect();
    };

};

/* global node data */
var gSinkBank = new Assoc();
var gSourceBank = new Assoc();
var connections = new Assoc();

/* global sink audio initialization */
var gA = new webkitAudioContext();
var gWaveBank = new WaveBank(gA,gSinkBank);

/* global source equation initialization */
var gEquationBank = new EquationBank(gSourceBank);
//gWaveBank.play();



function addEditObjectHandlers() {
    $('#controlSourceNodeForm').toggle(true);
    $('#audioSinkNodeForm').toggle(false);
    $('#groupForm').toggle(false);
    $('#connectionForm').toggle(false);

    $('#objectMenu').evently({
        change: function() {
            if($(this).val() == 0) {
                $('#controlSourceNodeForm').toggle(true);
                $('#audioSinkNodeForm').toggle(false);
                $('#groupForm').toggle(false);
                $('#connectionForm').toggle(false);
            } else if($(this).val() == 1) {
                $('#controlSourceNodeForm').toggle(false);
                $('#audioSinkNodeForm').toggle(true);
                $('#groupForm').toggle(false);
                $('#connectionForm').toggle(false);
            } else if($(this).val() == 2) {
                $('#controlSourceNodeForm').toggle(false);
                $('#audioSinkNodeForm').toggle(false);
                $('#groupForm').toggle(true);
                $('#connectionForm').toggle(false);
            } else if($(this).val() == 3) {
                $('#controlSourceNodeForm').toggle(false);
                $('#audioSinkNodeForm').toggle(false);
                $('#groupForm').toggle(false);
                $('#connectionForm').toggle(true);
            }
        }
    });


    $('#createSourceButton').evently({
        click: function() {
            $('#validationFeedback').trigger("newsourcefeedback");
        }
    });
    $('#createSinkButton').evently({
        click: function() {
            $('#validationFeedback').trigger("newsinkfeedback");
        }
    });

    $('#validationFeedback').evently({
        newsourcefeedback: {
            mustache: '<p>validation: {{feedback}}</p>',
            data: function() {
                var equation = $('#controlSourceEq').val();
                var answer = 'err';
                if(equation.match(/^[0-9+\-*/(). ]*$/)) {
                    try {
                        answer = equation != '' ? eval(equation) : '0';

                        gSourceBank.add($('#controlSourceName').val(),
                        {
                            'device_name': "legacy",
                            'name': $('#controlSourceName').val(),
                            'eq': $('#controlSourceEq').val()
                        }); 
                        $('#globalCanvas').trigger('updategraph');
                        $('#globalCanvas').trigger("redraw");
                    } catch(e) {
                    }
                }
                return {
                    feedback: answer
                };
            }
        },
        newsinkfeedback: {
            mustache: '<p>validation: {{feedback}}</p>',
            data: function() {
                var answer = 'err';
                gSinkBank.add($('#audioSinkName').val(),
                {
                    'device_name': "legacy",
                    'name': $('#audioSinkName').val(),
                    'freq': parseFloat($('#audioSinkFreq').val()),
                    'amp': parseFloat($('#audioSinkAmp').val())
                }); 
                gWaveBank.setBankSize(gSinkBank.length());
                $('#globalCanvas').trigger('updategraph');
                $('#globalCanvas').trigger("redraw");
                return {
                    feedback: answer
                };
            }
        }
    });
}
