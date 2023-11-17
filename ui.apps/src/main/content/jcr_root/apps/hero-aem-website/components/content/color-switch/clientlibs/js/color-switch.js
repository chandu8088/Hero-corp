$(document).ready(function () {
	if ($('.engine-sound')[0]) {
	    var engineSound = new Audio(
	      $(".engine-sound a").attr('data-audio-path')
	    );
	
	    $(".engine-sound a").on("click", function () {
	      engineSound.play();
	      $(".engine-sound").addClass("animate");
	      engineSound.addEventListener("ended", function () {
	        $(".engine-sound").removeClass("animate");
	      });
	    });
	  }

	$('.metadom-360-view .btn.btn-icon.btn-white').click(
		function () {
			const elementIframe = document.querySelector('.iframe-360-view');
			if(elementIframe && getComputedStyle(elementIframe).display == 'none') {
				$(".iframe-360-view").addClass('d-block');
				$('.explore-360-wrapper').addClass('d-none');
				$(this).html(`360 Web View <img src="/content/dam/hero-aem-website/brand/design/icons/360-view-icon.svg" class="img-fluid" alt="360 View" />`);
				const metadomeElement = document.getElementById('metadomai');
				if(!metadomeElement) {
					var newDiv = `<div id="metadomai" style='height: 500px;'>
							<script src="https://products.metadome.ai/shared/dev/js/jquery.min.js"></script>
							<div id="configurator"></div>
							<script src="https://products.metadome.ai/hero-sd-web/links/develop/helper.js"></script>
						</div>`;
					
					$('.iframe-360-view').append(newDiv);
					$('body').css('overflow-y', 'scroll');
					$('html, body').animate({
						scrollTop: $(this).offset().top - 600
					}, 800);
				}
			} else {
				$(".iframe-360-view").removeClass('d-block');
				$('.explore-360-wrapper').removeClass('d-none');
				$(this).html(`Explore <img src="/content/dam/hero-aem-website/brand/design/icons/360-view-icon.svg" class="img-fluid" alt="360 View" />`);
			}
			
		}
	  )
 });