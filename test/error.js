it('Error asserts:', function(it){
  it('Runtime errors:', function(it){
    it('Error:', function(it){
      it.should(undefine).be.ok();
    });
  });

  it('.Error / .Error() asserts:', function(it){
    it('Okey:', function(it){
      it.should(Error()).be.Error;
    });

    it('Fail:', function(it){
      it.should().be.Error;
    });

    it('end.');
  });

  it('end.');
});