export default function ({ types: t }) {
  const prototypePropertyName = "property";
  const replaceWith = "Ember.computed";

  /** 
   * Traverse through all call expressions and transform given prototype property name into given function
   */
  return {
    visitor: {
      CallExpression: function (path) {
        // function(){}.property
        const isCalledByIdentifier = t.isIdentifier(path.node.callee.property, { name: prototypePropertyName });
        // function(){}['property']
        const isCalledByLiteral = t.isLiteral(path.node.callee.property, { value: prototypePropertyName });

        const shouldTransform = isCalledByLiteral || isCalledByIdentifier;

        if (shouldTransform) {
          path.replaceWith(t.callExpression(
            t.identifier(replaceWith),
            [...path.node.arguments, path.node.callee.object]
          ));
        }
      }
    }
  };
}
