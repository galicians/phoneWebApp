
'use strict';



describe('PhoneCat App', function() {

  describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index.html')
    })


    it('should filter the phone list as a user types into the search box', function() {

      var phoneList = element.all(by.repeater('phone in phones'))
      var query = element(by.model('query'))

      expect(phoneList.count()).toBe(3)

      query.sendKeys('nexus')
      expect(phoneList.count()).toBe(1)

      query.clear()
      query.sendKeys('motorola')
      expect(phoneList.count()).toBe(2)
    })

    it('should displey the user input in the title instantly', function() {
      var query = element(by.model('query'))
      query.clear();
      expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

      query.sendKeys('nexus');
      expect(browser.getTitle()).toMatch(/Google Phone Gallery: nexus$/); 

    })
    
  })
})
