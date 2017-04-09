it('Assert throw:', function(it){
  it('Error:', function(it){
    it.should('abc').throw();
    it.should(123, 456).not.throw();

    it.sum();
  });

  it.begin
  function throwError(err) {
    if(err) {
      throw Error(err);
    }
  }
  it.end

  it('Assert just .throw():', function(it){
    it('Okey:', function(it){
      it.should(throwError).not.throw();
      it.should(throwError, 'Error').throw();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(throwError).throw();
      it.should(throwError, 'Error').not.throw();

      it.sum();
    });
  });

  it('Assert .throw(err):', function(it){
    it('Okey:', function(it){
      it.should(throwError, 'Error').throw('Error');
      it.should(throwError, 'Error').not.throw('Failure');

      it.sum();
    });

    it('Fail:', function(it){
      it.should(throwError, 'Error').not.throw('Error');
      it.should(throwError, 'Error').throw('Failure');

      it.sum();
    });
  });

  it.sum();
});