console.log('Client side js file is loaded')


// fetch('http://puzzle.mead.io/puzzle',).then( (response) => {
//     response.json().then((data)=>{
//         console.log(data);
//     });
// });

const weather_address = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');




weather_address.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    //console.log(location);
    message1.textContent = 'loading...';
    message2.textContent = '';
    fetch('/weather?address='+location).then( (response) => { ///then PROMISES!!
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            message1.textContent = data.error;
        } else {
            console.log(data.location);
            console.log(data.forecast);
            message1.textContent = data.location;
            message2.textContent = data.forecast;

        }
    });
});
})

