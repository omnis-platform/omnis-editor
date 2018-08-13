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

var _Dialog2 = require('./Dialog');

var _Dialog3 = _interopRequireDefault(_Dialog2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageDialog = function (_Dialog) {
  (0, _inherits3.default)(ImageDialog, _Dialog);

  function ImageDialog(section, area, range, target, upload) {
    (0, _classCallCheck3.default)(this, ImageDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImageDialog.__proto__ || (0, _getPrototypeOf2.default)(ImageDialog)).call(this));

    _this.area = area;
    _this.range = range;
    _this.upload = upload;
    _this.section = section;
    _this.target = target;
    _this.rect = target.getBoundingClientRect();

    _this.dialog = document.createElement('div');
    _this.input = document.createElement('input');
    _this.labelText = document.createElement('p');
    _this.label = document.createElement('label');
    return _this;
  }

  (0, _createClass3.default)(ImageDialog, [{
    key: 'create',
    value: function create() {
      this.dialog.className = 'omnis-editor-dialog om-s__d';
      this.dialog.style.top = this.rect.top + 24 + 'px';
      this.dialog.style.left = this.rect.left + 'px';

      this.input.type = 'file';
      this.input.id = 'fileInput';

      this.labelText.innerHTML = 'Drop Image <span>or click</span>';

      this.label.htmlFor = 'fileInput';
      this.label.appendChild(this.input);
      this.label.appendChild(this.labelText);

      this.dialog.appendChild(this.label);

      this.section.appendChild(this.dialog);

      this.chengesListener();
      this.createOverlay();
    }
  }, {
    key: 'chengesListener',
    value: function chengesListener() {
      var _this2 = this;

      this.input.addEventListener('change', function (e) {
        _this2.uploadImage(e.target.files[0]);
      });
    }
  }, {
    key: 'uploadImage',
    value: function uploadImage(file) {
      var _this3 = this;

      this.upload.callback(file).then(function (res) {
        var result = res;

        _this3.upload.useKeys.forEach(function (k) {
          result = result[k];
        });

        _this3.restoreSelection();

        document.execCommand('insertimage', false, result);

        _this3.destroy();
      });
    }
  }]);
  return ImageDialog;
}(_Dialog3.default);

exports.default = ImageDialog;