const input = document.getElementById("searchInput")
const apiKey = "LPZ6uidug9avziTv5NRgJ6rSboCH8E7o";

function searchXHR() {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input.value}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (){
    if(this.readyState === 4 && this.status === 200){
      const imagesObj = JSON.parse(this.responseText).data;
      generateImages(imagesObj);
    }
  };
  xhr.open("GET", url)
  xhr.send()
}

function searchFetch() {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input.value}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  const res = fetch(url);
  const jsonObj = res.then((response)=>{
    if(!response.ok){
      // TODO
    }
    return response.json();
  })

jsonObj.then((response)=>{
    generateImages(response.data)
  })
}

async function searchAsync() {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${input.value}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  const res = await fetch(url);
  const jsonObj = await res.json();
  const images = await jsonObj.data
  
  generateImages(images)
}


function generateImages(images){
  const result = document.getElementById("result");
  result.innerHTML = ""
  for(let image of images){
    const img = document.createElement("img");
    img.src = image.images.fixed_width_downsampled.url
    result.appendChild(img)
  }
}