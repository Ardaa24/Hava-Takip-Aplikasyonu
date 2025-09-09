(function () {
    var loader = document.getElementById('loader');
    if (!loader) return;

    var htmlEl = document.documentElement;
    var bodyEl = document.body;
    htmlEl.classList.add('loading');
    bodyEl.classList.add('loading');

    //
    var labelEl = loader.querySelector('.loader-label');
    if (labelEl) {
        var fullText = 'Yükleniyor…';
        var current = '';
        var idx = 0;
        var TYPE_SPEED_MS = 85;
        labelEl.textContent = '';
        labelEl.classList.add('typing');
        (function typeNext() {
            if (idx < fullText.length) {
                current += fullText.charAt(idx);
                labelEl.textContent = current;
                idx += 1;
                setTimeout(typeNext, TYPE_SPEED_MS);
            } else {
              
            }
        })();
    }

    var MIN_VISIBLE_MS = 2000;
    var start = Date.now();

    function minDelay() {
        var elapsed = Date.now() - start;
        var remain = Math.max(0, MIN_VISIBLE_MS - elapsed);
        return new Promise(function (resolve) { setTimeout(resolve, remain); });
    }

    function on(eventTarget, event) {
        return new Promise(function (resolve) {
            if (event === 'DOMContentLoaded') {
                if (document.readyState === 'interactive' || document.readyState === 'complete') return resolve();
            }
            if (event === 'load') {
                if (document.readyState === 'complete') return resolve();
            }
            eventTarget.addEventListener(event, function handler() {
                eventTarget.removeEventListener(event, handler);
                resolve();
            });
        });
    }

    function hideLoader() {
        if (!loader) return;
        loader.classList.add('is-hidden');
        htmlEl.classList.remove('loading');
        bodyEl.classList.remove('loading');
        
        loader.addEventListener('transitionend', function cleanup() {
            loader.removeEventListener('transitionend', cleanup);
            if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        });
    }

  
    var safetyTimeout = setTimeout(function () {
        minDelay().then(hideLoader);
    }, 8000);

    Promise.all([
        on(document, 'DOMContentLoaded'),
        on(window, 'load'),
        minDelay()
    ]).then(function () {
        clearTimeout(safetyTimeout);
        hideLoader();
    }).catch(function () {
        clearTimeout(safetyTimeout);
        hideLoader();
    });
})();



