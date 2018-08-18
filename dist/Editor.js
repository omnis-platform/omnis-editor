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

var _EmojiDialog = require('./elements/EmojiDialog');

var _EmojiDialog2 = _interopRequireDefault(_EmojiDialog);

var _SpecialCharactersModal = require('./elements/SpecialCharactersModal');

var _SpecialCharactersModal2 = _interopRequireDefault(_SpecialCharactersModal);

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
      this.serviceButtonListener();
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
            case 'insertEmoji':
              _this.insertEmojiAction(e.target);
              break;
            case 'specialCharacters':
              _this.insertCharactersAction();
              break;
            case 'foreColor':
              _this.changeColorAction(e.target);
              break;
            case 'hiliteColor':
              _this.changeColorAction(e.target);
              break;
            case 'textAlign':
              _this.textAlignAction(e.target);
              break;
            case 'fontName':
              _this.changeFontNameAction(e.target);
              break;
            case 'fontSize':
              _this.changeFontSizeAction(e.target);
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
      var ctrls = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('[data-type="select"]')));

      ctrls.forEach(function (c) {
        c.addEventListener('click', function (e) {
          var select = e.target.querySelector('.om-s__select__opts') || e.target;
          var selects = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('.om-s__select__opts--active')));

          if (e.target.nodeName === 'BUTTON') {
            selects.forEach(function (s) {
              return s.classList.remove('om-s__select__opts--active');
            });
            select.classList.toggle('om-s__select__opts--active');
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
    key: 'serviceButtonListener',
    value: function serviceButtonListener() {
      var _this2 = this;

      var ctrlBtns = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('[data-ctrl-btn="true"]')));

      ctrlBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          switch (e.target.dataset.ctrlFor) {
            case 'showHtml':
              _this2.displayHtml();
              break;
            case 'fullScreen':
              _this2.setSectionFullSize();
            default:
              document.execCommand(e.target.dataset.ctrlFor, false);
              break;
          }
        });
      });
    }
  }, {
    key: 'displayHtml',
    value: function displayHtml() {
      var btn = document.querySelector('[data-ctrl-for="showHtml"]');
      var content = this.html;

      if (this.htmlMode) {
        btn.dataset.content = 'show html';
        content = content.replace(/&lt;/g, '<');
        content = content.replace(/&gt;/g, '>');
      } else {
        btn.dataset.content = 'hide html';
        content = content.replace(/</g, '&lt;');
        content = content.replace(/>/g, '&gt;');
      }

      this.area.innerHTML = content;
      this.htmlMode = !this.htmlMode;
    }
  }, {
    key: 'setSectionFullSize',
    value: function setSectionFullSize() {
      var btn = document.querySelector('[data-ctrl-for="fullScreen"]');

      if (this.isFullSize) {
        btn.dataset.content = 'full Screen';
        btn.style.backgroundImage = 'url(' + this.iconBase + '/controls/fullScreen.svg)';
        this.section.classList.remove('om-s--full');
      } else {
        btn.dataset.content = 'Exit full Screen';
        btn.style.backgroundImage = 'url(' + this.iconBase + '/controls/fullScreenExit.svg)';
        this.section.classList.add('om-s--full');
      }

      this.isFullSize = !this.isFullSize;
    }
  }, {
    key: 'textAlignAction',
    value: function textAlignAction(target) {
      var select = document.querySelector('#' + target.dataset.parentId);
      var optionsWrap = select.querySelector('.om-s__select__opts--active');
      var displayOpt = select.querySelector('.om-s__select__do');

      document.execCommand(target.dataset.ctrlValue, false);
      this.area.focus();

      displayOpt.style.backgroundImage = target.style.backgroundImage;
      optionsWrap.classList.remove('om-s__select__opts--active');
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
    key: 'insertEmojiAction',
    value: function insertEmojiAction(target) {
      var range = this.range;
      var dialog = new _EmojiDialog2.default(this.section, this.area, range, target);

      dialog.create();
    }
  }, {
    key: 'insertCharactersAction',
    value: function insertCharactersAction() {
      var range = this.range;
      var modal = new _SpecialCharactersModal2.default(this.section, this.area, range);

      modal.create();
    }
  }, {
    key: 'changeColorAction',
    value: function changeColorAction(target) {
      var val = target.dataset.ctrlValue;

      if (target.dataset.ctrlValue === 'REMOVE') {
        if (target.dataset.ctrlStyle === 'hiliteColor') val = '#ffffff';else val = '#000000';
      }

      document.execCommand(target.dataset.ctrlStyle, false, val);
      target.parentNode.classList.remove('om-s__select__opts--active');
    }
  }, {
    key: 'changeFontNameAction',
    value: function changeFontNameAction(target) {
      var select = document.querySelector('#' + target.dataset.parentId);
      var displayOpt = select.querySelector('.om-s__select__do');
      var optionsWrap = select.querySelector('.om-s__select__opts--active');

      displayOpt.innerHTML = target.dataset.ctrlValue;
      optionsWrap.classList.remove('om-s__select__opts--active');
      document.execCommand(target.dataset.ctrlStyle, false, target.dataset.ctrlValue);
    }
  }, {
    key: 'changeFontSizeAction',
    value: function changeFontSizeAction(target) {
      this.setSelectionStyles(target.dataset.ctrlStyle, target.dataset.ctrlValue);

      var select = document.querySelector('#' + target.dataset.parentId);
      var displayOpt = select.querySelector('.om-s__select__do');
      var optionsWrap = select.querySelector('.om-s__select__opts--active');
      var el = this.wrapSelection();

      console.log(el);

      displayOpt.innerHTML = target.dataset.ctrlValue;
      optionsWrap.classList.remove('om-s__select__opts--active');
      document.execCommand('insertHTML', false, el);
      this.area.focus();
    }
  }, {
    key: 'addSelectionListener',
    value: function addSelectionListener() {
      var _this3 = this;

      this.area.addEventListener('mouseup', function () {
        if (!window.getSelection) return;
        _this3.selection = window.getSelection();

        if (!_this3.selection.rangeCount) return;
        _this3.range = _this3.selection.getRangeAt(0).cloneRange();
        _this3.selectionStart = _this3.range.startOffset;
        _this3.selectionEnd = _this3.range.endOffset;
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