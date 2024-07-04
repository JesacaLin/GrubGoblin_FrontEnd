//grab all articles
//grab the button store in variable and add an event listener
//initialize fetch api
//use forEach to set the data



async function getDealData() {
  const response = await fetch('http://localhost:8080/deal/details');
  const data = await response.json();
  console.log('inside getDealData')
  return data
}


async function populateDealCards() {
  const dealData = await getDealData();
  const dealCards = document.querySelectorAll("article");
  console.log(dealData)
  
  dealData.forEach((deal, index) => {
    const dealCard = dealCards[index];
    dealCard.querySelector(".deal-card-name").textContent = deal.placeName;
    dealCard.querySelector(".deal-card-type").textContent = deal.typeOfDeal;
    console.log('inside forEach')
  })
  console.log('inside populateDealCards')
}

document.getElementById("locate-me-button").addEventListener('click', populateDealCards);

