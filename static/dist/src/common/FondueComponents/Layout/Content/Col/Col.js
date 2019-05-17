import React from 'react';
import classNames from 'classnames';
import styles from './Col.css';
function Col(_a) {
    var _b;
    var textAlign = _a.textAlign, className = _a.className, id = _a.id, children = _a.children, xs = _a.xs, sm = _a.sm, md = _a.md, lg = _a.lg, xl = _a.xl, xxl = _a.xxl, xxxl = _a.xxxl, first = _a.first, firstSm = _a.firstSm, firstMd = _a.firstMd, firstLg = _a.firstLg, firstXl = _a.firstXl, firstXxl = _a.firstXxl, firstXxxl = _a.firstXxxl, last = _a.last, lastSm = _a.lastSm, lastMd = _a.lastMd, lastLg = _a.lastLg, lastXl = _a.lastXl, lastXxl = _a.lastXxl, lastXxxl = _a.lastXxxl;
    return (React.createElement("div", { id: id, className: classNames(styles.col, (_b = {},
            _b[styles["textAlign-" + (textAlign || '')]] = textAlign,
            _b[styles["col" + (xs || '')]] = xs,
            _b[styles["colSm" + (sm || '')]] = sm,
            _b[styles["colMd" + (md || '')]] = md,
            _b[styles["colLg" + (lg || '')]] = lg,
            _b[styles["colXl" + (xl || '')]] = xl,
            _b[styles["colXxl" + (xxl || '')]] = xxl,
            _b[styles["colXxxl" + (xxxl || '')]] = xxxl,
            _b[styles.orderFirst] = first,
            _b[styles.orderSmFirst] = firstSm,
            _b[styles.orderMdFirst] = firstMd,
            _b[styles.orderLgFirst] = firstLg,
            _b[styles.orderXlFirst] = firstXl,
            _b[styles.orderXxlFirst] = firstXxl,
            _b[styles.orderXxxlFirst] = firstXxxl,
            _b[styles.orderLast] = last,
            _b[styles.orderSmLast] = lastSm,
            _b[styles.orderMdLast] = lastMd,
            _b[styles.orderLgLast] = lastLg,
            _b[styles.orderXlLast] = lastXl,
            _b[styles.orderXxlLast] = lastXxl,
            _b[styles.orderXxxlLast] = lastXxxl,
            _b), className) }, children));
}
export default Col;
