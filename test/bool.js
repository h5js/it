it('Boolean asserts:', function* (it){
  it('.true / .true() asserts:', function(it){
    it('Okey:', function(it){
      it.should(true).be.true;

      it.should().not.be.true;
      it.should(null).not.be.true;
      it.should(false).not.be.true;
      it.should(0).not.be.true;
      it.should(1).not.be.true;
      it.should('').not.be.true;
      it.should('abc').not.be.true;
      it.should({}).not.be.true;

      it.should(true).be.true();

      it.should().not.be.true();
      it.should(null).not.be.true();
      it.should(false).not.be.true();
      it.should(0).not.be.true();
      it.should(1).not.be.true();
      it.should('').not.be.true();
      it.should('abc').not.be.true();
      it.should({}).not.be.true();
    });

    it('Fail:', function(it){
      it.should(true).not.be.true;

      it.should().be.true;
      it.should(null).be.true;
      it.should(false).be.true;
      it.should(0).be.true;
      it.should(1).be.true;
      it.should('').be.true;
      it.should('abc').be.true;
      it.should({}).be.true;

      it.should(true).not.be.true();

      it.should().be.true();
      it.should(null).be.true();
      it.should(false).be.true();
      it.should(0).be.true();
      it.should(1).be.true();
      it.should('').be.true();
      it.should('abc').be.true();
      it.should({}).be.true();
    });

    it('end.');
  });

  it('.false / .false() asserts:', function(it){
    it('Okey:', function(it){
      it.should(false).be.false;

      it.should().not.be.false;
      it.should(null).not.be.false;
      it.should(true).not.be.false;
      it.should(0).not.be.false;
      it.should(1).not.be.false;
      it.should('').not.be.false;
      it.should('abc').not.be.false;
      it.should({}).not.be.false;

      it.should(false).be.false();

      it.should().not.be.false();
      it.should(null).not.be.false();
      it.should(true).not.be.false();
      it.should(0).not.be.false();
      it.should(1).not.be.false();
      it.should('').not.be.false();
      it.should('abc').not.be.false();
      it.should({}).not.be.false();
    });

    it('Fail:', function(it){
      it.should(false).not.be.false;

      it.should().be.false;
      it.should(null).be.false;
      it.should(true).be.false;
      it.should(0).be.false;
      it.should(1).be.false;
      it.should('').be.false;
      it.should('abc').be.false;
      it.should({}).be.false;

      it.should(false).not.be.false();

      it.should().be.false();
      it.should(null).be.false();
      it.should(true).be.false();
      it.should(0).be.false();
      it.should(1).be.false();
      it.should('').be.false();
      it.should('abc').be.false();
      it.should({}).be.false();
    });

    it('end.');
  });

  it('.ok / .ok() asserts:', function(it){
    it('Okey:', function(it){
      it.should(true).be.ok;
      it.should(123).be.ok;
      it.should('abc').be.ok;
      it.should(Symbol()).be.ok;
      it.should({}).be.ok;

      it.should().not.be.ok;
      it.should(null).not.be.ok;
      it.should(false).not.be.ok;
      it.should(0).not.be.ok;
      it.should(NaN).not.be.ok;
      it.should('').not.be.ok;

      it.should(true).be.ok();
      it.should(123).be.ok();
      it.should('abc').be.ok();
      it.should(Symbol()).be.ok();
      it.should({}).be.ok();

      it.should().not.be.ok();
      it.should(null).not.be.ok();
      it.should(false).not.be.ok();
      it.should(0).not.be.ok();
      it.should(NaN).not.be.ok();
      it.should('').not.be.ok();

    });

    it('Fail:', function(it){
      it.should(true).not.be.ok;
      it.should(123).not.be.ok;
      it.should('abc').not.be.ok;
      it.should(Symbol()).not.be.ok;
      it.should({}).not.be.ok;

      it.should().be.ok;
      it.should(null).be.ok;
      it.should(false).be.ok;
      it.should(0).be.ok;
      it.should(NaN).be.ok;
      it.should('').be.ok;

      it.should(true).not.be.ok();
      it.should(123).not.be.ok();
      it.should('abc').not.be.ok();
      it.should(Symbol()).not.be.ok();
      it.should({}).not.be.ok();

      it.should().be.ok();
      it.should(null).be.ok();
      it.should(false).be.ok();
      it.should(0).be.ok();
      it.should(NaN).be.ok();
      it.should('').be.ok();

    });

    it('end.');
  });

  it('end.');
});