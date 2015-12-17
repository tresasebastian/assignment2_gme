var recafter = "";
var Imgafter = "";
var Count = 0;
var ImgFound = 0;

var Source = "#boxcard";

var picSource = [

  "https://thingiverse-production-new.s3.amazonaws.com/renders/7c/39/dc/2e/26/60x60falloutav-vb_display_large_thumb_small.jpg",
  "http://howtowriteshop.loridevoti.com/wp-content/uploads/et_temp/MLV_Logo_Color_Small-9005_60x60.png",
  "http://www.tfa-co.com/wp-content/uploads/2012/01/logosymbol-small-60x60.png",
  "http://howtowriteshop.loridevoti.com/wp-content/uploads/et_temp/MLV_Logo_Color_Small-9005_60x60.png",
  "http://www.tfa-co.com/wp-content/uploads/2012/01/logosymbol-small-60x60.png",
  "http://fiorecommunications.com/wp-content/uploads/2012/12/facebook-icon-60x60.png",
  "https://thingiverse-production-new.s3.amazonaws.com/renders/7c/39/dc/2e/26/60x60falloutav-vb_display_large_thumb_small.jpg",
  "http://fiorecommunications.com/wp-content/uploads/2012/12/facebook-icon-60x60.png",
  "http://a3.mzstatic.com/us/r30/Purple/v4/c6/80/db/c680db18-f47f-7641-54f1-a7bced4b094c/AppIcon60x60_2x.png",
  "http://a3.mzstatic.com/us/r30/Purple/v4/c6/80/db/c680db18-f47f-7641-54f1-a7bced4b094c/AppIcon60x60_2x.png",
  
];

function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function randomizepics() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}



function flipCard() {
	var id = $(this).attr("id");

	if ($("#" + id + " img").is(":hidden")) {
		$(Source + " div").unbind("click", flipCard);
	
		$("#" + id + " img").slideDown('fast');

		if (recafter == "") {
			recafter = id;
			Imgafter = $("#" + id + " img").attr("src");
			setTimeout(function() {
				$(Source + " div").bind("click", flipCard)
			}, 300);
		} else {
			picnow = $("#" + id + " img").attr("src");
			if (Imgafter != picnow) {
				setTimeout(function() {
					$("#" + id + " img").slideUp('fast');
					$("#" + recafter + " img").slideUp('fast');
					recafter = "";
					Imgafter = "";
				}, 400);
			} else {
				$("#" + id + " img").parent().css("visibility", "hidden");
				$("#" + recafter + " img").parent().css("visibility", "hidden");
				ImgFound++;
				recafter = "";
				Imgafter = "";
			}
			setTimeout(function() {
				$(Source + " div").bind("click", flipCard)
			}, 400);
		}
		Count++;
		$("#count").html("" + Count);

		if (ImgFound == picSource.length) {
			$("#count").prepend('<span id="success">You Found All Pictues With </span>');
		}
	}
}

$(function() {

for (var y = 1; y < 2 ; y++) {
	$.each(picSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(flipCard);
	randomizepics();
});