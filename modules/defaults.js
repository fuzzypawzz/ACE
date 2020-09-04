// This module contains default variables like classnames and ids

    const tableKeyNames = {
        day: "table_dag", // Creation DAY of the article
        month: "table_maaned", // Same as above, but MONTH
        year: "table_aar", // Same as above, but YEAR
        author: "table_afsender", // The writers name, next to the pebble icon
        icon: "logo", // The pebble icon, or any other icon is specified
        headline: "table_overskrift", // Headline in the content section
        contentText: "table_tekst", // The actual text in the content section
        img: "table_billede", // Image if applicable, click to expand
        href: "table_link", // Href, humany guide or link to website
        linkText: "linktekst" // Label on the button which directs to the link
    };

    const DEFAULTS = {
        developerMode: false, // Turn on for developer mode (local env)
        humanyInterfaceName: "tjekit-all-brands",
        guideIDSToFetch: ["11747", "12076", "13654"],
        timesToRetryFetchingTableData: 10, // Humany tables loads slow, set the retry amount before timing out
        pebble: "https://humany.blob.core.windows.net/telia-dk/guides/pebble2.png", // Default pebble icon file path
        humanyGuideTarget: "h-portal-main", // Target table inside this element
        notificationTableClass: "humany-notify-table", // Notification tables where SU and PAIN news is located
        latestNewsWrapperID: "HumanyCustom-latest-news", // Wrapper for the "10 latest news" block in the humany frontpage
        newsFromTodayText: "Nyhed fra i dag",
        overAllPageWrapper: "_newsPage-wrapper", // The overall wrapper of the news page
        newsSectionWrapperID: "_newsSection-wrapper", // The wrapper which blocks shall be placed inside
        resultsContainerID: "_news-search-dropdown", // The unique ID of the search results element
        searchContainer: "_news-selection-search", // The element where searchfield sits inside
        searchFieldID: "_news-selection-searchfield", // ID of the search field
        searchIconID: "_humany-search-ts-icon", // ID of the modal search field delete svg
        searchDeleteIconID: "_humany-delete-ts-icon", // ID of the modal search field search svg
        searchNothingFoundText: "Der blev ikke fundet noget!",
        selectorFieldID: "_news-month-selector",
        author: "REDAKTØREN", // Default author name, if not specified
        noTableFoundMsg: "Fejl: Der blev ikke fundet en tabel med data",
        moreThanOneTableMsg: "Fejl: Der er fundet mere end 1 tabel med data. Der må kun være 1 tabel på siden",
        ifNoLinkText: "Åben link", // Will be used if editor didnt give a link button a text/name
        humanyNothing: "&nbsp;", // Means nothing in Humany editor language
        isAllowedToContainHTMLtags: "contentText", // One paramter which is allowed to have paragraphs/divs inside
        SelectorOptions: { // Options for the selector field in the modal - remember to map in setupSelector()
            showAll: "Se alle nyheder",
            onlyNewsFromSU: "Kun udmeldinger fra SU",
            onlyNewsFromBOQ: "Kun nyheder om kunde pains",
            onlyNewsFromVIP: "Kun nyheder fra VIP"
        },
        newsTagOptions: {
            isSU: ["SU", "S U", "S.U", "S. U", "SUPERUSER", "SUPER", "USER", "BRUGER"], // Determines that it is SU, if any of these is matching
            isBusinessQuality: ["BOQ", "QUALITY", "BUSINESS", "OPTIMI", "ZATION", "PAIN", "LØST"], // Determines that it is BOQ, if any of these is mathing
            isVIP: ["VIP", "ENTERPRISE", "VIP TEAM"],
            ifSUsetTag: "SU", // Sets this as tag if article is made by SU
            ifBOQsetTag: "BUSINESS QUALITY AND OPTIMIZATION", // Sets this as tag if article is made by BOQ
            ifVIPsetTag: "VIP" // Sets this as tag if article is made by VIP TEAM
        }
    };

    // ---- CSS CLASSES ----
    const classNames = {
        mainBlockWrapper: "newsblock-01-wrapper",
        headerSectionInBlock: "newsblock-01-header",
        elementForTheLogo: "newsblock-01-logo",
        logoImg: "newsblock-01-logoImg",
        authorAndDateInfos: "newsblock-01-infos",
        author: "newsblock-01-headline news-headline pebble-purple",
        date: "newsblock-01-date",
        contentSection: "newsblock-01-content",
        contentHeadline: "newsblock-content-headline",
        textInContent: "newsblock-content-p",
        imageContainer: "newsblock-01-photos",
        image: "modalImage",
        linksAndButtonsSection: "newsblock-01-refs",
        linkButton: "error-button telia-btn",
        modal: {
            mainClass: "modal_preview",
            closeButton: "newsModal_close",
            modalContent: "newsModal_content"
        },
        search: {
            resultsContainer: "news-search-dropdown",
            searchResult: "news-search-result",
            noResult: "news-search-noresult",
            resultDate: "news-search-result-date"
        },
        icons: {
            heart: "fa fa-heart", // FontAwesome class - Used for articles by business quality
            info: "fa fa-info-circle", // FontAwesome class - Used for articles by SU
            colorClassForBOQicon: "cmRed",
            colorClassForSUicon: "tsPurple"
        },
        latestNews: {
            blockHeader: "HumanyCustom-latest-news-header",
            newsItem: "latestNewsItem",
            newsHeadline: "latestNewsHeadline",
            date: "latestNewsDate",
            latestNewsCounter: "humany-latest-news-counter"
        }
    };

    // Trimmed data from the tables
    var allNewsContent = [];

    // Filtered data from the tables
    var filteredTableData = [];

    // Unique ID tracker to give elements ID's
    var uniqueNumber = 496373;

    // Carries the overall wrapper element
    // Should refractor if not used for anything else
    var elements = [];

    // All news blocks in the page
    var blocks = [];

    // Keeps track of todays news
    var newsCreatedToday = 0;

    const guideIDSToFetch = [];

export { 
    tableKeyNames, 
    DEFAULTS, 
    classNames, 
    allNewsContent, 
    filteredTableData, 
    uniqueNumber,
    elements,
    blocks,
    newsCreatedToday,
    guideIDSToFetch
};