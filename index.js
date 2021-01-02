var dict = {};
dict['A'] = 0;
dict['B'] = 1;
dict['C'] = 2;

var steps = new Array();

$(document).ready(function() {

    var position = $("#myCanvas").offset();
    $('#noOfDisc').css({
        'left': position.left
    });
    $('#speed').css({
        'left': position.left + 100
    });
    $('#Solve').css({
        'left': position.left + 350
    });
    $('#Reset').css({
        'left': position.left + 240
    });

    var select = '';
    for (i = 3; i <= 10; i++) {
        select += '<option val=' + i + '>' + i + '</option>';
    }
    $('#noOfDisc').html(select);
    $('#noOfDisc').val(8);

    var myOptions = {
        val1: 'slow',
        val2: 'normal',
        val3: 'fast'
    };

    var mySelect = $('#speed');
    $.each(myOptions, function(val, text) {
        mySelect.append(
            $('<option></option>').val(val).html(text)
        );
    });
    $('#speed').val('val2');

    createDisc(Number($("#noOfDisc option:selected").text()));
    $("#Solve").click(function() {
        solve(Number($("#noOfDisc option:selected").text()), $("#speed option:selected").text());
    });

    var diskInA = Number($("#noOfDisc option:selected").text());
    var diskInB = 0;
    var diskInC = 0;

    function status(initial, target, num) {
        var len;
        if (target == "B") {
            diskInB++;
            len = diskInB;
        } else if (target == "A") {
            diskInA++;
            len = diskInA;
        } else {
            diskInC++;
            len = diskInC;
        }
        if (initial == "B")
            diskInB--;
        else if (initial == "A")
            diskInA--;
        else
            diskInC--;
        return len;
    }

    function move(num, start, end, speed) {
        var len = status(start, end, num) - 1;
        console.log(len);
        var id = "#box" + num;
        var x = $(id);
        x.animate({
            top: '140px'
        }, speed, function() {
            x.animate({
                left: (x.offset().left + (dict[end] - dict[start]) * 150)
            }, speed, function() {
                x.animate({
                    top: (315 - len * 12)
                }, speed, function() {

                });
            });
        });
    }

    function towerOfHanoi(num, initial, target, auxilary) {
        if (num == 1) {
            steps.push(function() {
                $.when(move(num, initial, target, $("#speed option:selected").text())).done(function() {
                    console.log("move disk 1 from tower " + initial + " to tower " + target);
                });
            });
            return;
        }
        towerOfHanoi(num - 1, initial, auxilary, target);
        steps.push(function() {
            $.when(move(num, initial, target, $("#speed option:selected").text())).done(function() {
                console.log("move disk " + num + " from tower " + initial + " to tower " + target);
            });
        });
        towerOfHanoi(num - 1, auxilary, target, initial);
    }

    function createDisc(num) {
        var colors = [
            'red', 'green', 'blue',
            'black', 'DarkMagenta', '#ff6600', 'red', 'green', 'blue',
            'black'
        ];
        for (i = num; i > 0; i--) {
            var id = "box" + Number(i);
            d = document.createElement('div');
            $(d).height(100 - i * 20)
                .attr('id', id)
                .attr('class', 'box')
                .appendTo($("body"))
        }

        $(".box").each(function(index, item) {
            var position = $("#myCanvas").offset();
            var wid = 100 - (10 * index);
            if ($(this).is(":empty")) {
                $(this).css({
                    "background": colors[index],
                    "height": "12px",
                    "border-radius": "10px",
                    "position": "absolute",
                    'top': position.top + 187 - index * 12,
                    'left': position.left + index * 5
                }).width(wid)
            }
        });
    }

    function solve(num) {

        towerOfHanoi(num, 'A', 'B', 'C');

        for (var i = 0, len = steps.length; i < len; i++) {
            var fn = steps[i];
            setTimeout(fn, i * 1800);
        }
        setTimeout(function() {
            alert("Successfully solved!");
        }, (steps.length + 1) * 1800);
    }
    $("#noOfDisc").change(function() {
        $(".box").remove();
        diskInA = Number($("#noOfDisc option:selected").text());
        createDisc(Number($(this).val()));
    });
    $("#Reset").click(function() {
        var num = Number($("#noOfDisc option:selected").text());
        location.reload();
        $("#noOfDisc option:selected").text(num);
        createDisc(Number($("#noOfDisc option:selected").text()));
    });
});
