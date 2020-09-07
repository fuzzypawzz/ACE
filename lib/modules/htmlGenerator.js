"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defaults = require("./defaults.js");

var _contructors = require("./contructors.js");

/*
    triggers.toggleNewsModal();
    newsPage.clearSearch();
*/
function htmlGenerator(props) {
  var newsBlockWrapper, newsBlockHeader, newsBlockLogo, logoImage, newsBlockInfos, newsBlockAuthor, newsBlockDate, newsBlockContent, contentHeadline, contentParagraph, photosElement, photo, referenceElement, linkButton, allLinks, linkContainerContent, option; // ---- WRAPPER FOR EACH BLOCK IN THE PAGE ----

  newsBlockWrapper = new _contructors.Template({
    tag: "DIV",
    "class": _defaults.classNames.mainBlockWrapper,
    id: props.uniqueID
  }).create(); // Append inside the wrapper for the news section

  elements.newsSectionWrapper.appendChild(newsBlockWrapper); // ---- HEADER SECTION ----

  newsBlockHeader = new _contructors.Template({
    tag: "DIV",
    "class": _defaults.classNames.headerSectionInBlock
  }).create();
  newsBlockWrapper.appendChild(newsBlockHeader); // ---- ELEMENT TO HOLD THE ICON/LOGO ----

  newsBlockLogo = new _contructors.Template({
    tag: "DIV",
    "class": _defaults.classNames.elementForTheLogo
  }).create();
  newsBlockHeader.appendChild(newsBlockLogo); // ---- THE ICON/LOGO IMAGE ----

  if (!props.icon) {
    props.icon = _defaults.DEFAULTS.pebble;
  }

  logoImage = new _contructors.createSvg("_teliaPebbleIcon26", "newsblock-01-svg").createSvg();
  newsBlockLogo.appendChild(logoImage); // ---- THE INFORMATION ELEMENT (for author name and date) ----

  newsBlockInfos = new _contructors.Template({
    tag: "DIV",
    "class": _defaults.classNames.authorAndDateInfos
  }).create();
  newsBlockHeader.appendChild(newsBlockInfos); // ---- AUTHOR NAME HEADLINE TAG ----

  if (!props.author) {
    props.author = _defaults.DEFAULTS.author;
  }

  newsBlockAuthor = new _contructors.Template({
    tag: "H2",
    "class": _defaults.classNames.author,
    innerHTML: props.author
  }).create();
  newsBlockInfos.appendChild(newsBlockAuthor); // ---- CREATION DATE HEADLINE TAG ----

  newsBlockDate = new _contructors.Template({
    tag: "H3",
    "class": _defaults.classNames.date,
    innerHTML: props.dateString
  }).create();
  newsBlockInfos.appendChild(newsBlockDate); // ---- ELEMENT TO HOLD THE CONTENT ----

  newsBlockContent = new _contructors.Template({
    tag: "DIV",
    "class": _defaults.classNames.contentSection
  }).create();
  newsBlockWrapper.appendChild(newsBlockContent); // ---- HEADLINE OF THE CONTENT (text/images) SECTION ----

  contentHeadline = new _contructors.Template({
    tag: "H3",
    "class": _defaults.classNames.contentHeadline,
    innerHTML: props.headline
  }).create();
  newsBlockContent.appendChild(contentHeadline); // ---- THE TEXT IN THE CONTENT ----

  contentParagraph = new _contructors.Template({
    tag: "p",
    "class": _defaults.classNames.textInContent,
    innerHTML: props.innerHTML
  }).create();
  newsBlockContent.appendChild(contentParagraph); // ---- QUERY ALL LINKS IN THE CONTENT ----

  var linksInText = contentParagraph.querySelectorAll("a");
  linksInText.forEach(function (link) {
    // Make sure links open in new tab or window
    link.target = "_blank";
  }); // ---- IMAGES IN THE CONTENT SECTION ----
  // If there is no image starting with http, then the value shall be undefined
  // And therefore the image element will not be created

  if (props.image) {
    if (!props.image.includes("http")) {
      props.image = undefined;
    }

    photosElement = new _contructors.Template({
      tag: "DIV",
      "class": _defaults.classNames.imageContainer
    }).create();
    newsBlockWrapper.appendChild(photosElement); // ---- THE IMAGE TAG ----

    if (props.image.toUpperCase().includes("<IMG")) {
      photo = new _contructors.Template({
        tag: "DIV"
      }).create();
      photo.innerHTML = props.image;
    } else {
      // Remove the A tag and returns a string
      var imageAsString = this.removeTag({
        tag: "A",
        str: props.image
      });
      photo = new _contructors.Template({
        tag: "IMG",
        "class": _defaults.classNames.image,
        imageSrc: imageAsString
      }).create();
    }

    try {
      photosElement.appendChild(photo);
    } catch (err) {
      console.log("Could not attach image, got this error: ", err);
    }
  } // ---- REFERENCES SECTION (for links/buttons) ----


  if (props.link) {
    referenceElement = new _contructors.Template({
      tag: "DIV",
      "class": _defaults.classNames.linksAndButtonsSection
    }).create();
    newsBlockWrapper.appendChild(referenceElement);
    var linkElement = new _contructors.Template({
      tag: "div",
      innerHTML: props.link
    }).create(); // Get all links and place them inside the section
    //linkContainerContent = props.link.innerHTML;

    allLinks = linkElement.querySelectorAll("a");
    allLinks.forEach(function (link) {
      // Give it the class for link buttons
      link.className = _defaults.classNames.linkButton; // Refractor this so its more readable
      // Make a variable or function "isLinkToHumanyGuide"

      if (link.href.toLowerCase().includes("http") == false) {
        // If it does not contain http, its most likely a link to a humany guide
        link.addEventListener("click", function (event) {
          // Close and reset modal
          triggers.toggleNewsModal();
          newsPage.clearSearch();
        });
      } else {
        // Make sure it opens in a new tab or window
        link.target = "_blank";
      } // Place it inside the reference section in the block


      referenceElement.appendChild(link);
    });
  } // Add click event listener to the images,
  // To display modal with image when user clicks


  var allImages = newsBlockWrapper.querySelectorAll("IMG");
  allImages.forEach(function (image) {
    image.addEventListener("click", function (event) {
      newsPage.openNewsModal(this.src);
    });
  });
  blocks.push(newsBlockWrapper);
}

var _default = htmlGenerator;
exports["default"] = _default;