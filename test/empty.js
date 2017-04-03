it('Empty asserts:', function* (it){
  it('.undefined / .undefined() asserts:', function(it){
    it('Okey:', function(it){
      var x, y=123;
      it.should().be.undefined;
      it.should(undefined).be.undefined;
      it.should(x).be.undefined;
      it.should(null).not.be.undefined;
      it.should(123).not.be.undefined;
      it.should(y).not.be.undefined;
      it.should().be.undefined();
      it.should(undefined).be.undefined();
      it.should(x).be.undefined();
      it.should(null).not.be.undefined();
      it.should(123).not.be.undefined();
      it.should(y).not.be.undefined();
    });

    it('Fail:', function(it){
      var x, y=123;
      it.should().not.be.undefined;
      it.should(undefined).not.be.undefined;
      it.should(x).not.be.undefined;
      it.should(null).be.undefined;
      it.should(123).be.undefined;
      it.should(y).be.undefined;
      it.should().not.be.undefined();
      it.should(undefined).not.be.undefined();
      it.should(x).not.be.undefined();
      it.should(null).be.undefined();
      it.should(123).be.undefined();
      it.should(y).be.undefined();
    });

    it('ends.');
  });

  it('.null / .null() asserts:', function(it){
    it('Okey:', function(it){
      var x, y=123, z=null;
      it.should(null).be.null;
      it.should(z).be.null;
      it.should(undefined).not.be.null;
      it.should(x).not.be.null;
      it.should(123).not.be.null;
      it.should(y).not.be.null;
      it.should(null).be.null();
      it.should(z).be.null();
      it.should(undefined).not.be.null();
      it.should(x).not.be.null();
      it.should(123).not.be.null();
      it.should(y).not.be.null();
    });

    it('Fail:', function(it){
      var x, y=123, z=null;
      it.should(null).not.be.null;
      it.should(z).not.be.null;
      it.should(undefined).be.null;
      it.should(x).be.null;
      it.should(123).be.null;
      it.should(y).be.null;
      it.should(null).not.be.null();
      it.should(z).not.be.null();
      it.should(undefined).be.null();
      it.should(x).be.null();
      it.should(123).be.null();
      it.should(y).be.null();
    });

    it('ends.');
  });

  it('end.');
});