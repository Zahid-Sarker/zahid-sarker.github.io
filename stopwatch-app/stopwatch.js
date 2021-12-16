var mode = "off";
    var lapCount = 1;
    var timer;
    var lcsec = 0;
    var lsec = 0;
    var lmin = 0;
    var tcsec = 0;
    var tsec = 0;
    var tmin = 0;

$(function() {
    
    $("#start").click(function(){
        mode = "on";
        $("#start").hide();
        $("#stop").show();
        countTime();
    });
    
    $("#stop").click(function() {
        mode = "off";
        $(this).hide();
        $("#resume").show();
        $("#lap").hide();
        $("#reset").show();
        stopTheWatch();
    });
    
    $("#resume").click(function(){
        $(this).hide();
        $("#stop").show();
        $("#reset").hide();
        $("#lap").show();
        countTime();
    });
    
    $("#lap").click(function(){
        $("#lapRecord").show();
        printLapRecord();
        lapCount++;
        lcsec = 0;
        lsec = 0;
        lmin = 0;
    });
    
    $("#reset").click(function() {
        location.reload();
    });
  });

function countTime() {
    timer = setInterval(function() {
        
        calculateLapTime();
        printLapTime();
        
        calculateStopwatchTime();
        printStopwatchTime();
        
        
    }, 10);
}

function stopTheWatch() {
    clearInterval(timer);
}

function calculateLapTime() {
    lcsec++;
    
    if(lcsec == 100) {
        lcsec = 0;
        lsec++;
    }
        
    if(lsec == 60) {
        lsec = 0;
        lmin++;
    }
}

function printLapTime() {
    if(lcsec < 10) {
            $("#lapCentisecond").text("0" + lcsec);
        }
        else {
            $("#lapCentisecond").text(lcsec);
        }
        
        if(lsec < 10) {
            $("#lapSecond").text("0" + lsec);
        }
        else {
            $("#lapSecond").text(lsec);
        }
        
        if(lmin < 10) {
            $("#lapMinute").text("0" + lmin);
        }
        else {
            $("#lapMinute").text(lmin);
        }
}

function printLapRecord() {
    $("#lapRecord").append("Lap " + lapCount + "- ");

    if(lmin < 10) {
        $("#lapRecord").append("0" + lmin + ":");
    }
    else {
        $("#lapRecord").append(lmin + ":");
    }
        
    if(lsec < 10) {
        $("#lapRecord").append("0" + lsec + ":");
    }
    else {
        $("#lapRecord").append(lsec + ":");
    }
        
    if(lcsec < 10) {
        $("#lapRecord").append("0" + lcsec);
    }
    else {
        $("#lapRecord").append(lcsec);
    }
    
    $("#lapRecord").append("<br>");
}


function calculateStopwatchTime() {
    tcsec++
        if(tcsec == 100) {
            tcsec = 0;
            tsec++;
        }
        
        if(tsec == 60) {
            tsec = 0;
            tmin++;
        }
}


function printStopwatchTime() {
    if(tcsec < 10) {
            $("#timeCentisecond").text("0" + tcsec);
        }
        else {
            $("#timeCentisecond").text(tcsec);
        }
        
        if(tsec < 10) {
            $("#timeSecond").text("0" + tsec);
        }
        else {
            $("#timeSecond").text(tsec);
        }
        
        if(tmin < 10) {
            $("#timeMinute").text("0" + tmin);
        }
        else {
            $("#timeMinute").text(tmin);
        }
}


















