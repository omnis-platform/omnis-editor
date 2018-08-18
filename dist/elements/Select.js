'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function () {
  function Select(section, target) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Select);

    this.section = section;
    this.target = target;
    this.style = target.dataset.ctrlStyle;
    this.options = target.dataset.ctrlOptions.split(',');

    this.wrap = document.createElement('div');
    this.overlay = document.createElement('div');

    this.wrap.className = 'om-s__select__options';

    this.overlay.className = 'om-s__select__o';

    this.options.forEach(function (opt) {
      var color = document.createElement('div');

      color.className = 'om-s__select__option--' + _this.style;
      color.dataset.type = 'button';
      color.dataset.ctrlStyle = _this.style;
      color.dataset.ctrlValue = opt;
      color.style.backgroundColor = opt;

      _this.wrap.appendChild(color);
    });

    this.overlay.addEventListener('click', function () {
      _this.close();
    });
  }

  (0, _createClass3.default)(Select, [{
    key: 'open',
    value: function open() {
      var selects = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('.om-s__select__options--active')));

      selects.forEach(function (s) {
        return s.classList.remove('om-s__select__options--active');
      });

      this.target.appendChild(this.wrap);
      this.section.appendChild(this.overlay);
      this.target.classList.add('active');
    }
  }, {
    key: 'close',
    value: function close() {
      this.target.removeChild(this.wrap);
      this.section.removeChild(this.overlay);
      this.target.classList.remove('active');
    }
  }]);
  return Select;
}();

exports.default = Select;