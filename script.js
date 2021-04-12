const PLUS_INFO = "Immagini/plusInfo.jpg";
const MINUS_INFO = "Immagini/minusInfo.jpg";
const PLUS_PREFERENCE = "Immagini/plusPreference.jpg";
const MINUS_PREFERENCE = "Immagini/minusPreference.jpg";

const section = document.querySelector("section");
createBlocks();

const blockInfoList = document.querySelectorAll(".info");
for (const blockInfo of blockInfoList) {
    blockInfo.addEventListener("click", addContent);

}
const blockContentList = document.querySelectorAll(".content");
for (const blockContent of blockContentList) {
    blockContent.classList.add("hidden");
}
const blockPreferenceList = document.querySelectorAll(".preference");
for (const blockPreference of blockPreferenceList) {
    blockPreference.addEventListener("click", addPreference);
}




/* Start Function Declarations */

function addContent(event) {
    const content = event.currentTarget.parentNode.parentNode.querySelector(".content");
    content.classList.remove("hidden");
    event.currentTarget.src = MINUS_INFO;
    event.currentTarget.removeEventListener("click", addContent);
    event.currentTarget.addEventListener("click", removeContent);
}

function removeContent(event) {
    const content = event.currentTarget.parentNode.parentNode.querySelector(".content");
    content.classList.add("hidden");
    event.currentTarget.src = PLUS_INFO;
    event.currentTarget.removeEventListener("click", removeContent);
    event.currentTarget.addEventListener("click", addContent);
}

function addPreference(event) {

    event.currentTarget.src = MINUS_PREFERENCE;

    /* Creation Block Choice */
    const choice = document.createElement("div");
    choice.classList.add("choice");
    document.querySelector("#choices").appendChild(choice);

    /* Creation Title_Choice and Img */
    const title_choice = document.createElement("div");
    title_choice.classList.add("title_choice");
    choice.appendChild(title_choice);

    const image_choice = document.createElement("img");
    image_choice.classList.add("image_choice");
    image_choice.src = event.currentTarget.parentNode.parentNode.querySelector(".content img").src;
    choice.appendChild(image_choice);

    /* Creation h1 and img in title_choice */
    const h1 = document.createElement("h1");
    h1.textContent = event.currentTarget.parentNode.querySelector(".name").textContent;
    title_choice.appendChild(h1);
    const img = document.createElement("img");
    img.src = MINUS_PREFERENCE;
    title_choice.appendChild(img);

    document.querySelector("#preferences").classList.remove("hidden");

    img.addEventListener("click", removePreference);
    event.currentTarget.removeEventListener("click", addPreference);
    event.currentTarget.addEventListener("click", removePreference);
}

function removePreference(event) {
    if (event.currentTarget.parentNode.classList == "title_choice") {
        const name_choice = event.currentTarget.parentNode.querySelector("h1").textContent;
        event.currentTarget.parentNode.parentNode.remove();
        const nameList = document.querySelectorAll(".name");
        for (const name of nameList) {
            if (name.textContent === name_choice) {
                const img = name.parentNode.querySelector(".preference");
                img.src = PLUS_PREFERENCE;
                img.removeEventListener("click", removePreference);
                img.addEventListener("click", addPreference);
                break;
            }
        }
    } else if (event.currentTarget.parentNode.classList == "title") {
        event.currentTarget.src = PLUS_PREFERENCE;
        const name_title = event.currentTarget.parentNode.querySelector(".name").textContent;
        const name_choiceList = document.querySelectorAll(".title_choice h1");
        for (const name_choice of name_choiceList) {
            if (name_choice.textContent === name_title) {
                name_choice.parentNode.parentNode.remove();
                event.currentTarget.removeEventListener("click", removePreference);
                event.currentTarget.addEventListener("click", addPreference);
                break;
            }
        }
    }
    if (document.querySelector(".choice") == null) {
        document.querySelector("#preferences").classList.add("hidden");
    }

}

function searchBlock(event) {
    const str = event.currentTarget.value.toLowerCase();
    const blockList = document.querySelectorAll(".block");
    for (const block of blockList) {
        const title = block.querySelector(".name").textContent.toLowerCase();
        
        if (str != "") {
            block.classList.add("hidden");
        } else {
            block.classList.remove("hidden");
        }
        let j = 0, i = 0; 
        for (i = 0; i < str.length; i++) {
            if (str[i] == title[i]) {
                j++;
            }
        }
        if(i == j) {
            block.classList.remove("hidden");
        }

    }
}

/* Main Function */

function createBlocks() {

    /* Creation Preferences */
    const preferences = document.createElement("div");
    preferences.id = "preferences";
    preferences.classList.add("pref", "hidden");
    section.appendChild(preferences);

    /* Creation Title_Preferences and Choiches */
    const title_preferences = document.createElement("h1");
    title_preferences.id = "title_preferences";
    title_preferences.textContent = "Ristoranti Preferiti";
    preferences.appendChild(title_preferences);
    const choiches = document.createElement("div");
    choiches.id = "choices";
    preferences.appendChild(choiches);

    /* Creation Title_Blocks */
    const title_blocks = document.createElement("h1");
    title_blocks.id = "title_blocks";
    title_blocks.textContent = "Tutti i Ristoranti";
    section.appendChild(title_blocks);

    /* Creation Input_Block */
    const input_block = document.createElement("div");
    input_block.id = "input_block";
    section.appendChild(input_block);
    const input = document.createElement("input");
    input.type = "text";
    input.addEventListener("keyup", searchBlock);
    const span = document.createElement("span");
    span.textContent = "Cerca: ";
    input_block.appendChild(span);
    input_block.appendChild(input);

    /* Creation all main blocks */
    let block, title, content;
    let name, info, img_title; //title
    let text, address, description, img_content; //content

    for (const obj of LIST_RESTAURANTS) {

        /* Creation Block */
        block = document.createElement("div");
        block.classList.add("block");
        section.appendChild(block);

        /* Creation Title */
        title = document.createElement("div");
        title.classList.add("title");
        block.appendChild(title);

        name = document.createElement("h1");
        name.classList.add("name");
        name.textContent = obj.name;
        title.appendChild(name);
        info = document.createElement("img");
        info.classList.add("info");
        info.src = PLUS_INFO;
        title.appendChild(info);
        img_title = document.createElement("img");
        img_title.classList.add("preference");
        img_title.src = PLUS_PREFERENCE;
        title.appendChild(img_title);

        /* Creation Content */
        content = document.createElement("div");
        content.classList.add("content");
        block.appendChild(content);

        text = document.createElement("div");
        text.classList.add("text");
        content.appendChild(text);
        img_content = document.createElement("img");
        img_content.src = obj.image;
        content.appendChild(img_content);

        /* Creation div for address and description */
        address = document.createElement("div");
        address.textContent = obj.address;
        text.appendChild(address);
        description = document.createElement("div");
        description.textContent = obj.description;
        text.appendChild(description);
    }
}