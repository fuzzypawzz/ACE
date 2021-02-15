import ModalInitiater from "../areas/modal-initiator/ModalInitiater.js";
import ButtonSetup from "../Scripts/ButtonSetup.js";
import NewsPage from "../areas/newspage/index.ts";
import SearchResultExtender from "../areas/search-result-extender/index.ts";
import HumanyNotificationDetector from "../areas/humany-notification-detector";

// Helper functions
import createAttemptFunc from "../helpers/initiateAttemptFunc";
import setupObserver from "../helpers/setupObserver";

// Setup script (Could also be replaced with the HTML block in Portal Admin)
import setup from "./setup";

import "./style.scss";

export {
  ModalInitiater,
  ButtonSetup,
  NewsPage,
  SearchResultExtender,
  HumanyNotificationDetector,
  createAttemptFunc,
  setupObserver,
  setup,
};