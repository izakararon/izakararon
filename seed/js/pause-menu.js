// One pause surface for the map and existing controls.
const START_VIEW = Object.freeze({ mode: 'person', time: 'midnight', altitude: 0, heading: 0 });

class PauseMenu {
  constructor({ dialog, button, resumeButton, canOpen = () => true, onChange = () => {} }) {
    this.dialog = dialog;
    this.canOpen = canOpen;
    this.onChange = onChange;
    this.activeTab = 'map';
    this.tabs = [...dialog.querySelectorAll('[data-pause-tab]')];
    this.panels = [...dialog.querySelectorAll('[data-pause-panel]')];
    button.addEventListener('click', () => this.toggle());
    resumeButton.addEventListener('click', () => this.close());
    for (const tab of this.tabs) {
      tab.addEventListener('click', () => this.selectTab(tab.dataset.pauseTab));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.code)) return;
        event.preventDefault();
        event.stopPropagation();
        const index = this.tabs.indexOf(tab);
        const next = event.code === 'Home' ? 0 : event.code === 'End' ? this.tabs.length - 1 :
          (index + (event.code === 'ArrowRight' ? 1 : -1) + this.tabs.length) % this.tabs.length;
        this.selectTab(this.tabs[next].dataset.pauseTab);
        this.tabs[next].focus();
      });
    }
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); this.close(); });
    dialog.addEventListener('close', () => this.onChange());
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && !event.repeat && this.canOpen()) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.toggle();
      }
    }, true);
  }
  get isOpen() { return this.dialog.open; }
  selectTab(id, notify = true) {
    if (!this.tabs.some((tab) => tab.dataset.pauseTab === id)) return;
    this.activeTab = id;
    for (const tab of this.tabs) {
      const selected = tab.dataset.pauseTab === id;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
    for (const panel of this.panels) panel.hidden = panel.dataset.pausePanel !== id;
    if (notify) this.onChange();
  }
  open(tab = 'map') {
    if (!this.canOpen()) return;
    this.selectTab(tab, false);
    if (!this.isOpen) this.dialog.showModal();
    this.onChange();
    this.tabs.find((item) => item.dataset.pauseTab === this.activeTab)?.focus();
  }
  close() {
    if (!this.isOpen) return;
    this.dialog.close();
    this.onChange();
  }
  toggle() { if (this.isOpen) this.close(); else this.open(); }
}
export { START_VIEW, PauseMenu };
