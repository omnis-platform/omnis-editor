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

var LinkDialog = function (_Dialog) {
  (0, _inherits3.default)(LinkDialog, _Dialog);

  function LinkDialog(section, area, selection, range, target) {
    (0, _classCallCheck3.default)(this, LinkDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LinkDialog.__proto__ || (0, _getPrototypeOf2.default)(LinkDialog)).call(this));

    _this.area = area;
    _this.selection = selection;
    _this.range = range;
    _this.section = section;
    _this.target = target;
    _this.rect = target.getBoundingClientRect();

    _this.link = document.createElement('a');
    _this.dialog = document.createElement('div');
    _this.url = document.createElement('input');
    _this.text = document.createElement('input');
    _this.checkbox = document.createElement('input');
    _this.label = document.createElement('label');
    _this.submit = document.createElement('input');
    return _this;
  }

  (0, _createClass3.default)(LinkDialog, [{
    key: 'create',
    value: function create() {
      this.url.type = 'text';

      this.text.type = 'text';
      this.text.value = this.selection;

      this.label.innerHTML = 'Open in new tab';
      this.label.htmlFor = 'openNewTab';

      this.checkbox.type = 'checkbox';
      this.checkbox.id = 'openNewTab';

      this.submit.type = 'submit';
      this.submit.value = 'Create';

      this.dialog.className = 'omnis-editor-dialog om-s__d';
      this.dialog.style.top = this.rect.top + 24 + 'px';
      this.dialog.style.left = this.rect.left + 'px';

      this.dialog.appendChild(this.url);
      this.dialog.appendChild(this.label);
      this.dialog.appendChild(this.checkbox);
      this.dialog.appendChild(this.text);
      this.dialog.appendChild(this.submit);

      this.section.appendChild(this.dialog);

      this.submitListener();
      this.createOverlay();
    }
  }, {
    key: 'submitListener',
    value: function submitListener() {
      var _this2 = this;

      this.submit.addEventListener('click', function () {
        _this2.restoreSelection();

        _this2.link.href = _this2.url.value;
        _this2.link.target = _this2.checkbox.checked ? '_blank' : '';

        document.execCommand('insertHTML', false, _this2.content);

        _this2.destroy();
      });
    }
  }, {
    key: 'content',
    get: function get() {
      if (this.text.value) {
        this.link.innerHTML = this.text.value;
      } else if (this.range.startOffset === this.range.endOffset) {
        this.link.innerHTML = this.url.value;
      } else {
        this.link.innerHTML = this.selection;
      }

      if (this.selectionSpanNode) {
        var el = document.createElement('span');
        el.style.cssText = this.selectionSpanNode.style.cssText;
        el.appendChild(this.link);

        if (el.style.color) this.link.style.color = el.style.color;

        return el.outerHTML;
      }

      return this.link.outerHTML;
    }
  }]);
  return LinkDialog;
}(_Dialog3.default);

exports.default = LinkDialog;