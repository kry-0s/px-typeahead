suite('<px-typeahead>', function () {

  test('initializes correctly', function (done) {
    var typeaheadEl = fixture('typeahead'),
        ValueEl = Polymer.dom(typeaheadEl.root).querySelector('input');
    assert.equal(ValueEl.textContent, '');
    done();
  });

  test('shows 3 suggestions', function (done) {
    var typeaheadEl = fixture('typeahead'),
        container = Polymer.dom(typeaheadEl.root).querySelector('.dropdown__container'),
        typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
    var onKeyupHandle = function (e) {
      assert.isTrue(!container);
    };
    var evt = new CustomEvent('focus');
    typeaheadInputEl.dispatchEvent(evt);
    typeaheadInputEl.value = 'a';
    evt = new CustomEvent('input', { target: typeaheadInputEl });
    typeaheadInputEl.dispatchEvent(evt);

    flush(() => {
      setTimeout(function () {
        var container = Polymer.dom(typeaheadEl.root).querySelector('.dropdown__container'),
            typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
        assert.isNotNull(container, 'container exists');
        assert.equal(Polymer.dom(container).querySelectorAll('li').length, 3);
        done();
      }.bind(this), 100);
    });
  });

  test('is disabled', function () {
    var px_typeahead = fixture('typeaheadDisabled'),
        input = Polymer.dom(px_typeahead.root).querySelector('input');
    assert.isTrue(input.disabled);
  });
});
