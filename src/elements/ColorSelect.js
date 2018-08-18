import Select from './Select'

export default class ColorSelect extends Select {
  constructor(section, area, range, target) {
    super(section, target)

    this.area = area
    this.range = range
    this.section = section
    this.style = target.dataset.ctrlStyle
    this.options = target.dataset.ctrlOptions.split(',')

    this.inputSec = document.createElement('div')
    this.input = document.createElement('input')
    this.submit = document.createElement('input')
  }

  create() {
    this.input.type = 'text'
    this.submit.type = 'button'

    this.inputSec.appendChild(this.input)
    this.inputSec.appendChild(this.submit)
    this.wrap.appendChild(this.inputSec)
    this.target.appendChild(this.wrap)
  }

  get getHtml() {
    return this.select
  }
}