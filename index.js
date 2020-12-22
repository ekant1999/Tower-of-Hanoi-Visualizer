  $(document).ready(function(){
    $("#btn1").click(function(){
           var x = $("#box3");
      $("#box3").animate({
      top:'20px',}, "slow",function(){
      x.animate({
        left:  ($("#box3").offset().left+1*150)
      }, "slow", function(){
        x.animate({
          top: "200px"
        }, "slow", function(){
          //callback();
        });
      });
      });
    });
  });
  $(document).ready(function(){
    $("#btn2").click(function(){
            var x = $("#box3");
      $("#box3").animate({
      top:'20px',}, "slow",function(){
      x.animate({
        left:  ($("#box3").offset().left+2*150)
      }, "slow", function(){
        x.animate({
          top: "200px"
        }, "slow", function(){
          //callback();
        });
      });
      });
    });
  });

  $(document).ready(function(){
    $("#btn3").click(function(){
            var x = $("#box3");
      $("#box3").animate({
      top:'20px',}, "slow",function(){
      x.animate({
        left:  ($("#box3").offset().left-1*150)
      }, "slow", function(){
        x.animate({
          top: "180px"
        }, "slow", function(){
          //callback();
        });
      });
      });
    });
  });
  $(document).ready(function(){
    var position = $("#myCanvas").offset();
      $("#box1").css({ top: +position.top+200-20, left: +position.left});
      $("#box2").css({ top: +position.top+200-40, left: +position.left+10 });
      $("#box3").css({ top: +position.top+200-60, left: +position.left+20 });

  });

  function Hanoi(n, from, to , via)
  {
    if (n==0) return;

    Hanoi(n-1, from, via , to);

    moveDisk(from,to);

    Hanoi(n-1, via, to , from);
  }
