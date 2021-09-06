console.log('Client side JavaScript loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg = document.querySelector('#msg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target.address.value)

    const address = search.value
    document.getElementById('details').innerHTML = ''
    msg.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address='+address).then((response) => {
    response.json().then((data) => {
        msg.textContent = ''
        if(data.error) {
            document.getElementById('details').innerHTML = '<br><strong>Error:</strong> '+data.error
        } else {
            document.getElementById('details').innerHTML = '<h3>Weather Details</h3><strong>Location:</strong> '+data.location+'<br><br><strong>Forecast:</strong> '+data.forecast
        }
    })
})
})