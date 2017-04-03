it('.equal() asserts:', function(it){
  it('Okey:', function(it){
    it.should(0).equal(0);
    it.should(0).not.equal(1);
    it.should(123).equal('123');
    it.should('123').equal(123);
  });

  it('Fail:', function(it){
    it.should(0).equal(1);
    it.should(1).not.equal(1);
    it.should(123).not.equal('123');
    it.should('123').not.equal(123);
  });

  it('end.');
});