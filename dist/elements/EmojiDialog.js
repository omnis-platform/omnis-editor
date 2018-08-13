'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Dialog2 = require('./Dialog');

var _Dialog3 = _interopRequireDefault(_Dialog2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmojiDialog = function (_Dialog) {
  (0, _inherits3.default)(EmojiDialog, _Dialog);

  function EmojiDialog(section, area, range, target) {
    (0, _classCallCheck3.default)(this, EmojiDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EmojiDialog.__proto__ || (0, _getPrototypeOf2.default)(EmojiDialog)).call(this));

    _this.area = area;
    _this.range = range;
    _this.section = section;
    _this.target = target;
    _this.rect = target.getBoundingClientRect();

    _this.dialog = document.createElement('div');

    _this.emojies = [].concat((0, _toConsumableArray3.default)(Array(106).keys())).map(function (i) {
      return '_' + (i + 1) + '.svg';
    });
    return _this;
  }

  (0, _createClass3.default)(EmojiDialog, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.dialog.className = 'omnis-editor-dialog om-s__d';
      this.dialog.style.top = this.rect.top + 24 + 'px';
      this.dialog.style.left = this.rect.left + 'px';

      this.emojies.forEach(function (emoji) {
        var img = document.createElement('img');
        img.src = require('../../img/' + emoji);
        img.style.width = '30px';
        img.style.height = '30px';

        _this2.dialog.appendChild(img);
      });

      this.section.appendChild(this.dialog);

      this.createOverlay();
    }
  }]);
  return EmojiDialog;
}(_Dialog3.default);

exports.default = EmojiDialog;