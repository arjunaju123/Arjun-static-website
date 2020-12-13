!(function($) {
  "use strict";

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);

(function ($) {
  //
  // Zachary Johnson
  // https://www.zachstronaut.com/posts/2009/12/21/happy-xmas-winternet.html
  // December 2009
  //
  
  var ww = 0;
  var wh = 0;
  var maxw = 0;
  var minw = 0;
  var maxh = 0;
  var textShadowSupport = true;
  var xv = 0;
  var snowflakes = ["\u2744", "\u2745", "\u2746"];
  var prevTime;
  var absMax = 200;
  var flakeCount = 0;
  
  $(init);

  function init()
  {
      var detectSize = function ()
      {
          ww = $(window).width();
          wh = $(window).height();
          
          maxw = ww + 300;
          minw = -300;
          maxh = wh + 300;
      };
      
      detectSize();
      
      $(window).resize(detectSize);
      
      if (!$('body').css('textShadow'))
      {
          textShadowSupport = false;
      }
      
      /* Should work in Windows 7 /*
      if (/windows/i.test(navigator.userAgent))
      {
          snowflakes = ['*']; // Windows sucks and doesn't have Unicode chars installed
          //snowflakes = ['T']; //No FF support for Wingdings
      }
      */
      
      // FF seems to just be able to handle like 50... 25 with rotation
      // Safari seems fine with 150+... 75 with rotation
      var i = 50;
      while (i--)
      {
          addFlake(true);
      }
      
      prevTime = new Date().getTime();
      setInterval(move, 50);
  }

  function addFlake(initial)
  {
      flakeCount++;
      
      var sizes = [
          {
              r: 1.0,
              css: {
                  fontSize: 15 + Math.floor(Math.random() * 20) + 'px',
                  textShadow: '9999px 0 0 rgba(238, 238, 238, 0.5)'
              },
              v: 2
          },
          {
              r: 0.6,
              css: {
                  fontSize: 50 + Math.floor(Math.random() * 20) + 'px',
                  textShadow: '9999px 0 2px #eee'
              },
              v: 6
          },
          {
              r: 0.2,
              css: {
                  fontSize: 90 + Math.floor(Math.random() * 30) + 'px',
                  textShadow: '9999px 0 6px #eee'
              },
              v: 12
          },
          {
              r: 0.1,
              css: {
                  fontSize: 150 + Math.floor(Math.random() * 50) + 'px',
                  textShadow: '9999px 0 24px #eee'
              },
              v: 20
          }
      ];
  
      var $nowflake = $('<span class="winternetz">' + snowflakes[Math.floor(Math.random() * snowflakes.length)] + '</span>').css(
          {
              /*fontFamily: 'Wingdings',*/
              color: '#eee',
              display: 'block',
              position: 'fixed',
              background: 'transparent',
              width: 'auto',
              height: 'auto',
              margin: '0',
              padding: '0',
              textAlign: 'left',
              zIndex: 9999
          }
      );
      
      if (textShadowSupport)
      {
          $nowflake.css('textIndent', '-9999px');
      }
      
      var r = Math.random();
  
      var i = sizes.length;
      
      var v = 0;
      
      while (i--)
      {
          if (r < sizes[i].r)
          {
              v = sizes[i].v;
              $nowflake.css(sizes[i].css);
              break;
          }
      }
  
      var x = (-300 + Math.floor(Math.random() * (ww + 300)));
      
      var y = 0;
      if (typeof initial == 'undefined' || !initial)
      {
          y = -300;
      }
      else
      {
          y = (-300 + Math.floor(Math.random() * (wh + 300)));
      }
  
      $nowflake.css(
          {
              left: x + 'px',
              top: y + 'px'
          }
      );
      
      $nowflake.data('x', x);
      $nowflake.data('y', y);
      $nowflake.data('v', v);
      $nowflake.data('half_v', Math.round(v * 0.5));
      
      $('body').append($nowflake);
  }
  
  function move()
  {
      if (Math.random() > 0.8)
      {
          xv += -1 + Math.random() * 2;
          
          if (Math.abs(xv) > 3)
          {
              xv = 3 * (xv / Math.abs(xv));
          }
      }
      
      // Throttle code
      var newTime = new Date().getTime();
      var diffTime = newTime - prevTime;
      prevTime = newTime;
      
      if (diffTime < 55 && flakeCount < absMax)
      {
          addFlake();
      }
      else if (diffTime > 150)
      {
          $('span.winternetz:first').remove();
          flakeCount--;
      }
      
      $('span.winternetz').each(
          function ()
          {
              var x = $(this).data('x');
              var y = $(this).data('y');
              var v = $(this).data('v');
              var half_v = $(this).data('half_v');
              
              y += v;
              
              x += Math.round(xv * v);
              x += -half_v + Math.round(Math.random() * v);
              
              // because flakes are rotating, the origin could be +/- the size of the flake offset
              if (x > maxw)
              {
                  x = -300;
              }
              else if (x < minw)
              {
                  x = ww;
              }
              
              if (y > maxh)
              {
                  $(this).remove();
                  flakeCount--;
                  
                  addFlake();
              }
              else
              {
                  $(this).data('x', x);
                  $(this).data('y', y);

                  $(this).css(
                      {
                          left: x + 'px',
                          top: y + 'px'
                      }
                  );
                  
                  // only spin biggest three flake sizes
                  if (v >= 6)
                  {
                      $(this).animate({rotate: '+=' + half_v + 'deg'}, 0);
                  }
              }
          }
      );
  }
})(jQuery);
