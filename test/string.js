it('String asserts:', function* (it){
  it('.string / .string() asserts:', function(it){
    it('Okey:', function(it){
      it.should('').be.string;
      it.should('abc').be.string;
      it.should('123').be.string;
      it.should().not.be.string;
      it.should(123).not.be.string;
      it.should(new String('abc')).not.be.string;
      it.should('').be.string();
      it.should('abc').be.string();
      it.should('123').be.string();
      it.should().not.be.string();
      it.should(123).not.be.string();
      it.should(new String('abc')).not.be.string();
    });

    it('Fail:', function(it){
      it.should('').not.be.string;
      it.should('abc').not.be.string;
      it.should('123').not.be.string;
      it.should().be.string;
      it.should(123).be.string;
      it.should(new String('abc')).be.string;
      it.should('').not.be.string();
      it.should('abc').not.be.string();
      it.should('123').not.be.string();
      it.should().be.string();
      it.should(123).be.string();
      it.should(new String('abc')).be.string();
    });

    it('ends.');
  });

  it('.String / .String() asserts:', function(it){
    it('Okey:', function(it){
      it.should(new String()).be.String;
      it.should(new String('')).be.String;
      it.should(new String('abc')).be.String;
      it.should(new String(123)).be.String;
      it.should(new String({})).be.String;
      it.should().not.be.String;
      it.should('').not.be.String;
      it.should('abc').not.be.String;
      it.should('123').not.be.String;
      it.should({}).not.be.String;
      it.should(new String()).be.String();
      it.should(new String('')).be.String();
      it.should(new String('abc')).be.String();
      it.should(new String(123)).be.String();
      it.should(new String({})).be.String();
      it.should().not.be.String();
      it.should('').not.be.String();
      it.should('abc').not.be.String();
      it.should('123').not.be.String();
      it.should({}).not.be.String();
    });

    it('Fail:', function(it){
      it.should(new String()).not.be.String;
      it.should(new String('')).not.be.String;
      it.should(new String('abc')).not.be.String;
      it.should(new String(123)).not.be.String;
      it.should(new String({})).not.be.String;
      it.should().be.String;
      it.should('').be.String;
      it.should('abc').be.String;
      it.should('123').be.String;
      it.should({}).be.String;
      it.should(new String()).not.be.String();
      it.should(new String('')).not.be.String();
      it.should(new String('abc')).not.be.String();
      it.should(new String(123)).not.be.String();
      it.should(new String({})).not.be.String();
      it.should().be.String();
      it.should('').be.String();
      it.should('abc').be.String();
      it.should('123').be.String();
      it.should({}).be.String();
    });

    it('ends.');
  });

  it('end.');
});