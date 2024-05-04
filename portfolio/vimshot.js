// Personal High Score: 89

const vs_button = document.getElementById("vimshot");
const vs_dialog = document.getElementById("vimshot-dialog");
const vs_window = document.getElementById("vimshot-window");
const vs_canvas = document.getElementById("vimshot-game")
const vs_ctx = vs_canvas.getContext("2d");
vs_ctx.font = "32px VT323";
let vs_open = false;

const vs_mobile_controls = {
    h: document.getElementById('vimshot-h'),
    j: document.getElementById('vimshot-j'),
    k: document.getElementById('vimshot-k'),
    l: document.getElementById('vimshot-l'),
}

vs_mobile_controls.h.addEventListener("click", e => {
    if (!vs_open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('h')
        vs_shot_timer = vs_shot_timer_max;
    }
})
vs_mobile_controls.j.addEventListener("click", e => {
    if (!vs_open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('j')
        vs_shot_timer = vs_shot_timer_max;
    }
})
vs_mobile_controls.k.addEventListener("click", e => {
    if (!vs_open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('k')
        vs_shot_timer = vs_shot_timer_max;
    }
})
vs_mobile_controls.l.addEventListener("click", e => {
    if (!vs_open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('l')
        vs_shot_timer = vs_shot_timer_max;
    }
})

vs_button.addEventListener("click", e => {
    vs_dialog.showModal();
    vs_open = true;
});

vs_dialog.addEventListener("click", e => {
    vs_dialog.close();
    vs_open = false;
})

vs_window.addEventListener("click", e => {
    e.stopPropagation();
})

const vs_aabb = (a, b) => (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y);

const vs_bullet_speed = 10;
let vs_shot_timer = 0;
const vs_shot_timer_max = 15;
function vs_init_bullet(dx, dy) {
    return {
        x: 320-4,
        y: 240-4,
        w: 8,
        h: 8,
        dx: dx,
        dy: dy,
        draw: function() {
            vs_ctx.fillStyle = "#008000FF";
            vs_ctx.fillRect(this.x, this.y, this.w, this.h)
        },
        update: function() {
            this.x += this.dx;
            this.y += this.dy;
        }
    }
}

let vs_enemy_spawn_timer = 0;
let vs_enemy_spawn_mod = 0;
const vs_enemies = [];
function vs_init_enemy(x, y, dx, dy) {
    return {
        x: x,
        y: y,
        w: 32,
        h: 32,
        dx: dx,
        dy: dy,
        draw: function() {
            vs_ctx.fillStyle = "#008000FF";
            vs_ctx.fillRect(this.x, this.y, this.w, this.h);
        }, 
        update: function() {
            this.x += this.dx;
            this.y += this.dy;
        }
    }
}


const vs_player = {
    x: 320-32,
    y: 240-32,
    w: 64,
    h: 64,
    bullets: [],
    score: 0,
    lives: 3,
    draw: function () {
        vs_ctx.fillStyle = "#008000FF";
        vs_ctx.fillRect(this.x, this.y, this.w, this.h);
        this.bullets.forEach(bullet => {
            bullet.draw();
        })
    },
    input: function (dir) {
        switch(dir) {
            case 'h':
                const h_bullet = vs_init_bullet(-vs_bullet_speed, 0)
                this.bullets.push(h_bullet);
                break;
            case 'j':
                const j_bullet = vs_init_bullet(0, vs_bullet_speed);
                this.bullets.push(j_bullet);
                break;
            case 'k':
                const k_bullet = vs_init_bullet(0, -vs_bullet_speed);
                this.bullets.push(k_bullet);
                break;
            case 'l':
                const l_bullet = vs_init_bullet(vs_bullet_speed, 0);
                this.bullets.push(l_bullet);
                break;
        }
    },
    update: function() {
        this.bullets.forEach((bullet, i) => {
            bullet.update();
            if (bullet.x > 640 || bullet.x < 0 || bullet.y > 480 || bullet.y < 0)
                this.bullets.splice(i, 1);
            vs_enemies.forEach((enemy, j) => {
                if (vs_aabb(bullet, enemy)) {
                    this.bullets.splice(i, 1);
                    vs_enemies.splice(j, 1);
                    if (this.score++ % 3 == 0 && vs_enemy_spawn_mod < 60)
                        vs_enemy_spawn_mod++;
                }
            })
        })
    }
}

vs_dialog.addEventListener("keydown", e => {
    e.preventDefault();
    if (!vs_open) return;
    if (e.code == "Escape") {
        vs_dialog.close();
        vs_open = false;
    }
    if (vs_shot_timer == 0) {
        if (e.code == "KeyH") {
            vs_player.input('h')
            vs_shot_timer = vs_shot_timer_max;
        }
        if (e.code == "KeyJ") {
            vs_player.input('j')
            vs_shot_timer = vs_shot_timer_max;
        }
        if (e.code == "KeyK") {
            vs_player.input('k')
            vs_shot_timer = vs_shot_timer_max;
        }
        if (e.code == "KeyL") {
            vs_player.input('l')
            vs_shot_timer = vs_shot_timer_max;
        }
    }
}, false)


setInterval(() => {
    if (!vs_open || vs_player.lives == 0) return;
    if (vs_shot_timer > 0) vs_shot_timer--;
    if (vs_enemy_spawn_timer++ % 90 - vs_enemy_spawn_mod == 0) {
        const rng = Math.floor(Math.random() * 4);
        switch(rng) {
            case 0:
                const h_enemy = vs_init_enemy(-32, 240-16, 1 + vs_player.score / 10, 0);
                vs_enemies.push(h_enemy);
                break;
            case 1:
                const j_enemy = vs_init_enemy(320-16, 480, 0, -1 - vs_player.score / 10);
                vs_enemies.push(j_enemy);
                break;
            case 2:
                const k_enemy = vs_init_enemy(320-16, -32, 0, 1 + vs_player.score / 10);
                vs_enemies.push(k_enemy);
                break;
            case 3:
                const l_enemy = vs_init_enemy(640, 240-16, -1 - vs_player.score / 10, 0);
                vs_enemies.push(l_enemy);
                break;
        }
    }
    vs_enemies.forEach((enemy, i) => { 
        enemy.update() 
        if (vs_aabb(enemy, vs_player)) {
            vs_enemies.splice(i, 1);
            vs_player.lives--;
        }
    });

    vs_player.update();
}, 16)

setInterval(() => {
    if (!vs_open) return;
    vs_ctx.clearRect(0, 0, 640, 480);
    vs_ctx.fillStyle = "#00800030";
    vs_ctx.fillRect(0, 0, 640, 480);
    if (vs_player.lives == 0) {
        vs_ctx.fillStyle = "#008000FF";
        vs_ctx.fillText("GAME OVER!", 320-64, 240);
        return;
    }
    vs_player.draw();
    vs_enemies.forEach(enemy => enemy.draw());
    vs_ctx.fillText(`Score: ${vs_player.score}`, 32, 32);
    vs_ctx.fillText(`Lives: ${vs_player.lives}`, 512, 32);
}, 16)