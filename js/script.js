
async function getDealData(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  // console.log('inside getDealData')
  return data
}

const dealCardTemplate = (deal) => `
  <article>
            <div class="deal-image-container">
              <img
                src="assets/goblin-meal.jpg"
                class="deal-cards-image"
                alt="a photo of tacos"
              />
            </div>
            <div class="deal-card-details">
              <h3 class="deal-card-name">${deal.placeName}</h3>
              <p class="deal-card-type">${deal.typeOfDeal}</p>
              <p class="deal-card-availability">${deal.daysOfWeek}</p>
              <p class="deal-card-address">
                ${deal.address}
              </p>
            </div>
            <div class="deal-card-details-right">
              <p class="deal-card-rating">${deal.stars}</p>
              <button type="button" class="deal-card-info-button">
                More info
              </button>
            </div>
  </article>
`;

async function createAndAppendDealCards(endpoint) {
  const dealData = await getDealData(endpoint);
  const dealContainer = document.getElementById('deal-cards');

  dealData.forEach(deal => {
    dealContainer.insertAdjacentHTML('beforeend', dealCardTemplate(deal));
    
  });
}

//get all deal with full detail
document.getElementById('locate-me-button').addEventListener('click', ()=> {
  const endpoint = 'http://localhost:8080/deal/details';
  createAndAppendDealCards(endpoint);
});

//get deals by keyword or days of the week
  document.getElementById('search-button').addEventListener('click', () => {
    let userInput = document.getElementById('search-input').value.toLowerCase();
    console.log(`userInput: ${userInput}`)
    const daysOfWeekArr = [
      {monday: 'm'}, 
      {tuesday: 't'}, 
      {wednesday: 'w'}, 
      {thursday: 'h'}, 
      {friday: 'f'}, 
      {saturday: 's'}, 
      {sunday: 'u'}
    ]
    //finds and return first encounter of element or undefine
    let findDay = daysOfWeekArr.find(dayObj => dayObj[userInput]);
      if (findDay) {
        let value = findDay[userInput]
        const endpoint = `http://localhost:8080/deal/details/day/${value}`;
        createAndAppendDealCards(endpoint);
      } else {
        const endpoint = `http://localhost:8080/deal/details/keyword/${userInput}`;
        createAndAppendDealCards(endpoint);
      }

    document.getElementById('search-input').value = '';
  })