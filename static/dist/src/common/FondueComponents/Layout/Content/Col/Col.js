"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const Col_css_1 = tslib_1.__importDefault(require("./Col.css"));
function Col({ textAlign, className, id, children, xs, sm, md, lg, xl, xxl, xxxl, first, firstSm, firstMd, firstLg, firstXl, firstXxl, firstXxxl, last, lastSm, lastMd, lastLg, lastXl, lastXxl, lastXxxl, }) {
    return (react_1.default.createElement("div", { id: id, className: classnames_1.default(Col_css_1.default.col, {
            [Col_css_1.default[`textAlign-${textAlign || ''}`]]: textAlign,
            [Col_css_1.default[`col${xs || ''}`]]: xs,
            [Col_css_1.default[`colSm${sm || ''}`]]: sm,
            [Col_css_1.default[`colMd${md || ''}`]]: md,
            [Col_css_1.default[`colLg${lg || ''}`]]: lg,
            [Col_css_1.default[`colXl${xl || ''}`]]: xl,
            [Col_css_1.default[`colXxl${xxl || ''}`]]: xxl,
            [Col_css_1.default[`colXxxl${xxxl || ''}`]]: xxxl,
            [Col_css_1.default.orderFirst]: first,
            [Col_css_1.default.orderSmFirst]: firstSm,
            [Col_css_1.default.orderMdFirst]: firstMd,
            [Col_css_1.default.orderLgFirst]: firstLg,
            [Col_css_1.default.orderXlFirst]: firstXl,
            [Col_css_1.default.orderXxlFirst]: firstXxl,
            [Col_css_1.default.orderXxxlFirst]: firstXxxl,
            [Col_css_1.default.orderLast]: last,
            [Col_css_1.default.orderSmLast]: lastSm,
            [Col_css_1.default.orderMdLast]: lastMd,
            [Col_css_1.default.orderLgLast]: lastLg,
            [Col_css_1.default.orderXlLast]: lastXl,
            [Col_css_1.default.orderXxlLast]: lastXxl,
            [Col_css_1.default.orderXxxlLast]: lastXxxl,
        }, className) }, children));
}
exports.default = Col;
