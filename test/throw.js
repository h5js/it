it('Assert throw:', function(it){
  function raise(err) {
    if(err) {
      throw Error(err);
    }
  }
  it.log('okey asserts:');
  it.should(raise).not.throw();
  it.should(raise).not.throw('Fail');
  it.should(raise, 'Wrong').throw('Wrong');
  it.should(raise, 'Wrong').not.throw('Error');

  it.log('fail asserts:');
  it.should(raise).throw();
  it.should(raise, 'Fail').not.throw();
  it.should(raise, 'Wrong').not.throw('Wrong');
  it.should(raise, 'Wrong').throw('Error');

  it.log('end.');
});