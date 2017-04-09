it('Comparison asserts:', function(){
  it('.equal() asserts:', function(it){
    it('Okey:', function(it){
      it.should(0).equal(0);
      it.should(0).not.equal(1);
      it.should(123).equal('123');
      it.should('123').equal(123);

      it.sum();
    });

    it('Fail:', function(it){
      it.should(0).equal(1);
      it.should(1).not.equal(1);
      it.should(123).not.equal('123');
      it.should('123').not.equal(123);

      it.sum();
    });
  });

  it('.equiv() asserts:', function(it){
    it('Okey:', function(it){
      it.should().equiv();
      it.should(null).equiv(null);
      it.should().equiv(null);
      it.should(false).equiv(false);
      it.should(0).equiv(0);
      it.should(123).equiv(123);
      it.should('').equiv('');
      it.should('abc').equiv('abc');
      it.should({}).equiv({});
      it.should([]).equiv([]);
      it.should({}).equiv([]);
      it.should({a:0}).equiv({a:'0'});
      it.should({a:0,b:1,c:2}).equiv({a:0,b:1,c:2});
      it.should([0,1,2]).equiv([0,1,2]);
      it.should([0,1,2]).equiv({'0':0,'1':1,'2':2});
      it.should({a:0,b:1,c:{x:0,y:1,z:2}}).equiv({a:0,b:1,c:{x:0,y:1,z:2}});
      it.should({'0':0,'1':1,'2':{x:0,y:1,z:2}}).equiv([0,1,{x:0,y:1,z:2}]);
      it.should(false).not.equiv(true);
      it.should(0).not.equiv(123);
      it.should('abc').not.equiv('ABC');
      it.should({}).not.equiv({a:0});
      it.should({a:0}).not.equiv({a:1});
      it.should([0,1,2]).not.equiv({'0':0,'1':0,'2':2});
      it.should({a:0,b:1,c:{x:0,y:1,z:2}}).not.equiv({a:0,b:1,c:{x:0,y:1,z:3}});

      it.sum();
    });
  });

  it.sum();
});
