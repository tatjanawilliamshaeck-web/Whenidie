/**
 * DaisyProgress – reusable progress component
 * Inputs: total, completed, variant ("hero" | "compact" | "chapter"), label?
 * Uses: assets/petal-empty.svg, assets/petal-filled.svg
 */
(function (global) {
  var PETAL_COUNT = 8;
  var ANIMATION_DURATION_MS = 250;
  var _lastCompletedByContainer = {};

  function escapeHtml(str) {
    if (str == null) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getFilledPetals(total, completed, petalCount) {
    var count = petalCount != null ? petalCount : PETAL_COUNT;
    if (total <= 0) return 0;
    if (count <= 0) return 0;
    return Math.min(count, Math.round((completed / total) * count));
  }

  function getAriaLabel(completed, total) {
    return completed + ' of ' + total + ' questions completed';
  }

  /**
   * Render DaisyProgress HTML
   * @param {Object} props
   * @param {number} props.total
   * @param {number} props.completed
   * @param {"hero"|"compact"|"chapter"} props.variant
   * @param {string} [props.label]
   * @param {string} [props.assetBase] e.g. "../assets/" or "assets/"
   * @param {number} [props.petalCount] for compact: number of petals (e.g. one per question)
   */
  function render(props) {
    var total = props.total != null ? props.total : 0;
    var completed = props.completed != null ? props.completed : 0;
    var variant = props.variant === 'hero' || props.variant === 'compact' || props.variant === 'chapter' ? props.variant : 'compact';
    var label = props.label;
    var assetBase = props.assetBase != null ? props.assetBase : 'assets/';
    var petalCount = props.petalCount != null ? Math.min(12, Math.max(1, Math.round(props.petalCount))) : PETAL_COUNT;
    if (assetBase.length && assetBase.charAt(assetBase.length - 1) !== '/') assetBase += '/';

    var count = variant === 'compact' ? petalCount : PETAL_COUNT;
    var filled = variant === 'compact'
      ? Math.min(count, completed)
      : getFilledPetals(total, completed, PETAL_COUNT);
    var emptySrc = assetBase + 'petal-empty.svg';
    var filledSrc = assetBase + 'petal-filled.svg';
    var ariaLabel = getAriaLabel(completed, total);

    var petalsHtml = '';
    for (var i = 0; i < count; i++) {
      var isFilled = i < filled;
      var src = isFilled ? filledSrc : emptySrc;
      var cls = 'daisy-petal' + (isFilled ? ' daisy-petal--filled' : '');
      petalsHtml += '<span class="' + cls + '"><img src="' + escapeHtml(src) + '" alt="" width="24" height="12" /></span>';
    }

    var labelHtml = '';
    if (label && (variant === 'chapter' || variant === 'hero')) {
      labelHtml = '<p class="daisy-progress__label">' + escapeHtml(label) + '</p>';
    }

    var rootClass = 'daisy-progress daisy-progress--' + variant;
    var inner = variant === 'compact'
      ? '<div class="daisy-progress__row">' + petalsHtml + '</div>'
      : '<div class="daisy-progress__petals">' + petalsHtml + '</div>';

    return '<div class="' + rootClass + '" role="progressbar" aria-valuenow="' + completed + '" aria-valuemin="0" aria-valuemax="' + total + '" aria-label="' + escapeHtml(ariaLabel) + '" title="' + escapeHtml(ariaLabel) + '">' + inner + labelHtml + '</div>';
  }

  /**
   * Mount or update DaisyProgress in a container. On increment, animates newly filled petals (250ms).
   * @param {Element} container
   * @param {Object} props same as render()
   */
  function update(container, props) {
    if (!container) return;
    var total = props.total != null ? props.total : 0;
    var completed = props.completed != null ? props.completed : 0;
    var variant = props.variant === 'hero' || props.variant === 'compact' || props.variant === 'chapter' ? props.variant : 'compact';
    var petalCount = props.petalCount != null ? Math.min(12, Math.max(1, Math.round(props.petalCount))) : PETAL_COUNT;
    var count = variant === 'compact' ? petalCount : PETAL_COUNT;
    var filled = variant === 'compact' ? Math.min(count, completed) : getFilledPetals(total, completed, PETAL_COUNT);
    var prevFilled = _lastCompletedByContainer[container];
    var isFirstMount = prevFilled === undefined;
    _lastCompletedByContainer[container] = filled;

    container.innerHTML = render(props);
    container.setAttribute('data-daisy-last-filled', String(filled));

    if (!isFirstMount && filled > prevFilled) {
      var petals = container.querySelectorAll('.daisy-petal--filled');
      for (var i = prevFilled; i < filled && i < petals.length; i++) {
        petals[i].classList.add('daisy-petal--just-filled');
      }
      setTimeout(function () {
        container.querySelectorAll('.daisy-petal--just-filled').forEach(function (p) {
          p.classList.remove('daisy-petal--just-filled');
        });
      }, ANIMATION_DURATION_MS);
    }
  }

  global.DaisyProgress = {
    render: render,
    update: update,
    getFilledPetals: getFilledPetals,
    getAriaLabel: getAriaLabel,
    PETAL_COUNT: PETAL_COUNT
  };
})(typeof window !== 'undefined' ? window : this);
