it('Callbacks:', function*(){
  it('Sync callback:', function(it){
    it.begin
    function main(value, callback) {
      return callback(value);
    }

    function handle(value) {
      it.should(value).equal(123);
      return value;
    }
    it.end
    it.should(main(123, handle)).equal(123);

    it.sum();
  });

  yield it('Async callback:', function* (it){
    yield it('waiting ...', function(it, done, to){
      it.begin
      setTimeout(to(function(value){
        it.should(value).equal(123);
        done(value);
      }), 500, 123);
      it.end
    });

    it.sum();
  });

  yield it('Async callback in time:', function* (it){
    yield it('waiting 1000ms ...', 1000, function(it, done, to){
      it.begin
      setTimeout(to(function(value){
        it.should(value).equal(123);
        done(value);
      }), 500, 123);
      it.end
    });

    it.sum();
  });

  yield it('Async callback timeout:', function* (it){
    yield it('waiting 500ms ...', 500, function(it, done, to){
      it.begin
      setTimeout(to(function(value){
        it.should(value).equal(123);
        done(value);
      }), 1000, 123);
      it.end
    });

    it.sum();
  });
});