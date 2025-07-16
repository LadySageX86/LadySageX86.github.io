const engine = {
    // constants
    SCREEN_WIDTH: 640,
    SCREEN_HEIGHT: 480,
    FPS: 1000/60,
    OSCTRL_DOWN: ['mousedown', 'touchstart'],
    OSCTRL_UP: ['mouseup', 'touchend'],
    // engine initialization
    init: (gameId) => {
        const btn = document.getElementById(gameId);
        const dialog = document.getElementById(`${gameId}-dialog`);
        const win = document.getElementById(`${gameId}-window`);
        const cvs = document.getElementById(`${gameId}-game`)
        const ctx = cvs.getContext("2d");
        ctx.font = "32px VT323";
        let open = false;

        return { btn, dialog, win, cvs, ctx, open };
    },
    setup_window: (game) => {
        game.btn.addEventListener("click", e => {
            game.dialog.showModal();
            game.open = true;
        });
        game.dialog.addEventListener("click", e => {
            game.dialog.close();
            game.open = false;
        })
        game.win.addEventListener("click", e => {
            e.stopPropagation();
        })
    },
    // input
    kb_ctrl: (game, cbd=(e)=>{}, cbu=(e)=>{}) => {
        game.dialog.addEventListener("keydown", e => {
            e.preventDefault();
            if (!game.open) return;
            if (e.code == "Escape") {
                game.dialog.close();
                game.open = false;
            }
            cbd(e);
        })
        game.dialog.addEventListener("keyup", e => {
            cbu(e);
        })
    },
    // graphics
    bg: (ctx) => {
        ctx.clearRect(0, 0, 640, 480);
        ctx.fillStyle = "#80008030";
        ctx.fillRect(0, 0, 640, 480);
    },
    draw: (ctx, obj, color="#800080FF") => {
        ctx.fillStyle = color;
        ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    },
    gameOver: (ctx) => {
        ctx.fillStyle = "#800000FF";
        ctx.fillText("GAME OVER!", 320-64, 240);
    },
    // common functionality
    aabb: (a, b) => (a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y),
    move: (obj) => {
        obj.x += obj.dx;
        obj.y += obj.dy;
    },
}
