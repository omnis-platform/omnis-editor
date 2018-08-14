export default class Dialog {
  constructor(section, target) {

    this.btnRect = target.getBoundingClientRect()
    this.sectionRect = section.getBoundingClientRect()
    this.dialog = document.createElement('div')
    this.overlay = document.createElement('div')
  
    this.top = (this.btnRect.top - this.sectionRect.top) + 24

    if (this.sectionRect.width > this.btnRect.left + 184) {
      this.left = this.btnRect.left
    } else {
      this.left = this.btnRect.left - ((this.btnRect.left + 184) - this.sectionRect.width) - 50
    }
  
    this.dialog.className = 'omnis-editor-dialog om-s__d'
    this.dialog.style.top = `${this.top}px`
    this.dialog.style.left = `${this.left}px`
  
    this.overlay.className = 'omnis-editor-d-overlay om-s__d__o'
    this.overlay.addEventListener('click', () => {
      this.destroy()
    })

    section.appendChild(this.dialog)
    section.appendChild(this.overlay)
  }

  get selectionSpanNode() {
    let el = this.selection.focusNode.parentNode

    return el.closest('span')
  }

  restoreSelection() {
    const sel = window.getSelection()

    this.area.focus()

    if (window.getSelection) {
      sel.removeAllRanges()
      sel.addRange(this.range)
    } else if (document.selection && this.range.select) {
      this.range.select()
    }
  }

  destroy() {
    this.dialog.parentNode.removeChild(this.dialog)
    this.overlay.parentNode.removeChild(this.overlay)
  }
}