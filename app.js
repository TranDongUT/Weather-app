const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const input = $('.search-input');
const city = $('.city h1');
const visibility = $('.visibility');
const windSpeed = $('.wind');
const sun = $('.sun');
const times = $('.times');
const date = $('.date');
const temperature = $('.temperature-number');


const App = { 
    
    getData(){
        let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${input.value == '' ? 'Ho Chi Minh':input.value }&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`;
        fetch(weatherApi)
            .then(respone => {
                return respone.json();
            })
            .then(data => this.render(data))
    },

    handleTime(miliseconds){
        const d = new Date();

        let second = d.getSeconds();
        let minute = d.getMinutes();
        let hour = d.getHours();
        let day = d.getDate();
        let month = d.getMonth();
        let year = d.getFullYear();

        times.innerText = `${hour}:${minute}:${second}, `;
        date.innerText = ` ${day}/${month}/${year}`
        const root = $('#root');
        if(hour > 5 && hour <= 10){
            root.classList.add('morning');
        }
        else if(hour <= 5){
            root.classList.add('mid');
        }
        else{
            root.classList.add('night')
        }
    },

    render(data){

        this.handleTime(data.dt);
        city.innerText = data.name;
        temperature.innerText = Math.ceil(data.main.temp);
        visibility.innerText = `${data.visibility} (m)`;
        windSpeed.innerText = `${data.wind.speed} (m/s)`;
        sun.innerText = `${data.clouds.all} (%)`
    },

    run(){
        this.getData();
    }
}
App.run();

const searchBtn = $('.search-btn')
searchBtn.addEventListener('click',()=>{
    App.run();
})

document.addEventListener('keydown',(e)=>{
    if(e.code === 'Enter'){
        App.run();
    }
})
