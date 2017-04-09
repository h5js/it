it('Function asserts:', function(it){
  function normalFunc(){} it.as
  function* genFunc(){} it.as
  async function asyncFunc(){} it.as

  it('.function / .function() asserts:', function(it){
    it('Okey', function(it){
      it.should(normalFunc).be.function;
      it.should(genFunc).be.function;
      it.should(asyncFunc).be.function;
      it.should(x=>{}).be.function;

      it.should().not.be.function;
      it.should(null).not.be.function;
      it.should(true).not.be.function;
      it.should(123).not.be.function;
      it.should('abc').not.be.function;
      it.should(Symbol()).not.be.function;
      it.should({}).not.be.function;

      it.should(normalFunc).be.function();
      it.should(genFunc).be.function();
      it.should(asyncFunc).be.function();
      it.should(()=>{}).be.function();

      it.should().not.be.function();
      it.should(null).not.be.function();
      it.should(true).not.be.function();
      it.should(123).not.be.function();
      it.should('abc').not.be.function();
      it.should(Symbol()).not.be.function();
      it.should({}).not.be.function();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(normalFunc).not.be.function;
      it.should(genFunc).not.be.function;
      it.should(asyncFunc).not.be.function;
      it.should(x=>{}).not.be.function;

      it.should().be.function;
      it.should(null).be.function;
      it.should(true).be.function;
      it.should(123).be.function;
      it.should('abc').be.function;
      it.should(Symbol()).be.function;
      it.should({}).be.function;

      it.should(normalFunc).not.be.function();
      it.should(genFunc).not.be.function();
      it.should(asyncFunc).not.be.function();
      it.should(()=>{}).not.be.function();

      it.should().be.function();
      it.should(null).be.function();
      it.should(true).be.function();
      it.should(123).be.function();
      it.should('abc').be.function();
      it.should(Symbol()).be.function();
      it.should({}).be.function();

      it.sum();
    });
  });

  it('.SyncFunction / .SyncFunction() asserts:', function(it){
    it('Okey', function(it){
      it.should(normalFunc).be.SyncFunction;
      it.should(x=>{}).be.SyncFunction;

      it.should(genFunc).not.be.SyncFunction;
      it.should(asyncFunc).not.be.SyncFunction;
      it.should().not.be.SyncFunction;
      it.should(null).not.be.SyncFunction;
      it.should(true).not.be.SyncFunction;
      it.should(123).not.be.SyncFunction;
      it.should('abc').not.be.SyncFunction;
      it.should(Symbol()).not.be.SyncFunction;
      it.should({}).not.be.SyncFunction;

      it.should(normalFunc).be.SyncFunction();
      it.should(()=>{}).be.SyncFunction();

      it.should(genFunc).not.be.SyncFunction();
      it.should(asyncFunc).not.be.SyncFunction();      
      it.should().not.be.SyncFunction();
      it.should(null).not.be.SyncFunction();
      it.should(true).not.be.SyncFunction();
      it.should(123).not.be.SyncFunction();
      it.should('abc').not.be.SyncFunction();
      it.should(Symbol()).not.be.SyncFunction();
      it.should({}).not.be.SyncFunction();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(normalFunc).not.be.SyncFunction;
      it.should(x=>{}).not.be.SyncFunction;

      it.should(genFunc).be.SyncFunction;
      it.should(asyncFunc).be.SyncFunction;
      it.should().be.SyncFunction;
      it.should(null).be.SyncFunction;
      it.should(true).be.SyncFunction;
      it.should(123).be.SyncFunction;
      it.should('abc').be.SyncFunction;
      it.should(Symbol()).be.SyncFunction;
      it.should({}).be.SyncFunction;

      it.should(normalFunc).not.be.SyncFunction();
      it.should(()=>{}).not.be.SyncFunction();

      it.should(genFunc).be.SyncFunction();
      it.should(asyncFunc).be.SyncFunction();
      it.should().be.SyncFunction();
      it.should(null).be.SyncFunction();
      it.should(true).be.SyncFunction();
      it.should(123).be.SyncFunction();
      it.should('abc').be.SyncFunction();
      it.should(Symbol()).be.SyncFunction();
      it.should({}).be.SyncFunction();

      it.sum();
    });
  });

  it('.NormalFunction / .NormalFunction() asserts:', function(it){
    it('Okey', function(it){
      it.should(normalFunc).be.NormalFunction;

      it.should(genFunc).not.be.NormalFunction;
      it.should(asyncFunc).not.be.NormalFunction;
      it.should(x=>{}).not.be.NormalFunction;
      it.should().not.be.NormalFunction;
      it.should(null).not.be.NormalFunction;
      it.should(true).not.be.NormalFunction;
      it.should(123).not.be.NormalFunction;
      it.should('abc').not.be.NormalFunction;
      it.should(Symbol()).not.be.NormalFunction;
      it.should({}).not.be.NormalFunction;

      it.should(normalFunc).be.NormalFunction();

      it.should(genFunc).not.be.NormalFunction();
      it.should(asyncFunc).not.be.NormalFunction();
      it.should(()=>{}).not.be.NormalFunction();
      it.should().not.be.NormalFunction();
      it.should(null).not.be.NormalFunction();
      it.should(true).not.be.NormalFunction();
      it.should(123).not.be.NormalFunction();
      it.should('abc').not.be.NormalFunction();
      it.should(Symbol()).not.be.NormalFunction();
      it.should({}).not.be.NormalFunction();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(normalFunc).not.be.NormalFunction;

      it.should(genFunc).be.NormalFunction;
      it.should(asyncFunc).be.NormalFunction;
      it.should(x=>{}).be.NormalFunction;
      it.should().be.NormalFunction;
      it.should(null).be.NormalFunction;
      it.should(true).be.NormalFunction;
      it.should(123).be.NormalFunction;
      it.should('abc').be.NormalFunction;
      it.should(Symbol()).be.NormalFunction;
      it.should({}).be.NormalFunction;

      it.should(normalFunc).not.be.NormalFunction();

      it.should(genFunc).be.NormalFunction();
      it.should(asyncFunc).be.NormalFunction();
      it.should(()=>{}).be.NormalFunction();
      it.should().be.NormalFunction();
      it.should(null).be.NormalFunction();
      it.should(true).be.NormalFunction();
      it.should(123).be.NormalFunction();
      it.should('abc').be.NormalFunction();
      it.should(Symbol()).be.NormalFunction();
      it.should({}).be.NormalFunction();

      it.sum();
    });
  });

  it('.ArrowFunction / .ArrowFunction() asserts:', function(it){
    it('Okey', function(it){
      it.should(x=>{}).be.ArrowFunction;

      it.should(normalFunc).not.be.ArrowFunction;
      it.should(genFunc).not.be.ArrowFunction;
      it.should(asyncFunc).not.be.ArrowFunction;
      it.should().not.be.ArrowFunction;
      it.should(null).not.be.ArrowFunction;
      it.should(true).not.be.ArrowFunction;
      it.should(123).not.be.ArrowFunction;
      it.should('abc').not.be.ArrowFunction;
      it.should(Symbol()).not.be.ArrowFunction;
      it.should({}).not.be.ArrowFunction;

      it.should(()=>{}).be.ArrowFunction();

      it.should(normalFunc).not.be.ArrowFunction();
      it.should(genFunc).not.be.ArrowFunction();
      it.should(asyncFunc).not.be.ArrowFunction();
      it.should().not.be.ArrowFunction();
      it.should(null).not.be.ArrowFunction();
      it.should(true).not.be.ArrowFunction();
      it.should(123).not.be.ArrowFunction();
      it.should('abc').not.be.ArrowFunction();
      it.should(Symbol()).not.be.ArrowFunction();
      it.should({}).not.be.ArrowFunction();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(x=>{}).not.be.ArrowFunction;

      it.should(normalFunc).be.ArrowFunction;
      it.should(genFunc).be.ArrowFunction;
      it.should(asyncFunc).be.ArrowFunction;
      it.should().be.ArrowFunction;
      it.should(null).be.ArrowFunction;
      it.should(true).be.ArrowFunction;
      it.should(123).be.ArrowFunction;
      it.should('abc').be.ArrowFunction;
      it.should(Symbol()).be.ArrowFunction;
      it.should({}).be.ArrowFunction;

      it.should(()=>{}).not.be.ArrowFunction();

      it.should(normalFunc).be.ArrowFunction();
      it.should(genFunc).be.ArrowFunction();
      it.should(asyncFunc).be.ArrowFunction();
      it.should().be.ArrowFunction();
      it.should(null).be.ArrowFunction();
      it.should(true).be.ArrowFunction();
      it.should(123).be.ArrowFunction();
      it.should('abc').be.ArrowFunction();
      it.should(Symbol()).be.ArrowFunction();
      it.should({}).be.ArrowFunction();

      it.sum();
    });
  });

  it('.GeneratorFunction / .GeneratorFunction() asserts:', function(it){
    it('Okey:', function(it){
      it.should(genFunc).be.GeneratorFunction;

      it.should(normalFunc).not.be.GeneratorFunction;
      it.should(asyncFunc).not.be.GeneratorFunction;
      it.should(x=>{}).not.be.GeneratorFunction;
      it.should().not.be.GeneratorFunction;
      it.should(null).not.be.GeneratorFunction;
      it.should(true).not.be.GeneratorFunction;
      it.should(123).not.be.GeneratorFunction;
      it.should('abc').not.be.GeneratorFunction;
      it.should({}).not.be.GeneratorFunction;

      it.should(genFunc).be.GeneratorFunction();

      it.should(normalFunc).not.be.GeneratorFunction();
      it.should(asyncFunc).not.be.GeneratorFunction();
      it.should(x=>{}).not.be.GeneratorFunction();
      it.should().not.be.GeneratorFunction();
      it.should(null).not.be.GeneratorFunction();
      it.should(true).not.be.GeneratorFunction();
      it.should(123).not.be.GeneratorFunction();
      it.should('abc').not.be.GeneratorFunction();
      it.should({}).not.be.GeneratorFunction();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(genFunc).not.be.GeneratorFunction;

      it.should(normalFunc).be.GeneratorFunction;
      it.should(asyncFunc).be.GeneratorFunction;
      it.should(x=>{}).be.GeneratorFunction;
      it.should().be.GeneratorFunction;
      it.should(null).be.GeneratorFunction;
      it.should(true).be.GeneratorFunction;
      it.should(123).be.GeneratorFunction;
      it.should('abc').be.GeneratorFunction;
      it.should({}).be.GeneratorFunction;

      it.should(genFunc).not.be.GeneratorFunction();

      it.should(normalFunc).be.GeneratorFunction();
      it.should(asyncFunc).be.GeneratorFunction();
      it.should(x=>{}).be.GeneratorFunction();
      it.should().be.GeneratorFunction();
      it.should(null).be.GeneratorFunction();
      it.should(true).be.GeneratorFunction();
      it.should(123).be.GeneratorFunction();
      it.should('abc').be.GeneratorFunction();
      it.should({}).be.GeneratorFunction();

      it.sum();
    });
  });

  it('.AsyncFunction / .AsyncFunction() asserts:', function(it){
    it('Okey', function(it){
      it.should(asyncFunc).be.AsyncFunction;

      it.should(normalFunc).not.be.AsyncFunction;
      it.should(genFunc).not.be.AsyncFunction;
      it.should(x=>{}).not.be.AsyncFunction;
      it.should().not.be.AsyncFunction;
      it.should(null).not.be.AsyncFunction;
      it.should(true).not.be.AsyncFunction;
      it.should(123).not.be.AsyncFunction;
      it.should('abc').not.be.AsyncFunction;
      it.should(Symbol()).not.be.AsyncFunction;
      it.should({}).not.be.AsyncFunction;

      it.should(asyncFunc).be.AsyncFunction();

      it.should(normalFunc).not.be.AsyncFunction();
      it.should(genFunc).not.be.AsyncFunction();
      it.should(()=>{}).not.be.AsyncFunction();
      it.should().not.be.AsyncFunction();
      it.should(null).not.be.AsyncFunction();
      it.should(true).not.be.AsyncFunction();
      it.should(123).not.be.AsyncFunction();
      it.should('abc').not.be.AsyncFunction();
      it.should(Symbol()).not.be.AsyncFunction();
      it.should({}).not.be.AsyncFunction();

      it.sum();
    });

    it('Fail:', function(it){
      it.should(asyncFunc).not.be.AsyncFunction;

      it.should(normalFunc).be.AsyncFunction;
      it.should(genFunc).be.AsyncFunction;
      it.should(x=>{}).be.AsyncFunction;
      it.should().be.AsyncFunction;
      it.should(null).be.AsyncFunction;
      it.should(true).be.AsyncFunction;
      it.should(123).be.AsyncFunction;
      it.should('abc').be.AsyncFunction;
      it.should(Symbol()).be.AsyncFunction;
      it.should({}).be.AsyncFunction;

      it.should(asyncFunc).not.be.AsyncFunction();

      it.should(normalFunc).be.AsyncFunction();
      it.should(genFunc).be.AsyncFunction();
      it.should(()=>{}).be.AsyncFunction();
      it.should().be.AsyncFunction();
      it.should(null).be.AsyncFunction();
      it.should(true).be.AsyncFunction();
      it.should(123).be.AsyncFunction();
      it.should('abc').be.AsyncFunction();
      it.should(Symbol()).be.AsyncFunction();
      it.should({}).be.AsyncFunction();

      it.sum();
    });
  });

  it.sum();
});