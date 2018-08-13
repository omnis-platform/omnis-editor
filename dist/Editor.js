'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _LinkDialog = require('./elements/LinkDialog');

var _LinkDialog2 = _interopRequireDefault(_LinkDialog);

var _ImageDialog = require('./elements/ImageDialog');

var _ImageDialog2 = _interopRequireDefault(_ImageDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = function () {
  function Editor(props) {
    (0, _classCallCheck3.default)(this, Editor);

    this.upload = props.upload;
  }

  (0, _createClass3.default)(Editor, [{
    key: 'setSelection',
    value: function setSelection() {
      if (!window.getSelection) return;
      this.selection = window.getSelection();

      if (!this.selection.rangeCount) return;
      this.range = this.selection.getRangeAt(0).cloneRange();
      this.selectionStart = this.range.startOffset;
      this.selectionEnd = this.range.endOffset;

      this.selection.removeAllRanges();
      this.selection.addRange(this.range);
    }
  }, {
    key: 'addCtrlListener',
    value: function addCtrlListener() {
      this.buttonListener();
      this.selectListener();
      this.showHtmlListener();
    }
  }, {
    key: 'buttonListener',
    value: function buttonListener() {
      var _this = this;

      var ctrls = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('[data-type="button"]')));

      ctrls.forEach(function (c) {
        c.addEventListener('mousedown', function (e) {
          return e.preventDefault();
        });
        c.addEventListener('click', function (e) {
          switch (e.target.dataset.ctrlStyle) {
            case 'padding':
              _this.indentAction(e);
              break;
            case 'textTransform':
              _this.insertAction(e.target.dataset.ctrlStyle, e.target.dataset.ctrlValue);
              break;
            case 'createLink':
              _this.insertLinkAction(e.target);
              break;
            case 'insertImage':
              _this.insertImageAction(e.target);
              break;
            default:
              document.execCommand(e.target.dataset.ctrlStyle, false, '');
              break;
          }

          _this.area.focus();
        }, false);
      });
    }
  }, {
    key: 'selectListener',
    value: function selectListener() {
      var _this2 = this;

      var ctrls = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('[data-type="select"]')));

      ctrls.forEach(function (c) {
        c.addEventListener('change', function (e) {
          switch (e.target.dataset.ctrlStyle) {
            case 'fontSize':
              _this2.insertAction(e.target.dataset.ctrlStyle, e.target.value);
              break;
            case 'textAlign':
              _this2.alignAction(e);
              break;
            default:
              document.execCommand(e.target.dataset.ctrlStyle, false, e.target.value);
              break;
          }
        }, false);
      });
    }
  }, {
    key: 'setSelectionStyles',
    value: function setSelectionStyles(style, value) {
      var tmpStyles = {};
      var node = this.selectionSpanNode;
      var styleList = this.conf.styleNames;

      styleList.forEach(function (s) {
        var propName = s.split(/(?=[A-Z])/).join('-').toLocaleLowerCase();

        if (node && node.style[s]) tmpStyles[propName] = node.style[s];
        if (s === style) tmpStyles[propName] = value;
        if (node && node.style[s] === value) delete tmpStyles[propName];
      });

      var styleArr = (0, _keys2.default)(tmpStyles).map(function (k) {
        return k + ': ' + tmpStyles[k];
      });
      this.textStyles = styleArr.join('; ') || '';
    }
  }, {
    key: 'showHtmlListener',
    value: function showHtmlListener() {
      var _this3 = this;

      var showHtmlBtn = document.querySelector('#ctrl_showHtml');

      showHtmlBtn.addEventListener('click', function () {
        var content = _this3.html;

        if (_this3.htmlMode) {
          content = content.replace(/&lt;/g, '<');
          content = content.replace(/&gt;/g, '>');
        } else {
          content = content.replace(/</g, '&lt;');
          content = content.replace(/>/g, '&gt;');
        }

        _this3.area.innerHTML = content;
        _this3.htmlMode = !_this3.htmlMode;
      });
    }
  }, {
    key: 'alignAction',
    value: function alignAction(e) {
      this.alignSelection(e.target.value);
      this.area.focus();
    }
  }, {
    key: 'indentAction',
    value: function indentAction(e) {
      this.indentSelection(e.target.dataset.ctrlValue);
      this.area.focus();
    }
  }, {
    key: 'insertAction',
    value: function insertAction(styles, val) {
      this.setSelectionStyles(styles, val);
      var el = this.wrapSelection();

      document.execCommand('insertHTML', false, el);
      this.area.focus();
    }
  }, {
    key: 'insertLinkAction',
    value: function insertLinkAction(target) {
      var sel = this.selection;
      var range = this.range;
      var dialog = new _LinkDialog2.default(this.section, this.area, sel, range, target);

      dialog.create();
    }
  }, {
    key: 'insertImageAction',
    value: function insertImageAction(target) {
      var range = this.range;
      var dialog = new _ImageDialog2.default(this.section, this.area, range, target, this.upload);

      dialog.create();
    }
  }, {
    key: 'addSelectionListener',
    value: function addSelectionListener() {
      var _this4 = this;

      this.area.addEventListener('mouseup', function () {
        if (!window.getSelection) return;
        _this4.selection = window.getSelection();

        if (!_this4.selection.rangeCount) return;
        _this4.range = _this4.selection.getRangeAt(0).cloneRange();
        _this4.selectionStart = _this4.range.startOffset;
        _this4.selectionEnd = _this4.range.endOffset;
      });
    }
  }, {
    key: 'wrapSelection',
    value: function wrapSelection() {
      var span = this.selectionSpanNode;

      if (span) {
        span.style.cssText = this.textStyles;
      } else {
        span = document.createElement('span');
        span.style.cssText = this.textStyles;
        span.innerHTML = this.selection;
      }

      return span.outerHTML;
    }
  }, {
    key: 'alignSelection',
    value: function alignSelection(val) {
      this.selectionParagraphNode.style.textAlign = val;
    }
  }, {
    key: 'indentSelection',
    value: function indentSelection(val) {
      var padding = this.selectionParagraphNode.style.paddingLeft.match(/\d+/) || 0;
      var value = padding ? Number(padding[0]) + Number(val) : Number(val);

      this.selectionParagraphNode.style.paddingLeft = value + 'px';
    }
  }, {
    key: 'wparContent',
    value: function wparContent() {
      var paragraph = document.createElement('p');
      paragraph.innerHTML = this.defaultValue;
      this.innerHTML = paragraph;
    }
  }, {
    key: 'selectionSpanNode',
    get: function get() {
      var a = this.selection.focusNode.parentNode;

      return a.closest('span');
    }
  }, {
    key: 'selectionParagraphNode',
    get: function get() {
      var a = this.selection.focusNode.parentNode;

      return a.closest('p');
    }
  }, {
    key: 'html',
    get: function get() {
      return this.area.innerHTML;
    }
  }]);
  return Editor;
}();

exports.default = Editor;