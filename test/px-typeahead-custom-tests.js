// This is the wrapper for custom tests, called upon web components ready state

function fireKeyboardEvent(elem, key){
  var evt = new CustomEvent('keyup',{detail:{'key':key,'keyIdentifier':key}});
   elem.dispatchEvent(evt);
}
function fireInputEvent(elem){
  var evt = new CustomEvent('input',{target:elem});
   elem.dispatchEvent(evt);
}

function fireFocusEvent(elem){
  var evt = new CustomEvent('focus');
   elem.dispatchEvent(evt);
}

function runCustomTests() {

  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for px-typeahead', function() {

    test('Check initial state of px-typeahead', function(done){
      var El = Polymer.dom(document).querySelector('px-typeahead'),
          ValueEl = Polymer.dom(El.root).querySelector('input');
      assert.equal(ValueEl.textContent, '');
      done();
    });

    test('Making sure that px-typeahead shows suggestions', function(done){
          var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
              container = Polymer.dom(typeaheadEl.root).querySelector('.dropdown__container'),
              typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');

          var onKeyupHandle = function(e) {
            assert.isTrue(!container);
          };
          fireFocusEvent(typeaheadInputEl);
          typeaheadInputEl.value = 'a';
          fireInputEvent(typeaheadInputEl);

          flush(() => {
            setTimeout(function() {
              var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
                  container = Polymer.dom(typeaheadEl.root).querySelector('.dropdown__container'),
                  typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
              assert.isNotNull(container,'container exists');
              done();
            }.bind(this),100);
          });
      });

      test('Making sure based on input provided - typeahead shows 3 suggestions', function(done){

          var onKeyupHandle = function(e) {
            var container = Polymer.dom(this.root).querySelector('.dropdown__container');
            assert.isTrue(!container);
          };
          var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
              typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
          typeaheadInputEl.value = 'a';
          fireInputEvent(typeaheadInputEl);

          flush(() => {
              setTimeout(function() {
              var typeaheadEl = Polymer.dom(document).querySelector('px-typeahead'),
                  container = Polymer.dom(typeaheadEl.root).querySelector('.dropdown__container'),
                  typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');

              expect(Polymer.dom(container).querySelectorAll('li').length).to.equal(3);

              done();
            }.bind(this),100);
          });
      });

      test('Ensure disabled feature works', function(done){
        var px_typeahead = document.querySelector('#px_typeahead_2'),
            input = Polymer.dom(px_typeahead.root).querySelector('input');

        assert.isTrue(input.disabled);

        done();
      });
  });
};
