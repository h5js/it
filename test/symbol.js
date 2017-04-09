it('Symbol asserts:', function(it){
  it('.symbol / .symbol() asserts:', function(it){
    it('Okey:', function(it){
      it.should(Symbol()).be.symbol;
      it.should(Symbol('foo')).be.symbol;
      it.should(Symbol.iterator).be.symbol;
      it.should().not.be.symbol;
      it.should('').not.be.symbol;
      it.should('abc').not.be.symbol;
      it.should({}).not.be.symbol;
      it.should(Symbol()).be.symbol();
      it.should(Symbol('foo')).be.symbol();
      it.should(Symbol.iterator).be.symbol();
      it.should().not.be.symbol();
      it.should('').not.be.symbol();
      it.should('abc').not.be.symbol();
      it.should({}).not.be.symbol();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(Symbol()).not.be.symbol;
      it.should(Symbol('foo')).not.be.symbol;
      it.should(Symbol.iterator).not.be.symbol;
      it.should().be.symbol;
      it.should('').be.symbol;
      it.should('abc').be.symbol;
      it.should({}).be.symbol;
      it.should(Symbol()).not.be.symbol();
      it.should(Symbol('foo')).not.be.symbol();
      it.should(Symbol.iterator).not.be.symbol();
      it.should().be.symbol();
      it.should('').be.symbol();
      it.should('abc').be.symbol();
      it.should({}).be.symbol();

      it.sum();
    });
  });

  it.sum();
});
