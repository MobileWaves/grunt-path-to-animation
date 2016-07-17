var path = require('./path');
var css = require('./css');

var brain = {
  generateCss: function(input, namespace, elementWidth, elementHeight) {
    return Object.keys(input).map(function(itemName) {
      var nestedPath = path.nest(input[itemName]);
      var pathWithPercentages = path.toPercentages(nestedPath, elementWidth, elementHeight);
      var keyframesValues = css.createKeyframes(pathWithPercentages);
      var cssKeyframes = css.generateCssKeyframes(keyframesValues, namespace, itemName);
      var cssClass = css.generateCssClass(namespace, itemName, 'animationName');
      return cssKeyframes + cssClass;
    }).join('\n');
  }
};

module.exports = brain;