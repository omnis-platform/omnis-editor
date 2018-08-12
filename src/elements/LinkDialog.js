import Dialog from './Dialog'

export default class LinkDialog extends Dialog {
  constructor(section, area, selection, range, target) {
    super()

    this.area = area
    this.selection = selection
    this.range = range
    this.section = section
    this.target = target
    this.rect = target.getBoundingClientRect()

    this.link = document.createElement('a')
    this.dialog = document.createElement('div')
    this.url = document.createElement('input')
    this.text = document.createElement('input')
    this.checkbox = document.createElement('input')
    this.label = document.createElement('label')
    this.submit = document.createElement('input')
  }

  create() {
    this.url.type = 'text'

    this.text.type = 'text'
    this.text.value = this.selection

    this.label.innerHTML = 'Open in new tab'
    this.label.htmlFor = 'openNewTab'

    this.checkbox.type = 'checkbox'
    this.checkbox.id = 'openNewTab'

    this.submit.type = 'submit'
    this.submit.value = 'Create'

    this.dialog.className = 'omnis-editor-dialog om-s__d'
    this.dialog.style.top = `${this.rect.top + 24}px`
    this.dialog.style.left = `${this.rect.left}px`

    this.dialog.appendChild(this.url)
    this.dialog.appendChild(this.label)
    this.dialog.appendChild(this.checkbox)
    this.dialog.appendChild(this.text)
    this.dialog.appendChild(this.submit)

    this.section.appendChild(this.dialog)

    this.submitListener()
    this.createOverlay()
  }

  get content() {
    if (this.text.value) {
      this.link.innerHTML = this.text.value
    } else if (this.range.startOffset === this.range.endOffset) {
      this.link.innerHTML = this.url.value
    } else {
      this.link.innerHTML = this.selection
    }

    if (this.selectionSpanNode) {
      const el = document.createElement('span')
      el.style.cssText = this.selectionSpanNode.style.cssText
      el.appendChild(this.link)

      if (el.style.color) this.link.style.color = el.style.color

      return el.outerHTML
    }

    return this.link.outerHTML
  }

  submitListener() {
    this.submit.addEventListener('click', () => {
      const sel = window.getSelection()
    
      this.area.focus()
      
      if (window.getSelection) {
        sel.removeAllRanges()
        sel.addRange(this.range)
      } else if (document.selection && this.range.select) {
        this.range.select()
      }

      this.link.href = this.url.value
      this.link.target = this.checkbox.checked ? '_blank' : ''
  
      document.execCommand('insertHTML', false, this.content)

      this.destroy()
    })
  }
}