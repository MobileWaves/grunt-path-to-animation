var path = require('./path');
var css = require('./css');

var brain = {
  generateCss: function(input, namespace, elementWidth, elementHeight, mixinName) {
    return Object.keys(input).map(function(itemName) {
      var nestedPath = path.nest(input[itemName]);
      var interpolatedPath = path.interpolate(nestedPath);
      var pathWithPercentages = path.toPercentages(interpolatedPath, elementWidth, elementHeight);
      var keyframesValues = css.createKeyframes(pathWithPercentages);
      var cssKeyframes = css.generateCssKeyframes(keyframesValues, namespace, itemName);
      var cssClass = css.generateCssClass(namespace, itemName, mixinName);
      return cssKeyframes + cssClass;
    }).join('\n');
  }
};

module.exports = brain;