'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dialog = function () {
  function Dialog(section, target) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Dialog);


    this.btnRect = target.getBoundingClientRect();
    this.sectionRect = section.getBoundingClientRect();
    this.dialog = document.createElement('div');
    this.overlay = document.createElement('div');

    this.top = this.btnRect.top - this.sectionRect.top + 24;

    if (this.sectionRect.width > this.btnRect.left + 184) {
      this.left = this.btnRect.left;
    } else {
      this.left = this.btnRect.left - (this.btnRect.left + 184 - this.sectionRect.width) - 50;
    }

    this.dialog.className = 'omnis-editor-dialog om-s__d';
    this.dialog.style.top = this.top + 'px';
    this.dialog.style.left = this.left + 'px';

    this.overlay.className = 'omnis-editor-d-overlay om-s__d__o';
    this.overlay.addEventListener('click', function () {
      _this.destroy();
    });

    section.appendChild(this.dialog);
    section.appendChild(this.overlay);
  }

  (0, _createClass3.default)(Dialog, [{
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
      this.dialog.parentNode.removeChild(this.dialog);
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }, {
    key: 'selectionSpanNode',
    get: function get() {
      var el = this.selection.focusNode.parentNode;

      return el.closest('span');
    }
  }]);
  return Dialog;
}();

exports.default = Dialog;