(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{435:function(s,n,t){"use strict";t.r(n);var a=t(54),e=Object(a.a)({},(function(){var s=this,n=s.$createElement,t=s._self._c||n;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"workshop-nginx-reverse-proxy-server"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#workshop-nginx-reverse-proxy-server"}},[s._v("#")]),s._v(" Workshop: Nginx Reverse Proxy Server")]),s._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[s._v("WARNING")]),s._v(" "),t("ul",[t("li",[t("strong",[s._v("Please prepare one folder for this Workshop")])])])]),s._v(" "),t("h2",{attrs:{id:"start-coding-dev-environment"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#start-coding-dev-environment"}},[s._v("#")]),s._v(" Start Coding (Dev environment)")]),s._v(" "),t("h3",{attrs:{id:"project-structure"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#project-structure"}},[s._v("#")]),s._v(" project structure")]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("+-- backend\n|    +-- src \n|    |   +-- main.py\n|    +-- Dockerfile.dev\n+-- frontend\n|    +-- src \n|    |   +-- app.js\n|    |   +-- index.html\n|    +-- Dockerfile \n+-- nginx\n|    +-- Dockerfile \n|    +-- nginx.conf\n+-- docker-compose.yml\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br")])]),t("p",[s._v("./docker-compose.yml")]),s._v(" "),t("div",{staticClass:"language-yml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("version")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3"')]),s._v("\r\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("services")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" \r\n\r\n\r\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("nginx")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("build")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("context")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ./nginx\r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("ports")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"80:80"')]),s._v("\r\n            \r\n   \r\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("frontend")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("build")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("context")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ./frontend\r\n        \r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n          "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" ./frontend/src"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/usr/share/nginx/html\r\n\r\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("backend")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("build")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("context")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ./backend\r\n            "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("dockerfile")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" Dockerfile.dev\r\n  \r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" ./backend/src"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/home/src\r\n     \r\n \r\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("mongo")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("image")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" mongo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("3.6.22"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("xenial\r\n\r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("environment")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\r\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("MONGO_INITDB_ROOT_USERNAME")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" root\r\n          "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("MONGO_INITDB_ROOT_PASSWORD")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1234")]),s._v("\r\n\r\n        "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" \r\n            "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" mongo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("sad"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("lab"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("proxy"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("/data/db\r\n"),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("volumes")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" \r\n  mongo"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("sad"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("lab"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("proxy"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")])])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br"),t("span",{staticClass:"line-number"},[s._v("35")]),t("br"),t("span",{staticClass:"line-number"},[s._v("36")]),t("br"),t("span",{staticClass:"line-number"},[s._v("37")]),t("br")])])])}),[],!1,null,null,null);n.default=e.exports}}]);