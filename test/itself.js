it('it self:', function*(it){
  yield it('it properties:', function*(it){
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

  yield it('it(ms) with source code:', function*(){
    it.begin
    var x = 123, y;
    yield it(0);
    it.end;

    it.should(x).equal(123);

    it.begin
    x = 123;
    y = 456;
    it.end
    it.should(y).equal(456);
  });
});