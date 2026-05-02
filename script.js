
console.log('the script is running')


//async function will load the data from the api
async function onLoad() {
    //the url will not be changed at any point
    const url = "https://kraakash.github.io/API-blog/api.json"

    const row = document.getElementsByClassName("card-row")[0]
    const modal = document.getElementById("modal")
    const filter = document.getElementById("category-filter")
    const closBtn = document.getElementById("closeBtn")
    try {
        //step 1 - fetch and parse the data;
        const response = await fetch(url);
        // if(!response){
        //     throw new Error(`Error Encountered ${response.status}`);
        // }

        const data = await response.json();
        const allBlogs = data.blogs || [];
        const categories = data.meta.categories || [];

        //creating options filter y JavaScript
        let allOptions = document.createElement("option")
        allOptions.value = "All"
        allOptions.innerText = "All Categories"
        filter.appendChild(allOptions);
        //creating  option for every category in the api
        categories.forEach(cat => {
            let opt = document.createElement("option")
            opt.value = cat;
            opt.innerText = cat;
            filter.appendChild(opt);
        })


        const displayBlogs = (blogList) => {
            row.innerHtml = "";
            blogList.forEach((blog) => {
                let card = document.createElement("div")
                card.className ="card"

                let imgName = "";
                switch (blog.category) {
                    case "Business": imgName = "business.png"; break;
                    case "Culture": imgName = "culture.jpg"; break;
                    case "Design": imgName = "design.jpg"; break;
                    case 'Education': imgName = "ed.png"; break;
                    case "Environment": imgName = "envi.png"; break;
                    case "Health": imgName = "health.png"; break;
                    case "Lifestyle": imgName = 'lifestyle.png'; break;
                    case "Programming": imgName = "code.png"; break;
                    case "Science": imgName = "science.png"; break;
                    case "Technology": imgName = "technology.png"; break;
                    case "Travel": imgName = "travel.png"


                }

                card.innerHTML=`<img src = ${imgName} >
                <h1>${blog.title}</h1>`;

                card.onclick = ()=>{
                    document.getElementById('modal-title').innerText = blog.title
                    document.getElementById("modal-body").innerText=blog.summary|| "";
                    modal.style.display = "flex"
                }

                row.appendChild(card);
                
            })


        }

        displayBlogs(allBlogs)

        closBtn.onclick = ()=>{
            modal.style.display = "none"
        }
        console.log("data fetchhed");

    } catch (error) {

        ///to catch the unexpected errors
        console.log(error.name);
        console.log(error.message);
        //Insert the child


    }
}


onLoad()