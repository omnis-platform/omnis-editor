const EditorConfig = require('./editorConfig.json')

export class OmnisEditor {
  constructor(props) {
    this.props = props
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
    this.insertShowHtmlButton()
    this.addSelectionListener()
    this.addCtrlListener()
  }

  insertComponents() {
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

  insertShowHtmlButton() {
    const button = document.createElement('button')
    button.id = 'ctrl_showHtml'
    button.className = 'om-s__c__ctrl-item'
    button.innerHTML = 'show html'
    button.dataset.ctrlShowHtml = true

    this.controls.appendChild(button)
  }

  get selectionSpanNode() {
    let a = this.selection.focusNode.parentNode

    return a.closest('span')
  }

  get selectionParagraphNode() {
    let a = this.selection.focusNode.parentNode

    return a.closest('p')
  }

  get html() {
    return this.area.innerHTML
  }

  setSelectionStyles(style, value) {
    const tmpStyles = {}
    const node = this.selectionSpanNode
    const styleList = this.conf.styleNames

    styleList.forEach(s => {
      const propName = s.split(/(?=[A-Z])/).join('-').toLocaleLowerCase()
  
      if (node && node.style[s]) tmpStyles[propName] = node.style[s]
      if (s === style) tmpStyles[propName] = value
      if (node && (node.style[s] === value)) delete tmpStyles[propName]
    })

    let styleArr = Object.keys(tmpStyles).map(k => `${k}: ${tmpStyles[k]}`)
    this.textStyles = styleArr.join('; ') || ''
  }

  addCtrlListener() {
    this.buttonListener()
    this.selectListener()
    this.showHtmlListener()
  }

  buttonListener() {
    const ctrls = [ ...document.querySelectorAll('[data-type="button"]') ]

    ctrls.forEach(c => {
      c.addEventListener('mousedown', e => e.preventDefault())
      c.addEventListener('click', e => {
        if (e.target.dataset.ctrlStyle === 'textAlign') {
          this.alignAction(e)
        } else if (e.target.dataset.ctrlStyle === 'padding') {
          this.indentAction(e)
        } else {
          this.insertAction(e, e.target.dataset.ctrlValue)
        }

        this.area.focus()
      }, false)
    })
  }

  selectListener() {
    const  ctrls = [ ...document.querySelectorAll('[data-type="select"]') ]

    ctrls.forEach(c => {
      c.addEventListener('change', e => this.insertAction(e, e.target.value), false)
    })
  }

  showHtmlListener() {
    const showHtmlBtn = document.querySelector('#ctrl_showHtml')

    showHtmlBtn.addEventListener('click', () => {
      this.htmlMode = !this.htmlMode

      if (this.htmlMode) {
        let content = this.html
        content = content.replace(/&lt;/g, '<')
        content = content.replace(/&gt;/g, '>')
  
        this.area.innerHTML = content
      } else {
        let content = this.html
        content = content.replace(/</g, '&lt;')
        content = content.replace(/>/g, '&gt;')

        this.area.innerHTML = content
      }
    })
  }

  alignAction(e) {
    this.alignSelection(e.target.dataset.ctrlValue)
    this.area.focus()
  }

  indentAction(e) {
    this.indentSelection(e.target.dataset.ctrlValue)
    this.area.focus()
  }

  insertAction(e, val) {
    this.setSelectionStyles(e.target.dataset.ctrlStyle, val)    
    const el = this.wrapSelection()

    document.execCommand('insertHTML', false, el)
    this.area.focus()
  }

  setSelection() {
    this.range = this.selection.getRangeAt(0).cloneRange()
    this.selectionStart = this.range.startOffset
    this.selectionEnd = this.range.endOffset
  }

  addSelectionListener() {
    window.addEventListener('mouseup', e => {
      if (!window.getSelection) return
      this.selection = window.getSelection()
      
      if (!this.selection.rangeCount) return
      this.setSelection()
    })
  }

  wrapSelection() {
    let span = this.selectionSpanNode

    if (span) {
      span.style.cssText = this.textStyles
    } else {
      span = document.createElement('span')
      span.style.cssText = this.textStyles
      span.innerHTML = this.selection
    }

    return span.outerHTML
  }

  alignSelection(val) {
    this.selectionParagraphNode.style.textAlign = val
  }

  indentSelection(val) {
    const padding = this.selectionParagraphNode.style.paddingLeft.match(/\d+/) || 0
    const value = padding ? Number(padding[0]) + Number(val) : Number(val)

    this.selectionParagraphNode.style.paddingLeft = `${value}px`
  }

  wparContent() {
    const paragraph = document.createElement('p')
    paragraph.innerHTML = this.defaultValue
    this.innerHTML = paragraph
  }
}
