
getuser(1, displayuser);

function displaycommits(commits)
{
    console.log(`commits ${commits}`);
}

function displayrepos(repos)
{
    console.log('repos');
    console.log(repos);
    getcommits(repos[0], displaycommits);
}

function displayuser(user)
{
    console.log('user');
    console.log(user);
    getrepos(user.name, displayrepos);
}

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

function getcommits(repo, callback){
    setTimeout(()=>{
        console.log('getting commits...');
        callback(['djcb','djbhc','cbdsb']);
    }, 2000);
};
