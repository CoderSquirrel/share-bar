/*global glb */
if (window.glb === undefined) {
    window.glb = {};
}

(function (window, document) {
    'use strict';

    // function preventDefault(e) {
    //     if (e && e.preventDefault) {
    //         e.preventDefault();
    //     } else if (window.event) {
    //         window.event.returnValue = false;
    //     }
    // }

    // function stopPropagation(e) {
    //     if (e && e.stopPropagation) {
    //         e.stopPropagation();
    //     }
    // }

    // function addEventListener(element, event, handler) {
    //     if (element.addEventListener) {
    //         return element.addEventListener(event, handler, false);
    //     }
    //     if (element.attachEvent) {
    //         return element.attachEvent('on' + event, handler);
    //     }
    // }

    glb.share = {
        init: function init(options) {
            this.mergeOptions(options);
            this.containers = document.querySelectorAll(this.selector);
            this.createBars();
        },

        mergeOptions: function mergeOptions(options) {
            var self = this,
                defaultOptions = {
                // Selector to open lightbox
                selector: '.glb-share',
                networks: {
                    'facebook': self.createFacebookButton
                },
                showMoreButtonOnDevices: true,
                numberOfNetworksBeforeMoreButton: 3,
                // theme: 'dark',

                // Callbacks
                // onCreateHTMLStructure: function(){},
            };

            if (!options) {
                options = {};
            }

            for (var option in defaultOptions) {
                this[option] = options[option] || defaultOptions[option];
            }
        },

        createBars: function createBars() {
            var items = this.containers,
                element = 0;

            for (element = 0; element < items.length; element++) {
                this.createBar(items[element]);
            }
        },

        createBar: function createBar(element, networks) {
            var network = '';
            networks = networks || this.networks;

            for (network in networks) {
                networks[network](element);
            }
        },

        getMetadataFromElement: function getMetadataFromElement(element) {
            var encode = window.encodeURIComponent,
                data = {
                'url': encode(element.getAttribute('data-url') || ''),
                'title': encode(element.getAttribute('data-title') || ''),
                'subtitle': encode(element.getAttribute('data-subtitle') || ''),
                'imageUrl': encode(element.getAttribute('data-image-url') || '')
            };
            return data;
        },

        deviceIsIphone: function deviceIsIphone() {
            return navigator.userAgent.match(/iPhone/i) !== null;
        },

        createButton: function createButton(container, className, content) {
            var shareContainer = document.createElement('div');
            shareContainer.className = className;
            shareContainer.innerHTML = content;

            container.appendChild(shareContainer);
            return shareContainer;
        },

        createFacebookButton: function createFacebookButton(container) {
            var data = this.getMetadataFromElement(container);

            this.createButton(container, "share-button share-facebook", [
                '<a class="share-popup" href="http://www.facebook.com/sharer/sharer.php?u=' + data['url'] + '" title="compartilhar facebook">',
                '   <span>recomendar</span>',
                '</a>'
            ].join(""));
        },

        createTwitterButton: function createTwitterButton(container) {
            var data = this.getMetadataFromElement(container);

            this.createButton(container, "share-button share-twitter", [
                '<a class="share-popup" href="https://twitter.com/share?url=' + data['url'] + '&amp;text=' + data['title'] + '%20%23globo.com" title="compartilhar twitter">',
                '   <span>tweetar</span>',
                '</a>'
            ].join(""));
        },

        createGoogleButton: function createGoogleButton(container) {
            var data = this.getMetadataFromElement(container);

            this.createButton(container, "share-button share-googleplus", [
                '<a class="share-popup" href="https://plus.google.com/share?url=' + data['url'] + '" title="compartilhar google+">',
                '   <span>google+</span>',
                '</a>'
            ].join(""));
        },

        createPinterestButton: function createPinterestButton(container) {
            var data = this.getMetadataFromElement(container);

            this.createButton(container, "share-button share-pinterest", [
                '<a class="share-popup" href="http://www.pinterest.com/pin/create/button/?url=' + data['url'] + '&amp;media=' + data['imageUrl'] + '&amp;description=' + data['title'] + '" title="compartilhar pinterest">',
                '   <span>pinterest</span>',
                '</a>'
            ].join(""));
        },

        createWhatsappButton: function createWhatsappButton(container) {
            if (!this.deviceIsIphone()) {
                return false;
            }

            var data = this.getMetadataFromElement(container);

            this.createButton(container, "share-button share-whatsapp", [
                '<a href="whatsapp://send?text=' + data['title'] + '%20' + data['url'] + '" title="compartilhar whatsapp">',
                '   <span>whatsapp</span>',
                '</a>'
            ].join(""));
        },

        createEmailButton: function createEmailButton(container) {
            var data = this.getMetadataFromElement(container);

            this.createButton(container, "share-button share-email", [
                '<a href="mailto:?subject=' + data['title'] + '&amp;body=' + data['url'] + '" title="compartilhar email">',
                '   <span>email</span>',
                '</a>'
            ].join(""));
        },

        createMoreButton: function createMoreButton(container) {
            var moreButton = '',
                shareButtons = '';

            if (!this.showMoreButtonOnDevices) {
                return false;
            }

            moreButton = this.createButton(container, "share-more", [
                '<a href="#share" title="mais opções de compartilhamento">',
                '   <span>mais opções de compartilhamento</span>',
                '</a>'
            ].join(""));

            shareButtons = document.querySelectorAll('.share-button');
            moreButton.parentNode.insertBefore(moreButton, shareButtons[this.numberOfNetworksBeforeMoreButton]);
        },
    };

}(window, document));