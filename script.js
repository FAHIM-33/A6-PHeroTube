// let isSorted = false;
let currentID = 0;
const loadCatagories = async () => {
  let res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  res = await res.json();
  data = res.data;
  data.forEach(cat => {
    let id = cat.category_id;
    let name = cat.category;
    let div = document.createElement('div');
    div.innerHTML = `<button class="cat-btn" onclick="loadData(${id})">${name}</button>`
    let parent = document.getElementById('category-container')
    parent.appendChild(div);
  })
}

const loadData = async (id = 1000) => {
  id *= 1;
  currentID = id;
  let res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
  let data = await res.json();
  let vids = data.data;
  processor(vids)
  return vids;
}

function processor(vids) {
  clear('card-container')
  clear('oops')
  if (vids.length === 0) {
    let errordiv = document.createElement('div');
    errordiv.innerHTML = `
        <img class="block mx-auto w-32 mt-24" src="./image/Icon.png" alt="">
        <p class="text-3xl font-bold leading-10 text-center">Oops!! Sorry, There is no<br>content here</p>
        `;
    document.getElementById('oops').appendChild(errordiv)
  }
  vids.forEach((card) => {
    let isTime = '';
    let div = document.createElement('div');
    let time = card.others.posted_date *= 1;
    if (time == 0) {
      isTime = 'hidden'
    }
    let isVarified = '';
    if (card.authors[0].verified) {
      isVarified = 'hidden'
    }
    hour = Math.floor(time / 3600)
    let minute = Math.floor(60 * (time / 3600 - hour));
    div.innerHTML = `
    <div class="card rounded-lg">
    <figure class="relative">
      <img class="w-full h-56 lg:h-48 md:rounded-lg" src="${card.thumbnail}" alt="Loading...">
      <p class="time-tag ${isTime}">${hour}hrs ${minute} min ago</p>
    </figure>
    <div class="flex gap-3 items-start mt-2 pl-2">
      <img src="${card.authors[0].profile_picture}" alt="" class="mt-2 w-10 h-10 rounded-full">
      <div>
        <h3 class="vid-title">${card.title}</h3>
        <div class="flex gap-2">
          <p class="plain-text md:my-2">${card.authors[0].profile_name}</p>
          <img class="svg ${isVarified}" src="./image/fi_10629607.svg" alt="">
        </div>
        <p class="plain-text">${card.others.views} views</p>
      </div>
    </div>
  </div>
    `;
    document.getElementById('card-container').appendChild(div)
  })
}

function clear(eID) {
  document.getElementById(eID).innerHTML = ``;
}
function sort() {
  let sortedData = [];
  let decendingArr = [];
  loadData(currentID)
    .then(arr => {
      arr.forEach(obj => {
        let view = (obj.others.views.slice(0, -1));
        view *= 1;
        decendingArr.push(view);
      })
      decendingArr.sort((a, b) => { return b - a })

      let strArr = [];
      decendingArr.map(num => {
        num += 'K'
        strArr.push(num);
      }) 


      strArr.forEach((num) => {
        arr.forEach(obj => {
          if(obj.others.views === num){
            sortedData.push(obj);
          }
        })
  
      })
      sortedData = filterDups(sortedData)
      processor(sortedData)

    })
    .catch(err => console.error(err));
}

function filterDups(arr){
  let pureObj = {};
  arr.forEach(obj => {
    pureObj[obj.title] = obj;
  })
  return Object.values(pureObj);
}

loadCatagories();
loadData()