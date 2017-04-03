it('Number asserts:', function(it){
  it('.number / .number() asserts:', function(it){
    it('Okey:', function(it){
      it.should(0).be.number;
      it.should(123).be.number;
      it.should(1.2).be.number;
      it.should(NaN).be.number;
      it.should(Infinity).be.number;
      it.should().not.be.number;
      it.should('0').not.be.number;
      it.should(true).not.be.number;
      it.should('abc').not.be.number;
      it.should(new Number(123)).not.be.number;
      it.should(0).be.number();
      it.should(123).be.number();
      it.should(1.2).be.number();
      it.should(NaN).be.number();
      it.should(Infinity).be.number();
      it.should().not.be.number();
      it.should('0').not.be.number();
      it.should(true).not.be.number();
      it.should('abc').not.be.number();
      it.should(new Number(123)).not.be.number();
    });

    it('Fail:', function(it){
      it.should(0).not.be.number;
      it.should(123).not.be.number;
      it.should(1.2).not.be.number;
      it.should(NaN).not.be.number;
      it.should(Infinity).not.be.number;
      it.should().be.number;
      it.should('0').be.number;
      it.should(true).be.number;
      it.should('abc').be.number;
      it.should(new Number(123)).be.number;
      it.should(0).not.be.number();
      it.should(123).not.be.number();
      it.should(1.2).not.be.number();
      it.should(NaN).not.be.number();
      it.should(Infinity).not.be.number();
      it.should().be.number();
      it.should('0').be.number();
      it.should(true).be.number();
      it.should('abc').be.number();
      it.should(new Number(123)).be.number();
    });

    it('end.');
  });

  it('.Number / .Number() asserts:', function(it){
    it('Okey:', function(it){
      it.should(new Number()).be.Number;
      it.should(new Number(123)).be.Number;
      it.should(new Number(NaN)).be.Number;
      it.should(new Number(Infinity)).be.Number;
      it.should(new Number('0123')).be.Number;
      it.should().not.be.Number;
      it.should(0).not.be.Number;
      it.should(123).not.be.Number;
      it.should(1.2).not.be.Number;
      it.should(NaN).not.be.Number;
      it.should(Infinity).not.be.Number;
      it.should({}).not.be.Number;
      it.should([]).not.be.Number;
      it.should(new Number()).be.Number();
      it.should(new Number(123)).be.Number();
      it.should(new Number(NaN)).be.Number();
      it.should(new Number(Infinity)).be.Number();
      it.should(new Number('0123')).be.Number();
      it.should().not.be.Number();
      it.should(0).not.be.Number();
      it.should(123).not.be.Number();
      it.should(1.2).not.be.Number();
      it.should(NaN).not.be.Number();
      it.should(Infinity).not.be.Number();
      it.should({}).not.be.Number();
      it.should([]).not.be.Number();
    });

    it('Fail:', function(it){
      it.should(new Number()).not.be.Number;
      it.should(new Number(123)).not.be.Number;
      it.should(new Number(NaN)).not.be.Number;
      it.should(new Number(Infinity)).not.be.Number;
      it.should(new Number('0123')).not.be.Number;
      it.should().be.Number;
      it.should(0).be.Number;
      it.should(123).be.Number;
      it.should(1.2).be.Number;
      it.should(NaN).be.Number;
      it.should(Infinity).be.Number;
      it.should({}).be.Number;
      it.should([]).be.Number;
      it.should(new Number()).not.be.Number();
      it.should(new Number(123)).not.be.Number();
      it.should(new Number(NaN)).not.be.Number();
      it.should(new Number(Infinity)).not.be.Number();
      it.should(new Number('0123')).not.be.Number();
      it.should().be.Number();
      it.should(0).be.Number();
      it.should(123).be.Number();
      it.should(1.2).be.Number();
      it.should(NaN).be.Number();
      it.should(Infinity).be.Number();
      it.should({}).be.Number();
      it.should([]).be.Number();
    });

    it('end.');
  });

  it('.integer / .integer() asserts:', function(it){
    it('Okey:', function(it){
      it.should(0).be.integer;
      it.should(123).be.integer;
      it.should(Number.MAX_VALUE).be.integer;
      it.should().not.be.integer;
      it.should(1.2).not.be.integer;
      it.should(Number.MIN_VALUE).not.be.integer;
      it.should(NaN).not.be.integer;
      it.should(Infinity).not.be.integer;
      it.should(new Number(123)).not.be.integer;
      it.should(0).be.integer();
      it.should(123).be.integer();
      it.should(Number.MAX_VALUE).be.integer();
      it.should().not.be.integer();
      it.should(1.2).not.be.integer();
      it.should(Number.MIN_VALUE).not.be.integer();
      it.should(NaN).not.be.integer();
      it.should(Infinity).not.be.integer();
      it.should(new Number(123)).not.be.integer();
    });

    it('Fail:', function(it){
      it.should(0).not.be.integer;
      it.should(123).not.be.integer;
      it.should(Number.MAX_VALUE).not.be.integer;
      it.should().be.integer;
      it.should(1.2).be.integer;
      it.should(Number.MIN_VALUE).be.integer;
      it.should(NaN).be.integer;
      it.should(Infinity).be.integer;
      it.should(new Number(123)).be.integer;
      it.should(0).not.be.integer();
      it.should(123).not.be.integer();
      it.should(Number.MAX_VALUE).not.be.integer();
      it.should().be.integer();
      it.should(1.2).be.integer();
      it.should(Number.MIN_VALUE).be.integer();
      it.should(NaN).be.integer();
      it.should(Infinity).be.integer();
      it.should(new Number(123)).be.integer();
    });

    it('end.');
  });

  it('.safeInteger / .safeInteger() asserts:', function(it){
    it('Okey:', function(it){
      it.should(0).be.safeInteger;
      it.should(123).be.safeInteger;
      it.should(Number.MAX_SAFE_INTEGER).be.safeInteger;
      it.should(Number.MIN_SAFE_INTEGER).be.safeInteger;

      it.should().not.be.safeInteger;
      it.should(NaN).not.be.safeInteger;
      it.should(Infinity).not.be.safeInteger;
      it.should(Number.MAX_VALUE).not.be.safeInteger;
      it.should(Number.MAX_SAFE_INTEGER+1).not.be.safeInteger;
      it.should(Number.MIN_VALUE).not.be.safeInteger;
      it.should(Number.MIN_SAFE_INTEGER-1).not.be.safeInteger;
      it.should(new Number(0)).not.be.safeInteger;

      it.should(0).be.safeInteger();
      it.should(123).be.safeInteger();
      it.should(Number.MAX_SAFE_INTEGER).be.safeInteger();
      it.should(Number.MIN_SAFE_INTEGER).be.safeInteger();

      it.should().not.be.safeInteger();
      it.should(NaN).not.be.safeInteger();
      it.should(Infinity).not.be.safeInteger();
      it.should(Number.MAX_VALUE).not.be.safeInteger();
      it.should(Number.MAX_SAFE_INTEGER+1).not.be.safeInteger();
      it.should(Number.MIN_VALUE).not.be.safeInteger();
      it.should(Number.MIN_SAFE_INTEGER-1).not.be.safeInteger();
      it.should(new Number(0)).not.be.safeInteger();
    });

    it('Fail:', function(it){
      it.should(0).not.be.safeInteger;
      it.should(123).not.be.safeInteger;
      it.should(Number.MAX_SAFE_INTEGER).not.be.safeInteger;
      it.should(Number.MIN_SAFE_INTEGER).not.be.safeInteger;

      it.should().be.safeInteger;
      it.should(NaN).be.safeInteger;
      it.should(Infinity).be.safeInteger;
      it.should(Number.MAX_VALUE).be.safeInteger;
      it.should(Number.MAX_SAFE_INTEGER+1).be.safeInteger;
      it.should(Number.MIN_VALUE).be.safeInteger;
      it.should(Number.MIN_SAFE_INTEGER-1).be.safeInteger;
      it.should(new Number(0)).be.safeInteger;

      it.should(0).not.be.safeInteger();
      it.should(123).not.be.safeInteger();
      it.should(Number.MAX_SAFE_INTEGER).not.be.safeInteger();
      it.should(Number.MIN_SAFE_INTEGER).not.be.safeInteger();

      it.should().be.safeInteger();
      it.should(NaN).be.safeInteger();
      it.should(Infinity).be.safeInteger();
      it.should(Number.MAX_VALUE).be.safeInteger();
      it.should(Number.MAX_SAFE_INTEGER+1).be.safeInteger();
      it.should(Number.MIN_VALUE).be.safeInteger();
      it.should(Number.MIN_SAFE_INTEGER-1).be.safeInteger();
      it.should(new Number(0)).be.safeInteger();
    });
    
    it('end.');
  });

  it('.NaN / .NaN() asserts:', function(it){
    it('Okey:', function(it){
      it.should(NaN).be.NaN;
      it.should(Number.NaN).be.NaN;
      it.should(0/0).be.NaN;
      it.should('a'-0).be.NaN;

      it.should().not.be.NaN;
      it.should(123).not.be.NaN;
      it.should(new Number(NaN)).not.be.NaN;
      it.should(Infinity).not.be.NaN;
      it.should(Number.MAX_VALUE).not.be.NaN;
      it.should(Number.MIN_VALUE).not.be.NaN;
      it.should(Number.MAX_SAFE_INTEGER).not.be.NaN;
      it.should(Number.MIN_SAFE_INTEGER).not.be.NaN;
      it.should(''-0).not.be.NaN;
      it.should(''*123).not.be.NaN;

      it.should(NaN).be.NaN();
      it.should(Number.NaN).be.NaN();
      it.should(0/0).be.NaN();
      it.should('a'-0).be.NaN();

      it.should().not.be.NaN();
      it.should(123).not.be.NaN();
      it.should(new Number(NaN)).not.be.NaN();
      it.should(Infinity).not.be.NaN();
      it.should(Number.MAX_VALUE).not.be.NaN();
      it.should(Number.MIN_VALUE).not.be.NaN();
      it.should(Number.MAX_SAFE_INTEGER).not.be.NaN();
      it.should(Number.MIN_SAFE_INTEGER).not.be.NaN();
      it.should(''-0).not.be.NaN();
      it.should(''*123).not.be.NaN();

    });

    it('Fail:', function(it){
      it.should(NaN).not.be.NaN;
      it.should(Number.NaN).not.be.NaN;
      it.should(0/0).not.be.NaN;
      it.should('a'-0).not.be.NaN;

      it.should().be.NaN;
      it.should(123).be.NaN;
      it.should(new Number(NaN)).be.NaN;
      it.should(Infinity).be.NaN;
      it.should(Number.MAX_VALUE).be.NaN;
      it.should(Number.MIN_VALUE).be.NaN;
      it.should(Number.MAX_SAFE_INTEGER).be.NaN;
      it.should(Number.MIN_SAFE_INTEGER).be.NaN;
      it.should(''-0).be.NaN;
      it.should(''*123).be.NaN;

      it.should(NaN).not.be.NaN();
      it.should(Number.NaN).not.be.NaN();
      it.should(0/0).not.be.NaN();
      it.should('a'-0).not.be.NaN();

      it.should().be.NaN();
      it.should(123).be.NaN();
      it.should(new Number(NaN)).be.NaN();
      it.should(Infinity).be.NaN();
      it.should(Number.MAX_VALUE).be.NaN();
      it.should(Number.MIN_VALUE).be.NaN();
      it.should(Number.MAX_SAFE_INTEGER).be.NaN();
      it.should(Number.MIN_SAFE_INTEGER).be.NaN();
      it.should(''-0).be.NaN();
      it.should(''*123).be.NaN();

    });

    it('end.');
  });

  it('.finite / .finite() asserts:', function(it){
    it('Okey:', function(it){
      it.should(0).be.finite;
      it.should(1.2).be.finite;
      it.should(Number.MAX_VALUE).be.finite;
      it.should(Number.MIN_VALUE).be.finite;
      it.should(Number.MAX_SAFE_INTEGER).be.finite;
      it.should(Number.MIN_SAFE_INTEGER).be.finite;

      it.should().not.be.finite;
      it.should(1/0).not.be.finite;
      it.should(-1/0).not.be.finite;
      it.should(NaN).not.be.finite;
      it.should(Number.POSITIVE_INFINITY).not.be.finite;
      it.should(Number.NEGATIVE_INFINITY).not.be.finite;
      it.should(new Number('1.2')).not.be.finite;

      it.should(0).be.finite();
      it.should(1.2).be.finite();
      it.should(Number.MAX_VALUE).be.finite();
      it.should(Number.MIN_VALUE).be.finite();
      it.should(Number.MAX_SAFE_INTEGER).be.finite();
      it.should(Number.MIN_SAFE_INTEGER).be.finite();

      it.should().not.be.finite();
      it.should(1/0).not.be.finite();
      it.should(-1/0).not.be.finite();
      it.should(NaN).not.be.finite();
      it.should(Number.POSITIVE_INFINITY).not.be.finite();
      it.should(Number.NEGATIVE_INFINITY).not.be.finite();
      it.should(new Number('1.2')).not.be.finite();

    });

    it('Fail:', function(it){
      it.should(0).not.be.finite;
      it.should(1.2).not.be.finite;
      it.should(Number.MAX_VALUE).not.be.finite;
      it.should(Number.MIN_VALUE).not.be.finite;
      it.should(Number.MAX_SAFE_INTEGER).not.be.finite;
      it.should(Number.MIN_SAFE_INTEGER).not.be.finite;

      it.should().be.finite;
      it.should(1/0).be.finite;
      it.should(-1/0).be.finite;
      it.should(NaN).be.finite;
      it.should(Number.POSITIVE_INFINITY).be.finite;
      it.should(Number.NEGATIVE_INFINITY).be.finite;
      it.should(new Number('1.2')).be.finite;

      it.should(0).not.be.finite();
      it.should(1.2).not.be.finite();
      it.should(Number.MAX_VALUE).not.be.finite();
      it.should(Number.MIN_VALUE).not.be.finite();
      it.should(Number.MAX_SAFE_INTEGER).not.be.finite();
      it.should(Number.MIN_SAFE_INTEGER).not.be.finite();

      it.should().be.finite();
      it.should(1/0).be.finite();
      it.should(-1/0).be.finite();
      it.should(NaN).be.finite();
      it.should(Number.POSITIVE_INFINITY).be.finite();
      it.should(Number.NEGATIVE_INFINITY).be.finite();
      it.should(new Number('1.2')).be.finite();

    });

    it('end.');
  });

  it('end.');
});