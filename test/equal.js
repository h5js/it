it('Assert equal:', function(it){
  it.log('okey asserts:');
  it.should(0).equal(0);
  it.should(0).not.equal(1);
  it.should(123).equal('123');
  it.should('123').equal(123);

  it.log('fail asserts:');
  it.should(0).equal(1);
  it.should(1).not.equal(1);
  it.should(123).not.equal('123');
  it.should('123').not.equal(123);

  it.log('end.');
});