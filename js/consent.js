/* Consent + storage — EU ePrivacy / GDPR friendly.
   • Nothing optional is stored until the visitor agrees ("preferences" category). No analytics, no ads, no third parties.
   • The consent record itself is strictly necessary and is always kept (so we don't ask on every visit).
   • "Reject" is as easy as "Accept"; choices can be changed or withdrawn any time ("Cookie settings").
   • Withdrawing consent deletes the stored preferences.
   • Small values (language, settings) live in cookies; larger ones (learned drawings, recent equations) in localStorage.
     Opened as a local file (file://) browsers block cookies, so localStorage is used instead — same consent rules. */
(function (global) {
  'use strict';
  const CONSENT_KEY = 'cp_consent', VERSION = 1, DAYS = 180;
  const PREF_COOKIES = ['cp_lang', 'cp_askmode'];
  const PREF_LOCAL = ['chalkproof.intents.v1', 'chalkproof.recent', 'cp_lang', 'cp_askmode', 'chalkproof.askmode.v1'];

  // ---- low-level cookie / local helpers ----
  const cookiesWork = (() => { try { if (location.protocol === 'file:') return false; document.cookie = 'cp_t=1; path=/; SameSite=Lax'; const ok = document.cookie.indexOf('cp_t=1') >= 0; document.cookie = 'cp_t=; path=/; max-age=0'; return ok; } catch (e) { return false; } })();
  function readCookie(k) { const m = document.cookie.match('(?:^|; )' + k.replace(/[.$?*|{}()[\]\\/+^]/g, '\\$&') + '=([^;]*)'); return m ? decodeURIComponent(m[1]) : null; }
  function writeCookie(k, v, days) { document.cookie = k + '=' + encodeURIComponent(v) + '; path=/; max-age=' + Math.round(days * 86400) + '; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : ''); }
  function deleteCookie(k) { document.cookie = k + '=; path=/; max-age=0; SameSite=Lax'; }
  const local = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage blocked */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* */ } }
  };
  // necessary storage (the consent record only)
  const necessary = {
    get(k) { return cookiesWork ? readCookie(k) : local.get(k); },
    set(k, v) { if (cookiesWork) writeCookie(k, v, DAYS); else local.set(k, v); }
  };

  // ---- consent state ----
  let state = null;
  try { const raw = necessary.get(CONSENT_KEY); const s = raw && JSON.parse(raw); if (s && s.v === VERSION && Date.now() - s.ts < DAYS * 86400000) state = s; } catch (e) { state = null; }
  const memory = {};               // used while preferences are not allowed (lost when the tab closes)
  const listeners = [];

  const Consent = {
    decided: () => !!state,
    allows: cat => cat === 'necessary' || !!(state && state[cat]),
    get: () => (state ? Object.assign({}, state) : null),
    onChange(fn) { listeners.push(fn); },
    set(prefs) {
      const before = Consent.allows('preferences');
      state = { v: VERSION, ts: Date.now(), preferences: !!prefs.preferences };
      necessary.set(CONSENT_KEY, JSON.stringify(state));
      if (state.preferences && !before) Object.keys(memory).forEach(k => Store.set(k, memory[k])); // keep what was chosen this visit
      if (!state.preferences) Store.purge();
      listeners.forEach(fn => { try { fn(state); } catch (e) { /* */ } });
    },
    cookiesWork
  };

  /** Preference storage: persisted only with consent, otherwise kept for this visit only. */
  const Store = {
    get(k) {
      if (k in memory) return memory[k];
      if (!Consent.allows('preferences')) return null;
      if (PREF_COOKIES.includes(k) && cookiesWork) { const c = readCookie(k); if (c !== null) return c; }
      return local.get(k);
    },
    set(k, v) {
      memory[k] = v;
      if (!Consent.allows('preferences')) return;
      if (PREF_COOKIES.includes(k) && cookiesWork) writeCookie(k, v, DAYS); else local.set(k, v);
    },
    getJSON(k, dflt) { try { const v = Store.get(k); return v ? JSON.parse(v) : dflt; } catch (e) { return dflt; } },
    setJSON(k, v) { Store.set(k, JSON.stringify(v)); },
    purge() { PREF_COOKIES.forEach(deleteCookie); PREF_LOCAL.forEach(local.del); }
  };

  global.Consent = Consent;
  global.Store = Store;
})(window);
