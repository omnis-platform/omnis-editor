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

var _Modal2 = require('./Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SpecialCharactersModal = function (_Modal) {
  (0, _inherits3.default)(SpecialCharactersModal, _Modal);

  function SpecialCharactersModal(section, area, range) {
    (0, _classCallCheck3.default)(this, SpecialCharactersModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SpecialCharactersModal.__proto__ || (0, _getPrototypeOf2.default)(SpecialCharactersModal)).call(this));

    _this.section = section;
    _this.area = area;
    _this.range = range;

    _this.list = document.createElement('div');

    _this.characters = [{
      name: 'Latin',
      list: ['&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&#x20B9;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&reg;', '&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;']
    }, {
      name: 'Latin Extended',
      list: ['&OElig;', '&oelig;', '&Scaron;', '&scaron;', '&Yuml;', '&fnof;']
    }, {
      name: 'Spacing Modifier Letters',
      list: ['&circ;', '&tilde;']
    }, {
      name: 'Greek',
      list: ['&Alpha;', '&Beta;', '&Gamma;', '&Delta;', '&Epsilon;', '&Zeta;', '&Eta;', '&Theta;', '&Iota;', '&Kappa;', '&Lambda;', '&Mu;', '&Nu;', '&Xi;', '&Omicron;', '&Pi;', '&Rho;', '&Sigma;', '&Tau;', '&Upsilon;', '&Phi;', '&Chi;', '&Psi;', '&Omega;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;']
    }, {
      name: 'Arrows',
      list: ['&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&lArr;', '&uArr;', '&rArr;', '&dArr;', '&hArr;', '◄', '►', '▲', '▼']
    }, {
      name: 'Mathematical Operators',
      list: ['&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;', '&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;']
    }];
    return _this;
  }

  (0, _createClass3.default)(SpecialCharactersModal, [{
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.createModal();

      this.list.className = 'om-s__m__c';

      this.characters.forEach(function (c) {
        var category = document.createElement('div');
        var name = document.createElement('p');
        var list = document.createElement('ul');

        category.className = 'om-s__cl';
        name.innerHTML = c.name;

        c.list.forEach(function (i) {
          var char = document.createElement('li');
          char.innerHTML = i;
          char.dataset.sym = i;
          char.dataset.charSym = true;

          list.appendChild(char);
        });

        category.appendChild(name);
        category.appendChild(list);

        _this2.list.appendChild(category);
      });

      this.modal.appendChild(this.list);

      this.setCharter();
    }
  }, {
    key: 'setCharter',
    value: function setCharter() {
      var _this3 = this;

      var chars = [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('[data-char-sym="true"]')));

      chars.forEach(function (c) {
        c.addEventListener('click', function (e) {
          var el = document.createElement('span');
          el.innerHTML = e.target.dataset.sym;

          _this3.restoreSelection();

          document.execCommand('insertHTML', false, el.outerHTML);

          _this3.destroy();
        });
      });
    }
  }]);
  return SpecialCharactersModal;
}(_Modal3.default);

exports.default = SpecialCharactersModal;