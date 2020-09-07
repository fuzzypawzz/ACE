import { classNames, DEFAULTS } from "./defaults.js";
import { Template, createSvg } from "./contructors.js";
/*
    triggers.toggleNewsModal();
    newsPage.clearSearch();
*/

function htmlGenerator(props) {
  let newsBlockWrapper,
    newsBlockHeader,
    newsBlockLogo,
    logoImage,
    newsBlockInfos,
    newsBlockAuthor,
    newsBlockDate,
    newsBlockContent,
    contentHeadline,
    contentParagraph,
    photosElement,
    photo,
    referenceElement,
    linkButton,
    allLinks,
    linkContainerContent,
    option;

  // ---- WRAPPER FOR EACH BLOCK IN THE PAGE ----
  newsBlockWrapper = new Template({
    tag: "DIV",
    class: classNames.mainBlockWrapper,
    id: props.uniqueID,
  }).create();
  // Append inside the wrapper for the news section
  elements.newsSectionWrapper.appendChild(newsBlockWrapper);

  // ---- HEADER SECTION ----
  newsBlockHeader = new Template({
    tag: "DIV",
    class: classNames.headerSectionInBlock,
  }).create();
  newsBlockWrapper.appendChild(newsBlockHeader);

  // ---- ELEMENT TO HOLD THE ICON/LOGO ----
  newsBlockLogo = new Template({
    tag: "DIV",
    class: classNames.elementForTheLogo,
  }).create();
  newsBlockHeader.appendChild(newsBlockLogo);

  // ---- THE ICON/LOGO IMAGE ----
  if (!props.icon) {
    props.icon = DEFAULTS.pebble;
  }

  logoImage = new createSvg(
    "_teliaPebbleIcon26",
    "newsblock-01-svg"
  ).createSvg();
  newsBlockLogo.appendChild(logoImage);

  // ---- THE INFORMATION ELEMENT (for author name and date) ----
  newsBlockInfos = new Template({
    tag: "DIV",
    class: classNames.authorAndDateInfos,
  }).create();
  newsBlockHeader.appendChild(newsBlockInfos);

  // ---- AUTHOR NAME HEADLINE TAG ----
  if (!props.author) {
    props.author = DEFAULTS.author;
  }
  newsBlockAuthor = new Template({
    tag: "H2",
    class: classNames.author,
    innerHTML: props.author,
  }).create();
  newsBlockInfos.appendChild(newsBlockAuthor);

  // ---- CREATION DATE HEADLINE TAG ----
  newsBlockDate = new Template({
    tag: "H3",
    class: classNames.date,
    innerHTML: props.dateString,
  }).create();
  newsBlockInfos.appendChild(newsBlockDate);

  // ---- ELEMENT TO HOLD THE CONTENT ----
  newsBlockContent = new Template({
    tag: "DIV",
    class: classNames.contentSection,
  }).create();
  newsBlockWrapper.appendChild(newsBlockContent);

  // ---- HEADLINE OF THE CONTENT (text/images) SECTION ----
  contentHeadline = new Template({
    tag: "H3",
    class: classNames.contentHeadline,
    innerHTML: props.headline,
  }).create();
  newsBlockContent.appendChild(contentHeadline);

  // ---- THE TEXT IN THE CONTENT ----
  contentParagraph = new Template({
    tag: "p",
    class: classNames.textInContent,
    innerHTML: props.innerHTML,
  }).create();
  newsBlockContent.appendChild(contentParagraph);

  // ---- QUERY ALL LINKS IN THE CONTENT ----
  var linksInText = contentParagraph.querySelectorAll("a");
  linksInText.forEach(function (link) {
    // Make sure links open in new tab or window
    link.target = "_blank";
  });

  // ---- IMAGES IN THE CONTENT SECTION ----
  // If there is no image starting with http, then the value shall be undefined
  // And therefore the image element will not be created
  if (props.image) {
    if (!props.image.includes("http")) {
      props.image = undefined;
    }
    photosElement = new Template({
      tag: "DIV",
      class: classNames.imageContainer,
    }).create();

    newsBlockWrapper.appendChild(photosElement);

    // ---- THE IMAGE TAG ----
    if (props.image.toUpperCase().includes("<IMG")) {
      photo = new Template({
        tag: "DIV",
      }).create();
      photo.innerHTML = props.image;
    } else {
      // Remove the A tag and returns a string
      let imageAsString = this.removeTag({
        tag: "A",
        str: props.image,
      });
      photo = new Template({
        tag: "IMG",
        class: classNames.image,
        imageSrc: imageAsString,
      }).create();
    }

    try {
      photosElement.appendChild(photo);
    } catch (err) {
      console.log("Could not attach image, got this error: ", err);
    }
  }

  // ---- REFERENCES SECTION (for links/buttons) ----
  if (props.link) {
    referenceElement = new Template({
      tag: "DIV",
      class: classNames.linksAndButtonsSection,
    }).create();

    newsBlockWrapper.appendChild(referenceElement);

    var linkElement = new Template({
      tag: "div",
      innerHTML: props.link,
    }).create();

    // Get all links and place them inside the section
    //linkContainerContent = props.link.innerHTML;
    allLinks = linkElement.querySelectorAll("a");
    allLinks.forEach(function (link) {
      // Give it the class for link buttons
      link.className = classNames.linkButton;

      // Refractor this so its more readable
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
      }

      // Place it inside the reference section in the block
      referenceElement.appendChild(link);
    });
  }

  // Add click event listener to the images,
  // To display modal with image when user clicks
  let allImages = newsBlockWrapper.querySelectorAll("IMG");
  allImages.forEach(function (image) {
    image.addEventListener("click", function (event) {
      newsPage.openNewsModal(this.src);
    });
  });

  blocks.push(newsBlockWrapper);
}

export default htmlGenerator;
