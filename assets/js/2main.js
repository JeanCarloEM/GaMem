if (typeof (window.iniBool) === "undefined" || !window.iniBool) {
  window.iniBool = function (v, padrao) {
    padrao = ((padrao !== false) && (padrao !== true)) ? false : padrao;
    return ((v !== false) && (v !== true)) ? padrao : v;
  };
}

if (typeof (window.isNum) === "undefined" || !window.isNum) {
  /*
   * VERIFICA SE UMA VARIAVEL EH NUMERICA
   *
   * @param   mixed   valor   a variavel a ser verificada
   * @returns bool            TRUE se for um int valido
   */
  window.isNum = function (valor) {
    return (!isNaN(parseFloat(valor)) && isFinite(valor));
  };
}

/* GERA UM ID */
if (typeof (window.guid) === "undefined" || !window.guid) {
  window.guid = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return "i" + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };
}

if (typeof (window.isNodeList) === "undefined" || !window.isNodeList) {
  window.isNodeList = function (nodes) {
    var stringRepr = Object.prototype.toString.call(nodes);

    return typeof nodes === 'object' &&
      /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
      (typeof nodes.length === 'number') &&
      (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
  };
}

if (typeof (window.isList) === "undefined" || !window.isList) {
  window.isList = function (nodes) {
    return (Array.isArray(nodes) || window.isNodeList(nodes));
  };
}

/* OBTEM O ID E SETA O MEMSO CASO INEXISTA */
if (typeof (window.getId) === "undefined" || !window.getId) {
  window.getId = function (el) {
    var id = seletor(el).attr('id');

    if (!id) {
      id = window.guid();
      seletor(el).attr('id', id);
    }

    return id;
  };
}

if (typeof (seletor) === "undefined" || !seletor) {
  function seletor(query, list) {
    list = window.iniBool(list);

    /*
     * IMPLEMENTAÇÃO DE $ (no estilo jquery)
     */

    /* DEVOLVE O OBJETO CASO NAO SEJA STGRING */
    if (typeof query !== "string") {
      return query;
    }

    /* SE FOR STRING TENTA LOCALIZAR */
    var r = document.querySelectorAll(query);

    if (r.length === 0) {
      return list ? [] : false;
    }

    if (r.length === 1) {
      return list ? r : r[0];
    }

    return r;
  }
}

/*
 * ENCAPSULAMENTO SEGURO
 * TRATAMENTOS DIVERSOS DA PAGINA
 *
 * @param object   w      window
 * @param object   $      link para document.querySelectorAll tratado
 */
(function (w, $, LOG, WARN, ERROR) {
  /* OS VARIOS FUNDOS POSSIVEIS
   * O NOME EH UM BASE64 COM A FONTE DE ONDE FOI EXTRAIDO
   * TODOS SAO LIVRES PARA REUTILIZACAO
   */
  w.bks = [
    "aHR0cHM6Ly9weGhlcmUuY29tL2VuL3Bob3RvLzEzMzAzNQ==.jpg",
    "aHR0cHM6Ly9jb21tb25zLndpa2ltZWRpYS5vcmcvd2lraS9GaWxlOk5BU0EtUmVkRHdhcmZQbGFuZXQtQXJ0aXN0Q29uY2VwdGlvbi0yMDEzMDcyOC5qcGc=.jpg",
    "aHR0cHM6Ly93d3cuanBsLm5hc2EuZ292L3NwYWNlaW1hZ2VzL2RldGFpbHMucGhwP2lkPXBpYTIyMDg1.jpg",
    "aHR0cHM6Ly9hcHBlbC5uYXNhLmdvdi8yMDEyLzA4LzAxL2tlcGxlci10aGUtbG9uZy1yb2FkLXRvLW90aGVyLXdvcmxkcy8=.jpg",
    "aHR0cHM6Ly93d3cuanBsLm5hc2EuZ292L3NwYWNlaW1hZ2VzL2RldGFpbHMucGhwP2lkPXBpYTE1MjU3.jpg",
    "aHR0cHM6Ly9weGhlcmUuY29tL2VuL3Bob3RvLzEyNjQ5NDA=.jpg",
    "aHR0cHM6Ly9jb21tb25zLndpa2ltZWRpYS5vcmcvd2lraS9GaWxlOkFfUGxhbmV0X2FzX0JpZ19hc19JdHNfU3Rhci5qcGc=.jpg",
    "aHR0cHM6Ly93d3cubmFzYS5nb3YvbWlzc2lvbl9wYWdlcy9XSVNFL25ld3Mvd2lzZTIwMTIwNzA1Lmh0bWw=.jpg",
    "aHR0cHM6Ly9jb21tb25zLndpa2ltZWRpYS5vcmcvd2lraS9GaWxlOlRoZV9kb3VibGVfYXN0ZXJvaWRfOTBfQW50aW9wZV8tX0VzbzA3MThhXyhub190YWdsaW5lKS5qcGc=.jpg"
  ];

  w.css = function (ele, at, val) {
    if ((typeof at === "string") && (typeof val === "string") && at && val) {

      ele = w.isList(ele) ? ele : [$(ele)];

      for (var i = 0; i < ele.length; i++) {
        if (typeof ele[i] === "object") {
          var rx = new RegExp("([\s]*" + at + ":[^;]*;[\s]*)", "ig");
          ele[i].attr('style', ((ele[i].attr('style')) && w.isList(ele[i].attr('style').match(rx))) ? ele[i].attr('style').replace(rx, at + ":" + val + ";") : ele[i].attr('style') + at + ":" + val + ";");
        }
      }
    } else {
      return false;
    }

    return true;
  };

  HTMLElement.prototype.stop = function () {
    if (this.tagName.toLowerCase() === "audio") {
      this.pause();
      this.currentTime = 0;
    }
  }

  HTMLElement.prototype.css = function (at, vl) {
    if (!vl) {
      var rx = new RegExp("([\s]*" + at + ":[^;]*;[\s]*)", "i");
      return (this.attr('style')) ? this.attr('style').match(rx, at + ":" + vl + ";") : '';
    } else {
      return w.css(this, at, vl);
    }
  };

  w.hasClass = function (ele, cls) {
    ele = w.isList(ele) ? ele : [$(ele)];

    for (var i = 0; i < ele.length; i++) {
      if (typeof ele[i] === "object") {
        if (!(!!ele[i].className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)')))) {
          return false;
        }
      }
    }

    return true;
  };

  HTMLElement.prototype.hasClass = function (cls) {
    return w.hasClass(this, cls);
  };

  w.addClass = function (ele, cls) {
    ele = w.isList(ele) ? ele : [$(ele)];

    for (var i = 0; i < ele.length; i++) {
      if (typeof ele[i] === "object") {
        if (!w.hasClass(ele[i], cls)) {
          ele[i].className += " " + cls;
        }
      }
    }
  };

  HTMLElement.prototype.addClass = function (cls) {
    return w.addClass(this, cls);
  };

  w.removeClass = function (ele, cls) {
    ele = w.isList(ele) ? ele : [$(ele)];

    for (var i = 0; i < ele.length; i++) {
      if (typeof ele[i] === "object") {
        if (w.hasClass(ele[i], cls)) {
          var reg = new RegExp('(\\s|^)[ ]*' + cls + '[ ]*(\\s|$)');
          ele[i].className = ele[i].className.replace(reg, ' ');
        }
      }
    }
  };

  HTMLElement.prototype.removeClass = function (cls) {
    return w.removeClass(this, cls);
  };

  HTMLElement.prototype.getId = function () {
    return w.getId(this);
  };

  HTMLElement.prototype.attr = function (at, vl) {
    if ((!vl) && (vl !== null)) {
      return (this.getAttribute(at) === null) ? '' : this.getAttribute(at);
    } else {
      if (vl === null) {
        return this.removeAttribute(at);
      } else {
        return this.setAttribute(at, vl);
      }
    }
  };

  w.exibir = function (el, exibir, nimediato) {
    nimediato = w.iniBool(nimediato, true);

    if (exibir) {
      $(el).css('display', 'block');

      $(el).addClass('exibir');
      $(el).removeClass('ocultar');
    } else {
      $(el).addClass('ocultar');
      $(el).removeClass('exibir');
      $(el).removeClass('show');

      /* FAZ FICAR SEM EXIBICAO */
      if (nimediato) {
        w.setTimeout('window.css(seletor("#' + w.getId($(el)) + '"), "display", "none");', 1000);
      } else {
        $(el).css('display', 'none');
      }
    }
  };

  HTMLElement.prototype.exibir = function (exibir) {
    return w.exibir(this, exibir);
  };

  w.clock = function () {
    if ($('body').attr('startCron')) {
      var cont = parseInt($('body').attr('startCron'));
      cont--;

      if (cont <= 0) {
        $(w.game.t).addClass('ativo');
        $(w.game.t).removeClass('forceShowPecas');
        $('body').attr('startCron', null);
      } else {
        $('body').attr('startCron', cont);
      }
    } else if ($('body').attr('surv')) {
      var cont = parseInt($('body').attr('surv'));
      cont--;

      if (cont <= 0) {
        $('body').attr('surv', null);
        w.game.time();
      } else {
        $('body').attr('surv', cont);
      }
    }

    /* SE FOI DEFINIDO */
    if (w.isNum(cont)) {
      w.contador($("div.top .contador").getId(), cont);
    }

    w.setTimeout("window.clock();", 1000);
  };

  w.contador = function (id, cont) {
    var x = cont;
    cont = "000".substring(0, 3 - (cont + "").length) + cont;

    for (var i = (cont.length - 1); i >= 0; i--) {
      var index = cont.length - i;
      $("#" + id + " .num.d" + index + " > img").attr("src", "assets/img/nums/" + cont[i] + ".svg");
    }
  };

  w.loader = function (show) {
    show = w.iniBool(show);

    if (show) {
      $("body > div.loading").exibir(true);
      $("body > section").exibir(false);
    } else {
      $("body > div.loading").exibir(false);
      $("body > section").exibir(true);
    }
  };


  w.assetLoader = function () {
    var totalAssets = $("audio", true).length + $("img", true).length;
    w.assetsCount = ((w.assetsCount) ? w.assetsCount : 0) + 1;
    this.attr("loaded", true);

    if ($(this).hasClass("gameFundo")) {
      $("body > section.game > div.gameFundo").attr("style", "background: url('" + $("#bkPreloader").attr('src') + "');");
      this.removeClass();
    }

    $("body > div.loadbar").css("width", ((w.assetsCount / totalAssets) * 100) + "% !important");

    if (this.hasClass("gameparts")) {
      this.attr("style", "display: none;");
    }

    if (w.assetsCount >= totalAssets) {
      w.setTimeout("window.start();", 1000);
    }
  }

  w.start = function () {
    w.loader(false);

    $('body > header.principal').removeClass('ocultar');
    $('body > div.loadbar').addClass('ocultar');

    w.resetSom();

    $('body > div.preloads audio.music').play();
  };

  w.resetSom = function () {
    w.controlVolUpdate(w.isNum(w.store("som_music")) ? w.store("som_music") : 2, "music");
    w.controlVolUpdate(w.isNum(w.store("som_fx")) ? w.store("som_fx") : 9, "fx");
  };

  w.store = function (at, val) {
    try {
      if (typeof val === "undefined") {
        if (Array.isArray(w.localStorage) || ((typeof w.localStorage === "object") && (typeof w.localStorage.getItem !== "function"))) {
          return w.localStorage[at];
        }

        return w.localStorage.getItem(at);
      } else {
        if (Array.isArray(w.localStorage) || ((typeof w.localStorage === "object") && (typeof w.localStorage.setItem !== "function"))) {
          w.localStorage[at] = val;
        } else {
          w.localStorage.setItem(at, val);
        }
      }
    } catch (err) {
      w.__DB = Array.isArray(w.__DB) ? w.__DB : [];

      if (typeof val === "undefined") {
        return w.__DB[at];
      } else {
        w.__DB[at] = val;
      }
    }
  };

  w.bkLoader = function () {
    if ($("body").attr("lkStart") === 1) {
      $("body").attr("lkStart", 1);
    } else {
      var e = document.createElement("img");
      e.attr("class", 'ocultar gameFundo');
      e.attr("id", 'bkPreloader');
      e.attr("style", 'width: 10px;');
      e.attr("src", "assets/img/bk/" + w.bks[Math.floor(Math.random() * w.bks.length)]);
      $("body > section.game").appendChild(e);
    }

    for (var i = 0; i < $("img").length; i++) {
      if ($("img")[i].complete) {
        w.assetLoader.call($("img")[i]);
      } else {
        $("img")[i].addEventListener('load', w.assetLoader, false);
      }
    }

    for (var i = 0; i < $("audio").length; i++) {
      if ($("audio")[i].readyState === 4) {
        w.assetLoader.call($("audio")[i]);
      } else {
        $("audio")[i].onloadeddata = w.assetLoader;
      }
    }

    for (var i = 0; i < GaMem.prototype.parts.length; i++) {
      var e = document.createElement("img");
      e.attr("class", 'gameparts ocultar c' + GaMem.prototype.parts[i].charCodeAt());
      e.addEventListener('load', w.assetLoader, false);
      e.attr("src", "assets/img/ico/space/" + GaMem.prototype.parts[i].charCodeAt() + ".svg");
      $("body > div.preloads").appendChild(e);
    }
  };

  w.tela = function (tela) {
    w.game.tela(tela);
  };

  w.showTabuleiro = function () {
    w.game.showTabuleiro();
  };

  w.showSplash = function () {
    w.game.showSplash();
  };

  w.showGameOver = function () {
    w.game.showGameOver();
  };

  w.showWins = function (player) {
    w.game.showWins();
  };

  w.reset = function () {
    w.game.reset();
  };

  w.controlVolUpdate = function (v, dest) {
    v = Math.floor(v);
    dest = (typeof dest !== "string") ? "music" : dest;

    /* GUARDA O VOLUME */
    w.store("som_" + dest, v);

    if (dest === "music") {
      /* SETA O VOLUME */
      $('body > div.preloads audio.music').volume = v > 0 ? (v / 10) : 0;
    } else {
      var a = $('body > div.preloads div.fx audio', true);

      for (var g = 0; g < a.length; g++) {
        a[g].volume = v > 0 ? (v / 10) : 0;
      }

      if (w.game) {
        var a = $('#' + $(w.game.t).getId() + ' audio', true);

        for (var g = 0; g < a.length; g++) {
          a[g].volume = v > 0 ? (v / 10) : 0;
        }
      }
    }

    /* DESATIVA TODOS */
    w.removeClass($("body > section > aside.volume." + dest + " td > div", true), "ativo");

    /* ATIVA ATEH O LIMITE */
    for (var g = 0; g <= v; g++) {
      $("body > section > aside.volume." + dest + " td > div[data-vol='" + g + "']").addClass("ativo");
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    w.bkLoader();
    w.setTimeout("window.clock();", 1000);

    for (var i = 0; i < $("body > section > aside.volume td > div", true).length; i++) {
      $("body > section > aside.volume td > div", true)[i].addEventListener('click', function () {
        var pai = this;

        while ((!pai.hasClass("volume")) && (pai.tagName.toLowerCase() !== "body")) {
          pai = pai.parentNode;
        }

        pai = (pai.tagName.toLowerCase() !== "body") ? (pai.hasClass("music") ? "music" : "fx") : "music";
        w.controlVolUpdate((this.attr("data-vol") === "0") ? 0 : parseInt(this.attr("data-vol")), pai);
      }, false);
    }

    var items = $('.menu > .btb');

    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {

        if (this.hasClass('continuar')) {

          w.addClass($(w.game.t), 'ativo');
          w.exibir($(w.game.t), true);
          w.exibir($(w.game.hud), true);
          w.exibir($(w.game.splash), false);
        } else if (this.hasClass('mp')) {

          if ((!this.hasClass('p2')) && (!this.hasClass('surv'))) {
            this.addClass('p2');
          } else if (this.hasClass('p2')) {
            this.removeClass('p2');
            this.addClass("surv");
          } else if (this.hasClass('surv')) {
            this.removeClass('p2');
            this.removeClass('surv');
          }

        } else {
          LOG('> Criando jogo com ' + this.attr('data-q') + ' elementos.');

          var mod = 1;

          if ($('.menu > .btb.mp').hasClass("p2")) {
            mod = 2;
          } else if ($('.menu > .btb.mp').hasClass("surv")) {
            mod = 0;
          }

          window.game = new GaMem(this.attr('data-q'), ".quadro > .tabuleiro", ".quadro > .splash", "section.game > .hud", ".quadro > .wins", ".quadro > .gameover", ".p1 .contador", ".p2 .contador", ".wins .pontos .contador", mod);
        }
      }, false);
    }

    $('.hud .ico.menu').addEventListener('click', function () {
      w.removeClass($(w.game.t), 'ativo');
      w.showSplash();
    }, false);

    $('.quadro .gomenu').forEach(function (el) {
      el.addEventListener('click', function () {
        $('body > div.preloads audio.music').play();

        $('body > div.preloads audio.gameover').stop();
        $('body > div.preloads audio.vitoria').stop();

        w.removeClass($(w.game.t), 'ativo');
        w.game.reset();
        w.showSplash();
      }, false);
    });

  }, false);
}(window, seletor,
  function (msg) {
    return console.log(msg);
  },
  function (msg) {
    return console.warn(msg);
  },
  function (msg) {
    return console.error(msg);
  }
));

