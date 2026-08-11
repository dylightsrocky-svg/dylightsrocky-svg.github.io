(function () {
  var choices = {
    'Indoor IP20': { title: 'Indoor IP20 selected — HK / MINI / FL / RZ', link: '/series/hk-series/', button: 'View indoor IP20 solutions' },
    'Waterproof IP67': { title: 'Waterproof IP67 selected — HP / MW / H', link: '/series/hp-series/', button: 'View waterproof IP67 solutions' },
    'Ultra-thin': { title: 'Ultra-thin selected — MINI / CL', link: '/series/mini-series/', button: 'View ultra-thin solutions' },
    'Dimmable': { title: 'Dimmable selected — D / TR / HK', link: '/series/d-series/', button: 'View dimmable solutions' }
  };

  function choiceFromElement(element) {
    if (!element) return null;
    return choices[element.textContent.trim()] || null;
  }

  document.addEventListener('click', function (event) {
    var option = event.target.closest && event.target.closest('#ai .finder-options span');
    var choice = choiceFromElement(option);
    if (!choice) return;
    event.preventDefault();
    window.location.assign(choice.link);
  }, true);

  function initialiseFinder() {
    var section = document.querySelector('#ai');
    if (!section || section.dataset.finderReady === 'true') return;
    var options = section.querySelectorAll('.finder-options span');
    var mainButton = Array.from(section.querySelectorAll('a')).find(function (link) {
      return link.textContent.indexOf('Start smart selection') !== -1;
    });
    var recommendation = section.querySelector('.finder-result b, .finder-card div:last-child b');
    if (!mainButton || !options.length) return;
    section.dataset.finderReady = 'true';
    mainButton.href = '/quote/';

    options.forEach(function (option) {
      var name = option.textContent.trim();
      var choice = choices[name];
      if (!choice) return;
      option.setAttribute('role', 'button');
      option.setAttribute('tabindex', '0');
      option.setAttribute('aria-pressed', 'false');

      function selectChoice() {
        options.forEach(function (item) {
          item.classList.remove('is-selected');
          item.setAttribute('aria-pressed', 'false');
        });
        option.classList.add('is-selected');
        option.setAttribute('aria-pressed', 'true');
        if (recommendation) recommendation.textContent = choice.title;
        mainButton.href = choice.link;
        mainButton.innerHTML = choice.button + ' <b>↗</b>';
        window.location.href = choice.link;
      }

      option.addEventListener('click', selectChoice);
      option.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectChoice();
        }
      });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialiseFinder, { once: true });
  else initialiseFinder();
})();
