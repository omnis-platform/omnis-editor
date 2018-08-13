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
        var ctrl = document.createElement(c.type);
        ctrl.id = 'ctrl_' + index;
        ctrl.className = 'om-s__c__ctrl-item';
        ctrl.innerHTML = c.name;
        ctrl.dataset.type = c.type;
        ctrl.dataset.ctrlStyle = c.style;

        if (c.type === 'select') {
          c.options.forEach(function (o) {
            var opt = document.createElement('option');
            opt.text = o;
            opt.value = c.style === 'fontSize' ? o + 'pt' : o;

            ctrl.add(opt);
          });
        } else {
          ctrl.dataset.ctrlValue = c.value;
        }

        _this2.controls.appendChild(ctrl);
      });
    }
  }, {
    key: 'insertServiceButton',
    value: function insertServiceButton() {
      var _this3 = this;

      var btns = ['undo', 'redo', 'full', 'showHtml'];

      btns.forEach(function (btn) {
        var button = document.createElement('button');
        button.className = 'om-s__c__ctrl-item';
        button.innerHTML = btn.split(/(?=[A-Z])/).join(' ');
        button.dataset.ctrlBtn = true;
        button.dataset.ctrlFor = btn;

        _this3.controls.appendChild(button);
      });
    }
  }]);
  return OmnisEditor;
}(_Editor3.default);

exports.default = OmnisEditor;