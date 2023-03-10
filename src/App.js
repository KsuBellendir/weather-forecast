import React, {useState} from 'react';
import './App.css'

const api = {
 // key: '3b330d354c7d8b2232ea7c35649c8092',
 key: '749bd1d06ff29f78c02f6dc806ade291',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if(evt.key === 'Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dataBilder = (d) => {
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Остябрь", "Ноябрь", "Декабрь"];
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}` 
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type='text'
           onChange={e => setQuery(e.target.value)}
           value={query} 
           onKeyPress={search} 
          className='search-bar' 
          placeholder='Поиск...'/>
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dataBilder(new Date())}</div>
            </div> 
            <div className="weather-box">
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          </div>
        ) : ('')}
      </main>
    </div>
  )
}

export default App;
