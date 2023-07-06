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

if (typeof (console._log) === "undefined" || !console._log) {
  console._log = console.log;
  console._warn = console.warn;
  console._error = console.error;

  console.show = function (msg, c) {
    c = (typeof c === "string") ? c : "";

    var x = seletor("body > .consolelog > div");

    if (!x) {
      seletor("body").innerHTML += '<div class="consolelog"><div></div></div>';
      x = seletor("body > .consolelog > div");
    }

    if (x) {
      x.innerHTML += "\n<hr /><div class='" + c + "'>" + ((typeof msg === "string") ? msg.replace(/[\r\n]/ig, "\n<br />") : JSON.stringify(msg)) + "</div>";
      x.scrollTop = x.scrollHeight;
    }
  };

  console.log = function (msg) {
    console._log(msg);
    console.show(msg);
  };

  console.error = function (msg) {
    console._error(msg);
    console.show(msg, "error");
  };

  console.warn = function (msg) {
    console._warn(msg);
    console.show(msg, "warn");
  };
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
      return ($(this).attr('style')) ? $(this).attr('style').match(rx, at + ":" + vl + ";") : '';
    } else {
      return w.css(this, at, vl);
    }
  };

  w.hasClass = function (ele, cls) {
    ele = w.isList(ele) ? ele : [$(ele)];

    for (var i = 0; i < ele.length; i++) {
      if ((typeof ele[i] === "object") && (ele[i] instanceof Element)) {
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
      if ((typeof ele[i] === "object") && (ele[i] instanceof Element)) {
        if (!w.hasClass(ele[i], cls)) {
          ele[i].className += " " + cls;
        }
      }
    }

    return ele;
  };

  NodeList.prototype.addClass = Array.prototype.addClass = HTMLElement.prototype.addClass = function (cls) {
    return w.addClass(this, cls);
  };

  w.removeClass = function (ele, cls) {
    ele = w.isList(ele) ? ele : [$(ele)];

    for (var i = 0; i < ele.length; i++) {
      if ((typeof ele[i] === "object") && (ele[i] instanceof Element)) {
        if (w.hasClass(ele[i], cls)) {
          var reg = new RegExp('(\\s|^)[ ]*' + cls + '[ ]*(\\s|$)');
          ele[i].className = ele[i].className.replace(reg, ' ');
        }
      }
    }

    return ele;
  };

  NodeList.prototype.removeClass = Array.prototype.removeClass = HTMLElement.prototype.removeClass = function (cls) {
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
    var setpropCount = function (at) {
      var cont = parseInt($('body').attr(at));
      cont--;

      if (cont <= 0) {
        $('body').attr(at, null);
      } else {
        $('body').attr(at, cont);
      }

      return cont;
    };

    var cont = 0;

    if ($('body').attr('propa')) {
      cont = setpropCount('propa');

      if (cont <= 0) {
        w.comercial(false);
      }
    } else if ($('body').attr('startCron')) {
      cont = setpropCount('startCron');

      if (cont <= 0) {
        $(w.game.t).addClass('ativo');
        $(w.game.t).removeClass('forceShowPecas');
      }
    } else if ($('body').attr('surv')) {
      cont = setpropCount('surv');

      if (cont <= 0) {
        w.game.time();
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
      var e = $("#" + id + " .num.d" + (cont.length - i) + " > img");
      var src = "assets/img/nums/" + cont[i] + ".svg";

      if (e.attr("src") !== src) {
        e.attr("src", src);
      }
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

  /* https://www.html5rocks.com/en/tutorials/cors/
   *  CRIA, EM TEORIA, UM OBJETO HTTP, QUE PERMITTE CROOS DOMAIN
   * OU SEJA, CARREGAR CONTEUDO DE OUTRAS PAGINAS
   * NA PRATICA NAO EH BEM ASSIM
   *
   */
  w.xhrCORS = function (method, url) {
    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
      /* Verifica se o objeto XMLHttpRequest possui a propriedade "withCredentials".
       * "withCredentials" existe apenas em objetos XMLHTTPRequest2.
       * ABRE DE FORMA ASSINCRONA
       */
      xhr.open(method, url, true);
    } else if (typeof XDomainRequest !== "undefined") {

      /* Caso contrário, verifica se XDomainRequest.
       * XDomainRequest existe apénas no IE, eh a menira de se fazer requisições
       * CORS no IE's.
       */
      xhr = new XDomainRequest();
      xhr.open(method, url);
    } else {
      return null;
    }

    xhr.timeout = 60000;

    return xhr;
  };

  /* ESSA FUNCAO EH EXECUTADA COMO UM EVENTOS DE CARREGAMENTO PARA CADA TAG D
   * RECURSO COMO <IMG> E <AUDIO>. OU SEJA, SEMPRE QUE A TAG HTML TIVER
   * CONCLUIDO O CARREGAMENTO DO ARQUIVO, ESTAH FUNCAO SDERAH EXECUTADA
   *
   * COM ISSO, PODEMOS CONTABILIZAR (LITERALMENTE CONTAR) QUANTOS RECURSOS FORAM
   * CARREGADOS E SABER SE TODOS JAH FORAM, E EXIBIR A PAGINA APENAS DEPOIS
   */
  w.assetLoader = function (dontlog) {
    /* PRIMEIRO PONTO, O ESCOPO DESTA VARIAVEL, CHAMADO VIA '.CALL'
     * DEVE SER UMA TAG HTML, QUE EM JAVASCRIPT EH HTMLEMENTE, OU ELEMENT
     */
    if (this instanceof HTMLElement) {
      /* SE FOR UM ELEMENTO, MARCAMOS ELE SERAH MARCADO COM UM ATRIBUTO
       * INVENTADO 'LOADED' APENAS PARA PODERMOS IDENTIFICAR
       * AQUI, VERIFICAMOS SE ELE JAH FOI CARREGADO, SE SIM, ENTAO
       * NAO PRECISAMO CONTINUAR EXECUTANDO ESTA FUNCAO, APENAS RETORNAMOS
       */
      if ($(this).attr("loaded")) {
        return;
      }

      /* SE FOR AUDIO, O ENDERECO EH LOCALIZADO NA SUBTAG SOURCE */
      if (!dontlog) {
        if (this.tagName.toLowerCase() === 'audio') {
          LOG("LOADED: '" + $("#" + this.getId() + " source").attr("src").replace(/([^:]+:\/\/[^\/]+\/(GaMem\/)?)/i, "") + "'.");
        } else {
          LOG("LOADED: '" + $(this).attr("src").replace(/([^:]+:\/\/[^\/]+\/(GaMem\/)?)/i, "") + "'.");
        }
      }

      /* MARCAMOS ESTA TAG COMO 'LOADED', PARA SABERMOS QUE ELA JAH ESTA
       * CARREGADA
       */
      $(this).attr("loaded", true);

      /* A IMAGEM DE FUNDO NOS COLOCAMOS NUMA <IMG>, MAS NA VERDADE
       * ESTAH TAG NAO EH EXIBIDA, ELA EH APENAS USADA PARA FAZER UM
       * PRECARREGAMETNO DA IMAGEM, ASSIM QUE A IMAGEM ESTIVER CARREGADA (CACHE),
       * NO SETAMOS ELA COMO FUNDO (BACKGROUND) DE UM DIV
       * ESE EH FEITO APENAS PARA O FUNDO, POIS NAO PODEMOS USAR A TAG <IMG>
       * UMA VEZ QUE ELA DISTORCE A PROPORCAO DO A IMAGEM, E O BACKGROUND
       * PODEMOS USAR O TAMANHO 'COVER' QUE GERA PREENCHE TODO O DIV SEM DISTORCER
       */
      if ($(this).hasClass("gameFundo")) {
        $("body > section.game > div.gameFundo").attr("style", "background: url('" + $("#bkPreloader").attr('src') + "');");
      }

      /* SE FOR AS IMAGEM PARA MEMORIZAR, O OBJETIVO DELAS EH UNICAMENTE
       * GERAR UM PRECARREGAMENTO (CACHE), PARA NAO HAVER DEMORA NA EXIBICAO
       * ASSIM, ESTAS IMAGEM NAO PODEM, NUNCA SER EXIBIDAS, POR ISSO OCULTAMOS
       */
      if (this.hasClass("gameparts")) {
        $(this).attr("style", "display: none;");
      }
    }

    /* AQUI, ESTAMSO APENAS FAZENDO A CONTAGEM DE QUANTOS RECURSOS JAH FORAM
     * CARREGADO, INCREMENTANDO
     */
    w.assetsCount = ((w.assetsCount) ? w.assetsCount : 0) + 1;

    /* FAZEMOS A BARRA DE CARREGAMENTO AUMENTAR */
    $("body > div.loadbar").css("width", ((w.assetsCount / w.assetsTotal) * 100) + "% !important");

    /* SE TODOS OS RECURSOS JAH FORAM CARREGADOS, PODEMOS SEGUIR PARA A PROXIMA
     * ETAPA, QUE EH JUSTAMENTE CARREGAR A PROPAGANDA
     */
    if (w.assetsCount === w.assetsTotal) {
      /*w.propaLoad();*/
      w.setTimeout("window.start();", 1000);
    }
  };

  /* DETECTA SE ESTAH EXECUNTANDO EM COMO SOFTWARE MOBILE OU WEB
   * EM SOFTWARE MOBILE, ESTAMOS USANDO CORDOVA
   */
  w.isCordova = function () {
    var port = 0;

    try {
      var port = document.URL.match(/[^:]*:([\d]+).*/i);

      if (port && port.length >= 2) {
        port = parseInt(port[1]);
      }

      port = w.isNum(port) ? port : 80;
    } catch (err) {
    }

    port = w.isNum(port) ? port : 80;

    var r = ((typeof window.cordova === "object") || (((document.URL.indexOf('file://') === -1) && (document.URL.indexOf('http://') === -1) && (document.URL.indexOf('https://') === -1)) || ((port !== 80) && (port !== 443))));

    if (r) {
      $("body").attr("cordova", true);
    } else {
      $("body").attr("cordova", null);
    }

    return r;
  };

  w.hasPropa = function () {
    return $("body").attr("nopropa") ? true : false;
  };

  /* AJAX GET
   *
   * UAM FUNCAO QUE OBTEM EM JAVASCRIPT O CONTEUDO DE UMA URL,
   * E INVOCA COMO CALLBACK, A FUNCAO 'SUSSES', EM CASO DE SUCESSO
   * OU 'ERROR' EM CASO DE ERRO
   */
  w.get = function (url, sucess, error) {
    /* CRIA, EM TEORIA, UM OBJETO HTTP, QUE PERMITTE CROOS DOMAIN
     * OU SEJA, CARREGAR CONTEUDO DE OUTRAS PAGINAS
     * NA PRATICA NAO EH BEM ASSIM
     */
    var gets = w.xhrCORS("GET", url);

    /* EVENTO PARA RESPOSTA */
    gets.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        /*
         * SE SUCESSO
         */
        if (this.status === 200) {
          sucess.call(this);

          /* SE FALHA */
        } else if (typeof error === "function") {
          error(this);
        } else {
          ERROR("ERRO não tratado [1] ao baixar recurso necessário [" + url + "]:\n\n" + err);
        }
      }
    };

    /* ENVIA O PEDIDO - ACESSA EFETIVAMENTE A URL */
    try {
      LOG("Obtendo AJAX '" + url + "'...");
      gets.send();
    } catch (err) {
      WARN("FALHA ao baixar recurso necessário [" + url + "]:\n\n" + err);

      if (typeof error === "function") {
        error(this, err);
      } else {
        ERROR("ERRO não tratado [2] ao baixar recurso necessário [" + url + "]:\n\n" + err);
      }
    }
  };

  /*
   * OBTEM AS CONFIGURACOES DE PROPAGANDA
   *
   * FAZ USO DA FUNCAO AJAX .GET PARA OBTER O JSON DE CONFIGURACAO DAS
   * PROPAGANDAS
   */
  w.getPropa = function (tipo, callback, fail) {
    tipo = (typeof tipo === 'string') ? tipo : "adsense";

    w.get("propa/" + tipo + ".json?v="+w.guid(), function () {
      var json = null;

      try {
        json = JSON.parse(this.responseText);
      } catch (err) {
        ERROR("Retorno " + tipo + " inválido. Não é um json válido: '\n" + this.responseText + "\n'");
      }

      callback(json ? json : this.responseText);
    }, function (e, error) {
      if (typeof fail === "function") {
        fail();
      }
    });
  };

  /*
   * COM O FIM DE BAIXAR IMAGENS (PARA FAZER CACHE)
   * ESTA FUNCAO, OBTEM VIA JAVASCRIP O CONTEUDO DE UMA IMAGEM POR MEIO DIRETO
   * OU, EM CASO DE FALHA (DETECTADA AUTOMATICAMENTE) POR MEIO DA CRIACAO
   * DE UMA TAG HTML
   */
  w.getImg = function (url, sucess, dest) {
    function addIMG(u, osucess, d) {
      var e = document.createElement("img");
      e.attr("class", 'gameparts ocultar');
      e.addEventListener('load', osucess, false);
      e.attr("src", u);
      d.appendChild(e);
    }

    function onSucess() {
      var url = (this instanceof Element) ? $(this).attr("src") : this.responseURL;

      LOG("LOADED: '" + url.replace(/([^:]+:\/\/[^\/]+\/(GaMem\/)?)/i, "") + "'.");
      sucess.call(this, true);
    }

    LOG("Obtendo IMG '" + url + "'...");

    if (dest && (dest instanceof HTMLElement)) {
      addIMG(url, onSucess, dest);
    } else {
      w.get(url, onSucess, function () {
        WARN('AVISO :: Falha ao carregar imagem "' + url + '", retentando via HTML tag...');
        addIMG(this.responseURL, onSucess, $("body > div.preloads"));
      });
    }
  };

  /* FAZ DOWNLOAD DE JAVASCRIPT */
  w.getJS = function (url, callback, notfound) {
    var x = $("script[src='" + url + "']", true);
    for (var i = 0; i < x.length; i++) {
      x[i].remove();
    }

    LOG("Obtendo JS '" + url + "'...");

    w.get(url, function () {
      var e = document.createElement("script");
      e.innerHTML = this.responseText;
      $("head").appendChild(e);

      LOG("LOADED: '" + $(this).attr("src").replace(/([^:]+:\/\/[^\/]+\/GaMem\/)/i, "") + "'.");

      if (typeof callback === "function") {
        callback(this.responseText);
      }
    }, function () {
      if (this.status === 404) {
        WARN('AVISO :: Falha ao baixar script "' + url + '", recurso NÃO encontrado.');

        if (typeof notfound === "function") {
          notfound();
        }
      } else {
        WARN('AVISO :: Falha ao baixar script "' + url + '", tentando via HTML tag...');

        var e = document.createElement("script");
        e.addEventListener("load", function () {
          LOG("LOADED: '" + $(this).attr("src").replace(/([^:]+:\/\/[^\/]+\/GaMem\/)/i, "") + "'.");
          callback(true);
        });

        e.addEventListener("error", function () {
          ERROR('ERRO :: Falha ao baixar script "' + url + '", destino inacessível.');

          if (typeof notfound === "function") {
            notfound();
          }
        });

        e.attr("src", url);
        $("head").appendChild(e);
      }
    });
  };

  /* RESPONSAVEL POR GARANTIR QUE OS PROCEDIMENTOS DE CARREGAMENTO DA
   * PROPAGANDA SEJAM EXECUTADOS APENAS UMA UNICA VEZ
   */
  w.propaLoad = function () {
    if (w.firstComercialRun) {
      return;
    }

    $('body > div.loadbar').addClass('finall');

    w.comercial(1);
  };

  /* BAIXAS AS APIS NECESSARIAS PARA EXIBICAO DAS PROPAGANDA E CONFIGURA-AS */
  w.comercial = function (show, cont) {
    function retryLoad(num, max, t) {
      var c = (w.isNum(num) ? num + 1 : 1);
      max = !max ? 20 : max;

      var str = (typeof t === "string") ? t + " " : "PROPA: Falha, retentando ";

      if (c < (max + 1)) {
        str += "[" + c + "]...";
        w.setTimeout("window.comercial(1, " + c + ");", 500);
      } else {
        str += "... TODAS tentativas frustradas. Recarregue!";
      }

      if (c < (max + 1)) {
        LOG(str);
      } else {
        ERROR(str);
      }
    }

    function isLoaded() {
      w.loadedPropaAPI = true;

      LOG("PROPA LOADED. Starting...");
      w.setTimeout("window.start();", 500);
    }

    show = w.isNum(show) ? parseInt(show) : w.iniBool(show);

    if (show) {
      /* SE AINDA NAO TIVER FEITO O CARRGAMENTO DA BIBLIOTECA
       * DE PROPAGANDA (ADMOB OU ADSENSE)
       */
      if (!w.loadedPropaAPI) {
        LOG("Geting PROPA...");

        var tipo = w.isCordova() ? "admob" : "adsense";

        w.getPropa(tipo, function (json) {
          LOG('PROPA: Configuração ' + tipo + ' carregada.');

          /* SE RETORNO SUCESSO E UM OBJETO JSON */
          if (typeof json === "object") {
            if (w.isCordova()) {
              try {
                if (typeof AdMob !== "object") {
                  cont = (w.isNum(cont) ? cont + 1 : 0);

                  retryLoad(cont, false, "PROPA: Esperando");
                } else {
                  var admobid = null;

                  /* https://github.com/floatinghotpot/cordova-admob-pro#installation */
                  if (/(android)/i.test(navigator.userAgent)) {
                    admobid = json.android;
                  } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
                    admobid = json.ios;
                  } else {
                    admobid = json.windows;
                  }

                  /* preppare and load ad resource in background, e.g. at begining of game level */
                  if (admobid && AdMob) {
                    isLoaded();

                    AdMob.interstitial.config({
                      id: admobid.interstitial,
                      autoShow: false,
                    });

                    AdMob.interstitial.prepare();
                  }
                }
              } catch (err) {
                ERROR("ERRO :: PROPA: Problemas ao criar mobile, recarregue!");
              }
            } else {
              w.getJS("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function (js) {
                isLoaded();

                (adsbygoogle = window.adsbygoogle || []).push(json);

                try {
                  /*  */
                } catch (err) {
                  ERROR("ADSENSE :: Falha na criação do objeto. Recarregue!");
                }
              }, function () {
                retryLoad(cont);
              });
            }
          } else {
            WARN("AVISO :: Configuração de propaganda ausente ou inválida.");
          }
        }, function () {
          WARN('AVISO :: Configuração PROPA ' + tipo + ' indisponível/ausente.');
          retryLoad(cont, 30);
        });
      } else

      if ((show === true) && (w.loadedPropaAPI)) {
        LOG("PROPA: Exibindo");

        if (w.isCordova()) {
          if ((typeof AdMob === "object")) {
            AdMob.interstitial.show();
          }
        } else {

        }
      }
    }
  };

  w.start = function () {
    if (!w.started) {
      w.started = true;
      w.loader(false);

      $("body").removeEventListener("dblclick", w.consoleDiv);

      $('body > header.principal').removeClass('ocultar');
      $('body > div.loadbar').addClass('ocultar');

      w.resetSom();

      $('body > div.consolelog').addClass("ocultar");
      $('body > div.preloads audio.music').play();

      LOG("Started.");
    }
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

  /*
   * ESTA FUCAO EH EXECUTADA APENAS DURANTE O CARREGAMENTO
   * SEU OBJETIVO E VERIFICAR QUAIS E QUANTOS INTENS AINDA NAO FORAM CARREGADOS

   * A FUNCAO 'assetLoader' EH EXECUTADA SEMPRE QUE UM RECURSO EH CARREGADO
   * ELA EH CHAMDA PORQUE ADICIONAMOS ELA COMO EVENTO ONLOD, MAS, SE POR ALGUM
   * MOTIVO, O RECURSO (IMAGEM, AUDIO, ...) JAH TIVER SIDO CARREGADO ANTES
   * NAO, ELE NAO SERAH CONTABILIZADO, POR ISSO ESTA FUNCAO 'checkLoadeds',
   * FAZ VERIFICACOES, AFIM DE GARANTIR QUE TODOS OS RECURSOS CARREGADOS FORAM
   * CONTABILIZADOS
   *
   *
   * ESTA FUNCAO TAMBEM VERIFICA SE ESTAH DEMORANDO MUITO PARA UM RECURSO
   * CARREGAR, O QUE SIGNIFICA QUE PODE TER HAVIDO UM ERRO, E PORTANTO
   * ELA REINICIALIZA O CARREGAMENTO DO RECURSO
   */
  w.checkLoadeds = function () {
    function varrer(a) {
      /* FORCANDO ATUALIZACAO
       * PRIMEIRO VERIFICAMOS QUANTAS VEZES FIZEMOS A CHECAGEM
       * QUE OCORRER A CADA PERIODE DE TEMPO (7S), INCREMENTAMOS
       * SE ESTA FOR UMA TENTATIVA MULTIPLO DE 5
       * ENTAO JAH FAZ MUITO TEMPO E AINDA NAO CAREEGOU, PODE TER HAVIDO ALGUM
       * PROBLEMA, RESETAR O 'SRC', FORCA O HTML A REINICIALIZAR O CARREGAMENTO
       */
      function nl(el) {
        var c = w.isNum(el.attr("nl")) ? (parseInt(el.attr("nl")) + 1) : 0;
        el.attr('nl', "" + c);

        if (c % 5 === 0) {
          el.attr("src", el.attr("src"));
        }
      }
      ;

      var r = 0;

      if (w.isList(a)) {

        /* VARREMOS CADA UM DOS ITENS DO VETOR 'a' E VERIFICAMO SE ELE ESTAH
         * OU NAO CARREGADO
         */
        for (var i = 0; i < a.length; i++) {
          if (a[i] instanceof HTMLElement) {
            /*
             * SE ESTIVER CARREGADO, MAS AINDA NAO MARCAMOS COMO CARREGADO
             * (attr loaded) MARCAMOS COMO CARREGADO INVOCANDO A FUNCAO DE
             * CONTABILIZACAO w.assetLoader
             */
            if ((!a[i].attr("loaded")) && ((a[i].complete) || (a[i].readyState === 4))) {
              /* INVOCA A FUNCAO DE CONTABILIZACAO, DENTRO DO ESCOPO
               * DA HTML TAG <IMG> OU <AUDIO>, ...
               */
              w.assetLoader.call(a[i]);

              /* SE NAO ESTIVER CARREGADA E NEM MARCADA COMO CARREGADA
               * PROCESSAMOS E TALVEZ, DEPENDENDO DE QUANTAS VEZES,
               * REINICIALIZAMOS O CARREGADAMENTO
               */
            } else if ((!a[i].attr("loaded")) && (!a[i].complete) && (a[i].readyState !== 4)) {
              /* INCREMENTA O NUMERO DE VERIFICACOES E REINICIA O CARREGAMENTO
               * SE FOR NECESSARIO
               */
              nl(a[i]);

              /* CONTAMOS O NUMERO DE ELEMENTOS QUE NAO FORAM CARREGADOS */
              r++;
              itens.push([
                (a[i].tagName.toLowerCase() !== "audio") ? a[i].attr("src") : $("#" + a[i].getId() + " source").attr("src"),
                a[i].attr("nl")
              ]);
            }
          }
        }
      }

      /* RETORNAMOS O NUMERO DE ELEMENTOS QUE NAO FORAM CARREGADOS */
      return r;
    }

    /* MUDANDO A COR DA BARRA DE CARREGAMENTO */
    if ($('body > div.loadbar').hasClass('mod')) {
      $('body > div.loadbar').removeClass('mod');
    } else {
      $('body > div.loadbar').addClass('mod');
    }

    var itens = [],
            /* EXECUTA A FUNCAO VARRER, COM O ESCOPO FUNCAO ATUAL
             * OU SEJA, A FUNCAO VARRER ENCHERGA A AS VARIAVEIS DESTA FUNCAO
             * COMO A VARIAVEL ITENS, IMGS E AUDIOS
             */
            imgs = varrer.call(this, $("img")),
            audios = varrer.call(this, $("audio"));

    if (w.assetsCount < w.assetsTotal) {
      /* LISTAMOS O ELEMENTO QUE NAO FORAM CARREGADOS */
      var str = "";
      for (var i = 0; i < itens.length; i++) {
        str += "\n - [" + (("000" + itens[i][1]).substr(0, 4 - itens[i][1].length)) + "] " + itens[i][0];
      }

      /* EXIBIMOS OS ELEMETNOS QUE NAO FORAM CARREGADOS */
      LOG("CHECKER :: Carregando:\n" + str);

      /* EXIBIMOS NOTIFICAO DE ELEMENTOS NAO CARREGADOS */
      LOG("CHECKER :: Ainda resta " + imgs + " imagen(s) e " + audios + " audio(s).");

      /* REAGENDAMOS NO VERIFICAO EM 7 SEGUNDOS */
      w.setTimeout("window.checkLoadeds();", 7000);
    } else {
      LOG("CHECKER :: Todos os recursos foram carregados!");

      /* TUDO CARREGADO, INICIAMOS O PROXIMO PASSO,
       * O CARREGAMETO DE PROPAGANDAS
       */
      w.propaLoad();
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

    w.assetsTotal = $("audio", true).length + $("img", true).length;

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

    /* SOMENTE TEM SENTINDO FAZER PRE CARREGAMENTO DAS PECAS SE FOR ONLINE,
     * MOBILE NAO
     */
    if (!w.isCordova()) {
      for (var i = 0; i < GaMem.prototype.parts.length; i++) {
        if (i < 10) {
          w.assetsTotal++;
          w.getImg("assets/img/nums/" + i + ".svg", w.assetLoader, $("body > div.preloads"));
        }

        w.assetsTotal++;
        w.getImg("assets/img/ico/space/" + GaMem.prototype.parts[i].charCodeAt() + ".svg", w.assetLoader, $("body > div.preloads"));
      }
    }

    w.setTimeout("window.checkLoadeds();", 7000);
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
      var a = $('body > div.preloads > audio');
    } else {
      var a = $('body > div.preloads div.fx > audio', true);
    }

    for (var g = 0; g < a.length; g++) {
      a[g].volume = v > 0 ? (v / 10) : 0;
    }

    /* ATUALIZANDO OS FX DE CADA ITEM INDIVIDUALMENTE */
    if ((dest === "fx") && (w.game)) {
      var a = $('#' + $(w.game.t).getId() + ' audio', true);

      for (var g = 0; g < a.length; g++) {
        a[g].volume = v > 0 ? (v / 10) : 0;
      }
    }

    /* DESATIVA TODOS */
    w.removeClass($("body > section > aside.volume." + dest + " td > div", true), "ativo");

    /* ATIVA ATEH O LIMITE */
    for (var g = 0; g <= v; g++) {
      $("body > section > aside.volume." + dest + " td > div[data-vol='" + g + "']").addClass("ativo");
    }
  };

  w.consoleDiv = function () {
    if (($("body > .consolelog").hasClass("ocultar")) || (!$("body > .consolelog").hasClass("expand"))) {
      $("body > .consolelog").removeClass("ocultar").addClass("expand");
    } else {
      $("body > .consolelog").addClass("ocultar").removeClass("expand");
    }
  };

  /* TENTA FAZER O DOWNLOAD DO CONTEUDO CORDOVA */
  w.preOnReady = function () {
    if (!w.preInicializando) {
      w.preInicializando = true;

      console.clear();
      LOG("GaMem :: Pré-inicializando...");

      $("body").addEventListener("dblclick", w.consoleDiv);

      try {
        w.getJS("cordova.js", function () {
          w.getJS("scripts/platformOverrides.js", function () {

            /* Manipular eventos de pausa e retomada do Cordova */
            document.addEventListener('pause', w.onPause.bind(this), false);
            document.addEventListener('resume', w.onResume.bind(this), false);

            w.onready();

          }, w.onready);
        }, w.onready);
      } catch (e) {
        w.onready();
      }
    }
  };

  w.onPause = function () {
    /* TODO: este aplicativo foi suspenso. Salve o estado do aplicativo aqui. */
  };

  w.onResume = function () {
    /* TODO: este aplicativo foi reativado. Restaure o estado do aplicativo aqui. */
  };

  w.onready = function () {
    /* EVITANDO QUE SEJA EXECUTADO MAIS DE UMA VEZ */
    if (!w.inicializando) {
      w.inicializando = true;

      if (w.isCordova()) {
        LOG("Ambiente: Mobile APP.");
      } else {
        LOG("Ambiente: WEB.");
      }

      LOG("GaMem :: Inicializando...");

      $(".principal img.consolelog").addEventListener("click", w.consoleDiv);

      w.bkLoader();
      w.setTimeout("window.clock();", 1000);

      for (var i = 0; i < $("body > section > aside.volume td > div", true).length; i++) {
        $("body > section > aside.volume td > div", true)[i].addEventListener('click', function () {
          var pai = this;

          while ((!pai.hasClass("volume")) && (pai.tagName.toLowerCase() !== "body")) {
            pai = pai.parentNode;
          }

          pai = (pai.tagName.toLowerCase() !== "body") ? (pai.hasClass("music") ? "music" : "fx") : "music";
          w.controlVolUpdate(($(this).attr("data-vol") === "0") ? 0 : parseInt($(this).attr("data-vol")), pai);
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
            LOG('> Criando jogo com ' + $(this).attr('data-q') + ' elementos.');

            var mod = 1;

            if ($('.menu > .btb.mp').hasClass("p2")) {
              mod = 2;
            } else if ($('.menu > .btb.mp').hasClass("surv")) {
              mod = 0;
            }

            window.game = new GaMem($(this).attr('data-q'), ".quadro > .tabuleiro", ".quadro > .splash", "section.game > .hud", ".quadro > .wins", ".quadro > .gameover", ".p1 .contador", ".p2 .contador", ".wins .pontos .contador", mod);
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

          $('body > div.preloads > audio.gameover').stop();
          $('body > div.preloads > audio.vitoria').stop();

          w.removeClass($(w.game.t), 'ativo');
          w.game.reset();
          w.showSplash();
        }, false);
      });
    }
  };

  /* CORDOVA COMPATIVEL */
  document.addEventListener('deviceready', w.preOnReady, false);

  /* HTML COMPATIVEL */
  document.addEventListener('DOMContentLoaded', w.preOnReady, false);

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

      $("body > div.preloads > audio.gameover").play();
    };

    GM.showWins = function (player) {
      GM.tela(3);

      $('body > div.preloads > audio.music').stop();
      $("body > div.preloads > audio.vitoria").play();
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