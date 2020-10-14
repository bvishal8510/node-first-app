const { rejects } = require("assert");
const { resolve } = require("path");

//Promise architecture
// getuser(1)
//     .then(user => getrepos(user.name))
//     .then(repos => getcommits(repos[0]))
//     .then(commits => console.log(commits))
//     .catch(err => console.log('error', err.message));  

// async and await architecture
async function displaycommits(){
    try{
        const user = await getuser(1);
        const repos = await getrepos(user.name);
        const commits = await getcommits(repos[0]);
        console.log(commits);
    }
    catch (err){
        console.log(err.message);
    }
};
displaycommits();


function getuser(id)
{
    return new Promise((resolve, rejects)=>{
        setTimeout(()=>{
            console.log('getting user data....');
            resolve({'id':1, 'name':'Vishal'});
        }, 2000); 
    });
};

function getrepos(name)
{
    return new Promise((resolve, rejects)=>{
        setTimeout(()=>{
            console.log('getting repos.... ');
            // resolve([
            //     { 'no.':1, 'name':'repo 1' },
            //     { 'no.':2, 'name':'repo 2' },
            //     { 'no.':3, 'name':'repo 3' }
            // ]);
            rejects(new Error('Could not get repos!!!'));
        }, 2000);
    });
};

function getcommits(repo){
    return new Promise((resolve, rejects)=>{
        setTimeout(()=>{
            console.log('getting commits...');
            resolve(['djcb','djbhc','cbdsb']);
        }, 2000);
    });    
};


// function displaycommits(commits)
// {
//     console.log(`commits ${commits}`);
// }

// function displayrepos(repos)
// {
//     console.log('repos');
//     console.log(repos);
//     getcommits(repos[0], displaycommits);
// }

// function displayuser(user)
// {
//     console.log('user');
//     console.log(user);
//     getrepos(user.name, displayrepos);
// }