function surroundSelection() {
  var span = document.createElement("span");
  span.classList.add("selection");
  if (window.getSelection) {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var range = sel.getRangeAt(0).cloneRange();
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}

$(".cut").on("click", function () {
  $("#wrap").removeClass("nocut");
  $(".selection").attr("data-splitting", "words");
  Splitting();
  setTimeout(function () {
    $(".selection").remove();
    $("#wrap").addClass("nocut");
  }, 1500);
  setTimeout(function () {
    $(".multi-button").removeClass("visible");
    $("#wrap").removeClass("copy").removeClass("active");
  }, 1800);
});

$(".cut, .copy").click(function () {
  var selected = window.getSelection().toString();
  localStorage.setItem("text", selected);
});

$(".paste").on("click", function () {
  $("#wrap").addClass("pasted");
  setTimeout(function () {
    var newtext = localStorage.getItem("text");
    $(".selection").text(newtext);
  }, 1000);
  setTimeout(function () {
    $(".multi-button").removeClass("visible");
    $("#wrap").removeClass("pasted").removeClass("active");
  }, 1700);
});

$(".copy").on("click", function () {
  $("#wrap").addClass("copy");
  setTimeout(function () {
    $(".multi-button").removeClass("visible");
    $("#wrap").removeClass("copy").removeClass("active");
  }, 2600);
});

$("button").click(function () {
  $(this).addClass("active");
  $("body").addClass("active");
  var sel = window.getSelection ? window.getSelection() : document.selection;
  if (sel) {
    if (sel.removeAllRanges) {
      sel.removeAllRanges();
    } else if (sel.empty) {
      sel.empty();
    }
  }
  setTimeout(function () {
    $("button").removeClass("active");
  }, 1200);
  setTimeout(function () {
    $("body").removeClass("active");
  }, 3500);
});

$("#wrap").on("mousedown", function () {
  if ($(this).hasClass("nocut")) {
    $("#wrap p span").contents().unwrap();
    $("#wrap p span").remove();
    $(".multi-button").removeClass("visible");
    $("#wrap").removeClass("active");
  }
});

$(".close").click(function () {
  $(".multi-button").removeClass("visible");
});

$("#wrap").on("mouseup", function () {
  var content = window.getSelection().toString().length;

  if (content > 0) {
    $(".multi-button").addClass("visible");
    $("#wrap").addClass("active");
    $("#wrap").removeClass("copy");
  } else {
    $(".multi-button").removeClass("visible");
    $("#wrap").removeClass("active");
  }
  if ($(this).hasClass("nocut")) {
    surroundSelection();
    var topPos = $("#wrap p .selection").position().top - 50;
    var leftPos = $("#wrap p .selection").position().left - 125;
    var width = $("#wrap p .selection").width() / 2;
    $(".multi-button").css({
      top: topPos,
      left: leftPos + width
    });
  }
});