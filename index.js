$(document).ready(function() {
    var position = $("#myCanvas").offset();

    $("#box4").css({
        top: +position.top + 200 - 11,
        left: +position.left
    });
    $("#box3").css({
        top: +position.top + 200 - 21,
        left: +position.left+10
    });
    $("#box2").css({
        top: +position.top + 200 - 31,
        left: +position.left + 20
    });
    $("#box1").css({
        top: +position.top + 200 - 41,
        left: +position.left + 30
    });

});


var dict = {};
dict['A'] = 0;
dict['B'] = 1;
dict['C'] = 2;
var state =
 [    [1, 2, 3,4], [], []]

var steps = new Array();

function status(initial, target, num) {
    var arr;
    if (target == "B") {
        state[1].push(num);
        arr = state[1];
    } else if (target == "A") {
        state[0].push(num);
        arr = state[0];
    } else {
        state[2].push(num);
        arr = state[2];
    }
    if (initial == "B")
        state[1].pop();
    else if (initial == "A")
        state[0].pop();
    else
        state[2].pop();
    return arr;
}

function towerOfHanoi(num, initial, target, auxilary) {
    if (num == 1) {
        steps.push(function() {
            $.when(move(num, initial, target)).done(function() {
                console.log("move disk 1 from tower " +initial +" to tower " +target);
                var p = document.createElement("p");
                p.innerHTML="move disk 1 from tower " +initial +" to tower " +target;
                document.getElementById("log").appendChild(p);
            });
        });
        return;
    }
    towerOfHanoi(num - 1, initial, auxilary, target);
    steps.push(function() {
        $.when(move(num, initial, target)).done(function() {
            console.log("move disk "+ num + " from tower " + initial + " to tower " + target);
            var p = document.createElement("p");
            p.innerHTML="move disk 1 from tower " +initial +" to tower " +target;
            document.getElementById("log").appendChild(p);
        });
    });

    towerOfHanoi(num - 1, auxilary, target, initial);
}

function move(num, start, end) {
    var arr2 = status(start, end, num);
    var id = "#box" + num;
    var len = arr2.length - 1;
    var x = $(id);
    x.animate({
        top: '80px'
    }, "slow", function() {
        x.animate({
            left: (x.offset().left + (dict[end] - dict[start]) * 150)
        }, "slow", function() {
            x.animate({
                top: (257 - len * 10)
            }, "slow", function() {

            });
        });
    });
}
$(document).ready(function() {
    function solve() {

        towerOfHanoi(4, 'A', 'B', 'C');

        for (var i = 0, len = steps.length; i < len; i++) {
            var fn = steps[i];
            setTimeout(fn, i * 1800);
        }
        setTimeout(function() {
            alert("Successfully solved!");
        }, (steps.length + 1) * 1600);

    }

    $("#btn1").click(function() {
        solve();
    });
});


