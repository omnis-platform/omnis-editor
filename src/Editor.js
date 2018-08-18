import LinkDialog from './elements/LinkDialog'
import ImageDialog from './elements/ImageDialog'
import EmojiDialog from './elements/EmojiDialog'
import SpecialCharactersModal from './elements/SpecialCharactersModal'

export default class Editor {
  constructor(props) {
    this.upload = props.upload
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

  setSelection() {    
    if (!window.getSelection) return
    this.selection = window.getSelection()
    
    if (!this.selection.rangeCount) return
    this.range = this.selection.getRangeAt(0).cloneRange()
    this.selectionStart = this.range.startOffset
    this.selectionEnd = this.range.endOffset

    this.selection.removeAllRanges()
    this.selection.addRange(this.range)
  }

  addCtrlListener() {
    this.buttonListener()
    this.selectListener()
    this.serviceButtonListener()
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
          case 'insertImage':
            this.insertImageAction(e.target)
            break
          case 'insertEmoji':
            this.insertEmojiAction(e.target)
            break
          case 'specialCharacters':
            this.insertCharactersAction()
            break
          case 'foreColor':
            this.changeColorAction(e.target)
            break
          case 'hiliteColor':
            this.changeColorAction(e.target)
            break
          case 'textAlign':
            this.textAlignAction(e.target)
            break
          case 'fontName':
            this.changeFontNameAction(e.target)
            break
          case 'fontSize':
            this.changeFontSizeAction(e.target)
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
      c.addEventListener('click', e => {
        const select = e.target.querySelector('.om-s__select__opts') || e.target
        const selects = [ ...document.querySelectorAll('.om-s__select__opts--active') ]

        if (e.target.nodeName === 'BUTTON') {  
          selects.forEach(s => s.classList.remove('om-s__select__opts--active'))
          select.classList.toggle('om-s__select__opts--active')
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

  serviceButtonListener() {
    const ctrlBtns = [ ...document.querySelectorAll('[data-ctrl-btn="true"]') ]

    ctrlBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        switch(e.target.dataset.ctrlFor) {
          case 'showHtml':
            this.displayHtml()
            break
          case 'fullScreen':
            this.setSectionFullSize()
          default:
            document.execCommand(e.target.dataset.ctrlFor, false)
            break
        }
      })
    })
  }

  displayHtml() {
    const btn = document.querySelector('[data-ctrl-for="showHtml"]')
    let content = this.html

    if (this.htmlMode) {
      btn.dataset.content = 'show html'
      content = content.replace(/&lt;/g, '<')
      content = content.replace(/&gt;/g, '>')
    } else {
      btn.dataset.content = 'hide html'
      content = content.replace(/</g, '&lt;')
      content = content.replace(/>/g, '&gt;')
    }

    this.area.innerHTML = content
    this.htmlMode = !this.htmlMode
  }

  setSectionFullSize() {
    const btn = document.querySelector('[data-ctrl-for="fullScreen"]')

    if (this.isFullSize) {
      btn.dataset.content = 'full Screen'
      btn.style.backgroundImage = `url(${this.iconBase}/controls/fullScreen.svg)`
      this.section.classList.remove('om-s--full')
    } else {
      btn.dataset.content = 'Exit full Screen'
      btn.style.backgroundImage = `url(${this.iconBase}/controls/fullScreenExit.svg)`
      this.section.classList.add('om-s--full')
    }

    this.isFullSize = !this.isFullSize
  }

  textAlignAction(target) {
    const select = document.querySelector(`#${target.dataset.parentId}`)
    const optionsWrap = select.querySelector('.om-s__select__opts--active')
    const displayOpt = select.querySelector('.om-s__select__do')

    document.execCommand(target.dataset.ctrlValue, false)
    this.area.focus()

    displayOpt.style.backgroundImage = target.style.backgroundImage
    optionsWrap.classList.remove('om-s__select__opts--active')
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

  insertImageAction(target) {
    const range = this.range
    const dialog = new ImageDialog(this.section, this.area, range, target, this.upload)

    dialog.create()
  }

  insertEmojiAction(target) {
    const range = this.range
    const dialog = new EmojiDialog(this.section, this.area, range, target)

    dialog.create()
  }

  insertCharactersAction() {
    const range = this.range
    const modal = new SpecialCharactersModal(this.section, this.area, range)

    modal.create()
  }

  changeColorAction(target) {
    let val = target.dataset.ctrlValue

    if (target.dataset.ctrlValue === 'REMOVE') {
      if (target.dataset.ctrlStyle === 'hiliteColor') val = '#ffffff'
      else val = '#000000'
    }

    document.execCommand(target.dataset.ctrlStyle, false, val)
    target.parentNode.classList.remove('om-s__select__opts--active')
  }

  changeFontNameAction(target) {
    const select = document.querySelector(`#${target.dataset.parentId}`)
    const displayOpt = select.querySelector('.om-s__select__do')
    const optionsWrap = select.querySelector('.om-s__select__opts--active')

    displayOpt.innerHTML = target.dataset.ctrlValue
    optionsWrap.classList.remove('om-s__select__opts--active')
    document.execCommand(target.dataset.ctrlStyle, false, target.dataset.ctrlValue)
  }

  changeFontSizeAction(target) {
    this.setSelectionStyles(target.dataset.ctrlStyle, target.dataset.ctrlValue)

    const select = document.querySelector(`#${target.dataset.parentId}`)
    const displayOpt = select.querySelector('.om-s__select__do')
    const optionsWrap = select.querySelector('.om-s__select__opts--active')
    const el = this.wrapSelection()

    console.log(el)

    displayOpt.innerHTML = target.dataset.ctrlValue
    optionsWrap.classList.remove('om-s__select__opts--active')
    document.execCommand('insertHTML', false, el)
    this.area.focus()
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
