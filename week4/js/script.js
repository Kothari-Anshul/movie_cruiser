var search_btn = document.getElementById("search-btn");
var movie_name = document.getElementById("movie_name");
var accordion = document.getElementById("accordion");
var bag = document.getElementById("bag");
var add = document.getElementById("add");
var collection = {}
var json_array;
var dismiss = document.getElementById("dismiss");



$('#addModal').on('shown.bs.modal', function() {
  $(this).find('[autofocus]').focus();
});

/* Add event listener to the search button */
search_btn.addEventListener("click", searchCB);

/* add and event listener on the plus or add button to add more items in the bag i.e collections container*/
//add.addEventListener("click", function() {
let save = document.getElementById("save");
save.addEventListener("click", function(event) {
    let name = document.getElementById("collection_name").value;
    

    if (name == null) {

        return;
    }
    if(name in collection){
        $('#addModal').modal('toggle');
        return;
    }

    collection[name] = [];
    bag.innerHTML += getCollectionItem(name);
    var allItems = document.querySelectorAll(".item");

    for (let j in allItems) {

        if (isNaN(j) == true) {
            continue;
        }
        allItems[j].addEventListener("mousedown", function(event) {
            

            if (event.button    == 0) {
                let modal_content = document.getElementById("modal_content");
                let modal_title = this.innerHTML;
                let movie_name_check = "";
                for (let i in collection[modal_title]) {
                    movie_name_check += `<input type="checkbox" value="${collection[modal_title][i]}">${collection[modal_title][i]}<br> `
                }
                console.log(movie_name_check);
                let str = `
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title">${modal_title}</h4>
        </div>
        <div class="modal-body">
          <form action = "#">
          ${movie_name_check}
          </form>
        </div>`;

                modal_content.innerHTML = str;

                $('#myModal').modal('toggle');

            } /*else if (event.button === 2) {

                let str = bag.innerHTML;

                var sure = confirm("Are YOU SURE YOU WANT TO DELETE THE COLLECTION");
                if (sure) {
                    let start = str.indexOf(this.innerHTML);
                    let end = str.indexOf(`</li>`, start);
                    bag.innerHTML = str.substring(0, start - 17) + str.substring(end + 5);

                    // non visual changes to be made here
                    delete collection[str];
                    console.log(collection);
                }


            }*/
        });



    }
    $('#addModal').modal('toggle');
    searchCB();
    /* Refresh search  results Amazing feature it is!*/
    /* Close the modal*/

});





//});

/* Callback for Search Movie Button click*/

function searchCB() {
    let temp = movie_name.value.trim();
    
    if (temp == "") {
        console.log("Will not work hehe");
        return;
    }
    // form the proper URL to be sent to the database and get the JSON using AJAX call
    var url = `https://api.themoviedb.org/3/search/movie?api_key=f49392b2198b0fa9fe90421c7d55a08e&query=${temp}`;
    var promise = getData(url);
    promise.then(
        function(data) {
            json_array = data;
            var search_result = "";
            for (key in data) {
                let x = getResultItem(key, data[key], collection);

                search_result += x;






            }
            if (search_result === "") {
                accordion.innerHTML = "DATA NOT FOUND";
            } else {
                accordion.innerHTML = search_result;
            }

            for (let i = 0; i < data.length; i += 1) {
                let bt = document.getElementById(`btn${i}`);



                bt.addEventListener("click", function(event) {
                    
                    let id = this.id;
                    let key = parseInt(id.replace("btn", ""), 10);

                    let parent = document.getElementById(`collapse${key}`);
                    let checkbox = parent.getElementsByTagName("input");

                    for (let i = 0; i < checkbox.length; i += 1) {

                        if (isNaN(i) == false) { // means number haha
                            if (checkbox[i].type === "checkbox" && checkbox[i].checked === true) {
                                let check_value = checkbox[i].value;
                                if (collection[check_value].indexOf(json_array[key]["original_title"]) === -1) {
                                    collection[check_value].push(json_array[key]["original_title"]);
                                    console.log(collection);
                                    // to avoid duplication
                                }
                            }
                        }
                    }


                });

            }

            /* add event listener to header element*/
            let panel_heading = document.querySelectorAll(`.panel-primary > .panel-heading`);
            if (panel_heading != null) {
                for (let k in panel_heading) {
                    if (isNaN(k) == false) {
                        panel_heading[k].addEventListener("click", function() {
                            let id = parseInt(this.id.substring(4));
                            console.log(id);
                            $(`#collapse${id}`).collapse('toggle');
                        });
                    }
                }
            }
        }
    );

    promise.catch(function(error) {

        accordion.innerHTML = error;
    });



}

/* Add Event Listener to the DELETE button here*/
dismiss.addEventListener("click", function() {
    let modal_title = document.querySelector(`.modal-title`);

    // Remove the selected items from the mapping or collections;
    let movie_name_check = document.querySelectorAll(`#myModal input`);

    for (let i in movie_name_check) {

        if (isNaN(i) === true) {
            continue;
        }
        if (movie_name_check[i].type === "checkbox" && movie_name_check[i].checked === true) {
            console.log("Yeah inside true checked");

            let index = collection[modal_title.innerHTML].indexOf(movie_name_check[i].value);
            collection[modal_title.innerHTML].splice(index, 1);
            $('#myModal').modal('toggle');


        }
    }
});