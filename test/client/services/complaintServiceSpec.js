describe('services', function () {
  var $httpBackend, result

  beforeEach(module('juiceShop'))
  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend')
    $httpBackend.whenGET(/\/i18n\/.*\.json/).respond(200, {})
    result = undefined
  }))

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation()
  })

  describe('ComplaintService', function () {
    it('should be defined', inject(function (ComplaintService) {
      expect(ComplaintService).toBeDefined()
      expect(ComplaintService.save).toBeDefined()
    }))

    it('should create complaint directly via the rest api', inject(function (ComplaintService) {
      $httpBackend.whenPOST('/api/Complaints/').respond(200, { data: 'apiResponse' })

      ComplaintService.save().then(function (data) { result = data })
      $httpBackend.flush()

      expect(result).toBe('apiResponse')
    }))
  })
})
