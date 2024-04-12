const CONVENIENCE_FEE = 40;
let bagItemObjects;
onLoad();

function onLoad(){
  loadBagItemObjects();
  displayBagItems();
  displayBagSummary();
}

function loadBagItemObjects(){
  console.log(bagItems);

  bagItemObjects = bagItems.map(itemId => {
    for(let i = 0; i < items.length; i++){
      if(itemId === items[i].id){
        return items[i];
      }
    }
  })
  console.log(bagItemObjects)
}

function displayBagItems(){
  let bagElement = document.querySelector(".bag_items_container");
  let innerHTML = '';
  bagItemObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  })
  bagElement.innerHTML = innerHTML;
}

function removeItemFromBag(itemId){
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagItemObjects();
  displayBagItemCount();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary(){
  let bagSummeryElement = document.querySelector(".bag_summary");
  let totalItem = 0;
  let totalMRP = 0;
  let totalDiscount = 0;
  let finalPayment = 0;

  bagItemObjects.forEach(bagItem => {
    totalItem = bagItems.length;
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
  });

  finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;

  bagSummeryElement.innerHTML = `<div class="bag_details_container">
  <div class="price_header">PRICE DETAILS (${totalItem} Items)</div>
  <div class="price_item">
    <span class="price_item_tag">Total MRP</span>
    <span class="price_item_value">Rs ${totalMRP}</span>
  </div>
  <div class="price_item">
    <span class="price_item_tag">Discount on MRP</span>
    <span class="price_item_value">Rs ${totalDiscount}</span>
  </div>
  <div class="price_item">
    <span class="price_item_tag">Convenience Fee</span>
    <span class="price_item_value">Rs 40</span>
  </div>
  <hr>
  <div class="price_footer">
    <span class="price_item_tag">Total Amount</span>
    <span class="price_item_value">Rs ${finalPayment}</span>
  </div>
</div>
<button class="btn_place_orger">
  <div class="btn_name">PLACE ORDER</div>
</button>`;
}

function generateItemHTML(item){
  console.log(item);
  return `<div class="bag_item_container">
  <div class="item_left_part">
    <img src="/${item.item_image}" class="bag_item_img">
  </div>
  <div class="item_right_part">
    <div class="company">${item.company_name}</div>
    <div class="product_name">${item.item_name}</div>
    <div class="price_container">
      <span class="current_price">Rs ${item.current_price}</span>
      <span class="original_price">Rs ${item.original_price}</span>
      <span class="discount">(${item.discount}% Off)</span>
    </div>
    <div class="return">
      <span>${item.return_period} days</span> return available
    </div>
    <div class="delivery">Delivery by : ${item.delivery_date}</div>
  </div>
  <div onclick="removeItemFromBag(${item.id})" class="remove_from_cart">X</div>
</div>
`;
}