it('Object asserts:', function(it){
  it('.object / .object() asserts:', function(it){
    it('Okey:', function(it){
      it.should({}).be.object;
      it.should(Object.create(null)).be.object;
      it.should([]).be.object;
      it.should(/ /).be.object;
      it.should(function(){}).be.object;

      it.should().not.be.object;
      it.should(null).not.be.object;
      it.should(true).not.be.object;
      it.should(123).not.be.object;
      it.should('abc').not.be.object;
      it.should(Symbol()).not.be.object;

      it.should({}).be.object();
      it.should(Object.create(null)).be.object();
      it.should([]).be.object();
      it.should(/ /).be.object();
      it.should(function(){}).be.object();

      it.should().not.be.object();
      it.should(null).not.be.object();
      it.should(true).not.be.object();
      it.should(123).not.be.object();
      it.should('abc').not.be.object();
      it.should(Symbol()).not.be.object();

      it.sum();
    });

    it('Fail:', function(it){
      it.should({}).not.be.object;
      it.should(Object.create(null)).not.be.object;
      it.should([]).not.be.object;
      it.should(/ /).not.be.object;
      it.should(function(){}).not.be.object;

      it.should().be.object;
      it.should(null).be.object;
      it.should(true).be.object;
      it.should(123).be.object;
      it.should('abc').be.object;
      it.should(Symbol()).be.object;

      it.should({}).not.be.object();
      it.should(Object.create(null)).not.be.object();
      it.should([]).not.be.object();
      it.should(/ /).not.be.object();
      it.should(function(){}).not.be.object();

      it.should().be.object();
      it.should(null).be.object();
      it.should(true).be.object();
      it.should(123).be.object();
      it.should('abc').be.object();
      it.should(Symbol()).be.object();

      it.sum();
    });
  });

  it('.objective / .objective() asserts:', function(it){
    it('Okey:', function(it){
      it.should({}).be.objective;
      it.should(Object.create(null)).be.objective;
      it.should([]).be.objective;
      it.should(/ /).be.objective;

      it.should().not.be.objective;
      it.should(function(){}).not.be.objective;
      it.should(null).not.be.objective;
      it.should(true).not.be.objective;
      it.should(123).not.be.objective;
      it.should('abc').not.be.objective;
      it.should(Symbol()).not.be.objective;

      it.should({}).be.objective();
      it.should(Object.create(null)).be.objective();
      it.should([]).be.objective();
      it.should(/ /).be.objective();

      it.should().not.be.objective();
      it.should(function(){}).not.be.objective();
      it.should(null).not.be.objective();
      it.should(true).not.be.objective();
      it.should(123).not.be.objective();
      it.should('abc').not.be.objective();
      it.should(Symbol()).not.be.objective();

      it.sum();
    });

    it('Fail:', function(it){
      it.should({}).not.be.objective;
      it.should(Object.create(null)).not.be.objective;
      it.should([]).not.be.objective;
      it.should(/ /).not.be.objective;

      it.should().be.objective;
      it.should(function(){}).be.objective;
      it.should(null).be.objective;
      it.should(true).be.objective;
      it.should(123).be.objective;
      it.should('abc').be.objective;
      it.should(Symbol()).be.objective;

      it.should({}).not.be.objective();
      it.should(Object.create(null)).not.be.objective();
      it.should([]).not.be.objective();
      it.should(/ /).not.be.objective();

      it.should().be.objective();
      it.should(function(){}).be.objective();
      it.should(null).be.objective();
      it.should(true).be.objective();
      it.should(123).be.objective();
      it.should('abc').be.objective();
      it.should(Symbol()).be.objective();

      it.sum();
    });
  });

  it.sum();
});