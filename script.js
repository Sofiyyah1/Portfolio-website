const navbarToggle = document.querySelector(".navbar__toggle");
const navbarList = document.querySelector(".navbar__list");

navbarToggle.addEventListener("click", () => {
  navbarList.classList.toggle("navbar__list--open");
});

// Toast

const notifications = document.querySelector(".notifications");
const btn = document.querySelector(".contact__button");

const toastDetails = {
  timer: 5000,
  success: {
    icon: "fa-circle-check",
    text: "Success: This is a success toast.",
  },
};

const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
  setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
};

const createToast = (id) => {
  // Getting the icon and text for the toast based on the id passed
  const { icon, text } = toastDetails[id];
  const toast = document.createElement("li"); // Creating a new 'li' element for the toast
  toast.className = `toast ${id}`; // Setting the classes for the toast
  // Setting the inner HTML for the toast
  toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast); // Append the toast to the notification ul
  // Setting a timeout to remove the toast after the specified duration
  toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  btn.value = "Sending...";

  const serviceID = "default_service";
  const templateID = "template_ka1mdpi";

  emailjs.sendForm(serviceID, templateID, this).then(
    () => {
      btn.value = "Send Email";
      // alert("Sent!");
      createToast(btn.id);
    },
    (err) => {
      btn.value = "Send Email";
      // alert(JSON.stringify(err));
    }
  );
});
