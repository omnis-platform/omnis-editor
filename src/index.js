import EditorConfig from '../config/editorConfig.json'
import Editor from './Editor'

export default class OmnisEditor extends Editor {
  constructor(props) {
    super(props)

    this.selector = props.selector
    this.labelText = props.label
    this.defaultValue = props.value

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
      const ctrl = document.createElement(c.type)
      ctrl.id = `ctrl_${index}`
      ctrl.className = 'om-s__c__ctrl-item'
      ctrl.innerHTML = c.name
      ctrl.dataset.type = c.type
      ctrl.dataset.ctrlStyle = c.style

      if (c.type === 'select') {
        c.options.forEach(o => {
          const opt = document.createElement('option')
          opt.text = o
          opt.value = c.style === 'fontSize' ? `${o}pt` : o
          
          ctrl.add(opt)
        })
      } else {
        ctrl.dataset.ctrlValue = c.value
      }

      this.controls.appendChild(ctrl)
    })
  }

  insertServiceButton() {
    const btns = ['undo', 'redo', 'full', 'showHtml']

    btns.forEach(btn => {
      const button = document.createElement('button')
      button.className = 'om-s__c__ctrl-item'
      button.innerHTML = btn.split(/(?=[A-Z])/).join(' ')
      button.dataset.ctrlBtn = true
      button.dataset.ctrlFor = btn

      this.controls.appendChild(button)
    })
  }
}
