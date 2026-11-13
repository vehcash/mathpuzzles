/* Cookie banner + settings dialog. Text is English here and translated by I18N.
   EU checklist: shown before anything optional is stored · "Reject" as prominent as "Accept" · no pre-ticked boxes ·
   granular choice · clear purpose of each cookie · easy to change or withdraw later · no tracking / third parties. */
(function (global) {
  'use strict';
  function build() {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
<section class="cookie-banner" id="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences" hidden>
  <div class="cb-text">
    <b>Cookies and local storage</b>
    <p>We only store your preferences on this device — your language, the board settings and the drawings the board has learned from you. No tracking, no advertising, no analytics, nothing is sent to anyone.</p>
  </div>
  <div class="cb-actions">
    <button class="cb-btn" data-c="reject">Reject optional</button>
    <button class="cb-btn" data-c="custom">Customise</button>
    <button class="cb-btn" data-c="accept">Accept all</button>
  </div>
</section>
<div class="cookie-modal" id="cookie-modal" hidden>
  <div class="cm-card" role="dialog" aria-modal="true" aria-label="Cookie settings">
    <button class="cm-close" aria-label="Close">×</button>
    <h3>Cookie settings</h3>
    <p class="cm-intro">Choose what this site may store on your device. You can change this at any time from the “Cookies” link.</p>
    <div class="cm-cat">
      <div class="cm-row"><b>Strictly necessary</b><span class="cm-always">Always on</span></div>
      <p>Remembers the choice you make in this dialog, so we don’t ask again. Stored for 6 months.</p>
    </div>
    <div class="cm-cat">
      <label class="cm-row"><b>Preferences</b><span class="switch"><input type="checkbox" id="cm-pref"><span class="track"></span></span></label>
      <p>Remembers your language, when the board should ask what you drew, the drawings it has learned from your answers, and your recent equations. Stored for 6 months. If you switch this off, everything already stored is deleted.</p>
    </div>
    <div class="cm-cat muted">
      <div class="cm-row"><b>Statistics and marketing</b><span class="cm-always">Not used</span></div>
      <p>This site does not use analytics, advertising or tracking cookies, and loads no third-party content. The “Ask an AI” buttons only open another site when you click them. The optional local AI tutor downloads its model from Hugging Face and GitHub only when you switch it on; after that it runs on your own device and nothing you type is sent anywhere.</p>
    </div>
    <div class="cm-actions">
      <button class="cb-btn" data-c="reject">Reject optional</button>
      <button class="cb-btn" data-c="save">Save my choices</button>
      <button class="cb-btn" data-c="accept">Accept all</button>
    </div>
  </div>
</div>`;
    document.body.appendChild(wrap);
    const banner = document.getElementById('cookie-banner'), modal = document.getElementById('cookie-modal'), pref = document.getElementById('cm-pref');
    const done = () => { banner.hidden = true; modal.hidden = true; };
    const act = c => {
      if (c === 'accept') { Consent.set({ preferences: true }); done(); }
      if (c === 'reject') { Consent.set({ preferences: false }); done(); }
      if (c === 'save') { Consent.set({ preferences: pref.checked }); done(); }
      if (c === 'custom') openSettings();
    };
    wrap.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => act(b.dataset.c)));
    modal.querySelector('.cm-close').onclick = () => { modal.hidden = true; if (!Consent.decided()) banner.hidden = false; };
    modal.addEventListener('click', e => { if (e.target === modal) modal.querySelector('.cm-close').click(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) modal.querySelector('.cm-close').click(); });
    function openSettings() { pref.checked = Consent.allows('preferences'); banner.hidden = true; modal.hidden = false; pref.focus(); }
    if (!Consent.decided()) banner.hidden = false;
    return { openSettings };
  }
  let ui = null;
  global.CookieUI = {
    init() { ui = build(); document.querySelectorAll('[data-cookie-settings]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); ui.openSettings(); })); },
    open() { ui && ui.openSettings(); }
  };
})(window);
