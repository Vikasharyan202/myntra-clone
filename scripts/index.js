let bagItems = [];

onLoad();
// This onLoad() is the method where all the function are placed
function onLoad(){
  displayItemsToHomePage();
  displayBagItemCount();
}

function addToBag(itemId){
  bagItems.push(itemId);
  displayBagItemCount();
}

function displayBagItemCount(){
  let bagItemCount = document.querySelector(".bag_item_count");
  if(bagItems.length > 0){
    bagItemCount.style.visibility = 'visible';
    bagItemCount.innerText = bagItems.length;
  }else{
    bagItemCount.style.visibility = 'hidden';
  }
  
}

function displayItemsToHomePage() {
	let itemsContainerElement = document.querySelector(".items_container");

	let innerHtml = "";

	items.forEach((item) => {
		innerHtml += `
  <div class="item_container">
  <img src="${item.item_image}" class="item_image">
  <div class="rating">
    ${item.rating.stars}⭐ | ${item.rating.noOfReview}
  </div>
  <div class="company_name">${item.company_name}</div>
  <div class="item_name">${item.item_name}</div>
  <div class="price">
    <span class="current_price">Rs ${item.current_price}</span>
    <span class="original_price">RS ${item.original_price}</span>
    <span class="discount">(${item.discount}% Off)</span>
  </div>
  <button onclick="addToBag(${item.itemId})" class="item_btn">Add to Bag</button>
  </div>
  `;
	});

	itemsContainerElement.innerHTML = innerHtml;
}
