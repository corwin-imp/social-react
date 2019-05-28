"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
// Exported from redux-devtools
const redux_devtools_1 = require("redux-devtools");
// Monitors are separate packages, and you can make a custom one
const redux_devtools_log_monitor_1 = tslib_1.__importDefault(require("redux-devtools-log-monitor"));
const redux_devtools_dock_monitor_1 = tslib_1.__importDefault(require("redux-devtools-dock-monitor"));
// createDevTools takes a monitor and produces a DevTools component
const DevTools = redux_devtools_1.createDevTools(
// Monitors are individually adjustable with props.
// Consult their repositories to learn about those props.
// Here, we put LogMonitor inside a DockMonitor.
react_1.default.createElement(redux_devtools_dock_monitor_1.default, { defaultIsVisible: false, toggleVisibilityKey: "ctrl-h", changePositionKey: "ctrl-m" },
    react_1.default.createElement(redux_devtools_log_monitor_1.default, { theme: "tomorrow" })));
exports.default = DevTools;
