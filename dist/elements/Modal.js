'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function () {
  function Modal() {
    (0, _classCallCheck3.default)(this, Modal);

    this.modal = document.createElement('div');
    this.overlay = document.createElement('div');
  }

  (0, _createClass3.default)(Modal, [{
    key: 'createModal',
    value: function createModal() {
      var _this = this;

      this.modal.className = 'omnis-editor-m om-s__m';
      this.overlay.className = 'omnis-editor-d-overlay om-s__m__o';

      this.section.appendChild(this.overlay);
      this.section.appendChild(this.modal);

      this.overlay.addEventListener('click', function () {
        _this.destroy();
      });
    }
  }, {
    key: 'restoreSelection',
    value: function restoreSelection() {
      var sel = window.getSelection();

      this.area.focus();

      if (window.getSelection) {
        sel.removeAllRanges();
        sel.addRange(this.range);
      } else if (document.selection && this.range.select) {
        this.range.select();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.modal.parentNode.removeChild(this.modal);
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }, {
    key: 'selectionSpanNode',
    get: function get() {
      var el = this.selection.focusNode.parentNode;

      return el.closest('span');
    }
  }]);
  return Modal;
}();

exports.default = Modal;