'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Select2 = require('./Select');

var _Select3 = _interopRequireDefault(_Select2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorSelect = function (_Select) {
  (0, _inherits3.default)(ColorSelect, _Select);

  function ColorSelect(section, area, range, target) {
    (0, _classCallCheck3.default)(this, ColorSelect);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ColorSelect.__proto__ || (0, _getPrototypeOf2.default)(ColorSelect)).call(this, section, target));

    _this.area = area;
    _this.range = range;
    _this.section = section;
    _this.style = target.dataset.ctrlStyle;
    _this.options = target.dataset.ctrlOptions.split(',');

    _this.inputSec = document.createElement('div');
    _this.input = document.createElement('input');
    _this.submit = document.createElement('input');
    return _this;
  }

  (0, _createClass3.default)(ColorSelect, [{
    key: 'create',
    value: function create() {
      this.input.type = 'text';
      this.submit.type = 'button';

      this.inputSec.appendChild(this.input);
      this.inputSec.appendChild(this.submit);
      this.wrap.appendChild(this.inputSec);
      this.target.appendChild(this.wrap);
    }
  }, {
    key: 'getHtml',
    get: function get() {
      return this.select;
    }
  }]);
  return ColorSelect;
}(_Select3.default);

exports.default = ColorSelect;