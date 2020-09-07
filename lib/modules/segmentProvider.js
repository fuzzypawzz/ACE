"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// SegmentProvider will give you the segment of the humany portal
// It could be VIP, CO, Back Office etc.
var defaultSegment = 1;
var vipSegment = 2;

function segmentProvider() {
  if (window.location.href.toUpperCase().includes("VIP")) {
    return vipSegment;
  } else {
    return defaultSegment;
  }
}

var _default = segmentProvider;
exports["default"] = _default;