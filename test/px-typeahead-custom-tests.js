suite('<px-typeahead>', function (done) {
  let typeaheadEl;
  setup((done)=>{
    typeaheadEl = fixture('px-typeahead-fixture');
    flush(()=>{
      done();
    });
  });


  test('initializes correctly', ()=> {
    let valueEl = Polymer.dom(typeaheadEl.root).querySelector('input');
    assert.equal(valueEl.textContent, '');
  });

  test('shows 3 suggestions', (done)=> {
    let typeaheadInputEl = Polymer.dom(typeaheadEl.root).querySelector('input');
    MockInteractions.focus(typeaheadInputEl);
    typeaheadEl.inputValue = 'a';
    assert.equal(typeaheadEl.localCandidates.length, 3);
    async.until(
      ()=>{
        return !!Polymer.dom(typeaheadEl.root).querySelector('.dropdown__container');
      },
      (cb)=>{
        setTimeout(cb, 1000);
      },
      ()=>{
        let container = Polymer.dom(typeaheadEl.root).querySelector('.dropdown__container');
        let listItems = Polymer.dom(container).querySelectorAll('li');
        assert.equal(listItems.length, 3);
        done();
      }
    );
  });

  test('is disabled', ()=> {
    let disabledTypeaheadEl = fixture('typeaheadDisabled');
    let input = Polymer.dom(disabledTypeaheadEl.root).querySelector('input');
    assert.isTrue(input.disabled);
  });
});
