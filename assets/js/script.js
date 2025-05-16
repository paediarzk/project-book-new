'use strict';

/**
 * load json file
 */

document.addEventListener("DOMContentLoaded", function () {
  fetch('./assets/data/data.json')
    .then(response => response.json())
    .then(data => {
      // section hero
      document.getElementById("hero-subtitle").textContent = data.hero.subtitle;
      document.getElementById("hero-title").textContent = data.hero.title;
      document.getElementById("hero-text").textContent = data.hero.text;
      document.getElementById("hero-image").src = data.hero.image;
      document.getElementById("hero-image").alt = data.hero.imageAlt;

      // section author
      document.getElementById("author-name").textContent = data.author.name;
      document.getElementById("author-style").textContent = data.author.style;
      document.getElementById("author-description").textContent = data.author.description;
      document.getElementById("author-image").src = data.author.image;

      // section benefits
      const benefitsList = document.getElementById("benefits-list");

      data.benefits.forEach(benefit => {
        const benefitItem = document.createElement('li');
        benefitItem.innerHTML = `
          <div class="benefits-card has-before has-after">
            <div class="card-icon">
              <img src="${benefit.icon}" width="40" height="40" loading="lazy" alt="${benefit.title}">
            </div>
            <h3 class="h3 card-title">${benefit.title}</h3>
            <p class="card-text">${benefit.text}</p>
            <a href="#" class="btn-link">
              <span class="span">${benefit.linkText}</span>
              <ion-icon name="chevron-forward-outline" aria-hidden="true"></ion-icon>
            </a>
          </div>`;
        benefitsList.appendChild(benefitItem);
      });

      // section pricing
      const pricingList = document.getElementById('pricing-list');

      data.pricing.forEach(plan => {
        const pricingItem = document.createElement('li');
        pricingItem.innerHTML = `
          <div class="pricing-card">
            <h3 class="h3 card-title">${plan.title}</h3>
            <data class="price" value="${plan.price}">${plan.currency}${plan.price}</data>
            <ul class="pricing-card-list">
              ${plan.features.map(feature => `<li class="card-item"><p class="card-text">${feature}</p></li>`).join('')}
            </ul>
            <a href="${plan.link}" class="btn ${plan.buttonClass}">${plan.buttonText}</a>
          </div>
        `;
        pricingList.appendChild(pricingItem);
      });

      // section chapters
      const chapterList = document.getElementById('chapter-list');

      data.chapters.forEach(chapter => {
        const chapterItem = document.createElement('li');
        chapterItem.innerHTML = `
          <div class="chapter-card">
            <p class="card subtitle">${chapter.number}</p>
            <h3 class="h3 card-title">${chapter.title}</h3>
            <p class="card-text">${chapter.description}</p>
          </div>`;
        chapterList.appendChild(chapterItem);
      });
    })
    .catch(error => {
      console.error("Error loading data:", error);
    });
});
    


/**
 * add event element
 */

const addEventOnelem = function (elem, type, callback) {
    if (elem.length > 1) {
      for (let i = 0; i < elem.length; i++) {
        elem[i].addEventListener(type, callback);
      }
    } else {
      elem.addEventListener(type, callback);
    }
  }



/**
 * toggle navbar
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
}

addEventOnelem(navToggler, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnelem(navbarLinks, "click", closeNavbar);


/**
 * header active scroll down to 100px
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
    if (window.scrollY > 100) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  }
  
  addEventOnelem(window, "scroll", activeHeader);


/**
 *  filter tab
 */

const tabCard = document.querySelectorAll("[data-tab-card]");

let lastTabCard = tabCard[0];

const navigateTab = function () {
  lastTabCard.classList.remove("active");
  this.classList.add("active");
  lastTabCard = this;
}

addEventOnelem(tabCard, "click", navigateTab);


/*============== 
VALIDATION FORM 
===============*/

$(document).ready(function() {
    // add event listener btn "send now"
    $("#send-button").click(function(event) {
      
      // Prevent the form from submitting
      event.preventDefault();
  
      // Get the input fields and their values
      var name = $("#name").val().trim();
      var email = $("#email").val().trim();
      var subject = $("#subject").val().trim();
      var message = $("#message").val().trim();
  
      // Menghapus pesan error sebelumnya
      $("#name-error").text("");
      $("#email-error").text("");
      $("#subject-error").text("");
      $("#message-error").text("");
  
      // Validation checks
      var valid = true;
  
      // Check if the name field is empty
      if (name === "") {
        $("#name-error").text("Name is required.");
        valid = false;
      }
  
      // Check if the email field is empty
      if (email === "") {
        $("#email-error").text("Email is required.");
        valid = false;
      // Check if the email field contains an "@" symbol
      } else if (!email.includes("@gmail.com")) {
        $("#email-error").text("Please enter a valid email address.");
        valid = false;
      }
  
      // Check if the subject field is empty
      if (subject === "") {
        $("#subject-error").text("Subject is required.");
        valid = false;
      }
  
      // Check if the message field is empty
      if (message === "") {
        $("#message-error").text("Write your text.");
        valid = false;
      }
  
      // If all validations pass
      if (valid) {
        // Display a success message
        alert("Message submitted successfully!");
  
        // Reset the form to clear all fields
        $("#contact-form")[0].reset();
      }
    });
});

  


