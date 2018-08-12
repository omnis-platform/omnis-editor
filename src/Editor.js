import LinkDialog from './elements/LinkDialog'

export default class Editor {
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
        switch(e.target.dataset.ctrlStyle) {
          case 'padding':
            this.indentAction(e)
            break 
          case 'textTransform':
            this.insertAction(e.target.dataset.ctrlStyle, e.target.dataset.ctrlValue)
            break
          case 'createLink':
            this.insertLinkAction(e.target)
            break
          default:
            document.execCommand(e.target.dataset.ctrlStyle, false, '')
            break
        }

        this.area.focus()
      }, false)
    })
  }

  selectListener() {
    const ctrls = [ ...document.querySelectorAll('[data-type="select"]') ]

    ctrls.forEach(c => {
      c.addEventListener('change', e => {
        switch(e.target.dataset.ctrlStyle) {
          case 'fontSize':
            this.insertAction(e.target.dataset.ctrlStyle, e.target.value)
            break
          case 'textAlign':
            this.alignAction(e)
            break
          default:
            document.execCommand(e.target.dataset.ctrlStyle, false, e.target.value)
            break
        }
      }, false)
    })
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
    this.alignSelection(e.target.value)
    this.area.focus()
  }

  indentAction(e) {
    this.indentSelection(e.target.dataset.ctrlValue)
    this.area.focus()
  }

  insertAction(styles, val) {
    this.setSelectionStyles(styles, val)    
    const el = this.wrapSelection()

    document.execCommand('insertHTML', false, el)
    this.area.focus()
  }

  insertLinkAction(target) {
    const sel = this.selection
    const range = this.range
    const dialog = new LinkDialog(this.section, this.area, sel, range, target)

    dialog.create()
  }

  addSelectionListener() {
    this.area.addEventListener('mouseup', () => {
      if (!window.getSelection) return
      this.selection = window.getSelection()
      
      if (!this.selection.rangeCount) return
      this.range = this.selection.getRangeAt(0).cloneRange()
      this.selectionStart = this.range.startOffset
      this.selectionEnd = this.range.endOffset
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
