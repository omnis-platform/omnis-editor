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

var _editorConfig = require('../config/editorConfig.json');

var _editorConfig2 = _interopRequireDefault(_editorConfig);

var _Editor2 = require('./Editor');

var _Editor3 = _interopRequireDefault(_Editor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OmnisEditor = function (_Editor) {
  (0, _inherits3.default)(OmnisEditor, _Editor);

  function OmnisEditor(props) {
    (0, _classCallCheck3.default)(this, OmnisEditor);

    var _this = (0, _possibleConstructorReturn3.default)(this, (OmnisEditor.__proto__ || (0, _getPrototypeOf2.default)(OmnisEditor)).call(this, props));

    _this.selector = props.selector;
    _this.labelText = props.label;
    _this.defaultValue = props.value;
    _this.iconBase = _editorConfig2.default.icon.base;

    _this.label = document.createElement('h3');
    _this.section = document.createElement('section');
    _this.area = document.createElement('div');
    _this.controls = document.createElement('aside');

    _this.selection = null;
    _this.range = null;
    _this.selectedText = '';
    _this.selectionStart = 0;
    _this.selectionEnd = 0;

    _this.htmlMode = false;
    _this.isFullSize = false;

    _this.innerHTML = '';
    _this.textStyles = '';

    if (props.conf) {
      _this.conf = props.conf;
    } else {
      _this.conf = _editorConfig2.default;
    }
    return _this;
  }

  (0, _createClass3.default)(OmnisEditor, [{
    key: 'init',
    value: function init() {
      console.log('%cINIT OMNIS EDITOR', 'background: #06c4bf; color: #fff');

      this.wparContent();
      this.insertComponents();
      this.inserControles();
      this.insertServiceButton();
      this.addSelectionListener();
      this.addCtrlListener();
      this.setSelection();
      this.elementCloseListener();
    }
  }, {
    key: 'insertComponents',
    value: function insertComponents() {
      document.execCommand('styleWithCSS', false, 'true');

      this.selector.style.width = '100%';
      this.section.className = 'omnis-editor-section om-s';
      this.controls.className = 'omnis-editor-controls om-s__c';

      this.area.contentEditable = true;
      this.area.className = 'omnis-editor-area om-s__a';
      this.area.appendChild(this.innerHTML);

      this.label.className = 'omnis-editor-label om-s__l';
      this.label.innerHTML = this.labelText;

      this.selector.appendChild(this.label);
      this.selector.appendChild(this.section);
      this.section.appendChild(this.controls);
      this.section.appendChild(this.area);

      this.area.focus();
    }
  }, {
    key: 'inserControles',
    value: function inserControles() {
      var _this2 = this;

      var ctrls = document.createElement('div');
      ctrls.className = 'om-s__c__item';

      this.conf.controls.forEach(function (c, index) {
        if (c.type === 'dropdown') {
          _this2.createCtrlDropdown(c, index);
        } else {
          _this2.creteCtrlButton(c, index);
        }
      });
    }
  }, {
    key: 'creteCtrlButton',
    value: function creteCtrlButton(c, index) {
      var ctrl = document.createElement('button');

      ctrl.id = 'ctrl_' + index;
      ctrl.className = 'om-s__c__ctrl-item om-s__c__ctrl-item--button';
      ctrl.dataset.content = c.name;
      ctrl.dataset.type = c.type;
      ctrl.dataset.ctrlStyle = c.style;
      ctrl.style.backgroundImage = 'url(' + (this.iconBase + c.icon) + ')';
      ctrl.dataset.ctrlValue = c.value;

      this.controls.appendChild(ctrl);
    }
  }, {
    key: 'createCtrlDropdown',
    value: function createCtrlDropdown(c, index) {
      var ctrl = document.createElement('button');
      var option = document.createElement('div');
      var wrap = document.createElement('div');

      ctrl.id = 'ctrl_' + index;
      ctrl.className = 'om-s__c__ctrl-item om-s__c__ctrl-item--select om-s__c__ctrl-item__' + c.style;
      ctrl.dataset.content = c.name;
      ctrl.dataset.type = c.type;
      ctrl.dataset.ctrlStyle = c.style;

      wrap.className = 'om-s__dropdown__opts om-s__dropdown__opts--' + c.style;
      option.className = 'om-s__dropdown__do om-s__dropdown__do--' + c.style;
      option.style.backgroundImage = 'url(' + (this.iconBase + c.icon) + ')';

      switch (c.style) {
        case 'foreColor':
          this.createColorDropDown(c, index, wrap);
          break;
        case 'hiliteColor':
          this.createColorDropDown(c, index, wrap);
          break;
        case 'textAlign':
          this.createTextAlignDropDown(c, index, wrap);
          break;
        case 'fontName':
          this.createFontNameDropDown(c, index, option, wrap);
          break;
        case 'fontSize':
          this.createFontSizeDropDown(c, index, option, wrap);
          break;
      }

      ctrl.appendChild(option);
      ctrl.appendChild(wrap);

      this.controls.appendChild(ctrl);
    }
  }, {
    key: 'createColorDropDown',
    value: function createColorDropDown(ctrl, index, wrap) {
      var _this3 = this;

      ctrl.options.forEach(function (o) {
        var opt = document.createElement('div');
        opt.className = 'om-s__dropdown__opt--' + ctrl.style;
        opt.dataset.type = 'button';
        opt.dataset.parentId = 'ctrl_' + index;
        opt.dataset.ctrlStyle = ctrl.style;
        opt.dataset.ctrlValue = o;
        opt.style.backgroundColor = o;

        if (o === 'REMOVE') opt.style.backgroundImage = 'url(' + _this3.iconBase + '/controls/' + _this3.conf.icon.removeIcon + ')';

        wrap.appendChild(opt);
      });
    }
  }, {
    key: 'createFontNameDropDown',
    value: function createFontNameDropDown(ctrl, index, option, wrap) {
      var container = document.createElement('div');
      container.className = 'om-s__dropdown__opts__container';
      option.innerHTML = ctrl.options[0];
      option.style.backgroundImage = '';

      ctrl.options.forEach(function (o) {
        var opt = document.createElement('div');
        opt.className = 'om-s__dropdown__opt--' + ctrl.style;
        opt.dataset.type = 'button';
        opt.dataset.parentId = 'ctrl_' + index;
        opt.dataset.ctrlStyle = ctrl.style;
        opt.dataset.ctrlValue = o;
        opt.innerHTML = o;
        opt.style.fontFamily = o;

        container.appendChild(opt);
      });

      wrap.appendChild(container);
    }
  }, {
    key: 'createFontSizeDropDown',
    value: function createFontSizeDropDown(ctrl, index, option, wrap) {
      var container = document.createElement('div');
      container.className = 'om-s__dropdown__opts__container';
      option.innerHTML = ctrl.options[0] + 'pt';
      option.style.backgroundImage = '';

      ctrl.options.forEach(function (o) {
        var opt = document.createElement('div');
        opt.className = 'om-s__dropdown__opt--' + ctrl.style;
        opt.dataset.type = 'button';
        opt.dataset.parentId = 'ctrl_' + index;
        opt.dataset.ctrlStyle = ctrl.style;
        opt.dataset.ctrlValue = o + 'pt';
        opt.innerHTML = o + 'pt';
        opt.style.fontFamily = o;

        container.appendChild(opt);
      });

      wrap.appendChild(container);
    }
  }, {
    key: 'createTextAlignDropDown',
    value: function createTextAlignDropDown(ctrl, index, wrap) {
      var _this4 = this;

      ctrl.options.forEach(function (o) {
        var opt = document.createElement('div');
        opt.className = 'om-s__dropdown__opt--' + ctrl.style;
        opt.dataset.type = 'button';
        opt.dataset.parentId = 'ctrl_' + index;
        opt.dataset.ctrlStyle = ctrl.style;
        opt.dataset.ctrlValue = o;
        opt.style.backgroundImage = 'url(' + _this4.iconBase + '/controls/' + o + '.svg)';
        wrap.appendChild(opt);
      });
    }
  }, {
    key: 'insertServiceButton',
    value: function insertServiceButton() {
      var _this5 = this;

      var btns = ['undo', 'redo', 'fullScreen', 'showHtml'];

      btns.forEach(function (btn) {
        var button = document.createElement('button');
        button.className = 'om-s__c__ctrl-item om-s__c__ctrl-item--button';
        button.dataset.ctrlBtn = true;
        button.dataset.ctrlFor = btn;
        button.dataset.content = btn.split(/(?=[A-Z])/).join(' ');
        button.style.backgroundImage = 'url(' + _this5.iconBase + '/controls/' + btn + '.svg)';

        _this5.controls.appendChild(button);
      });
    }
  }, {
    key: 'elementCloseListener',
    value: function elementCloseListener() {
      var classList = ['om-s__dropdown__opts'];

      this.area.addEventListener('click', function () {
        classList.forEach(function (c) {
          var el = document.querySelector('.' + c + '--active');
          if (el) el.classList.remove(c + '--active');
        });
      });
    }
  }]);
  return OmnisEditor;
}(_Editor3.default);

exports.default = OmnisEditor;