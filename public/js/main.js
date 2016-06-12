$(document).ready(function() {

  'use strict';

  var doc = document,
      body = $('body');

  $('.sidemenu-btn').addClass('hidde').on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('hidde');

    if ($(this).hasClass('hidde')) {
      $('#bottom-bar').stop().animate({paddingLeft: '16%'});
      $('section').stop().animate({width: '85%'});
      $('#sidemenu').stop().animate({left: 0});
      $('#sidemenu > *').stop().animate({opacity: 1}, 800);
    } else {
      $('#bottom-bar').stop().animate({paddingLeft: '5%'});
      $('section').stop().animate({width: '100%'});
      $('#sidemenu > *').stop().animate({opacity: 0}, 200);
      $('#sidemenu').stop().animate({left: - $('#sidemenu').innerWidth() + 'px'});
    }
  });


  // Navigation

  $('section#settings').css({display: 'block'}).stop().animate({opacity: 1}, 300);
  $('#sidemenu nav li.settings a').addClass('active');

  $('#sidemenu nav a').on('click', function(e) {
    e.preventDefault();

    if (!($(this).hasClass('active'))) {

      $(this).addClass('active').parent().siblings().children('a').removeClass('active');

      $('section').stop().animate({opacity: 0}, 300, function() {
        $(this).css({display: 'none'});
      });

      $('section#' + $(this).attr('href')).css({display: 'block'}).stop().animate({opacity: 1}, 300);

    }
  });

  // Settings

  $('#settings li a').on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('on');
    $(this).toggleClass('off');

    if ($(this).hasClass('on')) {
      $(this).children('i').stop().animate({left: '20px'}, 200);
    } else {
      $(this).children('i').stop().animate({left: '1px'}, 200);
    }

  });


































  //////////////////////////////////////////////////           GAME         ////////////////////////////////////////////////////////////

  // Right Click

  $(document).on('contextmenu', function(e) {
    e.preventDefault();
  });

  // End Right Click

  $('#map-display').append('<div class="tiles clearfix"></div>');
  for (var i = 0; i < 273; i++) {
    $('#map-display .tiles').append('<div class="map-tile"></div>');
  }

  $('#map-display').prepend('<div class="player"></div>');

  var Player = {
    model: $('#map-display .player'),
    y: 13,
    x: 13,
    moveTop: 0,
    moveLeft: 0,
    moveRight: 0,
    moveBottom: 0
  };

  var Bombs = {
    count: 3,
    display: $('#bottom-bar #bombs span')
  };

  var Wall = {
    count: 13
  };

  var wallModel = $('#map-display .walls .wall');

  // Default Values

    // Player

      Player.model.css({left: Player.x + 'px', top: Player.y + 'px'});

    // Bombs

      var bombsCountFixed = Bombs.count;
      $('#map-display').prepend('<div class="bombs"></div>');
      Bombs.display.text('Brombs: ' + Bombs.count + ' / ' + bombsCountFixed);

    // Walls

      $('#map-display').prepend('<div class="walls"></div>');

      for (var i = 0; i < Wall.count; i++) {
        $('#map-display .walls').prepend('<div class="wall"></div>');
      }

      $('#map-display .walls .wall').eq(0).css({left: '253px', top: '61px'});
      $('#map-display .walls .wall').eq(1).css({left: '541px', top: '61px'});
      $('#map-display .walls .wall').eq(2).css({left: '61px', top: '397px'});
      $('#map-display .walls .wall').eq(3).css({left: '493px', top: '493px'});
      $('#map-display .walls .wall').eq(7).css({left: '253px', top: '301px'});
      $('#map-display .walls .wall').eq(4).css({left: '253px', top: '13px'});
      $('#map-display .walls .wall').eq(5).css({left: '253px', top: '109px'});
      $('#map-display .walls .wall').eq(6).css({left: '253px', top: '157px'});
      $('#map-display .walls .wall').eq(8).css({left: '205px', top: '157px'});
      $('#map-display .walls .wall').eq(9).css({left: '157px', top: '157px'});
      $('#map-display .walls .wall').eq(10).css({left: '109px', top: '157px'});
      $('#map-display .walls .wall').eq(11).css({left: '61px', top: '157px'}).css({left: 0, top: 0, opacity: 0});
      $('#map-display .walls .wall').eq(12).css({left: '13px', top: '157px'});

      function showCoords(object, number) {
        return { 
          y: Number(object.eq(number).css('top').length == 4 ? object.eq(number).css('top').slice(0, 2) : object.eq(number).css('top').slice(0, 3)),
          x: Number(object.eq(number).css('left').length == 4 ? object.eq(number).css('left').slice(0, 2) : object.eq(number).css('left').slice(0, 3))
        }
      }

      function unblockPlayerModel() {
        if (Player.model.hasClass('blocked')) {
          Player.model.removeClass('blocked');
        }
      }

      function removeBlockedAnimation() {
        if (!Player.model.css({border: '2px solid transparent'})) {
          Player.model.css({border: '2px solid transparent'});
        }
      }

  //- End Default Values

  $(document).keyup(function(e) {

    switch (e.which) {

      // Left Arrow
      case 37:
        unblockPlayerModel();
        removeBlockedAnimation();

        if (!(Player.moveLeft = Player.moveLeft)) {
          Player.moveLeft++;
        }

        Player.x -= 48;

        if (Player.x < 0) {
          Player.moveRight = 1;
          Player.moveLeft = 1;
          Player.x = 13;
        }

        for (var i = 0; i < $('#map-display .walls .wall').length; i++) {
          if (Player.x == showCoords($('#map-display .walls .wall'), i).x && Player.y == showCoords($('#map-display .walls .wall'), i).y) {
            Player.moveLeft = Player.moveLeft - 1;
            Player.x += 48;
            Player.model.addClass('blocked').css({borderLeft: '2px solid #FF4646'});
          }
        }
            
        if (Player.moveLeft < 1) {
          Player.moveLeft = 0;
        }

        Player.model.css({left: Player.x + 'px'});

        if (Player.x > 0 && !(Player.model.hasClass('blocked'))) {
          Player.moveRight--;
        }

        break;

      // Top Arrow
      case 38:
        unblockPlayerModel();
        removeBlockedAnimation();
        Player.moveTop++;
        Player.y -= 48;

        if (Player.y < 0) {
          Player.moveTop = 1;
          Player.moveBottom = 1;
          Player.y = 13;
        }

        for (var i = 0; i < $('#map-display .walls .wall').length; i++) {
          if (Player.x == showCoords($('#map-display .walls .wall'), i).x && Player.y == showCoords($('#map-display .walls .wall'), i).y) {
            Player.moveTop = Player.moveTop - 1;
            Player.y += 48;
            Player.model.addClass('blocked').css({borderTop: '2px solid #FF4646'});
          }
        }
            
        if (Player.moveTop < 1) {
          Player.moveTop = 0;
        }

        Player.model.css({top: Player.y + 'px'});

        if (Player.y > 0 && !(Player.model.hasClass('blocked'))) {
          Player.moveBottom--;
        }
        break;

      // Right Arrow
      case 39:
        unblockPlayerModel();
        removeBlockedAnimation();
        Player.moveRight++;

        Player.x = (48 * Player.moveRight) + 13;

        if (Player.x > 973) {
          Player.moveRight = 20;
          Player.x = 973;
        }

        for (var i = 0; i < $('#map-display .walls .wall').length; i++) {
          if (Player.x == showCoords($('#map-display .walls .wall'), i).x && Player.y == showCoords($('#map-display .walls .wall'), i).y) {
            Player.moveRight = Player.moveRight - 1;
            Player.x -= 48;
            Player.model.addClass('blocked').css({borderRight: '2px solid #FF4646'});
          }
        }
            
        if (Player.moveRight < 1) {
          Player.moveRight = 0;
        }

        Player.model.css({left: Player.x + 'px'});
        Player.moveLeft = 0;
        break;

      // Bottom Arrow
      case 40:
        unblockPlayerModel();
        removeBlockedAnimation();
        Player.moveBottom++;
        Player.y = (48 * Player.moveBottom) + 13;

        if (Player.y > 589) {
          Player.moveBottom = 12;
          Player.y = 589;
        }

        for (var i = 0; i < $('#map-display .walls .wall').length; i++) {
          if (Player.x == showCoords($('#map-display .walls .wall'), i).x && Player.y == showCoords($('#map-display .walls .wall'), i).y) {
            Player.moveBottom = Player.moveBottom - 1;
            Player.y -= 48;
            Player.model.addClass('blocked').css({borderBottom: '2px solid #FF4646'});
          }
        }
            
        if (Player.moveBottom < 1) {
          Player.moveBottom = 0;
        }

        Player.model.css({top: Player.y + 'px'});
        Player.moveTop = 0;
        break;

      // Spacebar
      case 32:
        if (Bombs.count > 0) {

          Bombs.count--;


          // CHANGE MENU COLOR
          if (Bombs.count == 0) {
            // $('#logo b, i').css({color: '#FF4646'});
            $('#current-unit-stats #bombs span').css({color: '#FF4646'});
          }
          // END CHANGE MENU COLOR

          Bombs.display.text('Brombs: ' + Bombs.count + ' / ' + bombsCountFixed);
          if ($('#map-display .bombs').children().length > 0) { 
            $('#map-display .bombs .bomb').after('<div class="bomb ' + Bombs.count + '"></div>');
          } else {
            $('#map-display .bombs').append('<div class="bomb ' + Bombs.count + '"></div>');
          }

          $('#map-display .bombs .bomb.' + Bombs.count).css({
                                    left: Player.x + 'px',
                                    top: Player.y + 'px'
                                  });

          $('#map-display .bombs .bomb.' + Bombs.count).delay(1000)
                                                      .queue(function(next) {
                                                        $(this).css({backgroundColor: 'rgb(222, 60, 38)', boxShadow: 'none'});
                                                        next();
                                                      })
                                                      .animate({ height: '48.71px',
                                                                 width: '48.71px',
                                                                 marginTop: '-13px',
                                                                 marginLeft: '-13px',
                                                                 borderRadius: 0 }, 500, function() {
                                                                                     $(this).remove();
                                                                                   });

        }

        break;
    }

  });


});



// SETUP SETTINGS

  $("#settings li a.grid").on('click', function() {
    if ($(this).hasClass('off')) {
      $('#map-display .map-tile').removeClass('grid-off').addClass('grid');
      $('#settings .map-tile').removeClass('grid-off').addClass('grid');
    } else {
      $('#map-display .map-tile').removeClass('grid').addClass('grid-off');
      $('#settings .map-tile').removeClass('grid').addClass('grid-off');
    }
  });