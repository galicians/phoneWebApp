
'use strict';



describe('PhoneCat App', function() {

  describe('Phone list view', function() {

    beforeEach(function() {
      browser.get('app/index.html')
    })


    it('should filter the phone list as a user types into the search box', function() {

      var phoneList = element.all(by.repeater('phone in phones'))
      var query = element(by.model('query'))

      expect(phoneList.count()).toBe(20)

      query.sendKeys('nexus')
      expect(phoneList.count()).toBe(1)

      query.clear()
      query.sendKeys('motorola')
      expect(phoneList.count()).toBe(8)
    })

    it('should display the user input in the title instantly', function() {
      var query = element(by.model('query'))
      query.clear();
      expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

      query.sendKeys('nexus');
      expect(browser.getTitle()).toMatch(/Google Phone Gallery: nexus$/); 

    })


    it('should be possible to control phone order via the drop down select box', function() {

      var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'))
      var query = element(by.model('query'))

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText()
        })
      }

      query.sendKeys('tablet')

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ])

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ])
      
    })

    it('should render phone specific links', function() {
      var query = element(by.model('query'))

      query.sendKeys('nexus')

      element.all(by.css('.phones li a')).first().click()

      browser.getLocationAbsUrl().then(function(url) { 
      expect(url.split('#')[1]).toBe('/phones/nexus-s')
    })
  
  })
  })
})