/*
 * A CLASSE DO JOGO
 */
if (typeof (GaMem) === "undefined" || !GaMem) {
  function GaMem(qtd, tabuleiro, splash, hud, wins, gameover, c1, c2, wc, mod) {
    this.constructor(qtd, tabuleiro, splash, hud, wins, gameover, c1, c2, wc, mod);
  }

  /*
   * ENCAPSULAMENTO SEGURO
   *
   * @param object   w      window
   * @param object   $      link para document.querySelectorAll tratado
   * @param object   GM     prototype de GaMem
   * @param function LOG    function console.log
   * @param function WARN   function console.warn
   * @param function ERROR  function console.error
   */
  (function (w, $, GM, LOG, WARN, ERROR) {
    GM.parts = ("abcdefghijklmnopqruvxywz" + 'ABCDEFGHIJKLMNOPQRSTUVXYWZ').split("");

    GM.qtd = 8;
    GM.t = null;

    GM.rand = function (min, max) {
      return Math.floor(Math.random() * max) + min;
    };

    GM.shuffle = function (array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      /* ENQUANTO HOUVER ELEMENTOS NAO ANALISADOS... */
      while (0 !== currentIndex) {

        /* Sorteia entre os elementos restantes... */
        randomIndex = GM.rand(0, currentIndex);
        currentIndex -= 1;

        /*
         * TROCA (SWAP) DE CONTEUDO ENTRE O INDIDCE currentIndex E randomIndex
         */
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    };

    GM.tela = function (tela) {
      w.exibir($(GM.t), false, false);
      w.exibir($(GM.hud), false, false);
      w.exibir($(GM.splash), false, false);
      w.exibir($(GM.gameover), false, false);
      w.exibir($(GM.wins), false, false);

      switch (tela) {
        case 0:
          w.exibir($(GM.t), true);
          w.exibir($(GM.hud), true);
          break;

        case 1:
          w.exibir($(GM.splash), true);
          break;

        case 2:
          w.exibir($(GM.gameover), true);
          break;

        case 3:
          w.exibir($(GM.wins), true);
          break;
      }
    };

    GM.showTabuleiro = function () {
      GM.tela(0);
    };

    GM.showSplash = function () {
      GM.tela(1);
    };

    GM.showGameOver = function () {
      GM.tela(2);

      $('body > div.preloads > audio.music').stop();

      $("body > div.preloads > div.fx > audio.gameover").play();
    };

    GM.showWins = function (player) {
      GM.tela(3);

      $('body > div.preloads > audio.music').stop();
      $("body > div.preloads > div.fx > audio.vitoria").play();
    };

    GM.reset = function () {
      $('body').attr('p', null);
      $('body').attr('surv', null);
      $('body').attr('startcron', null);
      $('body').attr('wins', null);
      $('body').attr('multi', null);

      $('body').removeClass('jogando');

      $(GM.t).removeClass('ativo');
      $(GM.t).removeClass('forceShowPecas');
    };

    GM.time = function () {
      if ($("#" + $(GM.t).getId() + " .celula:not(.achado)", true).length > 0) {
        GM.showGameOver();
      }
    };

    GM.constructor = function (qtd, tabuleiro, splash, hud, wins, gameover, c1, c2, wc, mod) {
      if (!((typeof tabuleiro === "string") && (typeof $(tabuleiro) === "object") && $(tabuleiro).tagName)) {
        alert("Erro interno [1].");
        ERROR("[ERRO] GaMem :: O elemento TABULEIRO para construção do jogo NÃO é válido.");
        return;
      }

      if (!((typeof splash === "string") && (typeof $(splash) === "object") && $(splash).tagName)) {
        alert("Erro interno [2].");
        ERROR("[ERRO] GaMem :: O elemento SPLASH do jogo NÃO é válido.");
        return;
      }

      if (!((typeof hud === "string") && (typeof $(hud) === "object") && $(hud).tagName)) {
        alert("Erro interno [3].");
        ERROR("[ERRO] GaMem :: O elemento HUD do jogo NÃO é válido.");
        return;
      }

      if (!((typeof gameover === "string") && (typeof $(gameover) === "object") && $(gameover).tagName)) {
        alert("Erro interno [3].");
        ERROR("[ERRO] GaMem :: O elemento GAMEOVER 1 do jogo NÃO é válido.");
        return;
      }

      if (!((typeof wins === "string") && (typeof $(wins) === "object") && $(wins).tagName)) {
        alert("Erro interno [3].");
        ERROR("[ERRO] GaMem :: O elemento WINS 1 do jogo NÃO é válido.");
        return;
      }

      if (!((typeof c1 === "string") && (typeof $(c1) === "object") && $(c1).tagName)) {
        alert("Erro interno [3].");
        ERROR("[ERRO] GaMem :: O elemento CONTADOR 1 do jogo NÃO é válido.");
        return;
      }

      if (!((typeof c2 === "string") && (typeof $(c2) === "object") && $(c2).tagName)) {
        alert("Erro interno [3].");
        ERROR("[ERRO] GaMem :: O elemento CONTADOR 2 do jogo NÃO é válido.");
        return;
      }

      if (!((typeof wc === "string") && (typeof $(wc) === "object") && $(wc).tagName)) {
        alert("Erro interno [3].");
        ERROR("[ERRO] GaMem :: O elemento CONTADOR Wins do jogo NÃO é válido.");
        return;
      }


      GM.pontos = [0, 0];

      GM.cont = [c1, c2, wc];
      GM.t = tabuleiro;
      GM.splash = splash;
      GM.hud = hud;
      GM.wins = wins;
      GM.gameover = gameover;

      w.getId(GM.t);
      w.getId(GM.splash);
      w.getId(GM.hud);
      w.getId(GM.wins);
      w.getId(GM.gameover);

      if (((qtd * qtd) % 2) !== 0) {
        WARN("[AVISO] GaMem :: A resolucao do jogo [" + qtd + "], gera " + (qtd * qtd) + " quadros, que por NÃO ser divisível por 2, é impossível construir. Usando resolução 4.");
      }

      GM.qtd = (w.isNum(qtd) && (qtd >= 2) && (((qtd * qtd) % 2) === 0)) ? qtd : 4;

      /* RESETA O JOGO LIMPANDO JOGOS ANTERIORES SE EXISTENTES */
      $(GM.t).innerHTML = '';

      var items = GM.shuffle(GM.parts).slice(0, ((GM.qtd * GM.qtd) / 2));
      items = GM.shuffle(GM.shuffle(GM.shuffle(GM.shuffle(items).concat(GM.shuffle(items)))));

      var size = (100 / GM.qtd);

      /* ZERANDO OS PONTOS, INCLUSIVE WINS */
      w.contador($(GM.cont[0]).getId(), 0);
      w.contador($(GM.cont[1]).getId(), 0);
      w.contador($(GM.cont[2]).getId(), 0);

      for (var i = 0; i < items.length; i++) {
        /* GRIA A CELULA ITEM (ENVOLUCRO DIVISOR DE AREAS) */
        var e = document.createElement("div");

        e.attr('class', 'celula c' + items[i].charCodeAt());
        e.attr('char', items[i]);
        e.attr('ascii', items[i].charCodeAt());
        e.attr('style', 'width:' + size + '%;height:' + size + '%;');
        e.innerHTML = $('body > div.preloads > div.fx div.cell').innerHTML;

        /* CRIA O ITEM */
        var t = document.createElement("div");
        t.attr('class', 'item');
        t.attr('ascii', items[i].charCodeAt());
        e.appendChild(t);

        /* ADICIONA O TEXTO (CONTEUDO) */
        var s = document.createElement("span");
        s.innerHTML = items[i];

        t.appendChild(s);

        $(GM.t).appendChild(e);

        e.addEventListener('mouseenter', function () {
          if ((!this.hasClass("selecionado")) && (!this.hasClass("achado")) && ($(GM.t).hasClass("ativo")) && ($('body').hasClass("jogando")) && ($("#" + $(GM.t).getId() + " .selecionado", true).length < 2)) {
            w.setTimeout('seletor("#' + this.getId() + ' audio.over").play();', 50);
          }
        }, false);

        e.addEventListener('click', function () {
          if ((!this.hasClass("selecionado")) && (!this.hasClass("achado")) && ($(GM.t).hasClass("ativo")) && ($('body').hasClass("jogando")) && ($("#" + $(GM.t).getId() + " .selecionado", true).length < 2)) {
            w.setTimeout('seletor("#' + this.getId() + ' audio.click").play();', 20);
          }

          if (($('body').hasClass('jogando')) && ($(GM.t).hasClass('ativo')) && (!$(GM.t).hasClass('pausado')) && (!this.hasClass('achado'))) {
            var sels = $("#" + $(GM.t).getId() + " .celula.selecionado", true);

            if ((sels.length >= 0) && (sels.length <= 1)) {
              this.addClass('selecionado');
            }

            sels = $("#" + $(GM.t).getId() + " .celula.selecionado", true);

            /*
             * O ANTERIORMENTE CLICADO E O ATUAL = 2
             */
            if (sels.length === 2) {
              var jogador = parseInt($('body').attr('p')) - 1;
              jogador = jogador < 0 ? 0 : jogador;

              if (sels[0].attr('ascii') === sels[1].attr('ascii')) {
                w.setTimeout('seletor("body > div.preloads > div.fx > audio.achado").play();', 20);

                w.addClass($("#" + $(GM.t).getId() + " .celula.selecionado", true), "achado");

                if (jogador === 1) {
                  w.addClass($("#" + $(GM.t).getId() + " .celula.selecionado", true), "p2");
                }

                w.removeClass($("#" + $(GM.t).getId() + " .celula.selecionado", true), "selecionado");

                GM.pontos[jogador] += 10;

                /* TERMINOU AS IMAGENS */
                if ($("#" + $(GM.t).getId() + " .celula:not(.achado)", true).length <= 0) {
                  var ven = (GM.pontos[0] > GM.pontos[1] ? 0 : (GM.pontos[1] > GM.pontos[0] ? 1 : -1)) + 1;

                  /* EMPATE = GAME OVER */
                  if (ven === 0) {
                    GM.reset();
                    GM.showGameOver();
                  } else {
                    GM.pontos[jogador] = GM.pontos[jogador] > 0 ? GM.pontos[jogador] : 0;
                    w.contador($(GM.cont[jogador]).getId(), GM.pontos[jogador]);

                    /*
                     * ESTE EH O UNICOQUE JAH SETA LOGO AQUI SEM SER COM TIME, PQ
                     * SE NAO O CLOCK PODE CONFLITAR E TERMOS DUAS COISAS DISTINTAS
                     * SENDO EXECUTADAS
                     */
                    $('body').attr('surv', null);

                    /* EXIBE A PONTUAÇÃO VENCEDORA */
                    w.contador($(GM.cont[2]).getId(), GM.pontos[ven - 1]);

                    /* EXIBIMOS A TELA COM TIME DE 1 SEGUNDO */
                    w.setTimeout("window.reset();seletor('body').attr('wins', " + ven + ");window.showWins(" + GM.pontos[ven - 1] + ");", 1000);
                  }
                }
              } else {
                w.setTimeout('seletor("body > div.preloads > div.fx > audio.error").play();', 600);

                $(GM.t).addClass('pausado');
                w.setTimeout('window.removeClass(seletor("#' + $(GM.t).getId() + ' .celula.selecionado", true), "selecionado");', 1000);
                w.setTimeout("seletor('#" + $(GM.t).getId() + "').removeClass('pausado');", 1100);

                GM.pontos[jogador] -= 5;

                if ($('body').attr('multi')) {
                  if ((jogador + 1) === 1) {
                    $('body').attr('p', 2);
                  } else {
                    $('body').attr('p', 1);
                  }
                }
              }

              GM.pontos[jogador] = GM.pontos[jogador] > 0 ? GM.pontos[jogador] : 0;
              w.contador($(GM.cont[jogador]).getId(), GM.pontos[jogador]);
            }
          }
        }, false);
      }

      GM.reset();

      if (mod === 0) {
        $("body").attr('surv', (GM.qtd * GM.qtd * 3));
      } else if (mod === 2) {
        $("body").attr('multi', 2);
      }

      $(GM.t).addClass('forceShowPecas');

      /* DEFININDO O PLAY ATUAL */
      $('body').attr('p', 1);
      $('body').attr('wins', null);

      $('body').addClass('jogando');
      $('body').attr('startCron', Math.round(GM.qtd * GM.qtd * 0.15 + .5));

      GM.showTabuleiro();
      w.setTimeout("window.resetSom();", 500);
    };

  }(window, seletor, GaMem.prototype,
    function (msg) {
      return console.log(msg);
    },
    function (msg) {
      return console.warn(msg);
    },
    function (msg) {
      return console.error(msg);
    }
  ));
}