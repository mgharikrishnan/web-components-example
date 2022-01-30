//Creating a template here
const template = document.createElement('template');
//Setting the content for the template
template.innerHTML = `
    <style>
        .user-card {
            font-family: 'Arial', sans-serif;
            background: #f4f4f4;
            width: 500px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 15px;
            border-bottom: darkorchid 5px solid;
        }

        .user-card img {
            width: 100%;
        }

        .user-card button {
            cursor: pointer;
            background: darkorchid;
            color: #fff;
            border: 0;
            border-radius: 5px;
            padding: 5px 10px;
        }
    </style>

    <div class="user-card">
        <img/>
        <div>
            <h3></h3>
            <div class="info">
                <p><slot name="email"/></p>
                <p><slot name="phone"/></p>
            </div>  
            <button id="toggle-info">Hide info</button>    
        </div>    
    </div>
`;

class UserCard extends HTMLElement {
    //This constructor will run right away
    constructor(){
        //This is to call the constructor of HTMLElement class which we are extending
        super();

        
        this.showInfo = true;       

        //To encapsulate everything into a web component
        this.attachShadow({mode: 'open'});
        //Appending the created template into the shadowRoot
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        //From here on, we will be using shadowRoot to use the select the stuffs from our custom element or web component
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
       // this.innerHTML = `<h2>${this.getAttribute('name')}</h2>`;       
    }

    //This method is added to hide or show the email id & phone no on the click of toggle-info button.
    toggleInfo() {
        this.showInfo = !this.showInfo;

        const info = this.shadowRoot.querySelector('.info');
        const toogleBtn = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo){
            info.style.display = 'block';
            toogleBtn.innerText = 'Hide Info';
        } else {
            info.style.display = 'none';
            toogleBtn.innerText = 'Show Info';
        }
    }

    //This will be called everytime the element is inserted into DOM
    connectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    //If it is taken out of the DOM, then it will remove the event
    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }
}

//Here we are defining the custom element
window.customElements.define('user-card', UserCard);