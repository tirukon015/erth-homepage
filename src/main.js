/**
 * ERTH homepage behaviour.
 *
 * v14 drove the page from a small React-like render loop that rewrote inline
 * styles on every state change. The same behaviour is reproduced here without a
 * framework: state lives on the DOM (`hidden`, `aria-expanded`, a couple of
 * classes) and CSS decides what that state looks like. Layout that v14 derived
 * from `window.innerWidth` is now a media query, so nothing here runs before
 * the page is painted correctly.
 */

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ------------------------------------------------------------------ header */

function initHeader() {
  const header = $('.site-header');
  if (!header) return;

  let ticking = false;
  const sync = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sync);
    },
    { passive: true }
  );
  sync();
}

/* --------------------------------------------------------- nav dropdowns */

function initDropdowns() {
  const groups = $$('.nav-dropdown');
  if (!groups.length) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  const setOpen = (group, open) => {
    $('.nav-dropdown__trigger', group).setAttribute('aria-expanded', String(open));
    $('.nav-dropdown__menu', group).classList.toggle('is-open', open);
  };
  const closeAll = (except) => groups.forEach((group) => group !== except && setOpen(group, false));

  groups.forEach((group) => {
    const trigger = $('.nav-dropdown__trigger', group);

    trigger.addEventListener('click', () => {
      // Pointer users get the panel on hover, so a click while hovering means
      // "open it", never "close what I am pointing at". Keyboard and touch —
      // where there is no hover — get a plain toggle.
      const hovering = canHover.matches && group.matches(':hover');
      const open = hovering || trigger.getAttribute('aria-expanded') !== 'true';
      closeAll(group);
      setOpen(group, open);
    });

    group.addEventListener('mouseenter', () => {
      if (!canHover.matches) return;
      closeAll(group);
      setOpen(group, true);
    });
    group.addEventListener('mouseleave', () => {
      if (canHover.matches) setOpen(group, false);
    });

    // Closing on focusout keeps the panel from lingering after a tab-through.
    group.addEventListener('focusout', (event) => {
      if (!group.contains(event.relatedTarget)) setOpen(group, false);
    });

    group.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      setOpen(group, false);
      trigger.focus();
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-dropdown')) closeAll();
  });
}

/* ------------------------------------------------------------- dialogs */

/**
 * Shared open/close plumbing for the mobile menu and the booking dialog: body
 * scroll lock, Escape to dismiss, focus moved in and restored on the way out,
 * and Tab kept inside while open.
 */
function createDialog(element, { onOpen } = {}) {
  let lastFocused = null;

  const isOpen = () => !element.hidden;

  const open = () => {
    if (isOpen()) return;
    lastFocused = document.activeElement;
    element.hidden = false;
    document.body.classList.add('is-locked');
    onOpen?.();
    ($(FOCUSABLE, element) ?? element).focus();
  };

  const close = () => {
    if (!isOpen()) return;
    element.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocused instanceof HTMLElement) lastFocused.focus();
  };

  element.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      close();
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = $$(FOCUSABLE, element).filter((node) => node.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  return { open, close, isOpen };
}

/* ------------------------------------------------------------ disclosures */

function toggleDisclosure(trigger) {
  const panel = document.getElementById(trigger.getAttribute('aria-controls'));
  if (!panel) return;

  const expanded = trigger.getAttribute('aria-expanded') !== 'true';
  trigger.setAttribute('aria-expanded', String(expanded));
  panel.hidden = !expanded;

  const label = $('[data-label-collapsed]', trigger);
  if (label) {
    label.textContent = expanded ? label.dataset.labelExpanded : label.dataset.labelCollapsed;
  }
}

/* ----------------------------------------------------------------- wiring */

function init() {
  initHeader();
  initDropdowns();

  const menuElement = $('#mobile-menu');
  const burger = $('[data-action="toggle-menu"]');
  const menu =
    menuElement &&
    createDialog(menuElement, {
      onOpen: () => burger?.setAttribute('aria-expanded', 'true')
    });

  const closeMenu = () => {
    menu?.close();
    burger?.setAttribute('aria-expanded', 'false');
  };

  const bookingElement = $('#booking-dialog');
  const booking = bookingElement && createDialog(bookingElement);

  bookingElement?.addEventListener('click', (event) => {
    // Clicking the backdrop — but not the panel sitting on it — dismisses.
    if (event.target === bookingElement) booking.close();
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action]');
    if (!trigger) return;

    switch (trigger.dataset.action) {
      case 'toggle-menu':
        if (menu?.isOpen()) closeMenu();
        else menu?.open();
        break;
      case 'close-menu':
        closeMenu();
        break;
      case 'open-booking':
        closeMenu();
        booking?.open();
        break;
      case 'close-booking':
        booking?.close();
        break;
      case 'toggle-working-rates':
      case 'toggle-terms':
        toggleDisclosure(trigger);
        break;
      default:
        break;
    }
  });

  // Crossing back to the desktop breakpoint hides the burger, so the menu it
  // opened has to go with it.
  window.matchMedia('(min-width: 1080px)').addEventListener('change', (event) => {
    if (event.matches) closeMenu();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
