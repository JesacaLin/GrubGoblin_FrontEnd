
async function getDealData() {
  const response = await fetch('http://localhost:8080/deal/details');
  const data = await response.json();
  console.log('inside getDealData')
  return data
}

const dealCardTemplate = (deal) => `
  <article>
            <img
              src="assets/tacos.jpg"
              class="deal-cards-image"
              alt="a photo of tacos"
            />
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

async function createAndAppendDealCards() {
  const dealData = await getDealData();
  const dealContainer = document.getElementById('deal-cards');

  dealData.forEach(deal => {
    dealContainer.insertAdjacentHTML('beforeend', dealCardTemplate(deal));
    console.log('inside forEach')
  });

  console.log('inside createAndAppendDealCards')
}


document.getElementById("locate-me-button").addEventListener('click', createAndAppendDealCards);

