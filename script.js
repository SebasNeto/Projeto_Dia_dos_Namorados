document.addEventListener('DOMContentLoaded', (event) => {
    const princess = document.getElementById('princess');
    const prince = document.getElementById('prince');
    const hearts = document.querySelectorAll('.heart');
    const walls = document.querySelectorAll('.wall');
    const message = document.getElementById('message');
    
    let princessPosition = { top: 0, left: 0 };
    let collectedHearts = 0;
    const heartMessages = [
        "Você é meu mundo!",
        "Te amo mais que tudo!",
        "Você é a razão do meu sorriso!",
        "Cada batida do meu coração é por você!",
        "Nosso amor é eterno!",
        "Você é maravilhosa",
        "Amo você, princesa",
        "Você é linda",
        "Você é a estrela mais linda de todas",
        "A maior maravilha do mundo",
        "Obrigado por sempre estar ao meu lado"
    ];

    document.addEventListener('keydown', (e) => {
        let newTop = princessPosition.top;
        let newLeft = princessPosition.left;
        
        switch (e.key) {
            case 'ArrowUp':
                newTop -= 10;
                break;
            case 'ArrowDown':
                newTop += 10;
                break;
            case 'ArrowLeft':
                newLeft -= 10;
                break;
            case 'ArrowRight':
                newLeft += 10;
                break;
        }
        
        if (canMove(newTop, newLeft)) {
            princessPosition.top = newTop;
            princessPosition.left = newLeft;
            princess.style.top = princessPosition.top + 'px';
            princess.style.left = princessPosition.left + 'px';
        }

        hearts.forEach((heart, index) => {
            if (isColliding(princess, heart)) {
                heart.style.display = 'none';
                collectedHearts++;
                alert(heartMessages[index]);
                if (collectedHearts === hearts.length) {
                    if (isColliding(princess, prince)) {
                        showMessage("Feliz Dia dos Namorados! ❤️");
                    }
                }
            }
        });

        if (isColliding(princess, prince)) {
            prince.classList.add('hug');
            showMessage("Feliz Dia dos Namorados! ❤️");
        }
    });

    function canMove(newTop, newLeft) {
        princess.style.top = newTop + 'px';
        princess.style.left = newLeft + 'px';
        
        let canMove = true;
        walls.forEach((wall) => {
            if (isColliding(princess, wall)) {
                canMove = false;
            }
        });
        
        princess.style.top = princessPosition.top + 'px';
        princess.style.left = princessPosition.left + 'px';
        return canMove;
    }

    function isColliding(el1, el2) {
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    function showMessage(msg) {
        message.innerText = msg;
        message.style.display = 'block';
    }
});
