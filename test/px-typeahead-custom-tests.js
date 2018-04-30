/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

  test('clears when the icon is pressed', (done)=> {
    typeaheadEl.inputValue = 'abc';
    flush(()=>{
      let clear = Polymer.dom(typeaheadEl.root).querySelector('#clear__icon');
      clear.click();
      assert.equal(typeaheadEl.value, '');
      assert.equal(typeaheadEl.inputValue, '');
      done();
    });
  });

  test('is disabled', ()=> {
    let disabledTypeaheadEl = fixture('typeaheadDisabled');
    let input = Polymer.dom(disabledTypeaheadEl.root).querySelector('input');
    assert.isTrue(input.disabled);
  });
});
