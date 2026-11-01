let matieres = []

// On récupère les éléments HTML pour les utiliser en JS
const matiereInput = document.getElementById('matiereInput')
const listeMatieres = document.getElementById('listeMatieres')
const zoneNotes = document.getElementById('zoneNotes')
const phase1 = document.getElementById('phase1')
const phase2 = document.getElementById('phase2')
const message = document.getElementById('message')

// =========================================
// ETAPE 1 : AJOUTER UNE MATIERE
// =========================================
document.getElementById('btnMatiere').addEventListener('click', () => {
    let nom = matiereInput.value.trim() // on enlève les espaces vides
    
    if (nom !== "") { // si l'utilisateur a bien tapé quelque chose
        matieres.push(nom) // on l'ajoute dans le tableau matieres
        listeMatieres.textContent = "" + matieres.join(', ')
        listeMatieres.style.color = "#fff"
        listeMatieres.style.fontWeight = "bold"
        matiereInput.value = "" // on vide la case pour la prochaine
    }
})

// =========================================
// ETAPE 2 : VALIDER ET CREER LES CASES NOTES + COEFFS
// C'est ici que tu bloquais
// =========================================
document.getElementById('btnValider').addEventListener('click', () => {
    if (matieres.length === 0) {
        listeMatieres.textContent = "aucune matière ajouter"
        return
    }
    
    // On cache la phase 1 et on montre la phase 2
    phase1.style.display = "none"
    phase2.style.display = "block"
    
    // On crée automatiquement une ligne pour chaque matière
    // .map() = "pour chaque matière, crée moi ce morceau de HTML"
    zoneNotes.innerHTML = matieres.map(matiere => `
    <div style="margin-bottom:0px">
      <label style="color:white;"><b>${matiere}</b> : </label>
      <input type="number" class="note" placeholder="Note /20" style="width:60%; margin-bottom:5px;"><br>
      <label style="color:white;"><b>Coeff:</b></label>
      <input type="number" class="coef" placeholder="Coeff" value="1" style="width:65%;">
      <p class="zoneMessage"></p>
    </div>
  `).join('') // .join('') colle tout ensemble
    
})

// =========================================
// ETAPE 3 : CALCULER LA MOYENNE COEFFICIEE
// =========================================
document.getElementById('btnCalculer').addEventListener('click', () => {
    // On récupère TOUTES les cases notes et toutes les cases coeffs
    const notesInputs = document.querySelectorAll('.note')
    const coefInputs = document.querySelectorAll('.coef')
    const message = document.getElementById('message')
    //const zoneMessage = document.querySelectorAll('.zoneMessage')
    
    
    let totalPoints = 0 // va contenir la somme de (note * coeff)
    let totalCoef = 0 // va contenir la somme des coeffs
    
    // On boucle sur chaque ligne
    for (let i = 0; i < notesInputs.length; i++) {
        let note = parseFloat(notesInputs[i].value) // transforme "12" en 12
        let coef = parseFloat(coefInputs[i].value) // ta variable coef
        
        // On vérifie que l'utilisateur a bien rempli les 2 cases
        if (!isNaN(note) && !isNaN(coef)) {
            totalPoints += note * coef // ex: 12 * 3 = 36
            //zoneMessage.textContent=" note * coef"
            totalCoef += coef // ex: 3
        }
    }
    
    // On évite la division par zéro
    if (totalCoef === 0) {
        document.getElementById('resultat').textContent = "Remplis au moins une note"
        return
    }
    
    // Formule de la moyenne coefficiée : totalPoints / totalCoef
    let moyenne = totalPoints / totalCoef;
    
    
    // On affiche le résultat
    document.getElementById('resultat').textContent = "Moyenne : " + moyenne.toFixed(2) + " / 20"
    if (moyenne < 10) {
        message.textContent = "travail insuffisant "
        return
    } else if (moyenne >= 10 && moyenne < 12) {
        message.textContent = "Passable"
        message.style.color = "#9118C4"
        return
    } else if (moyenne >= 12 && moyenne < 14) {
        message.textContent = "Assez bien "
        message.style.color = "#48ED1E"
        return
    } else if (moyenne >= 14 && moyenne < 16) {
        message.textContent = "Bien "
        message.style.color = "#48ED1E"
        return
    } else if (moyenne >= 16 && moyenne < 18) {
        message.textContent = "Très Bien "
        message.style.color = "#48ED1E"
        return
    } else {
        message.textContent = "Excellent"
        message.style.color = "#48ED1E"
        return
    }
})