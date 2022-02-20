function displayModal() {
  const modal = document.getElementById("contact_modal");
modal.style.display = "block";
}
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
} 

document.querySelector (".contact_button")
.addEventListener ("click",function() {
  displayModal ()
} )

document.querySelector (".closecross")
.addEventListener ("click",function(){
  closeModal ()
})