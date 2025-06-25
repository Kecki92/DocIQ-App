const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

document.getElementById('sign-in-form').addEventListener('submit', function(event) {
    event.preventDefault(); // verhindert das Neuladen
    // Optional: hier könntest du Eingaben prüfen oder simulieren
    window.location.href = "/Dashboard/dashboard.html"; // oder dein Pfad zur Dashboard-Seite
});