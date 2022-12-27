// Listen the click that event
document.querySelector('.busca').addEventListener('submit', async (e) => {
    e.preventDefault();
    const el = e.target;
    let inputRegion = document.querySelector('#searchInput').value;

    if(!inputRegion){
        clearInfo();
        showWaring('Digite o nome de uma cidade ou região');
        return;
    }

    try{
        showWaring('Loading...');
        setTimeout(() => {
            document.querySelector('.spinner').style.display = 'block';
        });

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRegion}&units=metric&lang=pt_br&appid=65c94b93847aecef4bdf7a57a6a273d5`;
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod != 200){
            clearInfo();
            showWaring('Cidade ou local não encontrado');
            return;
        }
        await showInfo({
            name: json.name,
            country: json.sys.country,
            temperature: json.main.temp,
            windSpeed: json.wind.speed,
            tempIcon: json.weather[0].icon,
            windAngle: json.wind.deg
        })
    } catch(e){
        throw Error('Locale not found');
    }
});

showWaring = async (msg) => {
    document.querySelector('.aviso').innerHTML = msg;
    return;
}

showInfo = async (response) => {
    showWaring('');

        document.querySelector('.resultado').style.display = 'block';
        document.querySelector('.spinner').style.display = 'none';

        document.querySelector('.titulo').innerHTML = `${response.name}, ${response.country}`;
        document.querySelector('.tempInfo').innerHTML = `${response.temperature} <sup>°C<sup>`;
        document.querySelector('.ventoInfo').innerHTML = `${response.windSpeed} <span>km/h</span>`;
        document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${response.tempIcon}@2x.png`)
        document.querySelector('.ventoPonto').style.transform = `rotate${response.windAngle}deg`;
}

clearInfo = () => {
    showInfo('');
    document.querySelector('.resultado').style.display = 'none';
    document.querySelector('.spinner').style.display = 'none';
}
