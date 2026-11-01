
const eleve = document.getElementById('eleve');
const etudiant = document.getElementById('etudiant');
const btn = document.getElementById('btnSoumettre');
const message = document.getElementById('message')

// 1. On ne peut pas cocher les 2 en même temps
eleve.addEventListener('change', () => {
  if(eleve.checked) etudiant.checked = false;
});

etudiant.addEventListener('change', () => {
  if(etudiant.checked) eleve.checked = false;
});

// 2. Redirection
btn.addEventListener('click', (e) => {
  e.preventDefault();

  if(eleve.checked){
    // MET TA PAGE ÉLÈVE ICI
    window.location.href = "lycee.html"; 
  } else if(etudiant.checked){
    // MET TA PAGE ÉTUDIANT ICI
    window.location.href = "univ.html";
  } else {
    //alert("Choisis Élève ou Étudiant");
    //message.textContent="Coché un élément avant de soumettre"
  }
});
