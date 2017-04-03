it('Boolean asserts:', function* (it){
  it('.true / .true() asserts:', function(it){
    it('Okey:', function(it){
      it.should(true).be.true;
      it.should(false).not.be.true;
      it.should(true).be.true();
      it.should(false).not.be.true();
      it.should(1).not.be.true;
      it.should(0).not.be.true;
      it.should(1).not.be.true();
      it.should(0).not.be.true();
    });

    it('Fail:', function(it){
      it.should(false).be.true;
      it.should(true).not.be.true;
      it.should(false).be.true();
      it.should(true).not.be.true();
      it.should(0).be.true;
      it.should(1).be.true;
      it.should(0).be.true();
      it.should(1).be.true();
    });

    it('ends.');
  });

  it('.false / .false() asserts:', function(it){
    it('Okey:', function(it){
      it.should(false).be.false;
      it.should(true).not.be.false;
      it.should(false).be.false();
      it.should(true).not.be.false();
      it.should(0).not.be.false;
      it.should(1).not.be.false;
      it.should(0).not.be.false();
      it.should(1).not.be.false();
    });

    it('Fail:', function(it){
      it.should(true).be.false;
      it.should(false).not.be.false;
      it.should(true).be.false();
      it.should(false).not.be.false();
      it.should(1).be.false;
      it.should(0).be.false;
      it.should(1).be.false();
      it.should(0).be.false();
    });

    it('ends.');
  });

  it('.ok / .ok() asserts:', function(it){
    it('Okey:', function(it){
      it.should(true).be.ok;
      it.should(false).not.be.ok;
      it.should(true).be.ok();
      it.should(false).not.be.ok();
      it.should(1).be.ok;
      it.should(0).not.be.ok;
      it.should(1).be.ok();
      it.should(0).not.be.ok();
    });

    it('Fail:', function(it){
      it.should(false).be.ok;
      it.should(true).not.be.ok;
      it.should(false).be.ok();
      it.should(true).not.be.ok();
      it.should(0).be.ok;
      it.should(1).not.be.ok;
      it.should(0).be.ok();
      it.should(1).not.be.ok();
    });

    it('ends.');
  });
});