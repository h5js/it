it('Error asserts:', function(it){
  it('Runtime errors:', function(it){
    it('Error:', function(it){
      it.should(undefine).be.ok();
    });
  });

  it('.Error / .Error() asserts:', function(it){
    it('Okey:', function(it){
      it.should(Error()).be.Error;
      it.should().not.be.Error;
      it.should(null).not.be.Error;
      it.should(true).not.be.Error;
      it.should(false).not.be.Error;
      it.should(0).not.be.Error;
      it.should(123).not.be.Error;
      it.should('').not.be.Error;
      it.should('error').not.be.Error;
      it.should(Symbol()).not.be.Error;
      it.should({}).not.be.Error;
      it.should(Error()).be.Error();
      it.should().not.be.Error();
      it.should(null).not.be.Error();
      it.should(true).not.be.Error();
      it.should(false).not.be.Error();
      it.should(0).not.be.Error();
      it.should(123).not.be.Error();
      it.should('').not.be.Error();
      it.should('error').not.be.Error();
      it.should(Symbol()).not.be.Error();
      it.should({}).not.be.Error();
      it.should({}).not.be.Err;
      it.sum();
    });

    it('Fail:', function(it){
      it.should(Error()).not.be.Error;
      it.should().be.Error;
      it.should(null).be.Error;
      it.should(true).be.Error;
      it.should(false).be.Error;
      it.should(0).be.Error;
      it.should(123).be.Error;
      it.should('').be.Error;
      it.should('error').be.Error;
      it.should(Symbol()).be.Error;
      it.should({}).be.Error;
      it.should(Error()).not.be.Error();
      it.should().be.Error();
      it.should(null).be.Error();
      it.should(true).be.Error();
      it.should(false).be.Error();
      it.should(0).be.Error();
      it.should(123).be.Error();
      it.should('').be.Error();
      it.should('error').be.Error();
      it.should(Symbol()).be.Error();
      it.should({}).be.Error();
      it.sum();
    });

  });

  it.sum();
});