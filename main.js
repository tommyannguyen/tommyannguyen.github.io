(function ($) {
  "use strict";
  var body = $("body");

  if (typeof Typewriter !== "undefined") {
    var role = document.getElementById("role");
    var typewriter = new Typewriter(role, {
      loop: true,
      delay: 35,
      deleteSpeed: 10,
    });

    typewriter
      .pauseFor(2000)
      .typeString("Full-Stack Web Developer")
      .pauseFor(2000)
      .deleteAll(10)
      .typeString("Team Lead")
      .pauseFor(2000)
      .deleteAll(10)
      .typeString("Software Generalist")
      .pauseFor(2000)
      .deleteAll(10)
      .typeString("Entrepreneur")
      .pauseFor(2000)
      .start();
  }

  function imageCarousel() {
    $(".portfolio-page-carousel").each(function () {
      $(this).imagesLoaded(function () {
        $(".portfolio-page-carousel").owlCarousel({
          smartSpeed: 1200,
          items: 1,
          loop: true,
          dots: true,
          nav: true,
          navText: false,
          autoHeight: true,
          margin: 10,
        });
      });
    });
  }

  // Ajax Pages loader
  function ajaxLoader() {
    // Check for hash value in URL
    var ajaxLoadedContent = $("#page-ajax-loaded");

    function showContent() {
      ajaxLoadedContent.removeClass("fadeOutLeft closed");
      ajaxLoadedContent.show();
      $("body").addClass("ajax-page-visible");
    }

    function hideContent() {
      $("#page-ajax-loaded").addClass("fadeOutLeft closed");
      $("body").removeClass("ajax-page-visible");
      setTimeout(function () {
        $("#page-ajax-loaded.closed").html("");
        ajaxLoadedContent.hide();
      }, 500);
    }

    var href = $(".ajax-page-load").each(function () {
      href = $(this).attr("href");
      if (
        location.hash ==
        location.hash.split("/")[0] + "/" + href.substr(0, href.length - 5)
      ) {
        var toLoad = $(this).attr("href");
        showContent();
        ajaxLoadedContent.load(toLoad);
        return false;
      }
    });

    $(document)
      .on("click", "#ajax-page-close-button", function (e) {
        // Hide Ajax Loaded Page on Navigation cleck and Close button
        e.preventDefault();
        hideContent();
        location.hash = location.hash.split("/")[0];
      })
      .on("click", ".ajax-page-load", function () {
        // Show Ajax Loaded Page
        var hash =
          location.hash.split("/")[0] +
          "/" +
          $(this)
            .attr("href")
            .substr(0, $(this).attr("href").length - 5);
        location.hash = hash;
        showContent();

        return false;
      });
  }
  // /Ajax Pages loader

  // Animate layout
  function animateLayout() {
    var windowWidth = $(window).width(),
      animatedContainer = "",
      animateType = $("#page_container").attr("data-animation");

    if (windowWidth > 991) {
      animatedContainer = $(".page-container");
    } else {
      animatedContainer = $(".site-main");
    }

    animatedContainer.addClass("animated " + animateType);
    $(".page-scroll").addClass("add-prespective");
    animatedContainer.addClass("transform3d");
    setTimeout(function () {
      $(".page-scroll").removeClass("add-prespective");
      animatedContainer.removeClass("transform3d");
    }, 1000);
  }
  // /Animate layout

  function scrollTop() {
    if ($(body).scrollTop() > 150) {
      $(".scroll-to-top").removeClass("hidden-btn");
    } else {
      $(".scroll-to-top").addClass("hidden-btn");
    }
  }

  function skillsStyles() {
    var custom_styles = "";
    $(".skill-container").each(function () {
      var value = $(this).attr("data-value");

      if (value >= 101) {
        value = "100";
      }

      if (typeof value != "undefined") {
        var id = $(this).attr("id"),
          $custom_style =
            "#" + id + " .skill-percentage { width: " + value + "%; } ";
        custom_styles += $custom_style;
      }
    });
    $("head").append(
      '<style data-styles="leven-theme-skills-css" type="text/css">' +
        custom_styles +
        "</style>"
    );
  }

  //On Window load & Resize
  $(window)
    .on("load", function () {
      //Load
      // Animation on Page Loading
      $(".preloader").fadeOut(800, "linear");
      animateLayout();
    })
    .on("hashchange", function (event) {
      if (location.hash) {
        ajaxLoader();
      }
    });

  // On Document Load
  $(document).ready(function () {
    $("body").scroll(function () {
      scrollTop();
    });

    imageCarousel();

    // Mobile menu
    $(".menu-toggle").on("click", function () {
      $(".site-nav").addClass("animate");
      $(".site-nav").toggleClass("mobile-menu-hide");
    });

    // Testimonials Slider
    $(".testimonials.owl-carousel").owlCarousel({
      nav: false, // Show next/prev buttons.
      items: 3, // The number of items you want to see on the screen.
      loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
      navText: false,
      margin: 25,
      responsive: {
        // breakpoint from 0 up
        0: {
          items: 1,
        },
        // breakpoint from 480 up
        480: {
          items: 1,
        },
        // breakpoint from 768 up
        768: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });

    ajaxLoader();

    $(".scroll-to-top").click(function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        400
      );
      return false;
    });

    scrollTop();

    skillsStyles();
  });
})(jQuery);
