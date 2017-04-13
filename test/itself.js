it('it self:', function*(it){
  it.should(it).be.function();
  it.should(it()).be.Promise();
  it.should(it(undefined)).be.undefined();
  it.should(it(null)).be.null();
  it.should(it(true)).be.true();
  it.should(it(false)).be.false();
  it.should(it(0)).be.Promise();
  it.should(yield it(0,'OK')).equal('OK');
  it.should(it.should).be.function();
  it.should(it.sum).be.function();
  it.sum();
});