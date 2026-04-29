( function( window, document ) {
	'use strict';

	var floatingBoxObserverStarted = false;

	function getFloatingBoxElement() {
		return document.querySelector( '.tm-floating-box.bottom.left, .tm-floating-box.left, .tm-floating-box' );
	}

	function getContainers() {
		return Array.prototype.slice.call( document.querySelectorAll( '.tm-extra-product-options' ) );
	}

	function getHeaders( container ) {
		return Array.prototype.slice.call( container.querySelectorAll( '.tab-header' ) );
	}

	function getSlides( container ) {
		return Array.prototype.slice.call( container.querySelectorAll( '.tc-tab-slide' ) );
	}

	function activateTab( container, index ) {
		var headers = getHeaders( container );
		var slides = getSlides( container );

		if ( ! headers.length || ! slides.length ) {
			return;
		}

		headers.forEach( function( header ) {
			header.classList.remove( 'open' );
		} );

		slides.forEach( function( slide ) {
			slide.classList.remove( 'tm-show' );
			slide.style.display = 'none';
		} );

		if ( headers[ index ] ) {
			headers[ index ].classList.add( 'open' );
		}

		if ( slides[ index ] ) {
			slides[ index ].style.display = 'block';
			slides[ index ].classList.add( 'tm-show' );
		}
	}

	function ensureActiveTab( container ) {
		var headers = getHeaders( container );
		var slides = getSlides( container );

		if ( ! headers.length || ! slides.length ) {
			return;
		}

		if ( ! container.querySelector( '.tab-header.open' ) ) {
			activateTab( container, 0 );
		}
	}

	function updateTabsProgress( container ) {
		var tabsWrap = container.querySelector( '.tc-tabs' );
		var progressBar;
		var headers;
		var activeIndex;
		var percent;

		if ( ! tabsWrap ) {
			return;
		}

		progressBar = tabsWrap.querySelector( '.tm-tabs-progress' );
		headers = getHeaders( container );

		if ( ! progressBar || ! headers.length ) {
			return;
		}

		activeIndex = headers.findIndex( function( header ) {
			return header.classList.contains( 'open' );
		} );

		if ( activeIndex < 0 ) {
			activeIndex = 0;
		}

		percent = ( ( activeIndex + 1 ) / headers.length ) * 100;
		progressBar.style.width = percent + '%';
	}

	function scrollToActiveTab( container ) {
		var headersWrap = container.querySelector( '.tc-tab-headers' );
		var active = container.querySelector( '.tab-header.open' );
		var targetLeft;

		if ( ! headersWrap || ! active ) {
			return;
		}

		if ( window.innerWidth > 786 ) {
			return;
		}

		targetLeft = active.offsetLeft - ( headersWrap.clientWidth / 2 ) + ( active.offsetWidth / 2 );
		headersWrap.scrollTo( {
			left: Math.max( targetLeft, 0 ),
			behavior: 'smooth'
		} );
	}

	function updateTabFades( container ) {
		var tabsWrap = container.querySelector( '.tc-tabs' );
		var headersWrap = container.querySelector( '.tc-tab-headers' );
		var fadeLeft;
		var fadeRight;
		var maxScroll;

		if ( ! tabsWrap || ! headersWrap ) {
			return;
		}

		fadeLeft = tabsWrap.querySelector( '.tm-tabs-fade-left' );
		fadeRight = tabsWrap.querySelector( '.tm-tabs-fade-right' );

		if ( ! fadeLeft || ! fadeRight ) {
			return;
		}

		maxScroll = headersWrap.scrollWidth - headersWrap.clientWidth;

		fadeLeft.classList.toggle( 'active', headersWrap.scrollLeft > 5 );
		fadeRight.classList.toggle( 'active', headersWrap.scrollLeft < maxScroll - 5 );
	}

	function refreshTabsUX( container ) {
		updateTabsProgress( container );
		scrollToActiveTab( container );
		updateTabFades( container );
	}

	function setupTabsUX( container ) {
		var tabsWrap = container.querySelector( '.tc-tabs' );
		var headersWrap = container.querySelector( '.tc-tab-headers' );
		var headers = getHeaders( container );

		if ( ! tabsWrap || ! headersWrap || ! headers.length ) {
			return;
		}

		if ( ! tabsWrap.querySelector( '.tm-tabs-progress' ) ) {
			tabsWrap.insertAdjacentHTML(
				'afterbegin',
				'<div class="tm-tabs-progress"></div><div class="tm-tabs-fade-left"></div><div class="tm-tabs-fade-right"></div>'
			);
		}

		if ( ! headersWrap.dataset.tmTabsScrollBound ) {
			headersWrap.addEventListener( 'scroll', function() {
				updateTabFades( container );
			} );
			headersWrap.dataset.tmTabsScrollBound = '1';
		}

		refreshTabsUX( container );
	}

	function initAll() {
		getContainers().forEach( function( container ) {
			ensureActiveTab( container );
			setupTabsUX( container );
		} );

		observeFloatingBox();
		setupFloatingBoxToggle();
	}

	function syncFloatingBoxTogglePosition( floatingBox, toggleButton ) {
		var rect;

		if ( ! toggleButton ) {
			return;
		}

		if ( ! floatingBox ) {
			toggleButton.style.left = '48px';
			toggleButton.style.bottom = '24px';
			toggleButton.style.top = 'auto';
			return;
		}

		rect = floatingBox.getBoundingClientRect();
		toggleButton.style.left = rect.left + 18 + 'px';
		toggleButton.style.top = rect.bottom - ( toggleButton.offsetHeight / 2 ) + 'px';
		toggleButton.style.bottom = 'auto';
	}

	function updateFloatingBoxToggleState( floatingBox, toggleButton ) {
		var isCollapsed;

		if ( ! floatingBox || ! toggleButton ) {
			return;
		}

		isCollapsed = floatingBox.classList.contains( 'tm-is-collapsed' );
		toggleButton.classList.toggle( 'tm-is-collapsed', isCollapsed );
		toggleButton.setAttribute( 'aria-expanded', isCollapsed ? 'false' : 'true' );
		toggleButton.setAttribute( 'aria-label', isCollapsed ? 'Show summary box' : 'Hide summary box' );
		syncFloatingBoxTogglePosition( floatingBox, toggleButton );
	}

	function setupFloatingBoxToggle() {
		var floatingBox = getFloatingBoxElement();
		var toggleButton;

		toggleButton = document.querySelector( '.tm-floating-box-toggle' );

		if ( ! toggleButton ) {
			toggleButton = document.createElement( 'button' );
			toggleButton.type = 'button';
			toggleButton.className = 'tm-floating-box-toggle';
			toggleButton.innerHTML = '<span class="tm-floating-box-toggle-icon"></span><span class="tm-floating-box-toggle-text">الملخص</span>';
			document.body.appendChild( toggleButton );

			toggleButton.addEventListener( 'click', function() {
				var currentFloatingBox = getFloatingBoxElement();

				if ( ! currentFloatingBox ) {
					return;
				}

				currentFloatingBox.classList.toggle( 'tm-is-collapsed' );
				updateFloatingBoxToggleState( currentFloatingBox, toggleButton );
			} );
		}

		if ( ! floatingBox || floatingBox.closest( '.tm-floating-box-nks, .tm-floating-box-alt' ) ) {
			syncFloatingBoxTogglePosition( null, toggleButton );
			return;
		}

		updateFloatingBoxToggleState( floatingBox, toggleButton );
	}

	function observeFloatingBox() {
		var observer;

		if ( floatingBoxObserverStarted ) {
			return;
		}

		floatingBoxObserverStarted = true;
		observer = new MutationObserver( function() {
			setupFloatingBoxToggle();
		} );

		observer.observe( document.body, {
			childList: true,
			subtree: true
		} );
	}

	document.addEventListener( 'click', function( event ) {
		var header = event.target.closest( '.tm-extra-product-options .tab-header' );
		var quantityButton = event.target.closest( '.tm-qty-btn' );
		var container;
		var headers;
		var index;
		var wrapper;
		var input;
		var step;
		var min;
		var max;
		var value;

		if ( header ) {
			container = header.closest( '.tm-extra-product-options' );
			headers = getHeaders( container );
			index = headers.indexOf( header );

			if ( index !== -1 ) {
				activateTab( container, index );
				window.setTimeout( function() {
					refreshTabsUX( container );
				}, 50 );
			}
		}

		if ( ! quantityButton ) {
			return;
		}

		wrapper = quantityButton.closest( '.quantity' );
		input = wrapper ? wrapper.querySelector( 'input[type="number"]' ) : null;

		if ( ! input ) {
			return;
		}

		step = parseFloat( input.step ) || 1;
		min = input.min !== '' ? parseFloat( input.min ) : -Infinity;
		max = input.max !== '' ? parseFloat( input.max ) : Infinity;
		value = parseFloat( input.value ) || 0;

		if ( quantityButton.classList.contains( 'tm-qty-up' ) ) {
			value += step;
		} else {
			value -= step;
		}

		value = Math.min( Math.max( value, min ), max );

		input.value = value;
		input.dispatchEvent( new Event( 'change', { bubbles: true } ) );
	} );

	document.addEventListener( 'tm_epo_loaded', initAll );
	document.addEventListener( 'tm_epo_updated', initAll );
	document.addEventListener( 'DOMContentLoaded', initAll );
	window.addEventListener( 'load', initAll );
	window.addEventListener( 'resize', function() {
		var floatingBox = getFloatingBoxElement();
		var toggleButton = document.querySelector( '.tm-floating-box-toggle' );

		if ( toggleButton ) {
			syncFloatingBoxTogglePosition( floatingBox, toggleButton );
		}
	} );
} )( window, document );
