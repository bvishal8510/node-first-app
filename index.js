
console.log('first');
getuser(1, (user)=>{
    console.log('got user data...');
    console.log(user);
    getrepos(user.name, (repos)=>{
        console.log('got repos...');
        console.log(repos);
    })
});
console.log('second');

function getuser(id, callback)
{
    setTimeout(()=>{
        console.log('getting user data....');
        callback({'id':1, 'name':'Vishal'});
    }, 2000);
};

function getrepos(name, callback)
{
    setTimeout(()=>{
        console.log('getting repos.... ');
        callback([
            { 'no.':1, 'name':'repo 1' },
            { 'no.':2, 'name':'repo 2' },
            { 'no.':3, 'name':'repo 3' }
        ]);
    }, 2000);
};
