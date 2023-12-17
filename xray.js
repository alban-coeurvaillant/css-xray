const xray = document.createElement('style');
const xrayStyle = "*{background:#09367278!important;color:#0f0!important;outline:solid #f00 1px!important;}";
xray.innerHTML = xrayStyle;
const xraysInPage = [...document.body.getElementsByTagName("style")].filter(style => style.innerHTML === xrayStyle);
const style = `
    background: #ff000aab !important;
    font-size: 1rem;
    left: 0;
    z-index: 5;
    overflow: scroll;
    padding: 1em;
    display: none; // Ajoutez cette ligne pour cacher le span par défaut
`;
if (xraysInPage.length > 0) {
    xraysInPage.forEach(style => document.body.removeChild(style));
}
else {
    const divs = document.querySelectorAll('div');
    divs.forEach(div => {
        const divInfo = document.createElement('span');
        const id = div.id;
        const className = div.className;
        if (id !== '' || className !== '') {
            divInfo.innerHTML = `ID: ${id}, Class: ${className}`;
            divInfo.classList.add('debugging-element'); // Ajoute la classe 'debugging-element' au span
            divInfo.style.cssText = style; // Applique le style à l'élément span
            div.appendChild(divInfo);

            // Créez une popover au survol de l'élément
            div.addEventListener('mouseover', function() {
                div.classList.add('active'); // Ajoute la classe 'active' à la div courante
                const popover = document.createElement('div');
                popover.style.position = 'fixed'; // Changez cette ligne pour positionner la popover en position fixe
                popover.style.background = '#000'; // Changez cette ligne pour définir le fond de la popover en noir
                popover.style.color = '#0f0'; // Changez cette ligne pour définir la couleur du texte de la popover en vert
                popover.style.border = '1px solid #000';
                popover.style.padding = '10px';
                popover.style.fontSize = '9px';
                popover.style.opacity = '1';
                popover.style.zIndex = '10';
                popover.style.top = '40px'; // Positionne la popover à 40px du haut de la page
                popover.style.left = '40px'; // Positionne la popover à 40px de la gauche de la page
                popover.style.width = '200px'; // Définit la largeur de la popover à 200px
                popover.style.height = 'auto'; // Définit la hauteur de la popover à 300px
                popover.style.overflowY = 'scroll'; // Supprimez ou commentez cette ligne pour supprimer l'overflow
                popover.innerHTML = divInfo.innerHTML;
                document.body.appendChild(popover);
            });

            // Supprimez la popover lorsque la souris quitte l'élément
            div.addEventListener('mouseout', function() {
                div.classList.remove('active'); // Supprime la classe 'active' de la div courante

                const popover = document.querySelector('div[style*="position: fixed"]');
                if (popover) {
                    document.body.removeChild(popover);
                }
            });
        }
    });
    document.body.appendChild(xray);
}