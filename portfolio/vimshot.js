// Personal High Score: 99

const vs_main = engine.init("vimshot");
engine.setup_window(vs_main);

const vs_mobile_controls = {
    h: document.getElementById('vimshot-h'),
    j: document.getElementById('vimshot-j'),
    k: document.getElementById('vimshot-k'),
    l: document.getElementById('vimshot-l'),
}

vs_mobile_controls.h.addEventListener("click", e => {
    if (!vs_main.open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('h')
        vs_shot_timer = vs_shot_timer_max;
    }
})
vs_mobile_controls.j.addEventListener("click", e => {
    if (!vs_main.open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('j')
        vs_shot_timer = vs_shot_timer_max;
    }
})
vs_mobile_controls.k.addEventListener("click", e => {
    if (!vs_main.open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('k')
        vs_shot_timer = vs_shot_timer_max;
    }
})
vs_mobile_controls.l.addEventListener("click", e => {
    if (!vs_main.open) return;
    if (vs_shot_timer == 0) {
        vs_player.input('l')
        vs_shot_timer = vs_shot_timer_max;
    }
})

const vs_bullet_speed = 10;
let vs_shot_timer = 0;
const vs_shot_timer_max = 15;
function vs_init_bullet(dx, dy) {
    return {
        x: engine.SCREEN_WIDTH/2-4,
        y: engine.SCREEN_HEIGHT/2-4,
        w: 8,
        h: 8,
        dx: dx,
        dy: dy,
        draw: function() {
            engine.draw(vs_main.ctx, this);
        },
        update: function() {
            engine.move(this)
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
            engine.draw(vs_main.ctx, this);
        }, 
        update: function() {
            engine.move(this);
        }
    }
}

const vs_player = {
    x: engine.SCREEN_WIDTH/2-32,
    y: engine.SCREEN_HEIGHT/2-32,
    w: 64,
    h: 64,
    bullets: [],
    score: 0,
    lives: 3,
    draw: function () {
        engine.draw(vs_main.ctx, this);
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
                if (engine.aabb(bullet, enemy)) {
                    this.bullets.splice(i, 1);
                    vs_enemies.splice(j, 1);
                    if (this.score++ % 3 == 0 && vs_enemy_spawn_mod < 60)
                        vs_enemy_spawn_mod++;
                }
            })
        })
    }
}

engine.kb_ctrl(vs_main, e => {
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
    if (!vs_main.open || vs_player.lives == 0) return;
    if (vs_shot_timer > 0) vs_shot_timer--;
    if (vs_enemy_spawn_timer++ % 90 - vs_enemy_spawn_mod == 0) {
        const rng = Math.floor(Math.random() * 4);
        switch(rng) {
            case 0:
                const h_enemy = vs_init_enemy(-32, engine.SCREEN_HEIGHT/2-16, 1 + vs_player.score / 10, 0);
                vs_enemies.push(h_enemy);
                break;
            case 1:
                const j_enemy = vs_init_enemy(engine.SCREEN_WIDTH/2-16, engine.SCREEN_HEIGHT, 0, -1 - vs_player.score / 10);
                vs_enemies.push(j_enemy);
                break;
            case 2:
                const k_enemy = vs_init_enemy(engine.SCREEN_WIDTH/2-16, -32, 0, 1 + vs_player.score / 10);
                vs_enemies.push(k_enemy);
                break;
            case 3:
                const l_enemy = vs_init_enemy(engine.SCREEN_WIDTH, engine.SCREEN_HEIGHT/2-16, -1 - vs_player.score / 10, 0);
                vs_enemies.push(l_enemy);
                break;
        }
    }
    vs_enemies.forEach((enemy, i) => { 
        enemy.update() 
        if (engine.aabb(enemy, vs_player)) {
            vs_enemies.splice(i, 1);
            vs_player.lives--;
        }
    });

    vs_player.update();
}, engine.TICK)

setInterval(() => {
    if (!vs_main.open) return;
    engine.bg(vs_main.ctx);
    if (vs_player.lives == 0) 
        return engine.gameOver(vs_main.ctx);
    vs_player.draw();
    vs_enemies.forEach(enemy => enemy.draw());
    vs_main.ctx.fillText(`Score: ${vs_player.score}`, 32, 32);
    vs_main.ctx.fillText(`Lives: ${vs_player.lives}`, 512, 32);
}, engine.TICK)