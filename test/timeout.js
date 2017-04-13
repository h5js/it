it('Timeouts:', function*(it){
  it('Sync timeout:', 20, function(it){
    for(var i=0; i<10; i++) {
      it('Sync sub timeout:', 5, function (it) {
        for (var i = 0; i < 100; i++) {
          for(var tick = Date.now(); Date.now()===tick;);
          it('running ' + i);
        }
      });
    }
  });

  yield it('Async timeout:', 20, function* (it){
    for(var i=0; i<10; i++) {
      yield it('Async sub timeout:', 5, function* (it) {
        for (var i = 0; i < 100; i++) {
          for(var tick = Date.now(); Date.now()===tick;);
          yield it('running ' + i);
        }
      });
    }
  });
});