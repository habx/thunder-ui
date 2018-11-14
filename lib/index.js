"use strict";

require("core-js/modules/web.dom.iterable");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Tag: true,
  Title: true,
  Subtitle: true,
  SectionTitle: true
};
Object.defineProperty(exports, "Tag", {
  enumerable: true,
  get: function get() {
    return _Tag.default;
  }
});
Object.defineProperty(exports, "Title", {
  enumerable: true,
  get: function get() {
    return _Title.default;
  }
});
Object.defineProperty(exports, "Subtitle", {
  enumerable: true,
  get: function get() {
    return _Subtitle.default;
  }
});
Object.defineProperty(exports, "SectionTitle", {
  enumerable: true,
  get: function get() {
    return _SectionTitle.default;
  }
});

var _Tag = _interopRequireDefault(require("./components/Tag"));

var _Title = _interopRequireDefault(require("./components/Title"));

var _Subtitle = _interopRequireDefault(require("./components/Subtitle"));

var _SectionTitle = _interopRequireDefault(require("./components/SectionTitle"));

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _theme = require("./theme");

Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _theme[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }