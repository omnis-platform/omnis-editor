import EditorConfig from '../config/editorConfig.json'
import Editor from './Editor'

export default class OmnisEditor extends Editor {
  constructor(props) {
    super(props)

    this.selector = props.selector
    this.labelText = props.label
    this.defaultValue = props.value
    this.iconBase = EditorConfig.icon.base

    this.label = document.createElement('h3')
    this.section = document.createElement('section')
    this.area = document.createElement('div')
    this.controls = document.createElement('aside')

    this.selection = null
    this.range = null
    this.selectedText = ''
    this.selectionStart = 0
    this.selectionEnd = 0

    this.htmlMode = false
    this.isFullSize = false

    this.innerHTML = ''
    this.textStyles = ''

    if (props.conf) {
      this.conf = props.conf
    } else {
      this.conf = EditorConfig
    }
  }

  init() {
    console.log('%cINIT OMNIS EDITOR', 'background: #06c4bf; color: #fff')

    this.wparContent()
    this.insertComponents()
    this.inserControles()
    this.insertServiceButton()
    this.addSelectionListener()
    this.addCtrlListener()
    this.setSelection()
    this.elementCloseListener()
  }

  insertComponents() {
    document.execCommand('styleWithCSS', false, 'true')

    this.selector.style.width = '100%'
    this.section.className = 'omnis-editor-section om-s'
    this.controls.className = 'omnis-editor-controls om-s__c'

    this.area.contentEditable = true
    this.area.className = 'omnis-editor-area om-s__a'
    this.area.appendChild(this.innerHTML)

    this.label.className = 'omnis-editor-label om-s__l'
    this.label.innerHTML = this.labelText

    this.selector.appendChild(this.label)
    this.selector.appendChild(this.section)
    this.section.appendChild(this.controls)
    this.section.appendChild(this.area)

    this.area.focus()
  }

  inserControles() {
    const ctrls = document.createElement('div')
    ctrls.className = 'om-s__c__item'

    this.conf.controls.forEach((c, index) => {
      if (c.type === 'select') {
        this.createCtrlSelect(c, index)
      } else {
        this.creteCtrlButton(c, index)
      }
    })
  }

  creteCtrlButton(c, index) {
    const ctrl = document.createElement('button')

    ctrl.id = `ctrl_${index}`
    ctrl.className = 'om-s__c__ctrl-item om-s__c__ctrl-item--button'
    ctrl.dataset.content = c.name
    ctrl.dataset.type = c.type
    ctrl.dataset.ctrlStyle = c.style
    ctrl.style.backgroundImage = `url(${this.iconBase + c.icon})`
    ctrl.dataset.ctrlValue = c.value

    this.controls.appendChild(ctrl)
  }

  createCtrlSelect(c, index) {
    const ctrl = document.createElement('button')
    const option = document.createElement('div')
    const wrap = document.createElement('div')

    ctrl.id = `ctrl_${index}`
    ctrl.className = `om-s__c__ctrl-item om-s__c__ctrl-item--select om-s__c__ctrl-item__${c.style}`
    ctrl.dataset.content = c.name
    ctrl.dataset.type = c.type
    ctrl.dataset.ctrlStyle = c.style

    wrap.className = `om-s__select__opts om-s__select__opts--${c.style}`
    option.className = `om-s__select__do om-s__select__do--${c.style}`
    option.style.backgroundImage = `url(${this.iconBase + c.icon})`

    switch(c.style) {
      case 'foreColor':
        this.createColorDropDown(c, index, wrap)
        break
      case 'hiliteColor':
        this.createColorDropDown(c, index, wrap)
        break
      case 'textAlign':
        this.createTextAlignDropDown(c, index, wrap)
        break
      case 'fontName':
        this.createFontNameDropDown(c, index, option, wrap)
        break
      case 'fontSize':
        this.createFontSizeDropDown(c, index, option, wrap)
        break
    }

    ctrl.appendChild(option)
    ctrl.appendChild(wrap)

    this.controls.appendChild(ctrl)
  }

  createColorDropDown(ctrl, index, wrap) {
    ctrl.options.forEach(o => {
      const opt = document.createElement('div')
      opt.className = `om-s__select__opt--${ctrl.style}`
      opt.dataset.type = 'button'
      opt.dataset.parentId = `ctrl_${index}`
      opt.dataset.ctrlStyle = ctrl.style
      opt.dataset.ctrlValue = o
      opt.style.backgroundColor = o

      if (o === 'REMOVE') opt.style.backgroundImage = `url(${this.iconBase + this.conf.icon.removeIcon})`

      wrap.appendChild(opt)
    })
  }

  createFontNameDropDown(ctrl, index, option, wrap) {
    const container = document.createElement('div')
    container.className = 'om-s__select__opts__container'
    option.innerHTML = ctrl.options[0]
    option.style.backgroundImage = ''

    ctrl.options.forEach(o => {
      const opt = document.createElement('div')
      opt.className = `om-s__select__opt--${ctrl.style}`
      opt.dataset.type = 'button'
      opt.dataset.parentId = `ctrl_${index}`
      opt.dataset.ctrlStyle = ctrl.style
      opt.dataset.ctrlValue = o
      opt.innerHTML = o
      opt.style.fontFamily = o

      container.appendChild(opt)
    })

    wrap.appendChild(container)
  }

  createFontSizeDropDown(ctrl, index, option, wrap) {
    const container = document.createElement('div')
    container.className = 'om-s__select__opts__container'
    option.innerHTML = ctrl.options[0]
    option.style.backgroundImage = ''

    ctrl.options.forEach(o => {
      const opt = document.createElement('div')
      opt.className = `om-s__select__opt--${ctrl.style}`
      opt.dataset.type = 'button'
      opt.dataset.parentId = `ctrl_${index}`
      opt.dataset.ctrlStyle = ctrl.style
      opt.dataset.ctrlValue = `${o}pt`
      opt.innerHTML = `${o}pt`
      opt.style.fontFamily = o

      container.appendChild(opt)
    })

    wrap.appendChild(container)
  }

  createTextAlignDropDown(ctrl, index, wrap) {
    ctrl.options.forEach(o => {
      const opt = document.createElement('div')
      opt.className = `om-s__select__opt--${ctrl.style}`
      opt.dataset.type = 'button'
      opt.dataset.parentId = `ctrl_${index}`
      opt.dataset.ctrlStyle = ctrl.style
      opt.dataset.ctrlValue = o
      opt.style.backgroundImage = `url(${this.iconBase + o}.svg)`

      wrap.appendChild(opt)
    })
  }

  insertServiceButton() {
    const btns = ['undo', 'redo', 'fullScreen', 'showHtml']

    btns.forEach(btn => {
      const button = document.createElement('button')
      button.className = 'om-s__c__ctrl-item om-s__c__ctrl-item--button'
      button.dataset.ctrlBtn = true
      button.dataset.ctrlFor = btn
      button.dataset.content = btn.split(/(?=[A-Z])/).join(' ')
      button.style.backgroundImage = `url(${this.iconBase + btn}.svg)`

      this.controls.appendChild(button)
    })
  }

  elementCloseListener() {
    const classList = ['om-s__select__opts']

    this.area.addEventListener('click', () => {
      classList.forEach(c => {
        const el = document.querySelector(`.${c}--active`)
        if (el) el.classList.remove(`${c}--active`)
      })
    })
  }
}
