$(function() {

    // Pen or Eraser mode
    var write = false;
    var erase = false;

    // Get canvas and container
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    // Set drawing parameters
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";

    var cursor = {x:0, y:0};

    // Activate pen
    $("#pencil").click(function() {
        $(".erase-mode").hide(2000);
        $(".drawing-mode").show(2000);
        write = true;
        erase = false;
    });
    // Activate eraser
    $("#eraser").click(function() {
        $(".drawing-mode").hide(2000);
        $(".erase-mode").show(2000);
        erase = true;
        write = false;
    });

    starting = true;
    // Cursor is inside the canvas
    $("#canvas").mousemove(function (e) {

        if (write) {
            
            if (e.ctrlKey) {
                
                // Writing mode
                context.lineWidth = $("#pen-size").slider("value");
                if (starting) {
                    context.beginPath();
                    cursor.x = e.pageX-this.parentNode.offsetLeft-this.offsetLeft;
                    cursor.y = e.pageY-this.offsetTop;
                    context.moveTo(cursor.x, cursor.y);
                    starting = false;
                }
                else{
                    cursor.x = e.pageX-this.parentNode.offsetLeft-this.offsetLeft;;
                    cursor.y = e.pageY-this.offsetTop;
                    context.strokeStyle = $("#paint-color").val();
                    context.lineTo(cursor.x, cursor.y);
                    context.stroke();
                    }
            }
            else {
                starting = true;
            }
        }
        else if (erase) {
            // Erase mode
             if (e.ctrlKey) {
                context.lineWidth = $("#eraser-slider").slider("value");
                
                if (starting) {
                    context.beginPath();
                    cursor.x = e.pageX - this.parentNode.offsetLeft - this.offsetLeft;
                    cursor.y = e.pageY - this.offsetTop;
                    context.moveTo(cursor.x, cursor.y);
                    starting = false;
                }
                else{
                    cursor.x = e.pageX - this.parentNode.offsetLeft - this.offsetLeft;
                    cursor.y = e.pageY - this.offsetTop;
                    context.strokeStyle = 'White';
                    context.lineTo(cursor.x, cursor.y);
                    context.stroke();
                }
            }
            else {
                starting = true;
            }
        }
        else {
            // Show the instructions
            $("#instruction").show();
        }
    });
    $("#canvas").mouseleave(function(event) {
        $("#instruction").hide();
    });

    // Clear the canvas
    $("#clear").click(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        erase = false;
        write = true;
        $(".erase-mode").hide();
        $(".drawing-mode").hide();
        $(".clear-mode").show(2000);
        $(".clear-mode").hide(2000);
        $(".drawing-mode").show(4000);
    });

    // Change color
    $("#paint-color").change(function(){
        $("#circle").css("background-color", $(this).val());
    });

    $("#pen-size").slider({
        min: 3,
        max: 20,
        slide: function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });
    $( "#pen-size" ).css('background', 'rgb(25,32,238)');

// Eraser size
    $("#eraser-slider").slider({
        min: 30,
        max: 75,
        slide: function(event, ui) {
            $("#eraser-circle").height(ui.value);
            $("#eraser-circle").width(ui.value);
            context.lineWidth = ui.value;
        }
    });

});



// Basic HTML5 canavas
// var canvas = document.getElementById("canvas");
// var context = canvas.getContext("2d");

// $("#canvas").mouseover(function(e) {

//     context.beginPath();
    
//     context.lineWidth = 10;
//     context.lineCap = "round"; // { round, butt, square }
//     context.lineJoin = "round"; // { round, bavel, miter}
//     context.strokeStyle = "Green";
    
//     context.moveTo(0, 0);
//     context.lineTo(50, 100);
//     // context.lineTo(400, 100);
    
//     context.stroke();
// });
