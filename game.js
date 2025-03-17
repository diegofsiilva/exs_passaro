var config = {
    type: Phaser.AUTO, 
    width: 800,  // Largura da tela
    height: 600, // Altura da tela

    scene: {
        preload: preload, // Carrega as imagens e sprites
        create: create,   // Cria os elementos do jogo
        update: update    // Roda direto pra atualizar a movimentação
    }
};

// Cria o jogo com as configs acima
var game = new Phaser.Game(config);
var passarinho;

function preload() {
    this.load.image('bg', 'assets/bg_space.png'); // Carrega o fundo
    this.load.spritesheet('bird', 'assets/bird-green.png', { frameWidth: 75, frameHeight: 75 }); // Sprite do passarinho
}
function create() {
    this.add.image(400, 300, 'bg').setScale(1.2); // Adiciona o fundo no meio da tela e aumenta um pouco o tamanho
    passarinho = this.add.sprite(100, 300, 'bird').setScale(1.5); // Coloca o passarinho na tela já maiorzinho
    
//this.load.image('bg', 'assets/bg_space.png'); // Carrega o 
    this.anims.create({
        key: 'fly', // Nome da animação
        frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 7 }), // Pega os frames do sprite
        frameRate: 10, // Velocidade da animação (10 quadros por segundo)
        repeat: -1 // Faz a animação rodar infinitamente
    });
    passarinho.anims.play('fly', true);  // Começa a animação do passarinho

    // Iniciando os movimentos
    passarinho.idaX = true; // Começa indo pra direita
    passarinho.idaY = true; // Começa descendo
}
function update() {  

    const direcoes = ['x', 'y'];
    // Loop pra fazer o bichinho andar nos dois eixos
    for (let eixo of direcoes) {
        if (eixo === 'x') { // Movimento horizontal
            if (passarinho.idaX) { // Se estiver indo pra frente
                passarinho.x += 5; // Anda pra frente
                if (passarinho.x >= 700) { // Se chegou no limite direito
                    passarinho.idaX = false; // Começa a voltar
                    passarinho.setFlip(true, false); // Vira pro outro lado
                }
            } else { // Se estiver voltando
                passarinho.x -= 5; // Anda pra trás
                if (passarinho.x <= 100) { // Se chegou no limite esquerdo
                    passarinho.idaX = true; // Vai pra frente de novo
                    passarinho.setFlip(false, false); // Vira de novo pra direita
                }
            }
        } else if (eixo === 'y') { // Movimento vertical
            if (passarinho.idaY) { // Se estiver descendo
                passarinho.y += 10; // Anda pra baixo
                if (passarinho.y >= 600) { // Se chegou no limite inferior
                    passarinho.idaY = false; // Começa a subir
                }
            } else { // Se estiver subindo
                passarinho.y -= 10; // Anda pra cima
                if (passarinho.y <= 100) { // Se chegou no limite superior
                    passarinho.idaY = true; // Começa a descer de novo
                }
            }
        }
    }
}
