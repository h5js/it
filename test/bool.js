it('Boolean asserts:', function* (it){
  it('true asserts:', function(it){
    it.log('okey asserts:');
    it.should(1).be.true;
    it.should(0).not.be.true;

    it.log('fail asserts:');
    it.should(0).be.true;
    it.should(1).not.be.true;

    it.log('end of true asserts.');
  });
});