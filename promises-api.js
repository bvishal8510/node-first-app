
// const p = Promise.resolve({'id':1, 'name':"Complete"});
// p.then(result => console.log('result', result));

const p = Promise.reject(new Error('Something went wrong...'));
p.catch(err => console.log(err));
