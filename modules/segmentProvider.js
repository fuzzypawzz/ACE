// SegmentProvider will give you the segment of the humany portal
// It could be VIP, CO, Back Office etc.

const defaultSegment = 1;
const vipSegment = 2;

function segmentProvider () {
    if (window.location.href.toUpperCase().includes("VIP")) {
        return vipSegment;
    } else {
        return defaultSegment;
    }
}

export default segmentProvider;