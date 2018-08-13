import Modal from './Modal'

export default class SpecialCharactersModal extends Modal {
  constructor(section, area, range) {
    super()

    this.section = section
    this.area = area
    this.range = range

    this.list = document.createElement('div')

    this.characters = [
      {
        name: 'Latin',
        list: [
          '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&#x20B9;', '&brvbar;', '&sect;', '&uml;', '&copy;',
          '&ordf;', '&laquo;', '&not;', '&reg;', '&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;',
          '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;',
          '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;',
          '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;',
          '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;',
          '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;',
          '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;',
          '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;',
          '&uuml;', '&yacute;', '&thorn;', '&yuml;'
        ]
      },
      {
        name: 'Latin Extended',
        list: [
          '&OElig;', '&oelig;', '&Scaron;', '&scaron;', '&Yuml;', '&fnof;'
        ]
      },
      {
        name: 'Spacing Modifier Letters',
        list: [
          '&circ;', '&tilde;'
        ]
      },
      {
        name: 'Greek',
        list: [
          '&Alpha;', '&Beta;', '&Gamma;', '&Delta;', '&Epsilon;', '&Zeta;', '&Eta;', '&Theta;', '&Iota;', '&Kappa;', '&Lambda;',
          '&Mu;', '&Nu;', '&Xi;', '&Omicron;', '&Pi;', '&Rho;', '&Sigma;', '&Tau;', '&Upsilon;', '&Phi;', '&Chi;', '&Psi;',
          '&Omega;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;',
          '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;', '&tau;', '&upsilon;', '&phi;',
          '&chi;', '&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;' 
        ]
      },
      {
        name: 'Arrows',
        list: [
          '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&lArr;', '&uArr;', '&rArr;', '&dArr;', '&hArr;',
          '◄', '►', '▲', '▼'
        ]
      },
      {
        name: 'Mathematical Operators',
        list: [
          '&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;',
          '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;',
          '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;', '&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;'
        ]
      }
    ]
  }

  create() {
    this.createModal()

    this.list.className = 'om-s__m__c'

    this.characters.forEach(c => {
      const category = document.createElement('div')
      const name = document.createElement('p')
      const list = document.createElement('ul')

      category.className = 'om-s__cl'
      name.innerHTML = c.name

      c.list.forEach(i => {
        const char = document.createElement('li')
        char.innerHTML = i
        char.dataset.sym = i
        char.dataset.charSym = true

        list.appendChild(char)
      })

      category.appendChild(name)
      category.appendChild(list)

      this.list.appendChild(category)
    })

    this.modal.appendChild(this.list)

    this.setCharter()
  }

  setCharter() {
    const chars = [ ...document.querySelectorAll('[data-char-sym="true"]') ]

    chars.forEach(c => {
      c.addEventListener('click', e => {
        const el = document.createElement('span')
        el.innerHTML = e.target.dataset.sym

        this.restoreSelection()

        document.execCommand('insertHTML', false, el.outerHTML)

        this.destroy()
      })
    })
  }
}